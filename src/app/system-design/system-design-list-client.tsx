'use client';

import Link from 'next/link';
import type { SystemDesignTopic, SystemDesignDifficulty } from '@/types';

interface Props {
  topics: SystemDesignTopic[];
}

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
      className="inline-block px-2 py-0.5 rounded-md text-xs font-medium"
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      {difficulty}
    </span>
  );
}

export default function SystemDesignListClient({ topics }: Props) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--c-text-1)' }}>
          System Design
        </h1>
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--c-text-3)' }}>
          System design is tested in Google L4+ rounds. Focus on communication and trade-offs,
          not memorizing architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/system-design/${topic.id}`}
            className="group block rounded-xl p-5 transition-all duration-200"
            style={{
              background: 'var(--c-card)',
              border: '1px solid var(--c-border)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-violet-border)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-border)';
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2
                className="font-semibold text-base leading-tight group-hover:text-zinc-50 transition-colors"
                style={{ color: 'var(--c-text-1)' }}
              >
                {topic.title}
              </h2>
              <DifficultyBadge difficulty={topic.difficulty} />
            </div>

            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--c-text-4)' }}>
              {topic.googleRelevance}
            </p>

            <div className="flex flex-wrap gap-1.5">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
