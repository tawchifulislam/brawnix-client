export default function CardSkeleton() {
  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-slate-100 dark:bg-slate-800" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded-full" />
        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-3/4" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-1/2" />
        <div className="flex items-center justify-between mt-4">
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-1/4" />
          <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-lg w-1/4" />
        </div>
      </div>
    </div>
  );
}
