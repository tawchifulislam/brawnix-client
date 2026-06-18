'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon } from '@gravity-ui/icons';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none flex items-center justify-center w-9 h-9 relative overflow-hidden"
      aria-label="Toggle Theme"
    >
      <span className="block dark:hidden">
        <Moon className="text-slate-700" style={{ fontSize: '18px' }} />
      </span>
      <span className="hidden dark:block">
        <Sun className="text-amber-400" style={{ fontSize: '18px' }} />
      </span>
    </motion.button>
  );
};

export default ThemeToggler;
