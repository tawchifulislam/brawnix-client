'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function CommentForm({
  user,
  onSubmit,
  isSubmitting,
  placeholder = 'Write a comment...',
  submitLabel = 'Post',
  showAvatar = true,
}) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  if (!user) {
    return (
      <p className="text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-950/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3">
        Please login to join the discussion.
      </p>
    );
  }

  return (
    <div className="flex gap-3">
      {showAvatar && (
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0">
          <Image
            src={user.image || 'https://unsplash.com'}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
