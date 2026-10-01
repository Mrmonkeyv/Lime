// Unblocked Arcade - Core Client Application
// Storing each game as an Iframe in a JSON file

const DEFAULT_GAMES = [
  {
    "id": "2048",
    "title": "2048 Classic",
    "category": "Puzzle",
    "description": "Slide matching numbered tiles across the 4x4 grid and merge them to build the legendary 2048 tile.",
    "controls": "Arrow keys, WASD, or swipe to slide tiles",
    "rating": 4.9,
    "plays": "142.8K",
    "featured": true,
    "themeColor": "#f59e0b",
    "accentColor": "#f59e0b",
    "iframeUrl": "./games/2048/index.html",
    "iframeHtml": "<iframe src=\"./games/2048/index.html\" title=\"2048 Classic\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=\"true\" loading=\"lazy\"></iframe>"
  },
  {
    "id": "tetris",
    "title": "Tetris Classic",
    "category": "Arcade",
    "description": "Rotate and maneuver falling tetromino blocks to complete solid horizontal lines and prevent board overflow.",
    "controls": "Arrow keys to move/rotate, Space for hard drop, C to hold piece",
    "rating": 4.9,
    "plays": "218.4K",
    "featured": true,
    "themeColor": "#38bdf8",
    "accentColor": "#38bdf8",
    "iframeUrl": "./games/tetris/index.html",
    "iframeHtml": "<iframe src=\"./games/tetris/index.html\" title=\"Tetris Classic\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=\"true\" loading=\"lazy\"></iframe>"
  },
  {
    "id": "snake",
    "title": "Retro Snake",
    "category": "Retro",
    "description": "Guide the hungry neon serpent around the arena, eating energy pellets to grow longer without biting your own tail.",
    "controls": "Arrow keys or WASD to navigate, Space to start",
    "rating": 4.8,
    "plays": "96.1K",
    "featured": true,
    "themeColor": "#10b981",
    "accentColor": "#10b981",
    "iframeUrl": "./games/snake/index.html",
    "iframeHtml": "<iframe src=\"./games/snake/index.html\" title=\"Retro Snake\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=\"true\" loading=\"lazy\"></iframe>"
  },
  {
    "id": "breakout",
    "title": "Brick Breaker Neon",
    "category": "Arcade",
    "description": "Launch the power sphere and maneuver your paddle to shatter colored neon brick formations without dropping the ball.",
    "controls": "Move mouse, touch, or use Arrow keys / A-D",
    "rating": 4.7,
    "plays": "78.3K",
    "featured": false,
    "themeColor": "#06b6d4",
    "accentColor": "#06b6d4",
    "iframeUrl": "./games/breakout/index.html",
    "iframeHtml": "<iframe src=\"./games/breakout/index.html\" title=\"Brick Breaker Neon\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=\"true\" loading=\"lazy\"></iframe>"
  },
  {
    "id": "space-invaders",
    "title": "Galaxy Invaders",
    "category": "Action",
    "description": "Defend humanity from waves of alien warships descending through deep space. Duck behind bunkers and blast enemy cruisers.",
    "controls": "Arrow keys or A/D to steer, Space to fire cannon",
    "rating": 4.8,
    "plays": "115.0K",
    "featured": true,
    "themeColor": "#a855f7",
    "accentColor": "#a855f7",
    "iframeUrl": "./games/space-invaders/index.html",
    "iframeHtml": "<iframe src=\"./games/space-invaders/index.html\" title=\"Galaxy Invaders\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=\"true\" loading=\"lazy\"></iframe>"
  },
  {
    "id": "flappy",
    "title": "Flappy Wings",
    "category": "Action",
    "description": "Tap or press space to flap wings and navigate through tight corridors of vertical obstacles. Test your timing and nerves.",
    "controls": "Click, tap screen, or press Space / Up arrow to flap",
    "rating": 4.6,
    "plays": "89.2K",
    "featured": false,
    "themeColor": "#facc15",
    "accentColor": "#facc15",
    "iframeUrl": "./games/flappy/index.html",
    "iframeHtml": "<iframe src=\"./games/flappy/index.html\" title=\"Flappy Wings\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=\"true\" loading=\"lazy\"></iframe>"
  },
  {
    "id": "dino",
    "title": "Dino Desert Runner",
    "category": "Retro",
    "description": "Sprint endlessly through prehistoric desert dunes. Leap over prickly cacti and duck beneath swooping pterodactyls.",
    "controls": "Space / Up arrow to jump, Down arrow to duck",
    "rating": 4.8,
    "plays": "164.5K",
    "featured": true,
    "themeColor": "#f97316",
    "accentColor": "#f97316",
    "iframeUrl": "./games/dino/index.html",
    "iframeHtml": "<iframe src=\"./games/dino/index.html\" title=\"Dino Desert Runner\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=\"true\" loading=\"lazy\"></iframe>"
  },
  {
    "id": "pong",
    "title": "Pong 1972",
    "category": "Retro",
    "description": "The quintessential arcade duel. Rally the ball past your opponent's paddle in Single Player vs CPU or Local 2-Player duel.",
    "controls": "P1: W/S or Mouse; P2: Up/Down arrows",
    "rating": 4.7,
    "plays": "54.0K",
    "featured": false,
    "themeColor": "#60a5fa",
    "accentColor": "#60a5fa",
    "iframeUrl": "./games/pong/index.html",
    "iframeHtml": "<iframe src=\"./games/pong/index.html\" title=\"Pong 1972\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=\"true\" loading=\"lazy\"></iframe>"
  },
  {
    "id": "minesweeper",
    "title": "Minesweeper Retro",
    "category": "Puzzle",
    "description": "Deduce mine locations using neighboring numeric hints. Clear all safe squares without triggering any hidden explosives.",
    "controls": "Left click to uncover, Right click to flag, or use Flag Toggle",
    "rating": 4.8,
    "plays": "62.7K",
    "featured": false,
    "themeColor": "#f43f5e",
    "accentColor": "#f43f5e",
    "iframeUrl": "./games/minesweeper/index.html",
    "iframeHtml": "<iframe src=\"./games/minesweeper/index.html\" title=\"Minesweeper Retro\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=\"true\" loading=\"lazy\"></iframe>"
  },
  {
    "id": "hextris",
    "title": "Hex Match Arcade",
    "category": "Puzzle",
    "description": "Spin the center hexagonal core to catch incoming colored blocks. Align 3 of the same color to detonate combos before you overflow.",
    "controls": "Left / Right arrows or on-screen buttons to rotate",
    "rating": 4.7,
    "plays": "43.1K",
    "featured": false,
    "themeColor": "#e879f9",
    "accentColor": "#e879f9",
    "iframeUrl": "./games/hextris/index.html",
    "iframeHtml": "<iframe src=\"./games/hextris/index.html\" title=\"Hex Match Arcade\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=\"true\" loading=\"lazy\"></iframe>"
  }
];

