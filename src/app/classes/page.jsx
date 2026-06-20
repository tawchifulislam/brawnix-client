import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ClassFilterPanel from '@/components/ClassFilterPanel';
import { SealCheck, ChevronLeft, ChevronRight } from '@gravity-ui/icons';

async function getClasses(searchParams) {
  const search = searchParams?.search || '';
  const category = searchParams?.category || '';

  const page = searchParams?.page || 1;
  const limit = 9;

  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/classes?page=${page}&limit=${limit}&`;
  if (search) url += `search=${search}&`;
  if (category) url += `category=${category}&`;

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) return { total: 0, classes: [], page: 1, limit: 9 };
  const data = await response.json();

  if (Array.isArray(data)) {
    return { total: data.length, classes: data, page: 1, limit: 9 };
  }
  return data;
}

export default async function AllClassesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const { total, classes, page, limit } =
    await getClasses(resolvedSearchParams);

  const currentPage = parseInt(page || 1);
  const totalPages = Math.ceil((total || classes.length) / limit);

  return (
    <section className="w-full bg-white dark:bg-slate-900 min-h-screen py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl font-sans">
            Explore All Classes
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Find the perfect workout session tailored to your fitness goal.
            Browse through our premium modules designed by master trainers.
          </p>
        </div>

        <Suspense>
          <ClassFilterPanel />
        </Suspense>

        {classes.length === 0 ? (
          <div className="text-center py-20 bg-slate-50/40 dark:bg-slate-950/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 max-w-xl mx-auto p-8">
            <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
              No Matching Classes Found
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.map(item => (
                <div
                  key={item._id}
                  className="group relative bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full aspect-16/10 rounded-2xl overflow-hidden mb-5 relative bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <Image
                        src={item.image || 'https://unsplash.com'}
                        alt={item.className || 'Class'}
                        fill
                        sizes="(max-w-7xl) 33vw"
                        className="object-cover group-hover:scale-104 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-slate-950/80 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase tracking-wider text-orange-400">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                      {item.className}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
                      <span className="text-slate-400 dark:text-slate-500">
                        Instructor:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-extrabold">
                        {item.trainerName}
                      </span>
                    </p>

                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 px-3 py-1 text-xs font-extrabold text-orange-600 dark:text-orange-400">
                      <SealCheck /> Total Bookings: {item.bookingCount || 0}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Price / Duration
                      </span>
                      <span className="text-lg font-black text-slate-950 dark:text-white leading-none mt-0.5">
                        ${item.price}{' '}
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          / {item.duration || 'Hour'}
                        </span>
                      </span>
                    </div>

                    <Link href={`/classes/${item._id}`}>
                      <button className="rounded-xl bg-slate-950 hover:bg-orange-600 dark:bg-slate-50 dark:hover:bg-orange-500 px-5 py-2.5 text-xs font-black text-white dark:text-slate-950 dark:hover:text-white shadow-md transition-all duration-300 cursor-pointer">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4 border-t border-slate-200/60 dark:border-slate-800/80 pt-6 select-none">
                <Link
                  href={`/classes?page=${currentPage - 1}${resolvedSearchParams?.search ? `&search=${resolvedSearchParams.search}` : ''}${resolvedSearchParams?.category ? `&category=${resolvedSearchParams.category}` : ''}`}
                  className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm
                    ${currentPage <= 1 ? 'pointer-events-none opacity-40 bg-slate-100 dark:bg-slate-900' : ''}`}
                >
                  <ChevronLeft style={{ fontSize: '16px' }} />
                </Link>

                <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider bg-slate-100 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40 px-4 py-2 rounded-xl">
                  Page {currentPage} of {totalPages}
                </span>

                <Link
                  href={`/classes?page=${currentPage + 1}${resolvedSearchParams?.search ? `&search=${resolvedSearchParams.search}` : ''}${resolvedSearchParams?.category ? `&category=${resolvedSearchParams.category}` : ''}`}
                  className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm
                    ${currentPage >= totalPages ? 'pointer-events-none opacity-40 bg-slate-100 dark:bg-slate-900' : ''}`}
                >
                  <ChevronRight style={{ fontSize: '16px' }} />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
