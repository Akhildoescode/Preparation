import problems from '@/content/problems.json';
import type { Problem } from '@/types';
import MockPageClient from './mock-page-client';

export const metadata = { title: 'Mock Interview — DSA Prep' };

export default function MockPage() {
  return <MockPageClient problems={problems as Problem[]} />;
}
