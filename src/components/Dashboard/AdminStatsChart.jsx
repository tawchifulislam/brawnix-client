'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 shadow-lg">
      <p className="text-[11px] font-black text-slate-950 dark:text-white">
        {label}
      </p>
      <p className="text-[11px] font-bold text-orange-600 dark:text-orange-400">
        {payload[0].value} {payload[0].value === 1 ? 'item' : 'items'}
      </p>
    </div>
  );
}

export default function AdminStatsChart() {
  const [roleData, setRoleData] = useState([]);
  const [classStatusData, setClassStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        credentials: 'include',
      }).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/all`, {
        credentials: 'include',
      }).then(res => res.json()),
    ])
      .then(([users, classes]) => {
        const userList = Array.isArray(users) ? users : [];
        const classList = Array.isArray(classes) ? classes : [];

        const userCount = userList.filter(u => u.role === 'user').length;
        const trainerCount = userList.filter(u => u.role === 'trainer').length;
        const adminCount = userList.filter(u => u.role === 'admin').length;

        setRoleData([
          { name: 'Users', value: userCount, color: '#f97316' },
          { name: 'Trainers', value: trainerCount, color: '#10b981' },
          { name: 'Admins', value: adminCount, color: '#6366f1' },
        ]);

        const approvedCount = classList.filter(
          c => c.status === 'Approved',
        ).length;
        const pendingCount = classList.filter(
          c => c.status === 'Pending',
        ).length;
        const rejectedCount = classList.filter(
          c => c.status === 'Rejected',
        ).length;

        setClassStatusData([
          { name: 'Approved', value: approvedCount, color: '#10b981' },
          { name: 'Pending', value: pendingCount, color: '#f59e0b' },
          { name: 'Rejected', value: rejectedCount, color: '#f43f5e' },
        ]);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-72 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl animate-pulse" />
        <div className="h-72 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">
          Platform Members
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={roleData} barCategoryGap="30%">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(148,163,184,0.08)' }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={48}>
              {roleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">
          Class Approval Status
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={classStatusData} barCategoryGap="30%">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(148,163,184,0.08)' }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={48}>
              {classStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
