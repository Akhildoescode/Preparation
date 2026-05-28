'use client';

import { X } from 'lucide-react';

interface ShortcutsOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SHORTCUTS: { keys: string[]; label: string; group: string }[] = [
  { keys: ['⌘K'], label: 'Open search palette', group: 'Global' },
  { keys: ['?'], label: 'Show this overlay', group: 'Global' },
  { keys: ['/'], label: 'Open search palette', group: 'Global' },
  { keys: ['g', 'd'], label: 'Go to Dashboard', group: 'Navigation' },
  { keys: ['g', 'r'], label: 'Go to Review queue', group: 'Navigation' },
  { keys: ['j'], label: 'Next problem in list', group: 'Problem List' },
  { keys: ['k'], label: 'Previous problem in list', group: 'Problem List' },
  { keys: ['↵'], label: 'Open focused problem', group: 'Problem List' },
  { keys: ['s'], label: 'Toggle starred', group: 'Problem Detail' },
  { keys: ['1'], label: 'Set Not Started', group: 'Problem Detail' },
  { keys: ['2'], label: 'Set Attempted', group: 'Problem Detail' },
  { keys: ['3'], label: 'Set Solved', group: 'Problem Detail' },
  { keys: ['4'], label: 'Set Needs Review', group: 'Problem Detail' },
];

const GROUPS = ['Global', 'Navigation', 'Problem List', 'Problem Detail'] as const;

export function ShortcutsOverlay({ open, onClose }: ShortcutsOverlayProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-zinc-100">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            aria-label="Close shortcuts overlay"
            className="p-1 rounded text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5">
          {GROUPS.map((group) => {
            const rows = SHORTCUTS.filter((s) => s.group === group);
            return (
              <div key={group}>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                  {group}
                </p>
                <div className="space-y-2">
                  {rows.map((s, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-zinc-300">{s.label}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {s.keys.map((key, ki) => (
                          <span key={ki} className="flex items-center gap-1">
                            <kbd className="text-xs text-zinc-300 bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 font-mono leading-none">
                              {key}
                            </kbd>
                            {ki < s.keys.length - 1 && (
                              <span className="text-xs text-zinc-600">then</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-zinc-600 mt-5 pt-4 border-t border-zinc-800">
          Shortcuts are disabled when typing in a text field or code editor.
        </p>
      </div>
    </div>
  );
}
