'use client';

import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { Heart, LayoutHeaderCursor, TrashBin } from '@gravity-ui/icons';
import Image from 'next/image';
import Loading from '../loading';

export default function MyDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [trainerForm, setTrainerForm] = useState({
    skills: '',
    experience: '',
    availableTime: '',
  });

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/my-bookings?email=${user.email}`,
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

  useEffect(() => {
    if (user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites?email=${user.email}`,
        { credentials: 'include' },
      )
        .then(res => res.json())
        .then(data => {
          setFavorites(data);
          setFavLoading(false);
        })
        .catch(err => {
          console.error(err);
          setFavLoading(false);
        });
    }
  }, [user]);

  const handleCancelBooking = async id => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`,
          {
            method: 'DELETE',
            credentials: 'include',
          },
        );
        const data = await response.json();

        if (response.ok && data.success) {
          toast.success(data.message || 'Booking cancelled.');
          setBookings(bookings.filter(b => b._id !== id));
        } else {
          toast.error(data.message || 'Failed to cancel.');
        }
      } catch (err) {
        toast.error('Something went wrong.');
      }
    }
  };

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

  const handleTrainerApply = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const applyData = {
        uid: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        ...trainerForm,
        status: 'Pending',
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/trainer-applications`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(applyData),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(
          data.message ||
            'Application submitted successfully! Waiting for admin approval.',
        );
        setTrainerForm({ skills: '', experience: '', availableTime: '' });
      } else {
        toast.error(data.message || 'Application submission failed.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending || loading) {
    return <Loading />;
  }

  if (!session?.user) {
    window.location.replace('/login');
    return null;
  }

  return (
    <section className="w-full min-h-[90vh] bg-white dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800 p-4 rounded-3xl space-y-1 shadow-sm">
          <div className="px-3 py-2 mb-4 text-center sm:text-left">
            <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              Control Center
            </span>
            <h1 className="text-lg font-black text-slate-950 dark:text-white mt-0.5">
              User Panel
            </h1>
          </div>

          {[
            { id: 'overview', label: 'Profile Overview' },
            { id: 'bookings', label: 'Booked Classes' },
            { id: 'favorites', label: 'Favorite Classes' },
            {
              id: 'apply',
              label:
                user?.role === 'trainer'
                  ? 'Trainer Status'
                  : 'Apply as Trainer',
            },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl transition-all cursor-pointer
                ${
                  activeTab === tab.id
                    ? 'bg-orange-600 dark:bg-orange-500 text-white shadow-md shadow-orange-500/10'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-9 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm min-h-[50vh]">
          {activeTab === 'overview' && (
            <div className="animate-fadeIn space-y-6">
              <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
                Account Profile
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl">
                <Image
                  src={
                    user?.image ||
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80'
                  }
                  alt="Profile"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-500/30"
                />
                <div className="text-center sm:text-left space-y-1">
                  <p className="text-base font-black text-slate-950 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs font-bold text-slate-400">
                    {user?.email}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                      Role: {user?.role || 'user'}
                    </span>
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                      Status: {user?.status || 'active'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-linear-to-br from-orange-500/3 to-transparent dark:from-orange-500/1 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex items-center justify-between shadow-sm group hover:border-orange-500/20 transition-all duration-300">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                      Booked Classes
                    </p>
                    <p className="text-3xl font-black text-slate-950 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {bookings.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-xl">
                    <LayoutHeaderCursor />
                  </div>
                </div>

                <div className="p-5 bg-linear-to-br from-rose-500/3 to-transparent dark:from-rose-500/1 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex items-center justify-between shadow-sm group hover:border-rose-500/20 transition-all duration-300">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                      Saved Favorite
                    </p>
                    <p className="text-3xl font-black text-slate-950 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {favorites.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-xl">
                    <Heart />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
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
                            <td className="py-3 px-4 text-orange-600">
                              ${b.price}
                            </td>
                            <td className="py-3 px-4 font-mono text-[10px] text-slate-400">
                              {b.transactionId?.substring(0, 10)}...
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleCancelBooking(b._id)}
                                className="text-rose-600 bg-rose-500/10 p-1.5 rounded-lg cursor-pointer animate-none"
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
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
                Bookmarked Wishlist
              </h2>
              {favLoading ? (
                <p className="text-xs text-center text-slate-400 animate-pulse py-6">
                  Loading favorites..
                </p>
              ) : favorites.length === 0 ? (
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
          )}

          {activeTab === 'apply' && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-2">
                {user?.role === 'trainer'
                  ? 'Elite Trainer Panel'
                  : 'Trainer Application'}
              </h2>
              <p className="text-xs text-slate-400 mb-5">
                {user?.role === 'trainer'
                  ? 'Congratulations! You are officially an Elite Trainer at Brawnix.'
                  : 'Submit your official industrial profile credentials below. Brawnix admins will review it for recruitment status updates.'}
              </p>

              {user?.role === 'trainer' ? (
                <div className="p-6 text-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-2xl text-xs">
                  Your application has been approved! You now have access to
                  Trainer management.
                </div>
              ) : (
                <form onSubmit={handleTrainerApply} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Professional Skills
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Weightlifting, HIIT, Cardio Master"
                      value={trainerForm.skills}
                      onChange={e =>
                        setTrainerForm({
                          ...trainerForm,
                          skills: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Years of Experience
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 5+ Years as Senior Gym Coach"
                      value={trainerForm.experience}
                      onChange={e =>
                        setTrainerForm({
                          ...trainerForm,
                          experience: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Weekly Available Time Slots
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Mon-Wed (4:00 PM - 8:00 PM)"
                      value={trainerForm.availableTime}
                      onChange={e =>
                        setTrainerForm({
                          ...trainerForm,
                          availableTime: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none transition-all font-semibold shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 rounded-xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-orange-500/10 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Profile'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
