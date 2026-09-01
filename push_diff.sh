--- push.sh (原始)
#!/usr/bin/env bash
# Delivall — commit everything and push to the empty GitHub repo.
# Usage: sh push.sh   (optional: sh push.sh "your commit message")
set -e
cd "$(dirname "$0")"

MSG="${1:-Delivall — live delivery tracker (web + mobile)}"

[ -d .git ] || git init -q
git add -A
git commit -m "$MSG" || echo "→ Nothing new to commit."
git branch -M main 2>/dev/null || true
# Force the SSH remote so your registered key (g-desktop) authenticates
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin git@github.com:gwaiffemark001/Delivall.git
else
  git remote add origin git@github.com:gwaiffemark001/Delivall.git
fi

# Optional sanity check: ssh -T git@github.com   (expects "successfully authenticated")
git push -u origin main

echo "✓ Committed and pushed → https://github.com/gwaiffemark001/Delivall"


+++ push.sh (修改后)
#!/bin/sh
# Delivall — commit everything, sync with GitHub, and push.
# Usage: sh push.sh              (default message)
#        sh push.sh "my message"
set -e
cd "$(dirname "$0")"

MSG="${1:-Delivall — live delivery tracker (web + mobile)}"
OWNER=gwaiffemark001
REPO=Delivall

# Pick auth: SSH if your registered key answers, HTTPS (PAT prompt) otherwise.
if ssh -T -o BatchMode=yes -o ConnectTimeout=5 git@github.com 2>&1 | grep -q "successfully authenticated"; then
  REMOTE_URL="git@github.com:$OWNER/$REPO.git"
  echo "Auth: SSH key"
else
  REMOTE_URL="https://github.com/$OWNER/$REPO.git"
  echo "Auth: HTTPS — git will prompt for username + personal access token"
fi

if [ ! -d .git ]; then
  git init -q
  git branch -M main
fi

git remote set-url origin "$REMOTE_URL" 2>/dev/null || git remote add origin "$REMOTE_URL"

git add -A
git commit -q -m "$MSG" 2>/dev/null || echo "Nothing new to commit locally."

# Incorporate anything already on GitHub (no-op when the repo is empty).
if git fetch origin main 2>/dev/null; then
  git pull --rebase --allow-unrelated-histories origin main
fi

git push -u origin main
echo "Done. Live at https://github.com/$OWNER/$REPO"
