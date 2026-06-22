'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function CheckoutForm({ classData }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const hasFetchedRef = useRef(false); // Tracks whether the fetch has already executed

  useEffect(() => {
    if (classData && classData.price && user?.email && !hasFetchedRef.current) {
      hasFetchedRef.current = true; // Set lock immediately to prevent duplicate runs

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-payment-intent`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: classData.price,
          userEmail: user.email,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            toast.error(
              data.message ||
                'Unable to start payment. Please try again later.',
            );
            if (data.message === 'Action restricted by Admin') {
              router.push('/classes');
            }
          }
        })
        .catch(err => {
          console.error('Payment intent error:', err);
          toast.error('Something went wrong while starting payment.');
        });
    }
  }, [classData, user, router]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements || processing) return;

    if (!clientSecret) {
      return toast.error(
        'Payment secure session is creating. Please try again in a second.',
      );
    }

    setProcessing(true);
    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || 'Anonymous',
            email: user?.email || 'unknown@mail.com',
          },
        },
      });

    if (confirmError) {
      toast.error(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      const bookingInfo = {
        classId: classData._id,
        className: classData.className,
        trainerName: classData.trainerName,
        price: classData.price,
        userEmail: user?.email,
        userName: user?.name,
        transactionId: paymentIntent.id,
        date: new Date(),
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
          {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingInfo),
          },
        );

        const data = await response.json();

        if (response.ok && data.success) {
          toast.success(data.message || 'Payment & Booking Successful!');
          router.push('/dashboard/user/booked-classes');
        } else {
          toast.error(data.message || 'Booking failed to save in database.');
        }
      } catch (err) {
        toast.error('Booking failed to save in database.');
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="w-full overflow-hidden p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-inner">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '14px',
                color: '#64748b',
                fontFamily: 'sans-serif',
                letterSpacing: '0.025em',
                '::placeholder': { color: '#1e293b' },
              },
              invalid: { color: '#ef4444' },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full rounded-2xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 py-3.5 text-sm font-black text-white shadow-xl shadow-orange-500/10 transition-all cursor-pointer disabled:opacity-50"
      >
        {processing
          ? 'Processing Payment...'
          : `Pay $${classData?.price || 0} & Confirm Booking`}
      </button>
    </form>
  );
}
