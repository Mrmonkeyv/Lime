import React, { useState } from 'react';
import { X, Copy, Check, Download, Upload, RotateCcw, FileCode } from 'lucide-react';

export const JsonModal = ({
  isOpen,
  onClose,
  games,
  onImportJson,
  onResetDefaults,
}) => {
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState('');

  if (!isOpen) return null;

  const jsonString = JSON.stringify(games, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (Array.isArray(parsed)) {
          onImportJson(parsed);
          setIsImporting(false);
          setImportError('');
        } else {
          setImportError('JSON must be an array of game objects.');
        }
      } catch (err) {
        setImportError('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleTextImportSubmit = () => {
    try {
      const parsed = JSON.parse(importText);
      if (Array.isArray(parsed)) {
        onImportJson(parsed);
        setIsImporting(false);
        setImportError('');
        setImportText('');
      } else {
        setImportError('JSON must be an array of game objects.');
      }
    } catch (err) {
      setImportError('Invalid JSON syntax: ' + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-[#0e1626] border border-slate-800 rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-white">
                Games JSON Storage & Manager
              </h2>
              <p className="text-xs text-slate-400">
                Each game is stored as an Iframe record inside games.json ({games.length} total entries)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 bg-[#090d16] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md transition font-medium cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied JSON!' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md transition font-medium cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Download games.json</span>
            </button>

            <button
              onClick={() => setIsImporting(!isImporting)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md transition font-medium cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Import / Paste JSON</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (confirm('Reset games list back to initial default games?')) {
                onResetDefaults();
              }
            }}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-400 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Import Drawer */}
        {isImporting && (
          <div className="p-4 bg-slate-900 border-b border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Import Custom JSON
              </span>
              <label className="cursor-pointer text-xs text-sky-400 hover:underline">
                Upload .json file
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
              </label>
            </div>

            {importError && (
              <div className="text-xs text-rose-400 bg-rose-950/60 p-2 rounded border border-rose-800">
                {importError}
              </div>
            )}

            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={4}
              placeholder='[ { "id": "...", "title": "...", "iframeHtml": "<iframe...>", ... } ]'
              className="w-full p-2 text-xs font-mono bg-black border border-slate-700 rounded text-emerald-400 focus:outline-none focus:border-emerald-500"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsImporting(false)}
                className="px-3 py-1 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleTextImportSubmit}
                className="px-3 py-1 text-xs font-semibold bg-emerald-400 text-slate-950 rounded hover:bg-emerald-300 cursor-pointer"
              >
                Load Imported Games
              </button>
            </div>
          </div>
        )}

        {/* JSON Code Viewer */}
        <div className="flex-1 overflow-auto p-4 bg-[#050811]">
          <pre className="text-xs font-mono text-emerald-400 leading-relaxed select-text">
            {jsonString}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#090d16] flex items-center justify-between text-xs text-slate-400">
          <span>File location: <code className="text-slate-300">/public/games.json</code></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
