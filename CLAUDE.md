# Fern & Flint / L.O.S London — session notes

- **Advertise as "garden designers"**, not a generic landscaping studio — client instruction (2026-07-13). Keep the phrase in title/meta/schema/hero/footer.
- **They do NOT do hard landscaping** (no stone/paving/wall-building service). The "Hard Landscaping & Stone" tile was removed 2026-07-13 (main `d808081`) and replaced with "Garden Design Consultancy". Don't reintroduce hard landscaping as a listed service.
- **Do not reintroduce celebrity names.** The line naming Simon Cowell and Stormzy in the "Gardens the cameras find" section was removed on 2026-07-13 (commit `65abc1b` on main) at Samuel's request. It now reads "Household names in music and television — and the homes we'll never name." Keep it anonymous in all future copy and deploys.
- The live site deploys from the `gh-pages` branch (pre-built `dist`), custom domain loslondon.com. Always build from the latest `main` before deploying so the source fix above is included.
- Node is not on the system PATH; use `export PATH="$HOME/.local/node/bin:$PATH"` first. Redeploy: `npm run build`, copy `dist/index.html` → `dist/404.html`, push dist to gh-pages.
- Parallel Claude sessions work on this repo: stage named files only (never `git add -A`), and fetch before pushing — gh-pages has been force-pushed mid-session before.
