'use client';

import { useCallback, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  MessageSquare,
} from 'lucide-react';
import { useAppState } from '@/hooks/useAppState';
import type { BehavioralQuestion, BehavioralStory, GoogleCompetency } from '@/types';
import { cn } from '@/lib/utils';

// ─── Constants ───────────────────────────────────────────────────────────────

type CompetencyFilter = GoogleCompetency | 'all';

type StoryField = 'situation' | 'task' | 'action' | 'result' | 'reflections';

const COMPETENCY_ORDER: GoogleCompetency[] = [
  'leadership',
  'problem_solving',
  'communication',
  'collaboration',
  'adaptability',
  'googleyness',
];

const COMPETENCY_LABELS: Record<GoogleCompetency, string> = {
  leadership: 'Leadership',
  problem_solving: 'Problem Solving',
  communication: 'Communication',
  collaboration: 'Collaboration',
  adaptability: 'Adaptability',
  googleyness: 'Googleyness',
};

const STAR_FIELDS: {
  field: StoryField;
  label: string;
  placeholder: string;
  muted?: boolean;
}[] = [
  {
    field: 'situation',
    label: 'Situation',
    placeholder: 'Set the scene in ≤3 sentences.',
  },
  {
    field: 'task',
    label: 'Task',
    placeholder: 'What were you specifically responsible for?',
  },
  {
    field: 'action',
    label: 'Action',
    placeholder: 'What did you do? Use "I", not "we".',
  },
  {
    field: 'result',
    label: 'Result',
    placeholder: 'What happened? Quantify if possible.',
  },
  {
    field: 'reflections',
    label: 'Reflections',
    placeholder:
      'What would you do differently? For self-review only — do not say this in the interview.',
    muted: true,
  },
];

// ─── Question Card ────────────────────────────────────────────────────────────

interface QuestionCardProps {
  question: BehavioralQuestion;
  story: BehavioralStory | undefined;
  practiceMode: boolean;
  revealed: boolean;
  onReveal: () => void;
  onUpdateStory: (
    questionId: string,
    partial: Partial<Omit<BehavioralStory, 'questionId' | 'lastEditedAt'>>
  ) => void;
}

