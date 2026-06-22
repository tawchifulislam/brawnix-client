'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { Layers, LayoutHeaderCursor, Persons } from '@gravity-ui/icons';
import Loading from '@/app/loading';
import AdminStatsChart from '@/components/Dashboard/AdminStatsChart';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClasses: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin-stats`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (isPending || loading) {
    return <Loading />;
  }

  return (
    <div className="animate-fadeIn space-y-6">
      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
        Admin Profile
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
              Role: Admin
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-linear-to-br from-orange-500/3 to-transparent dark:from-orange-500/1 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex items-center justify-between shadow-sm group hover:border-orange-500/20 transition-all duration-300">
          <div className="space-y-1.5">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              Total Users
            </p>
            <p className="text-3xl font-black text-slate-950 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {stats.totalUsers}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-xl">
            <Persons />
          </div>
        </div>

        <div className="p-5 bg-linear-to-br from-emerald-500/3 to-transparent dark:from-emerald-500/1 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex items-center justify-between shadow-sm group hover:border-emerald-500/20 transition-all duration-300">
          <div className="space-y-1.5">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              Total Classes
            </p>
            <p className="text-3xl font-black text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {stats.totalClasses}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xl">
            <Layers />
          </div>
        </div>

        <div className="p-5 bg-linear-to-br from-rose-500/3 to-transparent dark:from-rose-500/1 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex items-center justify-between shadow-sm group hover:border-rose-500/20 transition-all duration-300">
          <div className="space-y-1.5">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              Total Booked Classes
            </p>
            <p className="text-3xl font-black text-slate-950 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              {stats.totalBookings}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-xl">
            <LayoutHeaderCursor />
          </div>
        </div>
      </div>
      <AdminStatsChart />
    </div>
  );
}