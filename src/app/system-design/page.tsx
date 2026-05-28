import type { Metadata } from 'next';
import topicsRaw from '@/content/system-design/index.json';
import type { SystemDesignTopic } from '@/types';
import SystemDesignListClient from './system-design-list-client';

export const metadata: Metadata = { title: 'System Design — DSA Prep' };

export default function SystemDesignPage() {
  return <SystemDesignListClient topics={topicsRaw as SystemDesignTopic[]} />;
}
