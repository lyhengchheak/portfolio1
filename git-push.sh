#!/usr/bin/env bash
set -e

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Ensure we are inside a git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo -e "${RED}Error: Not a git repository.${NC}"
  exit 1
fi

# Detect current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")

# Check if there are any changes (modified, deleted, or untracked)
if [ -z "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}ℹ️  No changes detected. Working directory is clean.${NC}"
  echo -e "Branch '${BRANCH}' is up to date."
  exit 0
fi

# Determine commit message
COMMIT_MSG="$*"

if [ -z "$COMMIT_MSG" ]; then
  # Interactive prompt if running in an interactive terminal
  if [ -t 0 ]; then
    echo -e "${BLUE}=== Git Auto Stage, Commit & Push ===${NC}"
    read -r -p "Enter commit message [Press Enter for default]: " USER_INPUT
    if [ -n "$USER_INPUT" ]; then
      COMMIT_MSG="$USER_INPUT"
    fi
  fi
fi

# Fallback to automated timestamped message
if [ -z "$COMMIT_MSG" ]; then
  TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
  COMMIT_MSG="Auto-update portfolio ($TIMESTAMP)"
fi

echo -e "${BLUE}==> [1/3] Staging changes (git add -A)...${NC}"
git add -A

echo -e "${BLUE}==> [2/3] Committing: \"${COMMIT_MSG}\"...${NC}"
git commit -m "$COMMIT_MSG"

echo -e "${BLUE}==> [3/3] Pushing to origin/${BRANCH}...${NC}"
git push origin "$BRANCH"

echo -e "${GREEN}✓ Successfully committed and pushed to origin/${BRANCH}!${NC}"
