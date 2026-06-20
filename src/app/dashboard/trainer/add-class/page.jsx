'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const categories = [
  'Yoga',
  'Cardio',
  'Weights',
  'Zumba',
  'CrossFit',
  'Pilates',
];
const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

export default function AddClassPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    className: '',
    image: '',
    category: categories[0],
    difficultyLevel: difficultyLevels[0],
    duration: '',
    schedule: '',
    price: '',
    description: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const classPayload = {
        ...formData,
        price: parseFloat(formData.price),
        trainerName: user?.name,
        trainerEmail: user?.email,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classes`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(classPayload),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || 'Class submitted successfully!');
        setFormData({
          className: '',
          image: '',
          category: categories[0],
          difficultyLevel: difficultyLevels[0],
          duration: '',
          schedule: '',
          price: '',
          description: '',
        });
        router.push('/dashboard/trainer/my-classes');
      } else {
        toast.error(data.message || 'Failed to submit class.');
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
        Add New Class
      </h2>
      <p className="text-xs text-slate-400 mb-6">
        Submit a new fitness class for admin approval. It will appear publicly
        once approved.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Class Name
            </label>
            <input
              type="text"
              name="className"
              required
              value={formData.className}
              onChange={handleChange}
              placeholder="e.g., Power Yoga Flow"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="https://image-link.com"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Difficulty Level
            </label>
            <select
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm cursor-pointer"
            >
              {difficultyLevels.map(lvl => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              required
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 60 Minutes"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              step="any"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 25"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Class Schedule (Days & Time)
          </label>
          <input
            type="text"
            name="schedule"
            required
            value={formData.schedule}
            onChange={handleChange}
            placeholder="e.g., Mon-Wed-Fri (6:00 AM - 7:00 AM)"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what this class covers..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto rounded-xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 px-8 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-orange-500/10 transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Class'}
        </button>
      </form>
    </div>
  );
}
