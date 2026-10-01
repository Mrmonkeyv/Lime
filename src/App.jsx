import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Shuffle,
  SlidersHorizontal,
  Code,
  Gamepad2,
  Play
} from 'lucide-react';
import initialGamesData from './data/games.json';
import { Header } from './components/Header.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonModal } from './components/JsonModal.jsx';
import { PanicScreen } from './components/PanicScreen.jsx';

const STORAGE_KEY_GAMES = 'unblocked_arcade_games_v1';
const STORAGE_KEY_FAVS = 'unblocked_arcade_favs_v1';

export default function App() {
  // Load games from localStorage or default JSON
  const [games, setGames] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GAMES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return initialGamesData;
  });

  // Load favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAVS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return ['2048', 'tetris'];
  });

  const [activeGame, setActiveGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isPanicMode, setIsPanicMode] = useState(false);

  // Sync games to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_GAMES, JSON.stringify(games));
  }, [games]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(favorites));
  }, [favorites]);

  // Global key listener for Boss / Panic key (Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsPanicMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddGame = (newGame) => {
    setGames((prev) => [newGame, ...prev]);
    setActiveGame(newGame);
  };

  const handleImportJson = (newGames) => {
    setGames(newGames);
    if (activeGame && !newGames.some((g) => g.id === activeGame.id)) {
      setActiveGame(null);
    }
  };

  const handleResetDefaults = () => {
    setGames(initialGamesData);
    localStorage.removeItem(STORAGE_KEY_GAMES);
    setIsJsonModalOpen(false);
  };

  const handleRandomGame = () => {
    if (games.length === 0) return;
    const random = games[Math.floor(Math.random() * games.length)];
    setActiveGame(random);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered & Sorted games
  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        // Search filter
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          game.title.toLowerCase().includes(query) ||
          game.category.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query);

        if (!matchesQuery) return false;

        // Category filter
        const cat = selectedCategory.toLowerCase();
        if (cat === 'all') return true;
        if (cat === 'featured') return !!game.featured;
        if (cat === 'favorites') return favorites.includes(game.id);
        if (cat === 'custom') return !!game.custom;
        return game.category.toLowerCase() === cat;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'alpha') {
          return a.title.localeCompare(b.title);
        }
        // default: popular (featured first, then rating)
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
  }, [games, searchQuery, selectedCategory, sortBy, favorites]);

  // Featured game for the hero banner
  const heroGame = useMemo(() => {
    return games.find((g) => g.featured) || games[0];
  }, [games]);

  if (isPanicMode) {
    return <PanicScreen onDeactivate={() => setIsPanicMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Bar Navigation */}
      <Header
        onAddGame={() => setIsAddModalOpen(true)}
        onOpenJson={() => setIsJsonModalOpen(true)}
        onTogglePanic={() => setIsPanicMode(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (activeGame) setActiveGame(null);
        }}
        activeCategory={selectedCategory}
        favoritesCount={favorites.length}
      />

      <main className="flex-1">
        {activeGame ? (
          /* Active Game Player Stage */
          <GamePlayer
            game={activeGame}
            onBack={() => setActiveGame(null)}
            isFavorite={favorites.includes(activeGame.id)}
            onToggleFavorite={toggleFavorite}
            onSelectGame={(g) => {
              setActiveGame(g);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            allGames={games}
            onOpenJsonModal={() => setIsJsonModalOpen(true)}
          />
        ) : (
          /* Catalog / Browse View */
          <div>
            {/* Hero / Spotlight Section */}
            {heroGame && selectedCategory === 'all' && !searchQuery && (
              <section className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-[#090d16] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      {/* Quiet Text Metadata - Zero-Pill Discipline */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <span className="text-emerald-400 font-semibold">Today's Spotlight</span>
                        <span aria-hidden="true">·</span>
                        <span>{heroGame.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>★ {Number(heroGame.rating).toFixed(1)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{heroGame.plays} plays</span>
                      </div>

                      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        {heroGame.title}
                      </h1>

                      <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                        {heroGame.description}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => setActiveGame(heroGame)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-lg shadow-emerald-950/40 transition-transform active:scale-95 cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>Play {heroGame.title}</span>
                        </button>

                        <button
                          onClick={handleRandomGame}
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-lg transition cursor-pointer"
                        >
                          <Shuffle className="w-4 h-4 text-emerald-400" />
                          <span>Random Game</span>
                        </button>

                        <button
                          onClick={() => setIsJsonModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
                        >
                          <Code className="w-3.5 h-3.5 text-sky-400" />
                          <span>View games.json ({games.length} games)</span>
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                      <div
                        onClick={() => setActiveGame(heroGame)}
                        className="w-full max-w-sm aspect-video bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-slate-700/80 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer group hover:border-emerald-500/50 transition-all shadow-2xl relative overflow-hidden"
                      >
                        <div className="w-20 h-20 rounded-2xl bg-amber-400 text-slate-950 font-display font-black text-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3">
                          {heroGame.title.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="font-display font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                          {heroGame.title}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Click to launch embedded iframe
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Filter, Search & Segmented Controls Bar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by game title, category, or keyword..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-[#0e1626] border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Sort selector & Count */}
                <div className="flex items-center gap-3 self-end md:self-auto text-xs text-slate-400">
                  <span className="font-medium tabular-nums">
                    Showing {filteredGames.length} of {games.length} games
                  </span>
                  <div className="flex items-center gap-1.5 bg-[#0e1626] border border-slate-800 px-2.5 py-1.5 rounded-lg">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent text-slate-300 focus:outline-none cursor-pointer"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="rating">Top Rated</option>
                      <option value="alpha">Alphabetical</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Functional Segmented Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-4 scrollbar-none">
                {[
                  { id: 'all', label: 'All Games' },
                  { id: 'featured', label: 'Featured' },
                  { id: 'puzzle', label: 'Puzzles' },
                  { id: 'arcade', label: 'Arcade' },
                  { id: 'action', label: 'Action' },
                  { id: 'retro', label: 'Retro' },
                  { id: 'favorites', label: `Favorites (${favorites.length})` },
                  { id: 'custom', label: 'Custom Iframes' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-[#0e1626] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Games Grid */}
              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-2">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      isFavorite={favorites.includes(game.id)}
                      onSelect={(g) => {
                        setActiveGame(g);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="py-20 text-center bg-[#0e1626]/50 border border-slate-800/80 rounded-2xl my-4">
                  <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    No matching unblocked games
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                    {searchQuery
                      ? `No games match the query "${searchQuery}". Try a different keyword or reset filters.`
                      : 'No games found in this category.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-emerald-400 text-slate-950 rounded-lg hover:bg-emerald-300 transition cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#060910] text-xs text-slate-500 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-slate-300">UNBLOCKED ARCADE</span>
            <span>·</span>
            <span>All games stored as iframes in games.json</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="hover:text-emerald-400 transition flex items-center gap-1 cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Inspect JSON Data</span>
            </button>
            <span>·</span>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              + Add Iframe Game
            </button>
            <span>·</span>
            <button
              onClick={() => setIsPanicMode(true)}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              Disguise (Esc)
            </button>
          </div>
        </div>
      </footer>

      {/* Add Game Modal */}
      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddGame}
      />

      {/* JSON Inspector & Manager Modal */}
      <JsonModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        games={games}
        onImportJson={handleImportJson}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
