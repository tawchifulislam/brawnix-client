'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SealCheck } from '@gravity-ui/icons';

const FeaturedClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedClasses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/classes/featured`,
        );
        const data = await response.json();
        if (response.ok) {
          setClasses(data);
        }
      } catch (error) {
        console.error('Failed to fetch featured classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedClasses();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 70, damping: 14 },
    },
  };

  if (loading) {
    return (
      <div className="w-full text-center py-24 text-xs font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400 animate-pulse">
        Loading Elite Classes...
      </div>
    );
  }

  return (
    <section className="w-full bg-white dark:bg-slate-900 py-16 lg:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-3">
            Top Booked Sessions
          </h2>
          <p className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl font-sans">
            Featured Fitness Classes
          </p>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Join the most popular and highly-rated fitness classes. Trained by
            elite instructors to maximize your physical potential.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {classes.map(item => (
            <motion.div
              key={item._id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative bg-slate-50/50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:shadow-orange-500/3 dark:hover:shadow-orange-500/2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-full aspect-16/10 rounded-2xl overflow-hidden mb-5 relative bg-slate-200 dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
                  <Image
                    src={item.image}
                    alt={item.className || 'Fitness Class'}
                    fill
                    sizes="(max-w-7xl) 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-slate-950/80 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase tracking-wider text-orange-400">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                  {item.className}
                </h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500">
                    Instructor:
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-extrabold">
                    {item.trainerName}
                  </span>
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 px-3 py-1 text-xs font-extrabold text-orange-600 dark:text-orange-400">
                  <SealCheck /> Total Bookings: {item.bookingCount || 0}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Price / Duration
                  </span>
                  <span className="text-lg font-black text-slate-950 dark:text-white leading-none mt-0.5">
                    ${item.price}{' '}
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      / {item.duration || 'Hour'}
                    </span>
                  </span>
                </div>

                <Link href={`/classes/${item._id}`}>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="rounded-xl bg-slate-950 hover:bg-orange-600 dark:bg-slate-50 dark:hover:bg-orange-500 px-5 py-2.5 text-xs font-black text-white dark:text-slate-950 dark:hover:text-white shadow-md transition-all duration-300 cursor-pointer"
                  >
                    View Details
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedClasses;
