# friday-scoreboard — South Georgia Friday Night Scoreboard

**Subdomain:** https://friday.riktom.com
**Stack:** Pure static HTML/CSS/JS — no backend
**VPS path:** `/opt/friday-scoreboard/`
**nginx config:** `/etc/nginx/sites-available/friday.riktom.com`
**GitHub:** https://github.com/riktom-com/friday-scoreboard

## What It Does
Lightweight high school football scoreboard for ~45 South Georgia schools. Stripped of MaxPreps bloat — no video players, no tracking pixels, no autoplay. Loads instantly on stadium cellular.

## Features
- Pre-game cards: kickoff time, home/away, stadium, mascot helmets
- NWS weather alerts per stadium — amber "Weather Delay Risk" badge for thunderstorm/tornado warnings
- 📍 Directions to stadium (Google Maps deep link)
- 📻 Radio live-stream links for Big 4 broadcasts (Talk 92.1, Rock 105.9, WMTM, etc.)
- 📊 Live Score button opens the team's ScoreStream page (their crowdsourced live data)
- Find My Location → nearest 5 schools
- Filter chips: Big 3/4 / Region 1-AA / Inland / Coastal / Neighboring
- Optional Leaflet map view with stadium markers

## Data
- `SCHOOLS` array in `js/app.js` — ~45 schools with mascot, stadium, lat/lon, radio, ScoreStream URLs
- `SCHEDULE` array in `js/app.js` — mock weekly matchups (replace with real GHSA schedule before each season)

## Deploy
rsync -az --delete --exclude='.git' -e "ssh -i ~/.ssh/riktom_vps" /tmp/friday-scoreboard/ root@72.62.83.12:/opt/friday-scoreboard/
