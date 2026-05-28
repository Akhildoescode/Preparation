import type { Metadata } from 'next';
import { PrintButton } from './print-button';

export const metadata: Metadata = {
  title: 'Interview Day — DSA Prep',
};

const SECTIONS = [
  {
    title: 'The Night Before',
    items: [
      'Test your environment: IDE configured, LeetCode set to Java',
      'Charge all devices',
      'Review 5 starred problems from each study day',
      'Read through all your behavioral stories once',
      'Review the cheatsheet key patterns',
      'Get 8 hours of sleep',
      'Eat a real meal',
      "Review the interviewer's name and team",
    ],
  },
  {
    title: 'Morning Of',
    items: [
      'Warm up with 1 Easy problem in under 15 minutes',
      'Review your 3 weakest patterns',
      'Re-read the interviewer script section from your 5 must-know problems',
      'Set up your coding environment',
      'Arrive or log in 10 minutes early',
    ],
  },
  {
    title: 'In Each Interview Round',
    items: [
      'Repeat the problem back in your own words',
      'Ask 2–3 clarifying questions',
      'State the brute-force approach before coding',
      'Narrate your thinking as you code ("I\'m using a hashmap here because…")',
      'State time and space complexity before the interviewer asks',
      'Test with at least 2 examples including an edge case',
      'Ask "Does this look good to you?" before declaring done',
    ],
  },
  {
    title: 'After Each Round',
    items: [
      "Write down the problem while it's fresh",
      'Note anything you got stuck on',
      'Do not share problem content publicly',
    ],
  },
];

export default function ChecklistPage() {
  return (
    <>
      <style>{`
        @media print {
          aside { display: none !important; }
          main { margin-left: 0 !important; padding-top: 0 !important; }
          html, body { background: white !important; color: #111 !important; font-family: Georgia, serif !important; }
          .print-hide { display: none !important; }
          .print-section { break-inside: avoid; }
        }
      `}</style>

      <div className="space-y-8 max-w-2xl">
        <div className="print-hide">
          <h1 className="text-2xl font-semibold text-zinc-100">Interview Day Checklist</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Reference guide for the final push.{' '}
            <PrintButton />
          </p>
        </div>

        {/* Print-only heading */}
        <div className="hidden print:block">
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            Interview Day Checklist
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#555' }}>DSA Prep — Google L3/L4</p>
        </div>

        {SECTIONS.map((section) => (
          <section key={section.title} className="print-section space-y-3">
            <h2
              className="text-base font-semibold text-zinc-200 border-b pb-2"
              style={{ borderColor: 'var(--c-border-sidebar)' }}
            >
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span
                    className="shrink-0 font-semibold mt-0.5"
                    style={{ color: 'oklch(0.75 0.18 155)' }}
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
