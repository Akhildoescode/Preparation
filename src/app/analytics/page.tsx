import problems from '@/content/problems.json';
import type { Problem } from '@/types';
import AnalyticsPageClient from './analytics-page-client';

export const metadata = { title: 'Analytics — DSA Prep' };

export default function AnalyticsPage() {
  return <AnalyticsPageClient problems={problems as Problem[]} />;
}
