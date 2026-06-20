import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { ArrowChevronLeft } from '@gravity-ui/icons';

async function getForumDetails(id) {
  const nextHeaders = await headers();
  const cookieHeader = nextHeaders.get('cookie') || '';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/forum/${id}`,
    {
      cache: 'no-store',
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  if (!response.ok) return null;
  return response.json();
}

export default async function ForumDetailsPage({ params }) {
  const resolvedParams = await params;
  const post = await getForumDetails(resolvedParams.id);

  if (!post) {
    redirect('/login');
  }

  return (
    <section className="w-full bg-white dark:bg-slate-900 min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link
            href="/forum"
            className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-orange-600 dark:text-orange-400 border border-slate-200/60 dark:border-slate-800 transition-all"
          >
            <ArrowChevronLeft style={{ fontSize: '16px' }} />
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight font-sans">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mt-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-2xl">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-orange-500/20">
              <Image
                src={post.authorImage || 'https://unsplash.com'}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-900 dark:text-slate-100 leading-none">
                {post.authorName || 'Elite Coach'}
              </span>
              <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                Brawnix Contributor
              </span>
            </div>
          </div>
        </div>

        <div className="w-full aspect-16/10 sm:aspect-video rounded-3xl overflow-hidden relative bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-md mb-8">
          <Image
            src={post.image || 'https://images.unsplash.com'}
            alt={post.title}
            fill
            sizes="(max-w-3xl) 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-2 sm:p-4">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-line">
            {post.description}
          </p>
        </div>
      </div>
    </section>
  );
}
