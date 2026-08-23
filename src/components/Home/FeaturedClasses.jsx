'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CardSkeleton from '@/components/skeletons/CardSkeleton';

export default function FeaturedClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/featured`)
      .then(res => res.json())
      .then(data => {
        setClasses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="text-[11px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Elite Sessions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white mt-1 tracking-tight">
            Featured Classes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : classes.map((cls, index) => (
                <motion.div
                  key={cls._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/classes/${cls._id}`}>
                    <div className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 cursor-pointer">
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={cls.image || 'https://images.unsplash.com'}
                          alt={cls.className}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
                          {cls.category}
                        </span>
                        <h3 className="text-base font-black text-slate-950 dark:text-white truncate">
                          {cls.className}
                        </h3>
                        <p className="text-xs font-bold text-slate-400">
                          {cls.trainerName}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-black text-orange-600">
                            ${cls.price}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                            {cls.bookingCount || 0} enrolled
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-black transition-colors"
          >
            View All Classes
          </Link>
        </div>
      </div>
    </section>
  );
}
