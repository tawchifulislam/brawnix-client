'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Xmark } from '@gravity-ui/icons';

const categories = [
  'Yoga',
  'Cardio',
  'Weights',
  'Zumba',
  'CrossFit',
  'Pilates',
];
const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

export default function UpdateClassModal({ classData, onClose, onUpdated }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    className: classData.className || '',
    image: classData.image || '',
    category: classData.category || categories[0],
    difficultyLevel: classData.difficultyLevel || difficultyLevels[0],
    duration: classData.duration || '',
    schedule: classData.schedule || '',
    price: classData.price || '',
    description: classData.description || '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classes/${classData._id}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            price: parseFloat(formData.price),
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || 'Class updated!');
        onUpdated();
        onClose();
      } else {
        toast.error(data.message || 'Update failed.');
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

      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-black text-slate-950 dark:text-white">
            Update Class
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Xmark style={{ fontSize: '16px' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Class Schedule
            </label>
            <input
              type="text"
              name="schedule"
              required
              value={formData.schedule}
              onChange={handleChange}
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
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-orange-500/10 transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Updating...' : 'Update Class'}
          </button>
        </form>
      </div>
    </div>
  );
}
