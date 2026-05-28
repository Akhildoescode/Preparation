import quizData from '@/content/complexity-quiz.json';
import ComplexityPageClient from './complexity-page-client';

export const metadata = { title: 'Complexity Quiz — DSA Prep' };

export interface QuizQuestion {
  id: string;
  label: string;
  snippet: string;
  timeAnswer: string;
  spaceAnswer: string;
  explanation: string;
}

const allQuestions = quizData as QuizQuestion[];

export default function ComplexityPage() {
  return <ComplexityPageClient questions={allQuestions} />;
}
