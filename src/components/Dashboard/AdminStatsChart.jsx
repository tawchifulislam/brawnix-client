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

function StatChart({ title, data }) {
  return (
    <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm">
      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">
        {title}
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barCategoryGap="30%">
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function AdminStatsChart() {
  const [roleData, setRoleData] = useState([]);
  const [classStatusData, setClassStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin-stats`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        const { roleBreakdown, classStatusBreakdown } = data;

        setRoleData([
          {
            name: 'Users',
            value: roleBreakdown?.userCount || 0,
            color: '#f97316',
          },
          {
            name: 'Trainers',
            value: roleBreakdown?.trainerCount || 0,
            color: '#10b981',
          },
          {
            name: 'Admins',
            value: roleBreakdown?.adminCount || 0,
            color: '#6366f1',
          },
        ]);

        setClassStatusData([
          {
            name: 'Approved',
            value: classStatusBreakdown?.approvedCount || 0,
            color: '#10b981',
          },
          {
            name: 'Pending',
            value: classStatusBreakdown?.pendingCount || 0,
            color: '#f59e0b',
          },
          {
            name: 'Rejected',
            value: classStatusBreakdown?.rejectedCount || 0,
            color: '#f43f5e',
          },
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
      <StatChart title="Platform Members" data={roleData} />
      <StatChart title="Class Approval Status" data={classStatusData} />
    </div>
  );
}
