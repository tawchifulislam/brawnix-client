'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Thunderbolt, QrCode, ChartBar, Calendar } from '@gravity-ui/icons';

const Ecosystem = () => {
  const features = [
    {
      title: 'AI Workout Planner',
      description:
        'Generate customized, elite training routines tailored precisely to your specific body goals and fitness level.',
      icon: (
        <Thunderbolt
          className="text-orange-600 dark:text-orange-400"
          style={{ fontSize: '24px' }}
        />
      ),
    },
    {
      title: 'Smart Attendance',
      description:
        'Seamless contactless gym check-ins via instant QR code scanning. No queues, no hassle, just pure performance.',
      icon: (
        <QrCode
          className="text-orange-600 dark:text-orange-400"
          style={{ fontSize: '24px' }}
        />
      ),
    },
    {
      title: 'Real-time Analytics',
      description:
        'Track your active calorie burn, volume lifted, and overall physical progress with sleek, live interactive charts.',
      icon: (
        <ChartBar
          className="text-orange-600 dark:text-orange-400"
          style={{ fontSize: '24px' }}
        />
      ),
    },
    {
      title: 'Intelligent Slot Booking',
      description:
        'Book your preferred gym hours in advance to avoid peak crowd hours and ensure an optimized workout space.',
      icon: (
        <Calendar
          className="text-orange-600 dark:text-orange-400"
          style={{ fontSize: '24px' }}
        />
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