// State
let games = [];
let favorites = [];
let activeGame = null;
let currentCategory = 'all';
let searchQuery = '';
let sortBy = 'popular';
let isTheater = false;
let isPanicMode = false;

// Initialization
function initApp() {
  // Load favorites
  try {
    const savedFavs = localStorage.getItem('unblocked_arcade_favs');
    favorites = savedFavs ? JSON.parse(savedFavs) : ['2048', 'tetris'];
  } catch (e) {
    favorites = ['2048', 'tetris'];
  }

  // Load games from localStorage or fetch games.json or use embedded defaults
  try {
    const savedGames = localStorage.getItem('unblocked_arcade_games');
    if (savedGames) {
      games = JSON.parse(savedGames);
      render();
      return;
    }
  } catch (e) {}

  // Fetch games.json with fallback
  fetch('./games.json')
    .then(res => {
      if (!res.ok) throw new Error('Not found');
      return res.json();
    })
    .then(data => {
      games = Array.isArray(data) && data.length > 0 ? data : DEFAULT_GAMES;
      render();
    })
    .catch(() => {
      games = DEFAULT_GAMES;
      render();
    });

  // Global key listener for Boss / Panic key (Esc)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      togglePanicMode();
    }
  });
}

function saveGames() {
  try {
    localStorage.setItem('unblocked_arcade_games', JSON.stringify(games));
  } catch (e) {}
}

