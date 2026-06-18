'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Magnifier, ChevronDown } from '@gravity-ui/icons';

export default function ClassFilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';
  const categories = [
    'Yoga',
    'Cardio',
    'Weights',
    'Zumba',
    'CrossFit',
    'Pilates',
  ];

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`/classes?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/80 p-4 rounded-3xl mb-12 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
      <div className="relative w-full sm:grow">
        <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 pointer-events-none">
          <Magnifier style={{ fontSize: '16px' }} />
        </span>
        <input
          type="text"
          placeholder="Search fitness classes by name..."
          defaultValue={currentSearch}
          onChange={e => updateQuery('search', e.target.value)}
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-11 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all shadow-sm font-semibold"
        />
      </div>

      <div className="relative w-full sm:w-64">
        <span className="absolute inset-y-0 right-4 flex items-center text-slate-400 pointer-events-none">
          <ChevronDown style={{ fontSize: '14px' }} />
        </span>
        <select
          value={currentCategory}
          onChange={e => updateQuery('category', e.target.value)}
          className="w-full appearance-none rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all shadow-sm font-black tracking-wide cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
