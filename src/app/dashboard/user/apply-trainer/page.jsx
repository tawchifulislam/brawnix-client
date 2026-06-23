'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function ApplyTrainerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trainerForm, setTrainerForm] = useState({
    skills: '',
    experience: '',
    availableTime: '',
  });
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleTrainerApply = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const applyData = {
        uid: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        ...trainerForm,
        status: 'Pending',
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PROXY_URL}/api/trainer-applications`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(applyData),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(
          data.message ||
            'Application submitted successfully! Waiting for admin approval.',
        );
        setTrainerForm({ skills: '', experience: '', availableTime: '' });
      } else {
        toast.error(data.message || 'Application submission failed.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-2">
        {user?.role === 'trainer'
          ? 'Elite Trainer Panel'
          : 'Trainer Application'}
      </h2>
      <p className="text-xs text-slate-400 mb-5">
        {user?.role === 'trainer'
          ? 'Congratulations! You are officially an Elite Trainer at Brawnix.'
          : 'Submit your official industrial profile credentials below. Brawnix admins will review it for recruitment status updates.'}
      </p>

      {user?.role === 'trainer' ? (
        <div className="p-6 text-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-2xl text-xs">
          Your application has been approved! You now have access to Trainer
          management.
        </div>
      ) : (
        <form onSubmit={handleTrainerApply} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Professional Skills
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Weightlifting, HIIT, Cardio Master"
              value={trainerForm.skills}
              onChange={e =>
                setTrainerForm({ ...trainerForm, skills: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Years of Experience
            </label>
            <input
              type="text"
              required
              placeholder="e.g., 5+ Years as Senior Gym Coach"
              value={trainerForm.experience}
              onChange={e =>
                setTrainerForm({ ...trainerForm, experience: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Weekly Available Time Slots
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Mon-Wed (4:00 PM - 8:00 PM)"
              value={trainerForm.availableTime}
              onChange={e =>
                setTrainerForm({
                  ...trainerForm,
                  availableTime: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 rounded-xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-orange-500/10 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Profile'}
          </button>
        </form>
      )}
    </div>
  );
}
