'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Flame } from '@gravity-ui/icons';

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 60, damping: 12, delay: 0.3 },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-slate-900 py-16 lg:py-24 transition-colors duration-300">
      <div className="absolute top-1/3 right-1/4 -z-10 h-87.5 w-87.5 rounded-full bg-orange-500/10 blur-[90px] dark:bg-orange-500/15 dark:blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <motion.span
              variants={textVariants}
              className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400"
            >
              <Flame /> Push Your Limits
            </motion.span>

            <motion.h1
              variants={textVariants}
              className="text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl md:text-6xl font-sans leading-[1.1]"
            >
              Forge Your Ultimate <br />
              <span className="bg-linear-to-r from-orange-600 to-amber-500 dark:from-orange-500 dark:to-amber-400 bg-clip-text text-transparent">
                Brawn & Aesthetics
              </span>
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl"
            >
              Track your daily workouts, manage your comprehensive gym schedule,
              and train with world-class instructors. Your all-in-one elite
              fitness platform.
            </motion.p>

            <motion.div
              variants={textVariants}
              className="mt-8 flex flex-wrap items-center gap-4 relative"
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-xl bg-linear-to-r from-orange-600 to-amber-500 opacity-40 blur-sm group-hover:opacity-70 group-hover:blur-md transition-all duration-300 animate-pulse" />

                <Link href="/classes">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative rounded-xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 px-8 py-3.5 text-base font-black text-white shadow-xl transition-colors duration-200"
                  >
                    Explore Classes
                  </motion.button>
                </Link>
              </div>

              <Link href="/forum">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-orange-600 dark:hover:border-orange-500 bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm px-8 py-3.5 text-base font-bold text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 shadow-md transition-all duration-200"
                >
                  See Forum
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 grid grid-cols-2 gap-4 relative"
          >
            <div className="aspect-square bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-4 flex items-center justify-center shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <DotLottieReact
                src="/animation/workout.json"
                loop
                autoplay
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen"
              />
            </div>

            <div className="aspect-square bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-4 flex items-center justify-center shadow-lg transition-transform duration-300 hover:-translate-y-2 mt-6 lg:mt-12">
              <DotLottieReact
                src="/animation/dashboard.json"
                loop
                autoplay
                className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(249,115,22,0.15)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
