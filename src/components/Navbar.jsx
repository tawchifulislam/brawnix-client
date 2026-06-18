'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';
import ThemeToggler from './ThemeToggler';
import { authClient } from '@/lib/auth-client';
import { Bars, Xmark } from '@gravity-ui/icons';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logged out successfully!');
          router.push('/');
        },
        onError: () => {
          toast.error('Logout failed. Please try again.');
        },
      },
    });
  };

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
                <Link
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
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 dark:bg-orange-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggler />

            {!isPending &&
              (user ? (
                <div className="flex items-center gap-4">
                  <Image
                    src={user.image || 'https://unsplash.com'}
                    alt={user.name || 'User Avatar'}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover border-2 border-orange-500/30 shadow-inner"
                  />
                  <button
                    onClick={handleLogout}
                    className="text-sm font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors duration-200 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/login"
                    className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link href="/register">
                    <button className="rounded-xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-orange-500/10 transition-all duration-200 cursor-pointer">
                      Sign Up
                    </button>
                  </Link>
                </div>
              ))}
          </div>

          <div className="flex md:hidden items-center gap-3">
            <ThemeToggler />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors duration-200"
            >
              {isMenuOpen ? (
                <Xmark style={{ fontSize: '20px' }} />
              ) : (
                <Bars style={{ fontSize: '20px' }} />
              )}
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
                <Link
                  key={index}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-base font-bold px-3 py-2 rounded-xl transition-all
                    ${
                      isActive
                        ? 'text-orange-600 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/20'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
            {!isPending &&
              (user ? (
                <div className="flex items-center justify-between w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.image || 'https://unsplash.com'}
                      alt="User Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-30">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm font-bold text-rose-600 dark:text-rose-400 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full text-center py-2.5 text-sm font-bold text-white bg-orange-600 dark:bg-orange-500 rounded-xl shadow-md">
                      Sign Up
                    </button>
                  </Link>
                </>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
