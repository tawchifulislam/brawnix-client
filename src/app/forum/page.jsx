import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons';

async function getForumPosts(searchParams) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page || 1;
  const limit = 4;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/forum?page=${page}&limit=${limit}`,
    { cache: 'no-store' },
  );
  if (!response.ok) return { total: 0, posts: [], page: 1, limit: 4 };
  return response.json();
}

export default async function CommunityForumPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const { total, posts, page, limit } =
    await getForumPosts(resolvedSearchParams);

  const currentPage = parseInt(page);
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="w-full bg-white dark:bg-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl font-sans">
            Community Forum
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Welcome to the Brawnix elite knowledge base. Read expert fitness
            tips, community discussions, and nutritional formulas published by
            our professionals.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50/40 dark:bg-slate-950/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
            <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
              No Forum Posts Available
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <div
                key={post._id}
                className="group bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="w-full md:w-56 aspect-16/10 sm:aspect-video md:aspect-4/3 rounded-2xl overflow-hidden relative bg-slate-200 dark:bg-slate-900 shrink-0 border border-slate-100 dark:border-slate-800">
                  <Image
                    src={post.image || 'https://unsplash.com'}
                    alt={post.title}
                    fill
                    sizes="(max-w-4xl) 30vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>

                <div className="grow flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden bg-slate-200">
                        <Image
                          src={post.authorImage || 'https://unsplash.com'}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        By{' '}
                        <span className="text-slate-800 dark:text-slate-200 font-black">
                          {post.authorName || 'Coach'}
                        </span>
                      </span>
                    </div>

                    <h2 className="text-lg font-black text-slate-950 dark:text-white tracking-tight leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                      {post.title}
                    </h2>

                    <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-medium">
                      {post.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-800/40 flex justify-end">
                    <Link href={`/forum/${post._id}`}>
                      <button className="rounded-xl bg-slate-950 hover:bg-orange-600 dark:bg-slate-50 dark:hover:bg-orange-500 px-4 py-2 text-xs font-black text-white dark:text-slate-950 dark:hover:text-white shadow-sm transition-all cursor-pointer">
                        Read Full Article
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4 border-t border-slate-200/60 dark:border-slate-800/80 pt-6 select-none">
            <Link
              href={`/forum?page=${currentPage - 1}`}
              className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm
                ${currentPage <= 1 ? 'pointer-events-none opacity-40 bg-slate-100 dark:bg-slate-900' : ''}`}
            >
              <ChevronLeft style={{ fontSize: '16px' }} />
            </Link>

            <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider bg-slate-100 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/60 px-4 py-2 rounded-xl">
              Page {currentPage} of {totalPages}
            </span>

            <Link
              href={`/forum?page=${currentPage + 1}`}
              className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm
                ${currentPage >= totalPages ? 'pointer-events-none opacity-40 bg-slate-100 dark:bg-slate-900' : ''}`}
            >
              <ChevronRight style={{ fontSize: '16px' }} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
