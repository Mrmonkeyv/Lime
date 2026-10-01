import React from 'react';
import { Play, Heart, Star, Sparkles } from 'lucide-react';

export const GameCard = ({
  game,
  isFavorite,
  onSelect,
  onToggleFavorite,
}) => {
  return (
    <div
      onClick={() => onSelect(game)}
      className="group relative bg-[#0e1626] border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/20 flex flex-col"
    >
      {/* Visual Banner Preview */}
      <div className={`relative h-44 w-full bg-gradient-to-br ${game.themeColor} overflow-hidden border-b border-slate-800/80 flex items-center justify-center p-4`}>
        {/* Subtle decorative grid effect */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Favorite button */}
        <button
          onClick={(e) => onToggleFavorite(game.id, e)}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isFavorite
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/60 hover:bg-slate-800/80'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400' : ''}`} />
        </button>

        {/* Badge indication if custom or featured */}
        {game.custom && (
          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 text-[11px] font-semibold text-sky-400 bg-sky-950/80 border border-sky-800/60 rounded">
            Custom
          </div>
        )}
        {!game.custom && game.featured && (
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-amber-300 bg-amber-950/80 border border-amber-800/60 rounded">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Featured</span>
          </div>
        )}

        {/* Visual Game Emblem / Title Centerpiece */}
        <div className="text-center z-10 transition-transform duration-200 group-hover:scale-105">
          <div
            className="w-14 h-14 mx-auto mb-2 rounded-xl flex items-center justify-center font-display font-black text-xl shadow-lg border border-white/10"
            style={{ backgroundColor: game.accentColor, color: '#090d16' }}
          >
            {game.title.slice(0, 2).toUpperCase()}
          </div>
          <span className="font-display font-bold text-sm text-slate-200 group-hover:text-white transition-colors">
            {game.title}
          </span>
        </div>

        {/* Play Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity flex items-center justify-center gap-2">
          <div className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Game</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Clean Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
            <span className="text-emerald-400">{game.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-0.5 text-amber-300">
              <Star className="w-3 h-3 fill-amber-300" />
              <span className="tabular-nums">{Number(game.rating).toFixed(1)}</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="tabular-nums text-slate-400">{game.plays} plays</span>
          </div>

          <h3 className="font-display font-semibold text-base text-white group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1">
            {game.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate max-w-[200px]" title={game.controls}>
            {game.controls}
          </span>
          <span className="font-mono text-slate-400 text-[10px] shrink-0">
            iframe
          </span>
        </div>
      </div>
    </div>
  );
};
