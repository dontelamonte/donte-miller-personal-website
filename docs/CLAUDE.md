# Personal website — working rules

Applies to all work in `personal-website/` (planning docs and the `prototype/` source repository).

## Before starting

1. Read `HANDOFF.md` (Current status, Exact next action, latest Change log entries), then `prototype/README.md`.
2. Run `git -C prototype status -sb` and `git -C prototype fetch`. If the working tree has changes the handoff does not describe, record them in the handoff before building on them.

## Record every change in the handoff (required)

Every work session that changes source, plans, assets or deployment state ends with a `HANDOFF.md` update — and longer sessions update it at each milestone, not only at the end. Each entry must include:

- Date (America/New_York) and version number / cache identifier (e.g. `environment-31`).
- What changed and why, naming the files touched.
- Checks run and their actual results (`npm run check`, `npm test` count, `git diff --check`, browser QA performed). State plainly what was **not** verified (physical devices, live site, visual QA).
- Git: branch, commit SHA, and whether it was pushed.
- Deployment: deployed or not; if deployed, saved version and deployment IDs. Never imply a deploy that did not happen.
- The exact next action.

Also keep the top **Current status** block and the **Exact next action** section in sync with the newest entry — they must never describe an older version than the change log. Never store credentials, tokens or secrets in the handoff.

## Sync to GitHub (required)

Remote: `https://github.com/dontelamonte/donte-miller-personal-website` (public).

- `main` always equals the source of the **live deployed** site.
- Work that is not yet deployed is committed and pushed to a version branch (e.g. `v31-environment`); merge it into `main` when it is deployed.
- Run `npm run check`, `npm test` and `git diff --check` in `prototype/` before every commit. Do not push failing work to `main`.
- Write descriptive commit messages (what changed), not "Update Site source".
- After pushing, record the branch and SHA in the handoff (see above).

### Docs mirror

The planning docs are mirrored into the repo's `docs/` folder (public). The copies in this folder stay canonical — edit these, never `prototype/docs/`.

- After every handoff update, run `sh prototype/scripts/sync-docs.sh`, then commit `docs/` and push to `main`. `docs/` is outside the deployed `dist/` directory, so doc commits on `main` don't change the live site.
- Mirrored: `HANDOFF.md`, `CLAUDE.md`, `build-plan.md`, `camera-storyboard.md`, `environment-audit.md`, `reference-manifest.csv`, `../personal-website-strategy.md`. Images, research snapshots and workbooks are not mirrored.
- The repo is public: never put private or sensitive personal details in these docs.

## Deployment note

The live site (`https://donte-miller-table-study.creamhero2050.chatgpt.site`, project `appgprj_6ae15bcc240481919bd78aed4965cba4`) is published through the ChatGPT Sites tool, which Claude Code cannot run. When Claude Code does the work, push to GitHub, record it as "not deployed" in the handoff, and tell Donte a Sites publish is still needed.
