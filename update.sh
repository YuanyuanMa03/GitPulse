#!/bin/bash
# GitHub Trending Daily — auto update
cd "$(dirname "$0")"
python3 fetch_trending.py
echo "[$(date)] Updated"
