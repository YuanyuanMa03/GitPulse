#!/usr/bin/env python3
"""
Fetch GitHub trending repos via GitHub Search API.
Outputs JSON data for the static site with historical archiving.
"""

import json
import urllib.request
import sys
import time
import base64
import re
import os
from datetime import datetime, timedelta, timezone

ARCHIVE_DIR = "archive"

def make_request(url):
    """Make authenticated request if token available."""
    import os
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "github-trending-daily"
    }
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode())

def fetch_repos(since_days, per_page=30):
    """Fetch repos created or pushed recently, sorted by stars."""
    since_date = (datetime.now(timezone.utc) - timedelta(days=since_days)).strftime("%Y-%m-%d")
    url = (
        f"https://api.github.com/search/repositories"
        f"?q=created:>{since_date}&sort=stars&order=desc&per_page={per_page}"
    )
    try:
        data = make_request(url)
        return data.get("items", [])
    except Exception as e:
        print(f"Error fetching repos: {e}", file=sys.stderr)
        return []

def fetch_with_retry(fn, *args, max_retries=3):
    """Call fn(*args) with exponential backoff on failure."""
    for attempt in range(max_retries):
        try:
            result = fn(*args)
            if result:
                return result
        except Exception as e:
            print(f"  Attempt {attempt+1}/{max_retries} failed: {e}", file=sys.stderr)
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
    return []

def fetch_repos_pushed(since_days, per_page=30):
    """Fetch repos with recent push activity, sorted by stars."""
    since_date = (datetime.now(timezone.utc) - timedelta(days=since_days)).strftime("%Y-%m-%d")
    url = (
        f"https://api.github.com/search/repositories"
        f"?q=pushed:>{since_date}&sort=stars&order=desc&per_page={per_page}"
    )
    try:
        data = make_request(url)
        return data.get("items", [])
    except Exception as e:
        print(f"Error fetching pushed repos: {e}", file=sys.stderr)
        return []

def repo_to_dict(r):
    return {
        "name": r["full_name"],
        "url": r["html_url"],
        "description": r.get("description") or "",
        "stars": r["stargazers_count"],
        "forks": r["forks_count"],
        "language": r.get("language") or "—",
        "topics": r.get("topics", []),
        "created": r["created_at"][:10],
        "pushed": (r.get("pushed_at") or "")[:10],
        "open_issues": r.get("open_issues_count", 0),
        "avatar": r["owner"]["avatar_url"],
    }

def load_previous_stars():
    """Build name->stars lookup from previous data.json for delta tracking."""
    try:
        with open("data.json", "r", encoding="utf-8") as f:
            prev = json.load(f)
        return {r["name"]: r.get("stars", 0)
                for period in ["daily", "weekly", "monthly"]
                for r in prev.get(period, [])}
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def compute_deltas(repos, prev_stars):
    """Annotate each repo with star delta vs previous snapshot."""
    for r in repos:
        prev = prev_stars.get(r["name"], r["stars"])
        r["delta"] = max(0, r["stars"] - prev)
    return repos

def fetch_readme_fallback(owner, repo_name):
    """Try to get a short description from the repo's README. Returns '' on failure."""
    try:
        url = f"https://api.github.com/repos/{owner}/{repo_name}/readme"
        data = make_request(url)
        content = base64.b64decode(data.get("content", "")).decode("utf-8", errors="replace")
        for line in content.split("\n"):
            stripped = line.strip()
            if not stripped or stripped.startswith("#") or stripped.startswith("!["):
                continue
            if stripped.startswith("[") and "]" in stripped:
                continue
            cleaned = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', stripped)
            cleaned = re.sub(r'[*_~`]{1,3}', '', cleaned)
            cleaned = re.sub(r'<!--.*?-->', '', cleaned)
            if len(cleaned) > 10:
                return cleaned[:150] + ("…" if len(cleaned) > 150 else "")
        return ""
    except Exception:
        return ""

