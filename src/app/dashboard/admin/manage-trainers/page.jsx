'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Loading from '@/app/loading';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function ManageTrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demoteTargetId, setDemoteTargetId] = useState(null);

  const fetchTrainers = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trainers`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setTrainers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDemote = id => {
    setDemoteTargetId(id);
  };

  const confirmDemote = async () => {
    const id = demoteTargetId;
    setDemoteTargetId(null);
    if (!id) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/trainers/demote/${id}`,
        { method: 'PATCH', credentials: 'include' },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || 'Trainer demoted.');
        setTrainers(prev => prev.filter(t => t._id !== id));
      } else {
        toast.error(data.message || 'Action failed.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
        Manage Trainers
      </h2>

      {trainers.length === 0 ? (
        <p className="text-xs font-bold text-slate-400 py-10 text-center bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          No active trainers found.
        </p>
      ) : (
        <div className="w-full overflow-hidden border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Trainer</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-xs font-bold text-slate-700 dark:text-slate-300">
                {trainers.map(t => (
                  <tr
                    key={t._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                        <Image
                          src={t.image || 'https://unsplash.com'}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-slate-950 dark:text-white font-black truncate max-w-30">
                        {t.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 truncate max-w-50">{t.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                          t.status === 'blocked'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDemote(t._id)}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 cursor-pointer transition-colors"
                      >
                        Demote to User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!demoteTargetId}
        title="Demote this trainer to User?"
        description="They will lose trainer privileges immediately."
        confirmLabel="Demote"
        cancelLabel="Cancel"
        onConfirm={confirmDemote}
        onCancel={() => setDemoteTargetId(null)}
      />
    </div>
  );
}
