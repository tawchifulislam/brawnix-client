'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { Heart, LayoutHeaderCursor } from '@gravity-ui/icons';
import Loading from '@/app/loading';

// Side Note: implementing a lightweight backend route, /api/users/stats?email=, which solely returns the count, would be an efficient optimization.

export default function UserOverviewPage() {
  const [bookingsCount, setBookingsCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.email) return;

    Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/my-bookings?email=${user.email}`,
        { credentials: 'include' },
      ).then(res => res.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites?email=${user.email}`,
        { credentials: 'include' },
      ).then(res => res.json()),
    ])
      .then(([bookings, favorites]) => {
        setBookingsCount(Array.isArray(bookings) ? bookings.length : 0);
        setFavoritesCount(Array.isArray(favorites) ? favorites.length : 0);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (isPending || loading) {
    return <Loading />;
  }

  return (
    <div className="animate-fadeIn space-y-6">
      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
        Account Profile
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl">
        <Image
          src={
            user?.image ||
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80'
          }
          alt="Profile"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover border-2 border-orange-500/30"
        />
        <div className="text-center sm:text-left space-y-1">
          <p className="text-base font-black text-slate-950 dark:text-white">
            {user?.name}
          </p>
          <p className="text-xs font-bold text-slate-400">{user?.email}</p>
          <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
              Role: {user?.role || 'user'}
            </span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
              Status: {user?.status || 'active'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-linear-to-br from-orange-500/3 to-transparent dark:from-orange-500/1 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex items-center justify-between shadow-sm group hover:border-orange-500/20 transition-all duration-300">
          <div className="space-y-1.5">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              Booked Classes
            </p>
            <p className="text-3xl font-black text-slate-950 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {bookingsCount}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-xl">
            <LayoutHeaderCursor />
          </div>
        </div>

        <div className="p-5 bg-linear-to-br from-rose-500/3 to-transparent dark:from-rose-500/1 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex items-center justify-between shadow-sm group hover:border-rose-500/20 transition-all duration-300">
          <div className="space-y-1.5">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              Saved Favorite
            </p>
            <p className="text-3xl font-black text-slate-950 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              {favoritesCount}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-xl">
            <Heart />
          </div>
        </div>
      </div>
    </div>
  );
}
