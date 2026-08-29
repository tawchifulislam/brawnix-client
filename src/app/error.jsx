'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ShieldExclamation } from '@gravity-ui/icons';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 bg-white dark:bg-slate-900">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto">
          <span className="text-3xl">
            <ShieldExclamation />
          </span>
        </div>
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          Something went wrong
        </h2>
        <p className="text-xs font-bold text-slate-400">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black cursor-pointer transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-black hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
