'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function BookNowButton({ classData }) {
  const [checking, setChecking] = useState(true);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  useEffect(() => {
    let active = true;

    if (!user?.email || !classData?._id) {
      false;
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_PROXY_URL}/api/bookings/check?email=${user.email}&classId=${classData._id}`,
      { credentials: 'include' },
    )
      .then(res => res.json())
      .then(data => {
        if (active) setAlreadyBooked(!!data.alreadyBooked);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [user, classData]);

  const handleClick = () => {
    if (!user) {
      toast.error('Please login first to book this class!');
      return;
    }
    if (alreadyBooked) {
      toast.error('You have already booked this class.');
      return;
    }
    router.push(`/dashboard/payment?classId=${classData._id}`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={checking || alreadyBooked}
      className="w-full rounded-2xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 py-4 text-sm font-black text-white shadow-xl shadow-orange-500/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {checking ? 'Checking...' : alreadyBooked ? 'Already Booked' : 'Book Now'}
    </button>
  );
}
