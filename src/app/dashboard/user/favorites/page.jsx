'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Loading from '@/app/loading';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites?email=${user.email}`,
        { credentials: 'include' },
      )
        .then(res => res.json())
        .then(data => {
          setFavorites(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleRemoveFavorite = async id => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Removed from wishlist.');
        setFavorites(favorites.filter(fav => fav._id !== id));
      } else {
        toast.error(data.message || 'Failed to remove.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  if (isPending || loading) {
    return <Loading />;
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
        Bookmarked Wishlist
      </h2>
      {favorites.length === 0 ? (
        <p className="text-xs font-bold text-slate-400 py-10 text-center bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          Your bookmarked wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favorites.map(fav => (
            <div
              key={fav._id}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={
                    fav.image ||
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80'
                  }
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-xs font-black text-slate-950 dark:text-white">
                    {fav.className}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    ID: {fav.classId?.substring(0, 8)}...
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFavorite(fav._id)}
                className="text-xs font-bold text-rose-600 bg-rose-500/10 px-3 py-1.5 rounded-xl hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
