import React from 'react';
import { Gamepad2, Plus, Shield, Code, Heart } from 'lucide-react';

export const Header = ({
  onAddGame,
  onOpenJson,
  onTogglePanic,
  onSelectCategory,
  activeCategory,
  favoritesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2.5 text-left group transition cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            UNBLOCKED ARCADE
          </span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectCategory('all')}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeCategory === 'all' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Catalog
          </button>
          <button
            onClick={() => onSelectCategory('featured')}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeCategory === 'featured' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => onSelectCategory('puzzle')}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeCategory === 'puzzle' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Puzzles
          </button>
          <button
            onClick={() => onSelectCategory('arcade')}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeCategory === 'arcade' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Arcade
          </button>
          <button
            onClick={() => onSelectCategory('favorites')}
            className={`flex items-center gap-1.5 transition-colors hover:text-white cursor-pointer ${
              activeCategory === 'favorites' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="text-xs text-rose-400 tabular-nums">({favoritesCount})</span>
            )}
          </button>
          <button
            onClick={onOpenJson}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Inspect stored games.json and iframe definitions"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Games JSON</span>
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onTogglePanic}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-md transition-colors cursor-pointer"
            title="Press Esc or click to instantly disguise the page"
          >
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>Disguise (Esc)</span>
          </button>

          <button
            onClick={onAddGame}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Iframe Game</span>
          </button>
        </div>
      </div>
    </header>
  );
};
