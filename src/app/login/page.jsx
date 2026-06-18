'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Image from 'next/image';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Welcome back!');
        setFormData({ email: '', password: '' });

        window.location.replace('/');
      } else {
        toast.error(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      toast.error('Connection failed. Please check your backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.error('Google login is being configured with Better Auth.');
  };

  return (
    <section className="w-full min-h-[85vh] bg-white dark:bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className="max-w-md w-full bg-slate-50/60 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 h-32 w-32 bg-orange-500/10 rounded-full blur-2xl" />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
            Login to Brawnix
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
            Welcome back! Enter your details to access your fitness platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all shadow-sm font-semibold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all shadow-sm font-semibold"
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-500/10 transition-all mt-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-50 dark:bg-slate-950 px-2 text-slate-400 dark:text-slate-500 font-bold">
              Or continue with
            </span>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 bg-white dark:bg-slate-900 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition-all cursor-pointer"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google Logo"
            width={20}
            height={20}
            className="w-5 h-5 object-contain"
          />
          <span>Login with Google Account</span>
        </motion.button>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Don&apos;t have an account yet?{' '}
          <Link
            href="/register"
            className="font-bold text-orange-600 dark:text-orange-400 hover:underline"
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default LoginPage;
