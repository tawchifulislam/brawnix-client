'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Ecosystem = () => {
  const features = [
    {
      title: 'AI Workout Planner',
      description:
        'Generate customized, elite training routines tailored precisely to your specific body goals and fitness level.',
      icon: (
        <svg
          className="h-6 w-6 text-orange-600 dark:text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: 'Smart Attendance',
      description:
        'Seamless contactless gym check-ins via instant QR code scanning. No queues, no hassle, just pure performance.',
      icon: (
        <svg
          className="h-6 w-6 text-orange-600 dark:text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
          />
        </svg>
      ),
    },
    {
      title: 'Real-time Analytics',
      description:
        'Track your active calorie burn, volume lifted, and overall physical progress with sleek, live interactive charts.',
      icon: (
        <svg
          className="h-6 w-6 text-orange-600 dark:text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2zm12 0v-11a2 2 0 00-2-2h-2a2 2 0 00-2 2v11a2 2 0 002 2h2a2 2 0 002-2z"
          />
        </svg>
      ),
    },
    {
      title: 'Intelligent Slot Booking',
      description:
        'Book your preferred gym hours in advance to avoid peak crowd hours and ensure an optimized workout space.',
      icon: (
        <svg
          className="h-6 w-6 text-orange-600 dark:text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 70, damping: 14 },
    },
  };

  return (
    <section className="w-full bg-white dark:bg-slate-900 py-16 lg:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-3">
            Core Utilities
          </h2>
          <p className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl font-sans">
            The Brawnix Ecosystem
          </p>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Discover a fully integrated gym ecosystem designed to maximize
            member engagement, streamline club management, and accelerate
            athletic results.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-orange-500/5 dark:hover:shadow-orange-500/5 transition-all duration-300"
            >
              <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-orange-500/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 mb-5 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2 tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Ecosystem;
