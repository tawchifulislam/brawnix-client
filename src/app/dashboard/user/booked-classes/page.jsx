'use client';

import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { TrashBin } from '@gravity-ui/icons';
import Loading from '@/app/loading';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function BookedClassesPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelTargetId, setCancelTargetId] = useState(null);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_PROXY_URL}/api/my-bookings?email=${user.email}`,
        { credentials: 'include' },
      )
        .then(res => res.json())
        .then(data => {
          setBookings(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleCancelBooking = id => {
    setCancelTargetId(id);
  };

  const confirmCancelBooking = async () => {
    const id = cancelTargetId;
    setCancelTargetId(null);
    if (!id) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PROXY_URL}/api/bookings/${id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || 'Booking cancelled.');
        setBookings(prev => prev.filter(b => b._id !== id));
      } else {
        toast.error(data.message || 'Failed to cancel.');
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
        My Booked Sessions
      </h2>
      {bookings.length === 0 ? (
        <p className="text-xs font-bold text-slate-400 py-6 text-center">
          No enrolled sessions found.
        </p>
      ) : (
        <div className="w-full overflow-hidden border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Instructor</th>
                  <th className="py-3 px-4">Paid</th>
                  <th className="py-3 px-4">TXID</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-xs font-bold text-slate-700 dark:text-slate-300">
                {bookings.map(b => (
                  <tr
                    key={b._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="py-3 px-4 text-slate-950 dark:text-white font-black truncate max-w-35">
                      {b.className}
                    </td>
                    <td className="py-3 px-4">{b.trainerName}</td>
                    <td className="py-3 px-4 text-orange-600">${b.price}</td>
                    <td className="py-3 px-4 font-mono text-[10px] text-slate-400">
                      {b.transactionId?.substring(0, 10)}...
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleCancelBooking(b._id)}
                        className="text-rose-600 bg-rose-500/10 p-1.5 rounded-lg cursor-pointer"
                      >
                        <TrashBin style={{ fontSize: '14px' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!cancelTargetId}
        title="Cancel this booking?"
        description="This action cannot be undone."
        confirmLabel="Cancel Booking"
        cancelLabel="Keep It"
        onConfirm={confirmCancelBooking}
        onCancel={() => setCancelTargetId(null)}
      />
    </div>
  );
}
