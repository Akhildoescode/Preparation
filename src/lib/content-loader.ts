import { readFile } from 'fs/promises';
import path from 'path';
import type { ProblemContent } from '@/types';

const contentRoot = path.join(process.cwd(), 'src', 'content', 'problems');

async function readMd(problemId: string, filename: string): Promise<string> {
  try {
    const filePath = path.join(contentRoot, problemId, filename);
    return await readFile(filePath, 'utf-8');
  } catch {
    return '';
  }
}

export async function loadProblemContent(problemId: string): Promise<ProblemContent> {
  const [approach, interviewerScript, solution, edgeCases, relatedPatterns] =
    await Promise.all([
      readMd(problemId, 'approach.md'),
      readMd(problemId, 'interviewer-script.md'),
      readMd(problemId, 'solution.md'),
      readMd(problemId, 'edge-cases.md'),
      readMd(problemId, 'related.md'),
    ]);

  // Extract the problem statement from the first section of approach.md
  const problemStatement = extractFirstSection(approach);

  return {
    problemStatement,
    approach,
    interviewerScript,
    solution,
    edgeCases,
    complexity: { time: '', space: '' }, // Embedded in solution.md header
    relatedPatterns,
  };
}

/** Pull out the text under the first ## heading in a markdown string. */
function extractFirstSection(markdown: string): string {
  const lines = markdown.split('\n');
  const start = lines.findIndex((l) => l.startsWith('## '));
  if (start === -1) return '';
  const end = lines.findIndex((l, i) => i > start && l.startsWith('## '));
  const sectionLines = end === -1 ? lines.slice(start + 1) : lines.slice(start + 1, end);
  return sectionLines
    .join('\n')
    .trim()
    .replace(/^\s*\n/, '');
}
