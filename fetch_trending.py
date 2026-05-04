#!/usr/bin/env python3
"""
Fetch GitHub trending repos via GitHub Search API.
Outputs JSON data for the static site.
"""

import json
import urllib.request
import sys
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

def fetch_weekly_pushed(per_page=30):
    """Fetch repos with recent push, sorted by stars gained."""
    since_date = (datetime.now(timezone.utc) - timedelta(days=7)).strftime("%Y-%m-%d")
    url = (
        f"https://api.github.com/search/repositories"
        f"?q=pushed:>{since_date}&sort=stars&order=desc&per_page={per_page}"
    )
    try:
        data = make_request(url)
        return data.get("items", [])
    except Exception as e:
        print(f"Error fetching weekly: {e}", file=sys.stderr)
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

def main():
    now = datetime.now(timezone.utc)
    
    print("Fetching today's new repos...", file=sys.stderr)
    daily = [repo_to_dict(r) for r in fetch_repos(1, 30)]
    
    print("Fetching weekly hot repos...", file=sys.stderr)
    weekly = [repo_to_dict(r) for r in fetch_repos(7, 30)]
    
    print("Fetching monthly hot repos...", file=sys.stderr)
    monthly = [repo_to_dict(r) for r in fetch_repos(30, 30)]
    
    # Deduplicate: weekly/monthly exclude items already in daily/weekly
    daily_names = {r["name"] for r in daily}
    weekly_names = {r["name"] for r in weekly}
    
    weekly = [r for r in weekly if r["name"] not in daily_names]
    monthly = [r for r in monthly if r["name"] not in daily_names and r["name"] not in weekly_names]
    
    output = {
        "updated": now.isoformat(),
        "updated_date": now.strftime("%Y-%m-%d %H:%M UTC"),
        "daily": daily[:20],
        "weekly": weekly[:20],
        "monthly": monthly[:20],
    }
    
    with open("data.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"Done: {len(daily)} daily, {len(weekly)} weekly, {len(monthly)} monthly", file=sys.stderr)

if __name__ == "__main__":
    main()
