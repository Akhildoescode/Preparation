'use client';

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
    >
      Print this page
    </button>
  );
}