function saveFavorites() {
  try {
    localStorage.setItem('unblocked_arcade_favs', JSON.stringify(favorites));
  } catch (e) {}
}

function toggleFavorite(id, e) {
  if (e) e.stopPropagation();
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites();
  render();
}

function togglePanicMode() {
  isPanicMode = !isPanicMode;
  render();
}

// Filtered Games
function getFilteredGames() {
  return games.filter(game => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      game.title.toLowerCase().includes(q) ||
      game.category.toLowerCase().includes(q) ||
      game.description.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (currentCategory === 'all') return true;
    if (currentCategory === 'featured') return !!game.featured;
    if (currentCategory === 'favorites') return favorites.includes(game.id);
    if (currentCategory === 'custom') return !!game.custom;
    return game.category.toLowerCase() === currentCategory.toLowerCase();
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'alpha') return a.title.localeCompare(b.title);
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });
}

// RENDER FUNCTION
function render() {
  const root = document.getElementById('root');
  if (!root) return;

  if (isPanicMode) {
    root.innerHTML = renderPanicScreen();
    return;
  }

  const filtered = getFilteredGames();
  const heroGame = games.find(g => g.featured) || games[0];

  root.innerHTML = `
    <!-- Header -->
    <header class="site-header">
      <div class="header-container">
        <button class="brand-btn" onclick="setCategory('all'); selectGame(null);">
          <div class="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="2"></rect></svg>
          </div>
          <span class="brand-name font-display">UNBLOCKED ARCADE</span>
        </button>

        <nav class="nav-links">
          <button class="nav-link ${currentCategory === 'all' && !activeGame ? 'active' : ''}" onclick="setCategory('all'); selectGame(null);">Catalog</button>
          <button class="nav-link ${currentCategory === 'featured' ? 'active' : ''}" onclick="setCategory('featured'); selectGame(null);">Featured</button>
          <button class="nav-link ${currentCategory === 'puzzle' ? 'active' : ''}" onclick="setCategory('puzzle'); selectGame(null);">Puzzles</button>
          <button class="nav-link ${currentCategory === 'arcade' ? 'active' : ''}" onclick="setCategory('arcade'); selectGame(null);">Arcade</button>
          <button class="nav-link ${currentCategory === 'favorites' ? 'active' : ''}" onclick="setCategory('favorites'); selectGame(null);">
            Favorites ${favorites.length > 0 ? `(${favorites.length})` : ''}
          </button>
          <button class="nav-link" onclick="openJsonModal();" title="Inspect stored games.json and iframe definitions">
            Games JSON
          </button>
        </nav>

        <div class="header-actions">
          <button class="btn-disguise" onclick="togglePanicMode();" title="Press Esc to disguise page">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span>Disguise (Esc)</span>
          </button>
          <button class="btn-add font-display" onclick="openAddModal();">
            <span>+ Add Iframe Game</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main style="flex: 1;">
      ${activeGame ? renderPlayer(activeGame) : renderCatalog(filtered, heroGame)}
    </main>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-container">
        <div>
          <strong style="color: #cbd5e1;" class="font-display">UNBLOCKED ARCADE</strong> · Stored as Iframes in games.json
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <a href="javascript:void(0)" onclick="openJsonModal();" style="color: var(--accent-sky); text-decoration: none;">Inspect JSON Data</a>
          <span>·</span>
          <a href="javascript:void(0)" onclick="openAddModal();" style="color: var(--accent-emerald); text-decoration: none;">+ Add Game</a>
          <span>·</span>
          <a href="javascript:void(0)" onclick="togglePanicMode();" style="color: var(--text-muted); text-decoration: none;">Disguise (Esc)</a>
        </div>
      </div>
    </footer>

    <!-- Modals Container -->
    <div id="modal-container"></div>
  `;
}

