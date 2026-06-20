import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/session';

export default async function DashboardIndexPage() {
  const user = await getUserSession();

  if (!user) {
    redirect('/login');
  }

  const roleRedirectMap = {
    user: '/dashboard/user',
    trainer: '/dashboard/trainer',
    admin: '/dashboard/admin',
  };

  redirect(roleRedirectMap[user.role] || '/dashboard/user');
}
