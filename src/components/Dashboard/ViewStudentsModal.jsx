'use client';

import React, { useEffect, useState } from 'react';
import { Xmark } from '@gravity-ui/icons';
import Loading from '@/app/loading';

export default function ViewStudentsModal({ classId, className, onClose }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_PROXY_URL}/api/classes/${classId}/students`,
      { credentials: 'include' },
    )
      .then(res => res.json())
      .then(data => {
        setStudents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [classId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">
              Enrolled Students
            </h3>
            <p className="text-[11px] text-slate-400 truncate max-w-60">
              {className}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Xmark style={{ fontSize: '16px' }} />
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : students.length === 0 ? (
          <p className="text-xs font-bold text-slate-400 py-10 text-center bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            No students enrolled yet.
          </p>
        ) : (
          <div className="space-y-2">
            {students.map(s => (
              <div
                key={s._id}
                className="p-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-xl"
              >
                <p className="text-xs font-black text-slate-950 dark:text-white">
                  {s.userName}
                </p>
                <p className="text-[11px] text-slate-400">{s.userEmail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
