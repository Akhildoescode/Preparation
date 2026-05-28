'use client';

import { useRef, useState } from 'react';
import { CalendarDays, Download, Upload, Trash2, Settings, AlertTriangle, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppState } from '@/hooks/useAppState';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { AppState } from '@/types';

const DAY_LABELS: Record<number, string> = {
  1: 'Arrays & Strings',
  2: 'Hashing & Lists & Stacks',
  3: 'Trees & Tries',
  4: 'Heaps & Graphs',
  5: 'Search & Backtracking & Bits',
  6: 'DP & Greedy & Intervals',
  7: 'Day 7 — Review',
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
        checked ? 'bg-emerald-500' : 'bg-zinc-700'
      )}
    >
      <span
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
  );
}

export default function SettingsPageClient() {
  const { state, setCurrentDay, exportState, importState, resetState } = useAppState();
  const [resetOpen, setResetOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [autoTimer, setAutoTimer] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('dsa-prep-auto-timer') !== 'false';
  });

  const handleAutoTimerChange = (enabled: boolean) => {
    setAutoTimer(enabled);
    localStorage.setItem('dsa-prep-auto-timer', enabled ? 'true' : 'false');
  };

  const handleExport = () => {
    const data = exportState();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dsa-prep-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccess(false);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setImportError('File is too large. Backup files should be under 10 MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as AppState;
        // Basic shape validation
        if (!parsed.progress || !Array.isArray(parsed.checkIns)) {
          throw new Error('Invalid backup format');
        }
        importState(parsed);
        setImportSuccess(true);
      } catch {
        setImportError('Could not parse the file. Make sure it is a valid DSA Prep backup.');
      }
    };
    reader.readAsText(file);
    // Reset so same file can be re-imported
    e.target.value = '';
  };

  const handleReset = () => {
    resetState();
    setResetOpen(false);
  };

  return (
    <div className="space-y-6 max-w-xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100 flex items-center gap-2">
          <Settings className="w-6 h-6 text-zinc-400" />
          Settings
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Manage your progress data. All data is stored in your browser.
        </p>
      </div>

      {/* Current Day */}
      <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-zinc-100">Current Study Day</h2>
        </div>
        <p className="text-sm text-zinc-400">
          Set which day you are currently working on. This controls the &ldquo;Today&rsquo;s Focus&rdquo; section on the dashboard.
        </p>
        <div className="flex flex-wrap gap-2">
          {([1, 2, 3, 4, 5, 6, 7] as const).map((day) => (
            <button
              key={day}
              onClick={() => setCurrentDay(day)}
              className={
                state.currentDay === day
                  ? 'px-3 py-1.5 rounded-lg border text-sm font-medium bg-emerald-500/15 border-emerald-500/40 text-emerald-300 transition-colors'
                  : 'px-3 py-1.5 rounded-lg border text-sm border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-colors'
              }
            >
              Day {day}
            </button>
          ))}
        </div>
        {state.currentDay && (
          <p className="text-xs text-zinc-600">
            Currently on Day {state.currentDay}: {DAY_LABELS[state.currentDay]}
          </p>
        )}
      </div>

      {/* Timer */}
      <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-violet-400" />
          <h2 className="text-sm font-semibold text-zinc-100">Timer</h2>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-300">Auto-start timer</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Automatically begin timing when you open a problem page.
            </p>
          </div>
          <Toggle checked={autoTimer} onChange={handleAutoTimerChange} />
        </div>
      </div>

      {/* Export */}
      <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-zinc-100">Export Progress</h2>
        <p className="text-sm text-zinc-400">
          Download a JSON backup of all your progress, notes, and code. Keep this safe — there is no cloud sync.
        </p>
        <Button
          onClick={handleExport}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700"
          variant="outline"
        >
          <Download className="w-4 h-4" />
          Export backup
        </Button>
      </div>

      {/* Import */}
      <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-zinc-100">Import Progress</h2>
        <p className="text-sm text-zinc-400">
          Restore from a previously exported backup file. This will overwrite your current data.
        </p>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700"
            variant="outline"
          >
            <Upload className="w-4 h-4" />
            Import backup
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportFile}
            className="hidden"
          />
        </div>
        {importError && (
          <p className="text-sm text-rose-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {importError}
          </p>
        )}
        {importSuccess && (
          <p className="text-sm text-emerald-400">
            ✓ Progress imported successfully.
          </p>
        )}
      </div>

      {/* Reset */}
      <div className="rounded-lg bg-zinc-900 border border-rose-900/40 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-rose-400">Reset All Progress</h2>
        <p className="text-sm text-zinc-400">
          Permanently delete all your progress, notes, and code. This cannot be undone. Export a backup first.
        </p>
        <Button
          onClick={() => setResetOpen(true)}
          variant="outline"
          className="flex items-center gap-2 border-rose-900/60 text-rose-400 hover:bg-rose-900/20 hover:border-rose-700"
        >
          <Trash2 className="w-4 h-4" />
          Reset everything
        </Button>
      </div>

      {/* Reset confirmation dialog */}
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-zinc-100">Reset all progress?</DialogTitle>
            <DialogDescription className="text-zinc-400">
              This will permanently delete all your progress, notes, and code. This action cannot be undone. Make sure you have exported a backup.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setResetOpen(false)}
              className="border-zinc-700 text-zinc-300 hover:text-zinc-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReset}
              className="bg-rose-600 hover:bg-rose-500 text-white"
            >
              Yes, reset everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
