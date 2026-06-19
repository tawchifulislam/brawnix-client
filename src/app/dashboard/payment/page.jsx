'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { authClient } from '@/lib/auth-client';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const classId = searchParams.get('classId');
  const [classData, setClassData] = useState(null);
  const [fetching, setFetching] = useState(true);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (classId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/${classId}`)
        .then(res => res.json())
        .then(data => {
          setClassData(data);
          setFetching(false);
        })
        .catch(() => setFetching(false));
    }
  }, [classId]);

  if (isPending || fetching) {
    return (
      <div className="w-full text-center py-24 text-xs font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400 animate-pulse">
        Securing Payment Space...
      </div>
    );
  }

  if (!session?.user) {
    window.location.replace('/login');
    return null;
  }

  return (
    <section className="w-full bg-white dark:bg-slate-900 min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Complete Payment
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review your fitness session slot details and insert your test card
            details.
          </p>
        </div>

        {classData && (
          <div className="mb-6 p-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl">
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              Selected Session
            </span>
            <h2 className="text-base font-black text-slate-900 dark:text-white truncate mt-0.5">
              {classData.className}
            </h2>
            <div className="mt-2 flex justify-between text-xs font-bold text-slate-400">
              <span>Trainer: {classData.trainerName}</span>
              <span className="text-slate-900 dark:text-white font-black">
                ${classData.price}
              </span>
            </div>
          </div>
        )}

        <Elements stripe={stripePromise}>
          <CheckoutForm classData={classData} />
        </Elements>
      </div>
    </section>
  );
}
