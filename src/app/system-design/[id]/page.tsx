import { notFound } from 'next/navigation';
import { readFile } from 'fs/promises';
import path from 'path';
import type { Metadata } from 'next';
import topicsRaw from '@/content/system-design/index.json';
import type { SystemDesignTopic } from '@/types';
import SystemDesignDetailClient from './system-design-detail-client';

const allTopics = topicsRaw as SystemDesignTopic[];

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return allTopics.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const topic = allTopics.find((t) => t.id === id);
  return { title: topic ? `${topic.title} — System Design` : 'System Design' };
}

export default async function SystemDesignDetailPage({ params }: PageProps) {
  const { id } = await params;
  const topic = allTopics.find((t) => t.id === id);
  if (!topic) notFound();

  const mdPath = path.join(process.cwd(), 'src', 'content', 'system-design', `${id}.md`);
  const content = await readFile(mdPath, 'utf-8');

  return <SystemDesignDetailClient topic={topic} content={content} />;
}
