'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartAreaStacked } from '@gravity-ui/icons';

const MilestoneCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('text-slate-500');

  const calculateMilestone = e => {
    e.preventDefault();

    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h || w <= 0 || h <= 0) return;

    const heightInMeters = h / 100;

    const bmiValue = (w / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setStatus('Need to Bulk (Underweight)');
      setStatusColor('text-amber-600 dark:text-amber-400');
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setStatus('Athletic / Lean Condition (Normal)');
      setStatusColor('text-emerald-600 dark:text-emerald-400');
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setStatus('Time to Shred (Overweight)');
      setStatusColor('text-orange-600 dark:text-orange-400');
    } else {
      setStatus('Obese - Transformation Needed');
      setStatusColor('text-rose-600 dark:text-rose-400');
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  return (
    <section className="w-full bg-white dark:bg-slate-900 py-16 lg:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            className="lg:col-span-5"
          >
            <div className="bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100 dark:shadow-none relative overflow-hidden">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                Milestone Calculator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Enter your metrics to instantly discover your current physical
                benchmark.
              </p>

              <form onSubmit={calculateMilestone} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="e.g. 74"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3.5 text-base font-bold text-orange-700 dark:text-white placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="e.g. 176"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3.5 text-base font-bold text-orange-700 dark:text-white placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all shadow-sm"
                    required
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 py-3.5 text-sm font-black text-white shadow-md shadow-orange-500/10 transition-colors mt-2"
                >
                  Analyze My Fitness
                </motion.button>
              </form>

              {bmi && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center"
                >
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Your Current BMI
                  </p>
                  <p className="text-4xl font-black text-slate-900 dark:text-white my-1">
                    {bmi}
                  </p>
                  <p
                    className={`text-sm font-extrabold ${statusColor} tracking-tight transition-colors`}
                  >
                    {status}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              <ChartAreaStacked /> Instant Analytics
            </span>

            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl font-sans leading-[1.1]">
              Every Milestone Counts. <br />
              <span className="bg-linear-to-r from-orange-600 to-amber-500 dark:from-orange-500 dark:to-amber-400 bg-clip-text text-transparent">
                Track It. Conquer It.
              </span>
            </h2>

            <p className="mt-6 text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              Fitness is not a guessing game; it is a science. Use our advanced
              metric tracking ecosystem to systematically audit your baseline
              condition, scale your physical limits, and hit your ultimate
              conditioning goals.
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 hover:bg-orange-600 dark:bg-slate-50 dark:hover:bg-orange-500 px-8 py-3.5 text-base font-black text-white dark:text-slate-950 dark:hover:text-white shadow-xl shadow-slate-950/10 dark:shadow-none transition-all duration-300"
            >
              Start Your Transformation
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MilestoneCalculator;
