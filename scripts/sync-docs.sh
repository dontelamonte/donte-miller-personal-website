#!/bin/sh
# Copy the planning docs (canonical copies live one folder up) into docs/.
# Run before committing; docs/ is a mirror, so edit the originals, not these copies.
set -e
repo=$(cd "$(dirname "$0")/.." && pwd)
src=$(dirname "$repo")
mkdir -p "$repo/docs"
for f in HANDOFF.md CLAUDE.md build-plan.md camera-storyboard.md environment-audit.md reference-manifest.csv; do
 cp "$src/$f" "$repo/docs/$f"
done
cp "$src/../personal-website-strategy.md" "$repo/docs/personal-website-strategy.md"
echo "Synced docs into $repo/docs"
