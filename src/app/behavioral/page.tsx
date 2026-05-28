import questions from '@/content/behavioral-questions.json';
import type { BehavioralQuestion } from '@/types';
import BehavioralPageClient from './behavioral-page-client';

export const metadata = { title: 'Behavioral Interview — DSA Prep' };

export default function BehavioralPage() {
  return <BehavioralPageClient questions={questions as BehavioralQuestion[]} />;
}
