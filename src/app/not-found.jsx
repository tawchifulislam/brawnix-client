'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFound = () => {
  return (
    <section className="min-h-[85vh] w-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-md w-full text-center flex flex-col items-center">
        <div className="w-64 h-64 sm:w-80 sm:h-80 mb-6">
          <DotLottieReact
            src="/animation/not-found.json"
            loop
            autoplay
            className="w-full h-full object-contain"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 relative group"
        >
          <div className="absolute -inset-1 rounded-xl bg-linear-to-r from-orange-600 to-amber-500 opacity-40 blur-sm group-hover:opacity-70 group-hover:blur-md transition-all duration-300" />
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 px-8 py-3.5 text-sm font-black text-white shadow-xl transition-colors duration-200"
            >
              Return to Base
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
