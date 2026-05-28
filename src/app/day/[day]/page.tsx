import { notFound } from 'next/navigation';
import DayPageClient from './day-page-client';

interface PageProps {
  params: Promise<{ day: string }>;
}

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6].map((d) => ({ day: String(d) }));
}

export default async function DayPage({ params }: PageProps) {
  const { day: dayStr } = await params;
  const day = parseInt(dayStr, 10);
  if (isNaN(day) || day < 1 || day > 6) notFound();
  return <DayPageClient day={day as 1 | 2 | 3 | 4 | 5 | 6} />;
}
