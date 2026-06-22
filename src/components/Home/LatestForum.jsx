'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Loading from '@/app/loading';

const LatestForum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/forum/latest`,
        );
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        }
      } catch (error) {
        console.error('Failed to fetch latest forum posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="w-full bg-white dark:bg-slate-900 py-16 lg:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-3">
            Knowledge Base
          </h2>
          <p className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl font-sans">
            Latest From Our Forum
          </p>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Stay updated with executive fitness advice, nutrition guides, and
            athletic insights published directly by Brawnix coaches and
            administrators.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {posts.map(post => (
            <motion.div
              key={post._id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-4 shadow-sm hover:shadow-xl hover:shadow-orange-500/2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-full aspect-16/11 rounded-2xl overflow-hidden mb-4 relative bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <Image
                    src={post.image || 'https://unsplash.com'}
                    alt={post.title}
                    fill
                    sizes="(max-w-7xl) 25vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                    <Image
                      src={post.authorImage || 'https://unsplash.com'}
                      alt={post.authorName || 'Author'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate max-w-30">
                    By {post.authorName || 'Trainer'}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-950 dark:text-white tracking-tight leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-medium">
                  {post.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 w-full">
                <Link href={`/forum/${post._id}`}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-orange-600 dark:bg-slate-900 dark:hover:bg-orange-500 text-[11px] font-extrabold text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white border border-slate-200/50 dark:border-slate-800 transition-all cursor-pointer"
                  >
                    Read More
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestForum;
