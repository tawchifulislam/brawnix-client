'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Xmark } from '@gravity-ui/icons';

export default function ApplicationDetailsModal({
  application,
  onClose,
  onActioned,
}) {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAction = async action => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PROXY_URL}/api/trainer-applications/${application._id}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action,
            userEmail: application.email,
            feedback,
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || `Application ${action.toLowerCase()}.`);
        onActioned();
        onClose();
      } else {
        toast.error(data.message || 'Action failed.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-black text-slate-950 dark:text-white">
            Application Details
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Xmark style={{ fontSize: '16px' }} />
          </button>
        </div>

        <div className="space-y-3 mb-5">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-xl">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Applicant
            </p>
            <p className="text-sm font-bold text-slate-950 dark:text-white mt-0.5">
              {application.name}
            </p>
            <p className="text-[11px] text-slate-400">{application.email}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-xl">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Skills / Specialty
              </p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {application.skills}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-xl">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Experience
              </p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {application.experience}
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-xl">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Available Time Slots
            </p>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {application.availableTime}
            </p>
          </div>
        </div>

        <div className="space-y-1.5 mb-5">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Feedback (optional)
          </label>
          <textarea
            rows={3}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="Write feedback for the applicant..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm resize-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleAction('Approved')}
            disabled={isSubmitting}
            className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            Approve
          </button>
          <button
            onClick={() => handleAction('Rejected')}
            disabled={isSubmitting}
            className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
