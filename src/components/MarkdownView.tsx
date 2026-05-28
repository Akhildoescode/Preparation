import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Components } from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownViewProps {
  content: string;
  className?: string;
  components?: Partial<Components>;
}

export function MarkdownView({ content, className, components }: MarkdownViewProps) {
  return (
    <div
      className={cn(
        'prose prose-zinc prose-invert max-w-none',
        'prose-headings:text-zinc-100 prose-headings:font-semibold',
        'prose-p:text-zinc-300 prose-li:text-zinc-300',
        'prose-strong:text-zinc-100',
        'prose-code:text-emerald-400 prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono',
        'prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg',
        'prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline',
        'prose-blockquote:border-l-emerald-500 prose-blockquote:text-zinc-400',
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
