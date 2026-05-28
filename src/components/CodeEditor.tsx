'use client';

import dynamic from 'next/dynamic';

// Monaco is only loaded on the client — dynamic import prevents SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-zinc-900 rounded-md border border-zinc-800 text-zinc-500 text-sm">
      Loading editor…
    </div>
  ),
});

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
}

export function CodeEditor({ value, onChange, height = '400px' }: CodeEditorProps) {
  return (
    <div style={{ height }} className="rounded-md overflow-hidden border border-zinc-800">
      <MonacoEditor
        height={height}
        language="java"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v ?? '')}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 4,
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        }}
      />
    </div>
  );
}
