import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Maximize2,
  Minimize2,
  ExternalLink,
  Heart,
  Code,
  Star,
  Check,
  Copy,
  Tv
} from 'lucide-react';

export const GamePlayer = ({
  game,
  onBack,
  isFavorite,
  onToggleFavorite,
  onSelectGame,
  allGames,
  onOpenJsonModal,
}) => {
  const [key, setKey] = useState(0);
  const [isTheater, setIsTheater] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showJsonSnippet, setShowJsonSnippet] = useState(false);
  const [copied, setCopied] = useState(false);
  const stageRef = useRef(null);

  // Reload the iframe
  const handleReload = () => {
    setKey((prev) => prev + 1);
  };

  // Toggle true browser fullscreen
  const handleToggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Open in cloaked / about:blank window
  const handleOpenAboutBlank = () => {
    const newWin = window.open('about:blank', '_blank');
    if (!newWin) return;
    const doc = newWin.document;
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Google Drive - My Drive</title>
          <style>
            body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #000; }
            iframe { width: 100%; height: 100%; border: none; }
          </style>
        </head>
        <body>
          <iframe src="${window.location.origin}${game.iframeUrl}" allowfullscreen></iframe>
        </body>
      </html>
    `);
    doc.close();
  };

  const copyIframeCode = () => {
    navigator.clipboard.writeText(game.iframeHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const iframeSrc = game.iframeUrl;
  const similarGames = allGames.filter((g) => g.id !== game.id).slice(0, 4);

  return (
    <div className="w-full pb-16">
      {/* Top Nav Control Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Reload Game */}
          <button
            onClick={handleReload}
            className="p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Reload Game Frame"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Theater Mode */}
          <button
            onClick={() => setIsTheater(!isTheater)}
            className={`p-2 border rounded-lg transition-colors cursor-pointer ${
              isTheater
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700'
            }`}
            title={isTheater ? 'Exit Theater Mode' : 'Theater Mode'}
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={handleToggleFullscreen}
            className="p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Open in Blank Cloaker Window */}
          <button
            onClick={handleOpenAboutBlank}
            className="p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Open in stealth about:blank tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* Favorite */}
          <button
            onClick={() => onToggleFavorite(game.id)}
            className={`p-2 border rounded-lg transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700'
            }`}
            title={isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
          </button>

          {/* View Iframe JSON */}
          <button
            onClick={() => setShowJsonSnippet(!showJsonSnippet)}
            className={`p-2 border rounded-lg transition-colors cursor-pointer ${
              showJsonSnippet
                ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                : 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700'
            }`}
            title="View JSON & Iframe snippet"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Game Stage */}
      <div
        className={`mx-auto px-4 transition-all duration-300 ${
          isTheater ? 'max-w-[100vw] px-0' : 'max-w-5xl sm:px-6 lg:px-8'
        }`}
      >
        <div
          ref={stageRef}
          className={`relative bg-[#050811] border border-slate-800 rounded-xl overflow-hidden shadow-2xl ${
            isTheater ? 'rounded-none border-x-0' : ''
          }`}
          style={{ height: isFullscreen ? '100vh' : '650px' }}
        >
          {/* Active Iframe */}
          <iframe
            key={key}
            src={iframeSrc}
            title={game.title}
            className="w-full h-full border-none block"
            allow="fullscreen; autoplay; gamepad; keyboard-map"
            allowFullScreen
          />
        </div>
      </div>

      {/* JSON & Iframe Snippet View */}
      {showJsonSnippet && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-[#0e1626] border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Stored Iframe JSON Definition
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyIframeCode}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Iframe Tag'}</span>
                </button>
                <button
                  onClick={onOpenJsonModal}
                  className="px-2.5 py-1 text-xs font-medium text-sky-400 hover:text-sky-300 bg-sky-950/60 hover:bg-sky-900/60 rounded border border-sky-800 transition cursor-pointer"
                >
                  Open Full JSON
                </button>
              </div>
            </div>
            <pre className="p-3 bg-[#050811] border border-slate-800/80 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
              {JSON.stringify(game, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Details & Controls section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-[#0e1626] border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-medium">
                <span className="text-emerald-400">{game.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-0.5 text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span className="tabular-nums">{Number(game.rating).toFixed(1)}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{game.plays} total plays</span>
                {game.custom && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-sky-400">Custom Iframe</span>
                  </>
                )}
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                {game.title}
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed">
                {game.description}
              </p>
            </div>

            {/* Controls Guide */}
            <div className="bg-[#0e1626] border border-slate-800 rounded-xl p-5">
              <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Game Controls
              </h3>
              <p className="text-sm text-emerald-400 font-medium font-mono">
                {game.controls}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Tip: Click inside the game screen once to ensure keyboard focus is active.
              </p>
            </div>
          </div>

          {/* Side Info & Features */}
          <div className="space-y-4">
            <div className="bg-[#0e1626] border border-slate-800 rounded-xl p-5">
              <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Unblocked Features
              </h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>100% Client-Side Iframe Execution</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>JSON Stored Configuration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>About:Blank Stealth Cloaker</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Panic Boss-Key Protection (Esc)</span>
                </li>
              </ul>
            </div>

            {/* More Games */}
            <div className="bg-[#0e1626] border border-slate-800 rounded-xl p-5">
              <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                More Games
              </h3>
              <div className="space-y-2">
                {similarGames.map((sg) => (
                  <button
                    key={sg.id}
                    onClick={() => onSelectGame(sg)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-left transition group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {sg.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {sg.category} · ★ {Number(sg.rating).toFixed(1)}
                      </div>
                    </div>
                    <span className="text-slate-400 group-hover:text-emerald-400 text-xs">
                      Play →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
