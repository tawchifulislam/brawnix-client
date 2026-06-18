'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Classes', path: '/classes' },
    { name: 'Community Forum', path: '/forum' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <Logo size={36} showText={true} />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;

              return (
                <a
                  key={index}
                  href={link.path}
                  className={`text-sm font-bold relative py-1 transition-colors duration-200
                    ${
                      isActive
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400'
                    }`}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 dark:bg-orange-400 rounded-full animate-fadeIn" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">
              Login
            </button>
            <button className="rounded-xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-orange-500/10 transition-all duration-200">
              Sign Up
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-4 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;

              return (
                <a
                  key={index}
                  href={link.path}
                  className={`block text-base font-bold px-3 py-2 rounded-xl transition-all
                    ${
                      isActive
                        ? 'text-orange-600 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/20'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
            <button className="w-full text-center py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
              Login
            </button>
            <button className="w-full text-center py-2.5 text-sm font-bold text-white bg-orange-600 dark:bg-orange-500 rounded-xl shadow-md">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