// Catalog View HTML
function renderCatalog(filtered, heroGame) {
  return `
    ${heroGame && currentCategory === 'all' && !searchQuery ? `
      <!-- Hero Spotlight -->
      <section class="hero-spotlight">
        <div class="hero-container">
          <div>
            <div class="hero-meta">
              <span style="color: var(--accent-emerald); font-weight: 600;">Today's Spotlight</span>
              <span>·</span>
              <span>${heroGame.category}</span>
              <span>·</span>
              <span>★ ${heroGame.rating.toFixed(1)}</span>
              <span>·</span>
              <span>${heroGame.plays} plays</span>
            </div>
            <h1 class="hero-title font-display">${heroGame.title}</h1>
            <p class="hero-desc">${heroGame.description}</p>
            <div class="hero-actions">
              <button class="btn-primary font-display" onclick="selectGame('${heroGame.id}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Play ${heroGame.title}</span>
              </button>
              <button class="btn-secondary" onclick="pickRandomGame()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
                <span>Random Game</span>
              </button>
              <button class="btn-secondary" onclick="openJsonModal()">
                <span>View games.json (${games.length})</span>
              </button>
            </div>
          </div>
          <div class="hero-preview-card" onclick="selectGame('${heroGame.id}')">
            <div class="hero-emblem font-display">
              ${heroGame.title.slice(0, 2).toUpperCase()}
            </div>
            <div style="font-size: 1.1rem; font-weight: 700; color: #fff;" class="font-display">${heroGame.title}</div>
            <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">Click to launch embedded iframe</div>
          </div>
        </div>
      </section>
    ` : ''}

    <!-- Catalog Section -->
    <section class="catalog-section">
      <div class="catalog-toolbar">
        <div class="search-wrapper">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            class="search-input"
            placeholder="Search unblocked games..."
            value="${searchQuery}"
            oninput="handleSearch(this.value)"
          />
          ${searchQuery ? `<button class="search-clear" onclick="handleSearch('')">Clear</button>` : ''}
        </div>

        <div class="toolbar-stats">
          <span>Showing ${filtered.length} of ${games.length} games</span>
          <select class="sort-select" onchange="handleSort(this.value)">
            <option value="popular" ${sortBy === 'popular' ? 'selected' : ''}>Most Popular</option>
            <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Top Rated</option>
            <option value="alpha" ${sortBy === 'alpha' ? 'selected' : ''}>Alphabetical</option>
          </select>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="category-tabs">
        ${[
          { id: 'all', label: 'All Games' },
          { id: 'featured', label: 'Featured' },
          { id: 'puzzle', label: 'Puzzles' },
          { id: 'arcade', label: 'Arcade' },
          { id: 'action', label: 'Action' },
          { id: 'retro', label: 'Retro' },
          { id: 'favorites', label: `Favorites (${favorites.length})` },
          { id: 'custom', label: 'Custom Iframes' }
        ].map(cat => `
          <button
            class="tab-btn ${currentCategory === cat.id ? 'active' : ''}"
            onclick="setCategory('${cat.id}')"
          >
            ${cat.label}
          </button>
        `).join('')}
      </div>

      <!-- Games Grid -->
      ${filtered.length > 0 ? `
        <div class="games-grid">
          ${filtered.map(game => renderGameCard(game)).join('')}
        </div>
      ` : `
        <div style="text-align: center; padding: 4rem 1rem; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; margin-top: 1rem;">
          <h3 class="font-display" style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">No games found</h3>
          <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1.5rem;">Try adjusting your search query or switching categories.</p>
          <button class="btn-primary" onclick="handleSearch(''); setCategory('all');">Reset Filters</button>
        </div>
      `}
    </section>
  `;
}