def main():
    now = datetime.now(timezone.utc)

    # Load previous data for delta calculation
    prev_stars = load_previous_stars()

    # Daily: repos created in the last 24h (newest projects)
    print("Fetching today's new repos...", file=sys.stderr)
    daily = [repo_to_dict(r) for r in fetch_with_retry(fetch_repos, 1, 30)]

    # README fallback for daily repos with empty descriptions
    readme_count = 0
    for r in daily:
        if not r["description"]:
            parts = r["name"].split("/")
            if len(parts) == 2:
                fallback = fetch_readme_fallback(parts[0], parts[1])
                if fallback:
                    r["description"] = fallback
                    readme_count += 1
    if readme_count:
        print(f"  Added README fallback for {readme_count} repos", file=sys.stderr)

    # Weekly: repos created in last 7d (this week's new projects)
    print("Fetching weekly new repos...", file=sys.stderr)
    weekly = [repo_to_dict(r) for r in fetch_with_retry(fetch_repos, 7, 30)]

    # Monthly: repos created in last 30d (this month's new projects)
    print("Fetching monthly new repos...", file=sys.stderr)
    monthly = [repo_to_dict(r) for r in fetch_with_retry(fetch_repos, 30, 30)]

    # Compute star deltas
    daily = compute_deltas(daily, prev_stars)
    weekly = compute_deltas(weekly, prev_stars)
    monthly = compute_deltas(monthly, prev_stars)

    output = {
        "updated": now.isoformat(),
        "updated_date": now.strftime("%Y-%m-%d %H:%M UTC"),
        "daily": daily[:20],
        "weekly": weekly[:20],
        "monthly": monthly[:20],
    }

    with open("data.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    archive_data(output)
    generate_pulse_story(daily, weekly, monthly)

    deltas_daily = sum(1 for r in daily[:20] if r.get("delta", 0) > 0)
    deltas_weekly = sum(1 for r in weekly[:20] if r.get("delta", 0) > 0)
    print(f"Done: {len(daily)} daily ({deltas_daily} with delta), {len(weekly)} weekly ({deltas_weekly} with delta), {len(monthly)} monthly", file=sys.stderr)


def archive_data(data):
    """Save snapshot to archive directory for historical tracking."""
    if not os.path.exists(ARCHIVE_DIR):
        os.makedirs(ARCHIVE_DIR)
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    archive_file = os.path.join(ARCHIVE_DIR, f"data-{date_str}.json")
    with open(archive_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Archived to {archive_file}", file=sys.stderr)


def load_yesterday_data():
    """Load yesterday's archived data for trend comparison."""
    yesterday = (datetime.now(timezone.utc) - timedelta(days=1)).strftime("%Y-%m-%d")
    archive_file = os.path.join(ARCHIVE_DIR, f"data-{yesterday}.json")
    try:
        with open(archive_file, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return None


def compute_language_trends(daily, yesterday_data):
    """Compute language popularity changes vs yesterday."""
    if not yesterday_data:
        return []
    today_langs = {}
    yesterday_langs = {}
    for r in daily:
        lang = r.get("language")
        if lang and lang != "—":
            today_langs[lang] = today_langs.get(lang, 0) + 1
    for r in yesterday_data.get("daily", []):
        lang = r.get("language")
        if lang and lang != "—":
            yesterday_langs[lang] = yesterday_langs.get(lang, 0) + 1
    trends = []
    all_langs = set(today_langs.keys()) | set(yesterday_langs.keys())
    for lang in all_langs:
        today_count = today_langs.get(lang, 0)
        yesterday_count = yesterday_langs.get(lang, 0)
        change = today_count - yesterday_count
        if change != 0:
            trends.append({
                "language": lang,
                "today": today_count,
                "change": change,
                "direction": "up" if change > 0 else "down"
            })
    trends.sort(key=lambda x: abs(x["change"]), reverse=True)
    return trends[:5]


def generate_pulse_story(daily, weekly, monthly):
    """Generate pulse story data for the frontend."""
    yesterday_data = load_yesterday_data()
    lang_trends = compute_language_trends(daily, yesterday_data)
    top_repo = daily[0] if daily else None
    total_stars = sum(r.get("stars", 0) for r in daily[:10])
    rising_repos = [r for r in daily if r.get("delta", 0) > 100][:3]
    story = {
        "date": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "top_repo": {
            "name": top_repo["name"] if top_repo else None,
            "description": top_repo.get("description", "")[:100] if top_repo else "",
            "stars": top_repo.get("stars", 0) if top_repo else 0,
            "url": top_repo.get("url", "") if top_repo else ""
        } if top_repo else None,
        "hot_languages": lang_trends,
        "rising_stars": total_stars,
        "rising_repos": [
            {"name": r["name"], "delta": r.get("delta", 0), "url": r.get("url", "")}
            for r in rising_repos
        ] if rising_repos else None
    }
    story_file = os.path.join(ARCHIVE_DIR, "pulse-story.json")
    with open(story_file, "w", encoding="utf-8") as f:
        json.dump(story, f, ensure_ascii=False, indent=2)
    print(f"Generated pulse story", file=sys.stderr)

if __name__ == "__main__":
    main()
