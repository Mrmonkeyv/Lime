import React, { useState } from 'react';
import { X, Plus, Code } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [description, setDescription] = useState('');
  const [iframeInput, setIframeInput] = useState('');
  const [controls, setControls] = useState('Arrow keys or Mouse');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }
    if (!iframeInput.trim()) {
      setError('Please provide an iframe embed snippet or game URL.');
      return;
    }

    let url = iframeInput.trim();
    let html = '';

    // Check if input is an <iframe> HTML snippet
    const iframeMatch = iframeInput.match(/src=["']([^"']+)["']/i);
    if (iframeMatch) {
      url = iframeMatch[1];
      html = iframeInput.trim();
    } else {
      // It's a raw URL; construct the iframe snippet
      html = `<iframe src="${url}" title="${title.trim()}" width="100%" height="100%" frameborder="0" allowfullscreen="true" loading="lazy"></iframe>`;
    }

    const newGame = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      category: category.trim(),
      description: description.trim() || 'Custom unblocked game embedded via iframe.',
      controls: controls.trim() || 'Standard Controls',
      rating: 5.0,
      plays: '1',
      featured: false,
      themeColor: 'from-sky-500/20 to-indigo-600/20',
      accentColor: '#38bdf8',
      badge: 'Custom',
      iframeUrl: url,
      iframeHtml: html,
      custom: true,
    };

    onAdd(newGame);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0e1626] border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
              <Code className="w-4 h-4" />
            </div>
            <h2 className="font-display text-base font-bold text-white">
              Add New Iframe Game to JSON
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs text-rose-400 bg-rose-950/50 border border-rose-800/60 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Game Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(''); }}
              placeholder="e.g. Slope Runner, Drift Hunters, Cookie Clicker"
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Retro">Retro</option>
                <option value="Strategy">Strategy</option>
                <option value="Sports">Sports</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Key Controls
              </label>
              <input
                type="text"
                value={controls}
                onChange={(e) => setControls(e.target.value)}
                placeholder="e.g. Arrow keys, Space, Mouse"
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Iframe Embed Code or Game URL *
            </label>
            <textarea
              value={iframeInput}
              onChange={(e) => { setIframeInput(e.target.value); setError(''); }}
              rows={3}
              placeholder='<iframe src="https://example.com/game.html" ...></iframe> OR https://...'
              className="w-full px-3 py-2 text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg text-emerald-400 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Paste the complete &lt;iframe ...&gt;&lt;/iframe&gt; code or direct web URL. It will be stored formatted inside the JSON data.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the game"
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition shadow cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Save Game to JSON</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