function QuestionCard({
  question,
  story,
  practiceMode,
  revealed,
  onReveal,
  onUpdateStory,
}: QuestionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);

  const [localStory, setLocalStory] = useState({
    situation: story?.situation ?? '',
    task: story?.task ?? '',
    action: story?.action ?? '',
    result: story?.result ?? '',
    reflections: story?.reflections ?? '',
  });

  const debounceTimers = useRef<Map<StoryField, ReturnType<typeof setTimeout>>>(new Map());

  const handleChange = useCallback((field: StoryField, value: string) => {
    setLocalStory((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleBlur = useCallback(
    (field: StoryField, value: string) => {
      const existing = debounceTimers.current.get(field);
      if (existing) clearTimeout(existing);
      const timer = setTimeout(() => {
        onUpdateStory(question.id, { [field]: value });
        debounceTimers.current.delete(field);
      }, 400);
      debounceTimers.current.set(field, timer);
    },
    [question.id, onUpdateStory]
  );

  const hasStory = localStory.situation !== '';

  return (
    <div
      className="rounded-lg border transition-colors"
      style={{
        background: expanded ? 'var(--c-card)' : 'oklch(0.095 0.012 275 / 60%)',
        borderColor: expanded ? 'var(--c-border)' : 'var(--c-border-dim)',
      }}
    >
      {/* Header row */}
      <button
        className="w-full text-left px-4 py-3.5 flex items-start gap-3"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <span className="mt-0.5 shrink-0" style={{ color: 'var(--c-text-4)' }}>
          {expanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </span>
        <span
          className="flex-1 text-sm leading-relaxed"
          style={{ color: 'var(--c-text-2)' }}
        >
          {question.question}
        </span>
        {hasStory && (
          <CheckCircle2
            className="w-4 h-4 shrink-0 mt-0.5"
            style={{ color: 'var(--c-emerald-text)' }}
            aria-label="Story written"
          />
        )}
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Tip callout — hidden in practice mode */}
          {!practiceMode && (
            <div
              className="rounded-md border overflow-hidden"
              style={{
                background: 'var(--c-amber-bg)',
                borderColor: 'var(--c-amber-border)',
              }}
            >
              <button
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium"
                style={{ color: 'var(--c-amber-text)' }}
                onClick={() => setShowTip((v) => !v)}
              >
                <span>{showTip ? 'Hide tip' : 'Show tip'}</span>
                {showTip ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
              {showTip && (
                <p
                  className="px-3 pb-3 text-xs leading-relaxed"
                  style={{ color: 'var(--c-amber-text)' }}
                >
                  {question.tip}
                </p>
              )}
            </div>
          )}

          {/* STAR editor — shown in non-practice mode */}
          {!practiceMode && (
            <div className="space-y-3">
              {STAR_FIELDS.map(({ field, label, placeholder, muted }) => (
                <div key={field} className="space-y-1">
                  <label
                    className="block text-xs font-medium"
                    style={{ color: muted ? 'var(--c-text-4)' : 'var(--c-text-3)' }}
                  >
                    {label}
                  </label>
                  <textarea
                    className="w-full rounded-md border px-3 py-2 text-sm resize-y min-h-[72px] transition-colors focus:outline-none"
                    style={{
                      background: 'var(--c-page)',
                      borderColor: 'var(--c-border-dim)',
                      color: muted ? 'var(--c-text-3)' : 'var(--c-text-2)',
                    }}
                    placeholder={placeholder}
                    value={localStory[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onBlur={(e) => handleBlur(field, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Practice mode view */}
          {practiceMode && (
            <div>
              {!revealed ? (
                <button
                  onClick={onReveal}
                  className="flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-colors"
                  style={{
                    background: 'var(--c-violet-bg)',
                    borderColor: 'var(--c-violet-border)',
                    color: 'var(--c-violet-text)',
                  }}
                >
                  <Eye className="w-4 h-4" />
                  Reveal my answer
                </button>
              ) : (
                <div className="space-y-3">
                  {STAR_FIELDS.filter(({ field }) => field !== 'reflections').map(
                    ({ field, label }) => {
                      const val = story?.[field] ?? '';
                      if (!val) return null;
                      return (
                        <div key={field}>
                          <p
                            className="text-xs font-medium mb-1"
                            style={{ color: 'var(--c-text-3)' }}
                          >
                            {label}
                          </p>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: 'var(--c-text-2)' }}
                          >
                            {val}
                          </p>
                        </div>
                      );
                    }
                  )}
                  {!(story?.situation || story?.task || story?.action || story?.result) && (
                    <p className="text-sm italic" style={{ color: 'var(--c-text-4)' }}>
                      No story written yet. Turn off practice mode to write one.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Likely follow-ups */}
          {question.followUps.length > 0 && (
            <div>
              <button
                className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                style={{ color: showFollowUps ? 'var(--c-text-3)' : 'var(--c-text-4)' }}
                onClick={() => setShowFollowUps((v) => !v)}
              >
                {showFollowUps ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
                Likely follow-ups
              </button>
              {showFollowUps && (
                <ul className="mt-2 space-y-1.5 pl-5">
                  {question.followUps.map((fu, i) => (
                    <li
                      key={i}
                      className="text-xs leading-relaxed list-disc"
                      style={{ color: 'var(--c-text-4)' }}
                    >
                      {fu}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Filter Button ────────────────────────────────────────────────────────────

function FilterButton({
  label,
  count,
  total,
  active,
  onClick,
}: {
  label: string;
  count: number;
  total: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 flex items-center justify-between gap-2'
      )}
      style={
        active
          ? {
              background: 'var(--c-violet-bg)',
              border: '1px solid var(--c-violet-border)',
              color: 'var(--c-text-1)',
              fontWeight: 500,
            }
          : {
              border: '1px solid transparent',
              color: 'var(--c-text-4)',
            }
      }
    >
      <span className="truncate">{label}</span>
      <span
        className="text-xs font-mono shrink-0 tabular-nums"
        style={{ color: active ? 'var(--c-violet-text)' : 'var(--c-text-5)' }}
      >
        {count}/{total}
      </span>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface BehavioralPageClientProps {
  questions: BehavioralQuestion[];
}

export default function BehavioralPageClient({ questions }: BehavioralPageClientProps) {
  const { state, updateBehavioralStory } = useAppState();
  const [competencyFilter, setCompetencyFilter] = useState<CompetencyFilter>('all');
  const [practiceMode, setPracticeMode] = useState(false);
  // Tracks which question IDs have been "revealed" in the current practice session.
  // Reset each time practice mode is toggled on.
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const togglePracticeMode = useCallback(() => {
    setPracticeMode((prev) => {
      if (!prev) {
        // Turning on: clear all reveals so user must reveal fresh each session
        setRevealedIds(new Set());
      }
      return !prev;
    });
  }, []);

  const handleReveal = useCallback((questionId: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      next.add(questionId);
      return next;
    });
  }, []);

  const storiesWrittenCount = questions.filter(
    (q) => (state.behavioralStories[q.id]?.situation ?? '') !== ''
  ).length;

  const competencyCounts = COMPETENCY_ORDER.reduce(
    (acc, c) => {
      const qs = questions.filter((q) => q.competency === c);
      const written = qs.filter(
        (q) => (state.behavioralStories[q.id]?.situation ?? '') !== ''
      ).length;
      acc[c] = { total: qs.length, written };
      return acc;
    },
    {} as Record<GoogleCompetency, { total: number; written: number }>
  );

  const filteredQuestions =
    competencyFilter === 'all'
      ? questions
      : questions.filter((q) => q.competency === competencyFilter);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <MessageSquare
              className="w-6 h-6"
              style={{ color: 'var(--c-violet-text)' }}
            />
            <h1
              className="text-2xl font-semibold"
              style={{ color: 'var(--c-text-1)' }}
            >
              Behavioral Interview
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--c-text-4)' }}>
            {storiesWrittenCount} / {questions.length} stories written
          </p>
        </div>

        {/* Practice mode toggle */}
        <button
          onClick={togglePracticeMode}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors"
          style={
            practiceMode
              ? {
                  background: 'var(--c-violet-bg)',
                  borderColor: 'var(--c-violet-border)',
                  color: 'var(--c-violet-text)',
                }
              : {
                  borderColor: 'var(--c-border)',
                  color: 'var(--c-text-3)',
                }
          }
        >
          {practiceMode ? (
            <>
              <EyeOff className="w-4 h-4" />
              Practice Mode On
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Practice Mode
            </>
          )}
        </button>
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left panel: competency filter (220px) */}
        <div className="w-full md:w-[220px] shrink-0 space-y-0.5">
          <FilterButton
            label="All"
            count={storiesWrittenCount}
            total={questions.length}
            active={competencyFilter === 'all'}
            onClick={() => setCompetencyFilter('all')}
          />
          {COMPETENCY_ORDER.map((c) => (
            <FilterButton
              key={c}
              label={COMPETENCY_LABELS[c]}
              count={competencyCounts[c].written}
              total={competencyCounts[c].total}
              active={competencyFilter === c}
              onClick={() => setCompetencyFilter(c)}
            />
          ))}
        </div>

        {/* Right panel: question list */}
        <div className="flex-1 min-w-0 space-y-2">
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              story={state.behavioralStories[q.id]}
              practiceMode={practiceMode}
              revealed={revealedIds.has(q.id)}
              onReveal={() => handleReveal(q.id)}
              onUpdateStory={updateBehavioralStory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
