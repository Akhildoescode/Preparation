import problems from '@/content/problems.json';
import type { Problem } from '@/types';
import { loadProblemContent } from '@/lib/content-loader';
import TrainerPageClient from './trainer-page-client';

export const metadata = { title: 'Pattern Trainer — DSA Prep' };

export interface TrainerProblem {
  id: string;
  title: string;
  patterns: string[];
  statement: string;
  day: number;
}

const allProblems = problems as Problem[];

export default async function TrainerPage() {
  // Load problem statements for all problems that have full content.
  // This runs on the server so fs.readFile is available.
  const withContent = allProblems.filter((p) => p.hasFullContent);

  const trainerProblems: TrainerProblem[] = await Promise.all(
    withContent.map(async (p) => {
      const content = await loadProblemContent(p.id);
      return {
        id: p.id,
        title: p.title,
        patterns: p.patterns,
        statement: content.problemStatement,
        day: p.day,
      };
    })
  );

  return <TrainerPageClient problems={trainerProblems} />;
}
