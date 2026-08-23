export default function ForumCardSkeleton() {
  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-slate-100 dark:bg-slate-800" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-4/5" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-full" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-2/3" />
        <div className="flex items-center gap-3 mt-3">
          <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800" />
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-1/4" />
        </div>
      </div>
    </div>
  );
}
