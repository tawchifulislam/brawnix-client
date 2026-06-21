'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { ThumbsDown, ThumbsUp } from '@gravity-ui/icons';

export default function LikeDislikeButtons({
  postId,
  initialLikes,
  initialDislikes,
}) {
  const [likes, setLikes] = useState(initialLikes || []);
  const [dislikes, setDislikes] = useState(initialDislikes || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const hasLiked = user && likes.includes(user.email);
  const hasDisliked = user && dislikes.includes(user.email);

  const handleVote = async type => {
    if (!user) {
      toast.error('Please login first to vote!');
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forum/${type}/${postId}`,
        { method: 'PATCH', credentials: 'include' },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        if (type === 'like') {
          if (hasLiked) {
            setLikes(likes.filter(e => e !== user.email));
          } else {
            setLikes([...likes, user.email]);
            setDislikes(dislikes.filter(e => e !== user.email));
          }
        } else {
          if (hasDisliked) {
            setDislikes(dislikes.filter(e => e !== user.email));
          } else {
            setDislikes([...dislikes, user.email]);
            setLikes(likes.filter(e => e !== user.email));
          }
        }
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
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleVote('like')}
        disabled={isSubmitting}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50 ${
          hasLiked
            ? 'bg-orange-600 text-white'
            : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
        }`}
      >
        <ThumbsUp style={{ fontSize: '14px' }} />
        {likes.length}
      </button>

      <button
        onClick={() => handleVote('dislike')}
        disabled={isSubmitting}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50 ${
          hasDisliked
            ? 'bg-rose-600 text-white'
            : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
        }`}
      >
        <ThumbsDown style={{ fontSize: '14px' }} />
        {dislikes.length}
      </button>
    </div>
  );
}
