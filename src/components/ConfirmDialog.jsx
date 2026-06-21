'use client';
import { useState } from 'react';

export default function ConfirmDialog({ open, title, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full mx-4">
        <p className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          {title}
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="text-xs font-bold text-slate-500 px-4 py-2 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-xl cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
