import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SealCheck } from '@gravity-ui/icons';

async function getClassDetails(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/classes/${id}`,
    { cache: 'no-store' },
  );
  if (!response.ok) return null;
  return response.json();
}

export default async function ClassDetailsPage({ params }) {
  const resolvedParams = await params;
  const classData = await getClassDetails(resolvedParams.id);

  if (!classData) {
    notFound();
  }

  return (
    <section className="w-full bg-white dark:bg-slate-900 min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link
            href="/classes"
            className="text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 hover:underline"
          >
            ← Back to All Classes
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 w-full aspect-16/10 sm:aspect-video rounded-3xl overflow-hidden relative bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-lg">
            <Image
              src={classData.image || 'https://unsplash.com'}
              alt={classData.className}
              fill
              sizes="(max-w-5xl) 100vw"
              className="object-cover"
              priority
            />
            <span className="absolute top-4 left-4 rounded-full bg-slate-950/90 backdrop-blur-sm px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-orange-400 border border-slate-800">
              {classData.category}
            </span>
          </div>

          <div className="lg:col-span-5 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight leading-tight font-sans">
              {classData.className}
            </h1>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <span>Lead Instructor:</span>
              <span className="text-slate-800 dark:text-slate-200 font-extrabold">
                {classData.trainerName}
              </span>
            </p>

            <div className="my-5 border-t border-slate-200 dark:border-slate-800" />

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider">
                  Duration
                </span>
                <span className="block font-black text-slate-800 dark:text-slate-200 text-sm mt-0.5">
                  {classData.duration || '60 Minutes'}
                </span>
              </div>
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider">
                  Enrolled Members
                </span>
                <span className="block font-black text-orange-600 dark:text-orange-400 text-sm mt-0.5">
                  <SealCheck /> {classData.bookingCount || 0} Booked
                </span>
              </div>
            </div>

            <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Access Pass
              </span>
              <span className="text-2xl font-black text-slate-950 dark:text-white">
                ${classData.price}
              </span>
            </div>

            <Link href={`/dashboard/payment?classId=${classData._id}`}>
              <button className="w-full mt-6 rounded-2xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 py-4 text-sm font-black text-white shadow-xl shadow-orange-500/10 transition-all cursor-pointer">
                Book This Session Now
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
          <h2 className="text-lg font-black text-slate-950 dark:text-white tracking-tight uppercase mb-4">
            Course Description & Overview
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {classData.description ||
              'No description provided for this premium session. Please check back later or contact support for full module guidelines.'}
          </p>
        </div>
      </div>
    </section>
  );
}
