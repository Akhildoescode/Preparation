'use client';

import { startTransition, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  BookOpen,
  Brain,
  Calendar,
  CalendarClock,
  ClipboardCheck,
  Code2,
  FileText,
  Layers,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Timer,
  X,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DAY_LABELS = [
  { day: 1, label: 'Arrays & Strings' },
  { day: 2, label: 'Hashing & Lists' },
  { day: 3, label: 'Trees & Tries' },
  { day: 4, label: 'Heaps & Graphs' },
  { day: 5, label: 'Search & Bits' },
  { day: 6, label: 'DP & Greedy' },
];

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}

function NavLink({ href, icon, label, exact = false }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-200',
        !isActive && 'hover:bg-[var(--c-violet-bg)]'
      )}
      style={isActive ? {
        background: 'var(--c-violet-bg)',
        border: '1px solid var(--c-violet-border)',
        color: 'var(--c-text-1)',
        fontWeight: 500,
      } : {
        border: '1px solid transparent',
        color: 'var(--c-text-4)',
      }}
    >
      <span
        className="w-4 h-4 shrink-0 transition-colors"
        style={isActive ? { color: 'var(--c-violet-text)' } : {}}
      >
        {icon}
      </span>
      <span className="truncate">{label}</span>
      {isActive && (
        <span
          className="ml-auto w-1.5 h-1.5 rounded-full shrink-0 nav-dot-glow"
          style={{ background: 'var(--c-violet-text)' }}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

function SidebarNav() {
  return (
    <>
      <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
        <NavLink href="/" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" exact />

        <div className="px-2 pt-5 pb-1.5">
          <span className="sidebar-label">Study Days</span>
        </div>

        {DAY_LABELS.map(({ day, label }) => (
          <NavLink
            key={day}
            href={`/day/${day}`}
            icon={<Calendar className="w-4 h-4" />}
            label={`Day ${day} — ${label}`}
          />
        ))}

        <div className="px-2 pt-5 pb-1.5">
          <span className="sidebar-label">Tools</span>
        </div>

        <NavLink href="/review"         icon={<CalendarClock className="w-4 h-4" />}   label="Review Queue" />
        <NavLink href="/checklist"      icon={<ClipboardCheck className="w-4 h-4" />} label="Interview Day" />
        <NavLink href="/mock"           icon={<Timer className="w-4 h-4" />}           label="Mock Timer" />
        <NavLink href="/behavioral"     icon={<MessageSquare className="w-4 h-4" />}  label="Behavioral" />
        <NavLink href="/trainer"        icon={<Brain className="w-4 h-4" />}           label="Pattern Trainer" />
        <NavLink href="/complexity"     icon={<Code2 className="w-4 h-4" />}          label="Complexity Quiz" />
        <NavLink href="/cheatsheet"     icon={<FileText className="w-4 h-4" />}       label="Cheat Sheet" />
        <NavLink href="/system-design"  icon={<Layers className="w-4 h-4" />}         label="System Design" />
        <NavLink href="/analytics"      icon={<BarChart2 className="w-4 h-4" />}      label="Analytics" />
        <NavLink href="/settings"       icon={<Settings className="w-4 h-4" />}       label="Settings" />
      </nav>

      <div
        className="px-4 py-4 space-y-2.5"
        style={{ borderTop: '1px solid var(--c-border-sidebar)' }}
      >
        <div className="flex items-center gap-2" style={{ color: 'var(--c-text-5)' }}>
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span className="text-xs">95 problems curated</span>
        </div>
        <div className="flex items-center gap-1.5" style={{ color: 'var(--c-text-5)' }}>
          <Search className="w-3 h-3 shrink-0" />
          <span className="text-xs font-mono">
            <kbd className="opacity-60">⌘K</kbd>
            <span className="mx-1 opacity-30">·</span>
            <kbd className="opacity-60">?</kbd>
            <span className="ml-1 opacity-40">shortcuts</span>
          </span>
        </div>
      </div>
    </>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    startTransition(() => setMobileOpen(false));
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="fixed top-0 left-0 right-0 h-14 z-30 md:hidden flex items-center gap-3 px-4 backdrop-blur-md"
        style={{
          background: 'var(--c-topbar)',
          borderBottom: '1px solid var(--c-border-sidebar)',
        }}
      >
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: 'var(--c-text-3)' }}
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-md brand-icon-ring">
            <Zap className="w-3.5 h-3.5" style={{ color: 'var(--c-violet-text)' }} />
          </div>
          <span className="font-semibold text-sm" style={{ color: 'var(--c-text-1)' }}>
            DSA Prep
          </span>
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm md:hidden"
          style={{ background: 'oklch(0.04 0.01 275 / 70%)' }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-60 flex flex-col z-50',
          'transition-transform duration-300 ease-in-out will-change-transform',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
        style={{
          background: 'var(--c-sidebar)',
          borderRight: '1px solid var(--c-border-sidebar)',
        }}
      >
        {/* Brand / Logo */}
        <div
          className="px-4 py-5 flex items-center justify-between"
          style={{
            borderBottom: '1px solid var(--c-logo-border)',
            background: `linear-gradient(160deg, var(--c-logo-grad-from) 0%, var(--c-logo-grad-to) 100%)`,
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg brand-icon-ring">
              <Zap className="w-4 h-4" style={{ color: 'var(--c-violet-text)' }} />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight" style={{ color: 'var(--c-text-1)' }}>
                DSA Prep
              </div>
              <div className="text-[10px] leading-tight mt-0.5" style={{ color: 'var(--c-text-5)' }}>
                Google L3/L4 · 7 days
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--c-text-4)' }}
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <SidebarNav />
      </aside>
    </>
  );
}
