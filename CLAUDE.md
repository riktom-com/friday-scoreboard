# scoreboard — South Georgia & North Florida Sports

**Subdomain:** https://friday.riktom.com
**Stack:** Pure static HTML/CSS/JS + ESPN public API (browser fetch, no backend proxy)
**VPS path:** `/opt/friday-scoreboard/`
**nginx config:** `/etc/nginx/sites-available/friday.riktom.com`
**GitHub:** https://github.com/riktom-com/friday-scoreboard

## What It Does
Multi-sport scoreboard for the teams South Georgia and North Florida care about. One page, tab-switcher between sports.

**Sport tabs:**
- 🏈 **Friday Night** — South Georgia HS football (~45 schools, original feature)
- 🐊 **College FB** — UGA Bulldogs, Florida Gators (ESPN)
- 🦅 **NFL** — Atlanta Falcons (ESPN)
- ⚾ **MLB** — Atlanta Braves (ESPN)
- 🏀 **NBA** — Atlanta Hawks (ESPN)

## Architecture
- `index.html` — page with 5 tab panels, tab switcher persists choice in localStorage
- `js/app.js` — Friday Night logic (schools, schedule, map, weather alerts, ScoreStream links)
- `js/sports.js` — ESPN integration for the other 4 sports
- ESPN endpoint pattern: `https://site.api.espn.com/apis/site/v2/sports/{path}/teams/{slug}/schedule`
  - cfb path: `football/college-football`, team slugs: UGA=`61`, Florida=`57`
  - nfl path: `football/nfl`, team slug: `atl`
  - mlb path: `baseball/mlb`, team slug: `atl`
  - nba path: `basketball/nba`, team slug: `atl`
- Auto-refresh every 60s when a non-Friday tab is active

## Data sources
- **HS football:** mock schedule in `js/app.js` (replace each season with real GHSA slate)
- **Pro & college:** ESPN public API (CORS-enabled, no auth)
- **Weather alerts:** NWS api.weather.gov per stadium lat/lon

## Deploy
```bash
rsync -az --delete --exclude='.git' -e "ssh -i ~/.ssh/riktom_vps" \
  /Users/rickybrowning/Documents/Coding/riktom/friday-scoreboard/ \
  root@72.62.83.12:/opt/friday-scoreboard/
```

## Adding a team
Edit `TEAMS` in `js/sports.js`. Add an object to the appropriate sport array with `slug` (ESPN team ID), `name`, `short`, `emoji`, `color`. Look up team IDs at https://site.api.espn.com/apis/site/v2/sports/{path}/teams.
