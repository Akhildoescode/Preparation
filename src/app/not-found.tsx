import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-4">
      <h2 className="text-xl font-semibold text-zinc-100">Page not found</h2>
      <p className="text-sm text-zinc-500">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 transition-colors"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
