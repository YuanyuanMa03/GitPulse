#!/usr/bin/env python3
"""
Fetch GitHub trending repos by scraping github.com/trending HTML.

This gives the SAME semantics as the official GitHub Trending page:
repos ranked by stars gained within a time window (daily/weekly/monthly),
NOT "newly created repos sorted by total stars".

Two-stage pipeline:
  Stage 1: scrape github.com/trending?since={period} HTML (zero API quota)
           → name, description, language, total_stars, stars_gained, forks
  Stage 2: call GET /repos/{owner}/{repo} for each repo (light quota)
           → topics, avatar, created_at, pushed_at, open_issues

Failure policy: if stage 1 yields nothing for a period, keep previous
data.json content for that period rather than writing empty data.
"""

import json
import urllib.request
import urllib.error
import sys
import os
import re
import time
from datetime import datetime, timezone

TRENDING_URL = "https://github.com/trending"
DATA_FILE = "data.json"
PERIODS = ("daily", "weekly", "monthly")
# How many repos per period to keep in data.json
TOP_N = 25
# Stage 2 enrichment: pause between API calls to be polite (seconds)
ENRICH_DELAY = 0.3


# ─── Stage 1: scrape trending HTML ───

def fetch_html(period):
    """Fetch the raw HTML of a GitHub Trending page. Returns '' on failure."""
    url = f"{TRENDING_URL}?since={period}"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (compatible; GitPulse/2.0; +https://github.com/YuanyuanMa03/GitPulse)",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
    })
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except Exception as e:
            print(f"  [scrape {period}] attempt {attempt+1}/3 failed: {e}", file=sys.stderr)
            if attempt < 2:
                time.sleep(2 ** attempt)
    return ""


def parse_trending(html):
    """Parse a trending page's HTML into a list of repo dicts.

    Fields from HTML: name, description, language, stars (total),
    stars_gained (within period), forks.
    """
    repos = []
    # Each repo is an <article class="Box-row">…</article>
    articles = re.findall(r'<article class="Box-row">(.*?)</article>', html, re.S)
    for article in articles:
        repo = {}

        # name: <h2 …><a href="/owner/repo">
        m = re.search(r'<h2[^>]*>\s*<a[^>]*href="/([^/]+/[^"]+)"', article)
        if not m:
            continue
        repo["name"] = m.group(1).strip()

        # description: <p class="col-9…">…</p>
        m = re.search(r'<p class="col-9[^"]*"[^>]*>(.*?)</p>', article, re.S)
        if m:
            desc = re.sub(r'<[^>]+>', '', m.group(1)).strip()
            desc = re.sub(r'\s+', ' ', desc)
            repo["description"] = desc
        else:
            repo["description"] = ""

        # language: itemprop="programmingLanguage">Name<
        m = re.search(r'itemprop="programmingLanguage">([^<]+)<', article)
        repo["language"] = m.group(1).strip() if m else ""

        # total stars: link to /stargazers, take its visible number
        repo["stars"] = _link_count(article, "stargazers")

        # forks: link to /forks, take its visible number
        repo["forks"] = _link_count(article, "forks")

        # stars gained this period: "N stars today|this week|this month"
        m = re.search(r'([\d,]+)\s*stars\s*(today|this week|this month)', article)
        repo["stars_gained"] = int(m.group(1).replace(",", "")) if m else 0
        repo["period_label"] = m.group(2) if m else ""

        repos.append(repo)
    return repos


def _link_count(article, suffix):
    """Extract the integer shown inside a /…/stargazers or /…/forks link."""
    m = re.search(rf'href="/[^"]+/{suffix}"[^>]*>(.*?)</a>', article, re.S)
    if not m:
        return 0
    txt = re.sub(r'<[^>]+>', '', m.group(1)).replace(",", "").strip()
    try:
        return int(txt)
    except ValueError:
        return 0


# ─── Stage 2: enrich via REST API ───

def api_request(path):
    """Call GitHub REST API; returns parsed JSON or None on failure."""
    url = f"https://api.github.com{path}"
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "GitPulse/2.0",
    }
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return json.loads(resp.read().decode())
    except (urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError) as e:
        return None


def enrich_repo(repo):
    """Fill in topics, avatar, created, pushed, open_issues, url via REST API."""
    parts = repo["name"].split("/")
    if len(parts) < 2:
        return repo
    owner, name = parts[0], parts[1]
    data = api_request(f"/repos/{owner}/{name}")
    if not data:
        # graceful defaults so the front end still renders
        repo.setdefault("topics", [])
        repo.setdefault("avatar", "")
        repo.setdefault("created", "")
        repo.setdefault("pushed", "")
        repo.setdefault("open_issues", repo.get("forks", 0))
        repo.setdefault("url", f"https://github.com/{repo['name']}")
        return repo

    repo["topics"] = data.get("topics", [])
    repo["avatar"] = (data.get("owner") or {}).get("avatar_url", "")
    repo["created"] = (data.get("created_at") or "")[:10]
    repo["pushed"] = (data.get("pushed_at") or "")[:10]
    repo["open_issues"] = data.get("open_issues_count", 0)
    repo["url"] = data.get("html_url", f"https://github.com/{repo['name']}")
    # Trust API total counts if scraping missed them
    if not repo.get("stars"):
        repo["stars"] = data.get("stargazers_count", 0)
    if not repo.get("forks"):
        repo["forks"] = data.get("forks_count", 0)
    return repo


# ─── Persistence & failure policy ───

def load_previous():
    """Load previous data.json to fall back on if a period scrape fails."""
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def main():
    now = datetime.now(timezone.utc)
    prev = load_previous()
    output = {
        "updated": now.isoformat(),
        "updated_date": now.strftime("%Y-%m-%d %H:%M UTC"),
    }

    for period in PERIODS:
        print(f"[{period}] scraping github.com/trending?since={period} ...", file=sys.stderr)
        html = fetch_html(period)
        repos = parse_trending(html) if html else []

        if not repos:
            # Failure: keep previous period data instead of writing empty
            print(f"  [{period}] scrape yielded nothing; keeping previous data", file=sys.stderr)
            output[period] = prev.get(period, [])
            continue

        repos = repos[:TOP_N]

        # Stage 2: enrich each repo
        print(f"  [{period}] enriching {len(repos)} repos via REST API ...", file=sys.stderr)
        enriched = []
        for r in repos:
            enriched.append(enrich_repo(r))
            time.sleep(ENRICH_DELAY)

        output[period] = enriched
        top_gain = max((r.get("stars_gained", 0) for r in enriched), default=0)
        print(f"  [{period}] done: {len(enriched)} repos, top gain +{top_gain}", file=sys.stderr)

    # Atomic-ish write: only write if at least one period has data
    if any(output.get(p) for p in PERIODS):
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)
        print(f"\nWrote {DATA_FILE}: " +
              ", ".join(f"{p}={len(output.get(p, []))}" for p in PERIODS),
              file=sys.stderr)
    else:
        print("\nAll periods empty — data.json NOT overwritten.", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
