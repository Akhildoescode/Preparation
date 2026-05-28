'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CommandPalette } from './CommandPalette';
import { ShortcutsOverlay } from './ShortcutsOverlay';

function isTypingTarget(e: KeyboardEvent): boolean {
  const el = e.target as HTMLElement;
  const tag = el?.tagName?.toLowerCase();
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    el?.isContentEditable === true ||
    !!el?.closest('.monaco-editor')
  );
}

export function GlobalKeyHandler() {
  const router = useRouter();
  const [commandOpen, setCommandOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const seqRef = useRef('');
  const seqTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetSeq = useCallback(() => {
    seqRef.current = '';
    if (seqTimerRef.current) clearTimeout(seqTimerRef.current);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Cmd+K / Ctrl+K opens search (works everywhere, even in typing targets)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShortcutsOpen(false);
        setCommandOpen(true);
        return;
      }

      // Escape closes overlays
      if (e.key === 'Escape') {
        setCommandOpen(false);
        setShortcutsOpen(false);
        return;
      }

      // Don't fire remaining shortcuts while overlays are open or user is typing
      if (commandOpen || shortcutsOpen) return;
      if (isTypingTarget(e)) return;

      // ? → shortcuts overlay
      if (e.key === '?') {
        setShortcutsOpen(true);
        return;
      }

      // / → open search (same as Cmd+K)
      if (e.key === '/') {
        e.preventDefault();
        setCommandOpen(true);
        return;
      }

      // g-sequence navigation
      const prevSeq = seqRef.current;
      if (e.key === 'g') {
        seqRef.current = 'g';
        if (seqTimerRef.current) clearTimeout(seqTimerRef.current);
        seqTimerRef.current = setTimeout(resetSeq, 1000);
        return;
      }
      if (prevSeq === 'g') {
        resetSeq();
        if (e.key === 'd') { router.push('/'); return; }
        if (e.key === 'r') { router.push('/review'); return; }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [commandOpen, shortcutsOpen, router, resetSeq]);

  return (
    <>
      {commandOpen && <CommandPalette onClose={() => setCommandOpen(false)} />}
      <ShortcutsOverlay open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </>
  );
}
