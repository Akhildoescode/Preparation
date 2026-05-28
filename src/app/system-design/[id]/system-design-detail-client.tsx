'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Hash } from 'lucide-react';
import { MarkdownView } from '@/components/MarkdownView';
import type { SystemDesignTopic, SystemDesignDifficulty } from '@/types';
import type { Components } from 'react-markdown';

interface Props {
  topic: SystemDesignTopic;
  content: string;
}

// ── helpers ────────────────────────────────────────────────────────────────

function headingToId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

function extractHeadings(markdown: string): { text: string; id: string }[] {
  return markdown
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.slice(3).trim();
      return { text, id: headingToId(text) };
    });
}

function extractKeyNumbers(markdown: string): string {
  const marker = '## Key Numbers to Remember';
  const start = markdown.indexOf(marker);
  if (start === -1) return '';
  const contentStart = start + marker.length;
  const nextSection = markdown.indexOf('\n## ', contentStart);
  const raw = nextSection === -1
    ? markdown.slice(contentStart)
    : markdown.slice(contentStart, nextSection);
  return raw.trim();
}

type NodeWithProps = { props: { children?: React.ReactNode } };

function childrenToString(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(childrenToString).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return childrenToString((children as NodeWithProps).props.children);
  }
  return '';
}

// ── difficulty badge ────────────────────────────────────────────────────────

const DIFFICULTY_STYLES: Record<SystemDesignDifficulty, { bg: string; text: string; border: string }> = {
  Foundational: {
    bg: 'oklch(0.22 0.06 225)',
    text: 'oklch(0.72 0.14 225)',
    border: 'oklch(0.32 0.09 225)',
  },
  Intermediate: {
    bg: 'oklch(0.22 0.06 60)',
    text: 'oklch(0.75 0.15 60)',
    border: 'oklch(0.32 0.09 60)',
  },
  Advanced: {
    bg: 'oklch(0.22 0.07 15)',
    text: 'oklch(0.72 0.18 15)',
    border: 'oklch(0.32 0.10 15)',
  },
};

function DifficultyBadge({ difficulty }: { difficulty: SystemDesignDifficulty }) {
  const s = DIFFICULTY_STYLES[difficulty];
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-md text-xs font-medium shrink-0"
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      {difficulty}
    </span>
  );
}

// ── main component ──────────────────────────────────────────────────────────

export default function SystemDesignDetailClient({ topic, content }: Props) {
  const headings = extractHeadings(content);
  const keyNumbers = extractKeyNumbers(content);
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Custom h2 renderer — adds id so IntersectionObserver can find each section
  const markdownComponents: Partial<Components> = {
    h2: ({ children }) => {
      const text = childrenToString(children as React.ReactNode);
      const id = headingToId(text);
      return <h2 id={id}>{children}</h2>;
    },
  };

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting heading
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      { rootMargin: '-10% 0% -70% 0%', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  return (
    <div>
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/system-design"
          className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: 'var(--c-text-4)' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--c-text-2)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--c-text-4)')}
        >
          <ArrowLeft className="w-4 h-4" />
          System Design
        </Link>
      </div>

      {/* Title row */}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--c-text-1)' }}>
          {topic.title}
        </h1>
        <DifficultyBadge difficulty={topic.difficulty} />
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {topic.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-xs"
            style={{
              background: 'oklch(0.15 0.015 275)',
              color: 'var(--c-text-4)',
              border: '1px solid var(--c-border)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Key Numbers callout */}
      {keyNumbers && (
        <div
          className="mb-8 rounded-lg px-5 py-4"
          style={{
            background: 'oklch(0.12 0.04 272)',
            borderLeft: '3px solid oklch(0.62 0.20 272)',
            border: '1px solid oklch(0.25 0.06 272)',
            borderLeftWidth: '3px',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 shrink-0" style={{ color: 'oklch(0.72 0.20 272)' }} />
            <span className="text-sm font-semibold" style={{ color: 'oklch(0.82 0.12 272)' }}>
              Key Numbers to Remember
            </span>
          </div>
          <MarkdownView content={keyNumbers} className="!prose-sm" />
        </div>
      )}

      {/* Two-column layout: content + sticky nav */}
      <div className="flex gap-8">
        {/* Main markdown content */}
        <article className="flex-1 min-w-0">
          <MarkdownView content={content} components={markdownComponents} />
        </article>

        {/* Jump-to-section sticky nav — desktop only */}
        <aside className="hidden lg:block w-52 shrink-0">
          <nav className="sticky top-8">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--c-text-5)' }}>
              On this page
            </p>
            <ul className="space-y-1">
              {headings.map(({ text, id }) => {
                const isActive = activeId === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="block text-xs leading-snug py-1 px-2 rounded transition-all duration-150"
                      style={
                        isActive
                          ? {
                              color: 'oklch(0.82 0.18 272)',
                              background: 'oklch(0.14 0.04 272)',
                              borderLeft: '2px solid oklch(0.62 0.20 272)',
                              paddingLeft: '10px',
                            }
                          : {
                              color: 'var(--c-text-4)',
                              borderLeft: '2px solid transparent',
                            }
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                        setActiveId(id);
                      }}
                    >
                      {text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
