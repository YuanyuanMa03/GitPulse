#!/usr/bin/env python3
"""
Fetch GitHub trending repos via GitHub Search API.
Outputs JSON data for the static site.
"""

import json
import urllib.request
import sys
import time
import base64
import re
from datetime import datetime, timedelta, timezone

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

    deltas_daily = sum(1 for r in daily[:20] if r.get("delta", 0) > 0)
    deltas_weekly = sum(1 for r in weekly[:20] if r.get("delta", 0) > 0)
    print(f"Done: {len(daily)} daily ({deltas_daily} with delta), {len(weekly)} weekly ({deltas_weekly} with delta), {len(monthly)} monthly", file=sys.stderr)

if __name__ == "__main__":
    main()
