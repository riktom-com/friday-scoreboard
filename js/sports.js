// sports.js — ESPN public-API integration for College FB, NFL, MLB, NBA
// Fetches recent + upcoming games for our teams. Refreshes every 60s while tab is visible.

(function() {
  'use strict';

  // Our teams of interest. ESPN team abbreviations (slug used in their API).
  const TEAMS = {
    cfb: [
      { slug: '61',  name: 'Georgia Bulldogs',   short: 'UGA',     emoji: '🐶', color: '#BA0C2F' },
      { slug: '57',  name: 'Florida Gators',     short: 'FLA',     emoji: '🐊', color: '#0021A5' },
    ],
    nfl: [
      { slug: 'atl', name: 'Atlanta Falcons',    short: 'ATL',     emoji: '🦅', color: '#A71930' },
    ],
    mlb: [
      { slug: 'atl', name: 'Atlanta Braves',     short: 'ATL',     emoji: '⚾', color: '#CE1141' },
    ],
    nba: [
      { slug: 'atl', name: 'Atlanta Hawks',      short: 'ATL',     emoji: '🏀', color: '#E03A3E' },
    ],
  };

  const SPORT_PATHS = {
    cfb: 'football/college-football',
    nfl: 'football/nfl',
    mlb: 'baseball/mlb',
    nba: 'basketball/nba',
  };

  // Cache to avoid hammering ESPN
  const cache = {};
  const REFRESH_MS = 60 * 1000;

  async function fetchTeamSchedule(sport, slug) {
    const path = SPORT_PATHS[sport];
    const url = `https://site.api.espn.com/apis/site/v2/sports/${path}/teams/${slug}/schedule`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`ESPN ${sport}/${slug}: HTTP ${resp.status}`);
    return resp.json();
  }

  function parseGame(event, ourTeamId) {
    const comp = (event.competitions || [])[0] || {};
    const competitors = comp.competitors || [];
    const home = competitors.find(c => c.homeAway === 'home') || competitors[0] || {};
    const away = competitors.find(c => c.homeAway === 'away') || competitors[1] || {};
    const status = (comp.status || {}).type || {};
    const date = event.date ? new Date(event.date) : null;

    return {
      id: event.id,
      date: date,
      dateStr: date ? date.toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
      }) : 'TBD',
      home: {
        id: home.id,
        name: (home.team || {}).displayName || 'TBD',
        abbr: (home.team || {}).abbreviation || '',
        logo: (home.team || {}).logo || '',
        score: home.score || '',
        winner: home.winner,
      },
      away: {
        id: away.id,
        name: (away.team || {}).displayName || 'TBD',
        abbr: (away.team || {}).abbreviation || '',
        logo: (away.team || {}).logo || '',
        score: away.score || '',
        winner: away.winner,
      },
      status: status.description || 'Scheduled',
      state: status.state || 'pre',  // pre / in / post
      detail: status.detail || '',
      shortDetail: status.shortDetail || '',
      venue: (comp.venue || {}).fullName || '',
      broadcast: ((comp.broadcasts || [])[0] || {}).names ? ((comp.broadcasts || [])[0].names || []).join('/') : '',
      ourTeamId: ourTeamId,
    };
  }

  function pickRelevantGames(events, ourTeamId) {
    // Find: 1 most recent completed game, plus next 3 upcoming/in-progress
    const now = new Date();
    const games = events.map(e => parseGame(e, ourTeamId)).filter(g => g.date);

    // Sort chronologically
    games.sort((a, b) => a.date - b.date);

    const completed = games.filter(g => g.state === 'post' && g.date < now);
    const live = games.filter(g => g.state === 'in');
    const upcoming = games.filter(g => g.state === 'pre' && g.date >= now);

    const result = [];
    // 1 most recent completed
    if (completed.length) result.push(completed[completed.length - 1]);
    // All live games
    result.push(...live);
    // Next 3 upcoming
    result.push(...upcoming.slice(0, 3));

    return result;
  }

  function renderGameCard(g, team) {
    const stateClass = g.state === 'in' ? 'live' : g.state === 'post' ? 'final' : 'upcoming';
    const stateLabel = g.state === 'in' ? '🔴 LIVE' : g.state === 'post' ? 'Final' : g.dateStr;
    const showScore = g.state === 'in' || g.state === 'post';

    const homeWin = g.home.winner === true;
    const awayWin = g.away.winner === true;

    return `
      <div class="game-card sport-card ${stateClass}">
        <div class="game-card-header">
          <span class="game-status">${stateLabel}</span>
          ${g.broadcast ? `<span class="game-broadcast">${escapeHtml(g.broadcast)}</span>` : ''}
        </div>
        <div class="game-teams">
          <div class="team-row ${awayWin ? 'winner' : ''}">
            ${g.away.logo ? `<img src="${g.away.logo}" alt="" class="team-logo">` : '<span class="team-logo-placeholder"></span>'}
            <span class="team-name">${escapeHtml(g.away.name)}</span>
            <span class="team-score">${showScore ? escapeHtml(g.away.score) : ''}</span>
          </div>
          <div class="team-row ${homeWin ? 'winner' : ''}">
            ${g.home.logo ? `<img src="${g.home.logo}" alt="" class="team-logo">` : '<span class="team-logo-placeholder"></span>'}
            <span class="team-name">${escapeHtml(g.home.name)}</span>
            <span class="team-score">${showScore ? escapeHtml(g.home.score) : ''}</span>
          </div>
        </div>
        ${g.state === 'in' && g.detail ? `<div class="game-detail">${escapeHtml(g.detail)}</div>` : ''}
        ${g.venue ? `<div class="game-venue">📍 ${escapeHtml(g.venue)}</div>` : ''}
      </div>
    `;
  }

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  async function loadSport(sport) {
    const teams = TEAMS[sport];
    if (!teams) return;

    const container = document.getElementById(`${sport}-games`);
    const updated = document.getElementById(`${sport}-updated`);
    if (!container) return;

    // Use cache if fresh
    const cacheEntry = cache[sport];
    if (cacheEntry && (Date.now() - cacheEntry.ts) < REFRESH_MS) {
      container.innerHTML = cacheEntry.html;
      if (updated) updated.textContent = new Date(cacheEntry.ts).toLocaleTimeString();
      return;
    }

    try {
      const allCards = [];
      for (const team of teams) {
        try {
          const data = await fetchTeamSchedule(sport, team.slug);
          const events = data.events || [];
          const relevant = pickRelevantGames(events, team.slug);
          for (const g of relevant) {
            allCards.push({ game: g, team: team });
          }
        } catch (e) {
          console.warn(`Failed to load ${sport}/${team.slug}:`, e);
        }
      }

      if (allCards.length === 0) {
        container.innerHTML = '<div class="empty-card">No games found. Check back during the season.</div>';
        return;
      }

      // Sort: live first, then upcoming by date, then most recent final
      allCards.sort((a, b) => {
        const stateOrder = { in: 0, pre: 1, post: 2 };
        const sa = stateOrder[a.game.state] || 3;
        const sb = stateOrder[b.game.state] || 3;
        if (sa !== sb) return sa - sb;
        return a.game.date - b.game.date;
      });

      const html = allCards.map(c => renderGameCard(c.game, c.team)).join('');
      container.innerHTML = html;
      cache[sport] = { html, ts: Date.now() };
      if (updated) updated.textContent = new Date().toLocaleTimeString();
    } catch (err) {
      console.error(`Sports loader error (${sport}):`, err);
      container.innerHTML = `<div class="error-card">Couldn't load scores right now. Try again in a moment.</div>`;
    }
  }

  // Auto-refresh active tab every 60s
  setInterval(() => {
    const activeTab = document.querySelector('.sport-tab.active');
    if (!activeTab) return;
    const sport = activeTab.dataset.sport;
    if (sport && sport !== 'friday' && TEAMS[sport]) {
      // Invalidate cache and reload
      delete cache[sport];
      loadSport(sport);
    }
  }, REFRESH_MS);

  // Public API
  window.SportsLoader = {
    load: loadSport,
    TEAMS: TEAMS,
  };
})();
