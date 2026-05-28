import { notFound } from 'next/navigation';
import problems from '@/content/problems.json';
import type { Problem } from '@/types';
import { loadProblemContent } from '@/lib/content-loader';
import ProblemPageClient from './problem-page-client';

const allProblems = problems as Problem[];

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return allProblems.map((p) => ({ id: p.id }));
}

export default async function ProblemPage({ params }: PageProps) {
  const { id } = await params;
  const problem = allProblems.find((p) => p.id === id);
  if (!problem) notFound();

  const content = problem.hasFullContent ? await loadProblemContent(id) : null;

  return <ProblemPageClient problem={problem} content={content} />;
}
