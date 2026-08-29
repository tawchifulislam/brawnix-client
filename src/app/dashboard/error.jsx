'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ShieldExclamation } from '@gravity-ui/icons';

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-4 max-w-sm">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto">
          <span className="text-2xl"><ShieldExclamation /></span>
        </div>
        <h2 className="text-base font-black text-slate-950 dark:text-white">
          Dashboard Error
        </h2>
        <p className="text-xs font-bold text-slate-400">
          Failed to load this section. This might be a temporary issue.
        </p>
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black cursor-pointer transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-black hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
