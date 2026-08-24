'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ForumCardSkeleton from '@/components/skeletons/ForumCardSkeleton';

export default function LatestForum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/latest`)
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="text-[11px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white mt-1 tracking-tight">
            Latest from the Forum
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ForumCardSkeleton key={i} />
              ))
            : posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="h-full"
                >
                  <Link href={`/forum/${post._id}`} className="h-full block">
                    <div className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 cursor-pointer h-full">
                      <div className="relative w-full h-40 overflow-hidden">
                        <Image
                          src={post.image || 'https://images.unsplash.com'}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="text-sm font-black text-slate-950 dark:text-white line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-slate-200 shrink-0">
                            <Image
                              src={
                                post.authorImage ||
                                'https://images.unsplash.com'
                              }
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate">
                            {post.authorName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-black transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