// Game Card HTML
function renderGameCard(game) {
  const isFav = favorites.includes(game.id);
  return `
    <div class="game-card" onclick="selectGame('${game.id}')">
      <div class="card-banner" style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.9));">
        <button
          class="card-fav-btn ${isFav ? 'active' : ''}"
          onclick="toggleFavorite('${game.id}', event)"
          title="${isFav ? 'Remove favorite' : 'Add favorite'}"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>

        ${game.custom ? `<div class="card-badge badge-custom">Custom</div>` : ''}
        ${!game.custom && game.featured ? `<div class="card-badge badge-featured">Featured</div>` : ''}

        <div class="card-emblem font-display" style="background: ${game.accentColor || '#38bdf8'};">
          ${game.title.slice(0, 2).toUpperCase()}
        </div>
        <div style="font-size: 0.875rem; font-weight: 700; color: #fff;" class="font-display">${game.title}</div>

        <div class="card-hover-overlay">
          <div class="card-hover-pill font-display">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Play Now</span>
          </div>
        </div>
      </div>

      <div class="card-body">
        <div>
          <div class="card-meta">
            <span style="color: var(--accent-emerald);">${game.category}</span>
            <span>·</span>
            <span style="color: var(--accent-amber);">★ ${Number(game.rating).toFixed(1)}</span>
            <span>·</span>
            <span>${game.plays} plays</span>
          </div>
          <div class="card-title font-display">${game.title}</div>
          <div class="card-desc">${game.description}</div>
        </div>
        <div class="card-footer">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 170px;">${game.controls}</span>
          <span style="font-family: monospace; color: var(--accent-sky);">iframe</span>
        </div>
      </div>
    </div>
  `;
}

