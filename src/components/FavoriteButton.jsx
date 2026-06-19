'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Heart } from '@gravity-ui/icons';
import toast from 'react-hot-toast';

export default function FavoriteButton({ classData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleAddToFavorite = async () => {
    if (!user) {
      toast.error('Please login first to bookmark this class!');
      return;
    }

    setIsSubmitting(true);

    try {
      const favoritePayload = {
        userEmail: user.email,
        classId: classData._id,
        className: classData.className,
        image: classData.image,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(favoritePayload),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || 'Added to wishlist!');
      } else {
        toast.error(data.message || 'Already added or failed.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleAddToFavorite}
      disabled={isSubmitting}
      className="w-full mt-3 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900/60 py-3.5 text-sm font-bold text-slate-800 dark:text-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
    >
      <Heart className="text-rose-500" style={{ fontSize: '16px' }} />
      {isSubmitting ? 'Adding...' : 'Add to Favorite'}
    </button>
  );
}
