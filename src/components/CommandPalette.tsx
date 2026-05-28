'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { DifficultyBadge } from './DifficultyBadge';
import problems from '@/content/problems.json';
import type { Problem } from '@/types';

const allProblems = problems as Problem[];

function matches(problem: Problem, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  return (
    problem.title.toLowerCase().includes(q) ||
    problem.leetcodeId.toString().startsWith(q)
  );
}

interface CommandPaletteProps {
  onClose: () => void;
}

// Rendered only when open (parent uses conditional rendering), so state auto-resets on each open.
export function CommandPalette({ onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input on mount (this runs when the component mounts each time it's opened)
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, []);

  const filtered = allProblems.filter((p) => matches(p, query)).slice(0, 8);
  // Clamp selected index whenever filtered changes
  const clampedIndex = Math.min(selectedIndex, Math.max(0, filtered.length - 1));

  const commit = useCallback(
    (problem: Problem) => {
      router.push(`/problem/${problem.id}`);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const p = filtered[clampedIndex];
        if (p) commit(p);
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [filtered, clampedIndex, commit, onClose]
  );

  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search problems"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] animate-in fade-in duration-150"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />

      {/* Palette */}
      <div
        className="relative w-full max-w-xl bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
          <Search className="w-4 h-4 text-zinc-500 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            placeholder="Search by title or LC#…"
            aria-label="Search problems"
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setSelectedIndex(0); }}
              aria-label="Clear search"
              className="text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-xs text-zinc-600 bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5">
            Esc
          </kbd>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <ul aria-label="Search results" className="max-h-80 overflow-y-auto py-2">
            {filtered.map((problem, i) => (
              <li key={problem.id}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === clampedIndex
                      ? 'bg-zinc-800 text-zinc-100'
                      : 'text-zinc-300 hover:bg-zinc-800/50'
                  }`}
                  onClick={() => commit(problem)}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <span className="text-xs text-zinc-600 font-mono w-9 shrink-0">
                    #{problem.leetcodeId}
                  </span>
                  <span className="flex-1 text-sm truncate">{problem.title}</span>
                  <DifficultyBadge difficulty={problem.difficulty} />
                  <span className="text-xs text-zinc-600 shrink-0">Day {problem.day}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-8 text-center text-sm text-zinc-500">
            No problems match &ldquo;{query}&rdquo;
          </div>
        )}

        {/* Footer hint row */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-zinc-800 bg-zinc-950/50">
          <span className="flex items-center gap-1 text-xs text-zinc-600">
            <kbd className="bg-zinc-800 border border-zinc-700 rounded px-1 font-mono">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-600">
            <kbd className="bg-zinc-800 border border-zinc-700 rounded px-1 font-mono">↵</kbd>
            open
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-600">
            <kbd className="bg-zinc-800 border border-zinc-700 rounded px-1 font-mono">Esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