// Player Stage HTML
function renderPlayer(game) {
  const isFav = favorites.includes(game.id);
  const otherGames = games.filter(g => g.id !== game.id).slice(0, 4);

  return `
    <div class="stage-section ${isTheater ? 'theater' : ''}">
      <div class="stage-toolbar">
        <button class="stage-btn" onclick="selectGame(null)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span>Back to Catalog</span>
        </button>

        <div class="stage-controls-right">
          <button class="stage-btn" onclick="reloadIframe()" title="Reload Frame">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
          </button>
          <button class="stage-btn ${isTheater ? 'active' : ''}" onclick="toggleTheater()" title="Toggle Theater Mode">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
          </button>
          <button class="stage-btn" onclick="toggleFullscreen()" title="Fullscreen">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
          </button>
          <button class="stage-btn" onclick="openAboutBlank('${game.iframeUrl}')" title="Stealth About:Blank Cloaker">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </button>
          <button class="stage-btn ${isFav ? 'active-fav' : ''}" onclick="toggleFavorite('${game.id}')" title="Favorite">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <button class="stage-btn" onclick="openJsonModal()" title="View Stored JSON">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </button>
        </div>
      </div>

      <div class="stage-frame-container" id="game-stage-container">
        <iframe
          id="active-game-iframe"
          class="stage-frame"
          src="${game.iframeUrl}"
          title="${game.title}"
          allow="fullscreen; autoplay; gamepad; keyboard-map"
          allowfullscreen
        ></iframe>
      </div>

      <div class="stage-details">
        <div>
          <div class="details-box">
            <div style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 600; margin-bottom: 4px;">
              ${game.category} · ★ ${Number(game.rating).toFixed(1)} · ${game.plays} plays
            </div>
            <h1 class="details-title font-display">${game.title}</h1>
            <p class="details-desc">${game.description}</p>
          </div>

          <div class="details-box" style="margin-top: 1rem;">
            <div style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">
              Controls
            </div>
            <div style="font-family: monospace; color: var(--accent-emerald); font-size: 0.875rem;">
              ${game.controls}
            </div>
          </div>
        </div>

        <div>
          <div class="details-box">
            <div style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 8px;">
              More Games
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${otherGames.map(og => `
                <div
                  onclick="selectGame('${og.id}')"
                  style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: rgba(9, 13, 22, 0.6); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer;"
                >
                  <div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: #fff;">${og.title}</div>
                    <div style="font-size: 0.6875rem; color: var(--text-dim);">${og.category} · ★ ${og.rating.toFixed(1)}</div>
                  </div>
                  <span style="font-size: 0.75rem; color: var(--accent-emerald);">Play →</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Panic Disguise Screen HTML
function renderPanicScreen() {
  return `
    <div class="panic-screen">
      <div style="max-width: 800px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 1rem; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 32px; height: 32px; background: #2563eb; color: #fff; font-weight: bold; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: sans-serif;">D</div>
            <div>
              <h2 style="font-size: 1rem; font-weight: bold; font-family: sans-serif; color: #0f172a;">Bio 101: Cellular Respiration and Glycolysis Notes</h2>
              <p style="font-size: 0.75rem; font-family: sans-serif; color: #64748b;">File · Edit · View · Insert · Format · Tools · Saved to Drive</p>
            </div>
          </div>
          <button onclick="togglePanicMode()" style="padding: 6px 12px; font-size: 0.75rem; font-family: sans-serif; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 6px; cursor: pointer;">
            Resume Arcade (Esc)
          </button>
        </div>

        <article style="line-height: 1.8; color: #334155; font-size: 0.95rem;">
          <h1 style="font-size: 1.5rem; font-weight: bold; color: #0f172a; margin-bottom: 1rem; font-family: sans-serif;">
            Section 4: The Electron Transport Chain and ATP Yield
          </h1>
          <p style="margin-bottom: 1rem;">
            Cellular respiration is the biochemical process in which cells generate energy from organic molecules.
            Glucose undergoes a series of enzyme-catalyzed steps: glycolysis in the cytosol, followed by the Krebs cycle
            and oxidative phosphorylation inside the mitochondrial matrix.
          </p>
          <div style="padding: 1rem; background: #f1f5f9; border-left: 4px solid #2563eb; margin: 1.5rem 0; font-family: monospace; font-size: 0.85rem;">
            C6H12O6 + 6 O2 + 32 ADP + 32 Pi → 6 CO2 + 6 H2O + 32 ATP
          </div>
          <p>
            The oxidation of NADH and FADH2 transfers electrons through protein complexes I–IV, creating a proton gradient
            across the inner mitochondrial membrane that powers ATP synthase.
          </p>
        </article>
      </div>
    </div>
  `;
}

// Interactive handlers
window.setCategory = function(cat) {
  currentCategory = cat;
  render();
};

window.handleSearch = function(val) {
  searchQuery = val;
  render();
};

window.handleSort = function(val) {
  sortBy = val;
  render();
};

window.selectGame = function(id) {
  activeGame = id ? games.find(g => g.id === id) : null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
};

window.pickRandomGame = function() {
  if (games.length === 0) return;
  const rand = games[Math.floor(Math.random() * games.length)];
  selectGame(rand.id);
};

window.reloadIframe = function() {
  const iframe = document.getElementById('active-game-iframe');
  if (iframe) iframe.src = iframe.src;
};

window.toggleTheater = function() {
  isTheater = !isTheater;
  render();
};

window.toggleFullscreen = function() {
  const container = document.getElementById('game-stage-container');
  if (!container) return;
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
};

window.openAboutBlank = function(url) {
  const win = window.open('about:blank', '_blank');
  if (!win) return;
  const fullUrl = new URL(url, window.location.href).href;
  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Google Drive - My Drive</title>
        <style>body,html{margin:0;padding:0;height:100%;overflow:hidden;background:#000;}iframe{width:100%;height:100%;border:none;}</style>
      </head>
      <body>
        <iframe src="${fullUrl}" allowfullscreen></iframe>
      </body>
    </html>
  `);
  win.document.close();
};

// MODALS
window.openAddModal = function() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;
  modalContainer.innerHTML = `
    <div class="modal-backdrop" onclick="if(event.target === this) closeModals();">
      <div class="modal-card">
        <div class="modal-header">
          <div style="font-weight: 700; color: #fff;" class="font-display">Add Iframe Game to JSON</div>
          <button onclick="closeModals()" style="background:none; border:none; color:var(--text-dim); cursor:pointer; font-size:1.2rem;">&times;</button>
        </div>
        <form class="modal-body" onsubmit="handleAddGameSubmit(event)">
          <div class="form-group">
            <label class="form-label">Game Title *</label>
            <input type="text" id="add-title" class="form-input" placeholder="e.g. Slope, Drift Hunters" required />
          </div>
          <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <label class="form-label">Category</label>
              <select id="add-category" class="form-select">
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Retro">Retro</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div>
              <label class="form-label">Controls</label>
              <input type="text" id="add-controls" class="form-input" placeholder="e.g. Arrow keys, Space" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Iframe Embed Code or Game URL *</label>
            <textarea id="add-iframe" class="form-textarea" rows="3" placeholder='<iframe src="https://..." ...></iframe> OR https://...' required></textarea>
            <span style="font-size:0.6875rem; color:var(--text-dim); margin-top:4px; display:block;">Paste iframe tag or raw game URL.</span>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <input type="text" id="add-desc" class="form-input" placeholder="Brief summary of game" />
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 1rem;">
            <button type="button" class="btn-secondary" onclick="closeModals()">Cancel</button>
            <button type="submit" class="btn-primary font-display">Save to JSON</button>
          </div>
        </form>
      </div>
    </div>
  `;
};

window.handleAddGameSubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById('add-title').value.trim();
  const category = document.getElementById('add-category').value;
  const controls = document.getElementById('add-controls').value.trim() || 'Standard controls';
  const iframeInput = document.getElementById('add-iframe').value.trim();
  const desc = document.getElementById('add-desc').value.trim() || 'Custom unblocked iframe game.';

  let url = iframeInput;
  let html = '';
  const match = iframeInput.match(/src=["']([^"']+)["']/i);
  if (match) {
    url = match[1];
    html = iframeInput;
  } else {
    html = `<iframe src="${url}" title="${title}" width="100%" height="100%" frameborder="0" allowfullscreen="true" loading="lazy"></iframe>`;
  }

  const newGame = {
    id: 'custom-' + Date.now(),
    title: title,
    category: category,
    description: desc,
    controls: controls,
    rating: 5.0,
    plays: '1',
    featured: false,
    themeColor: '#38bdf8',
    accentColor: '#38bdf8',
    iframeUrl: url,
    iframeHtml: html,
    custom: true
  };

  games.unshift(newGame);
  saveGames();
  closeModals();
  selectGame(newGame.id);
};

window.openJsonModal = function() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;
  const jsonStr = JSON.stringify(games, null, 2);

  modalContainer.innerHTML = `
    <div class="modal-backdrop" onclick="if(event.target === this) closeModals();">
      <div class="modal-card" style="max-width: 750px;">
        <div class="modal-header">
          <div>
            <div style="font-weight: 700; color: #fff;" class="font-display">Games JSON File Storage</div>
            <div style="font-size: 0.6875rem; color: var(--text-dim);">Each game stored as an Iframe record in games.json (${games.length} games)</div>
          </div>
          <button onclick="closeModals()" style="background:none; border:none; color:var(--text-dim); cursor:pointer; font-size:1.2rem;">&times;</button>
        </div>
        <div style="padding: 10px 1.5rem; background: #060910; border-bottom: 1px solid var(--border-color); display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="stage-btn" onclick="copyJson()">Copy JSON</button>
          <button class="stage-btn" onclick="downloadJson()">Download games.json</button>
          <button class="stage-btn" onclick="resetDefaultGames()">Reset Defaults</button>
        </div>
        <div style="padding: 1rem 1.5rem; overflow-y: auto; max-height: 50vh; background: #04060c;">
          <pre style="font-family: monospace; font-size: 0.75rem; color: var(--accent-emerald); line-height: 1.5;">${escapeHtml(jsonStr)}</pre>
        </div>
        <div style="padding: 1rem 1.5rem; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end;">
          <button class="btn-secondary" onclick="closeModals()">Close</button>
        </div>
      </div>
    </div>
  `;
};

window.copyJson = function() {
  navigator.clipboard.writeText(JSON.stringify(games, null, 2));
  alert('Copied games.json to clipboard!');
};

window.downloadJson = function() {
  const blob = new Blob([JSON.stringify(games, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'games.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

window.resetDefaultGames = function() {
  if (confirm('Reset games back to default games.json list?')) {
    games = DEFAULT_GAMES;
    localStorage.removeItem('unblocked_arcade_games');
    closeModals();
    render();
  }
};

window.closeModals = function() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
};

function escapeHtml(string) {
  return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Start app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
