import { DashboardSidebar } from '@/components/Dashboard/DashboardSidebar';
import { requireRole } from '@/lib/session';

export default async function AdminDashboardLayout({ children }) {
  await requireRole('admin');

  return (
    <section className="w-full min-h-[90vh] bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row">
        <DashboardSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </section>
  );
}
