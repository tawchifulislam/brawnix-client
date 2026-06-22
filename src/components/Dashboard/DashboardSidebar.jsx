import { getUserSession } from '@/lib/session';
import DashboardSidebarClient from './DashboardSidebarClient';

export async function DashboardSidebar() {
  const user = await getUserSession();

  const userNavLinks = [
    { icon: 'house', href: '/dashboard/user', label: 'Overview' },
    {
      icon: 'calendar',
      href: '/dashboard/user/booked-classes',
      label: 'Booked Classes',
    },
    {
      icon: 'heart',
      href: '/dashboard/user/favorites',
      label: 'Favorite Classes',
    },
    {
      icon: 'fileText',
      href: '/dashboard/user/apply-trainer',
      label: 'Apply as Trainer',
    },
  ];

  const trainerNavLinks = [
    { icon: 'house', href: '/dashboard/trainer', label: 'Overview' },
    {
      icon: 'plusCircle',
      href: '/dashboard/trainer/add-class',
      label: 'Add Class',
    },
    {
      icon: 'layers',
      href: '/dashboard/trainer/my-classes',
      label: 'My Classes',
    },
    {
      icon: 'newspaper',
      href: '/dashboard/trainer/add-forum-post',
      label: 'Add Forum Post',
    },
    {
      icon: 'chatDots',
      href: '/dashboard/trainer/my-forum-posts',
      label: 'My Forum Posts',
    },
  ];

  const adminNavLinks = [
    { icon: 'house', href: '/dashboard/admin', label: 'Overview' },
    {
      icon: 'users',
      href: '/dashboard/admin/manage-users',
      label: 'Manage Users',
    },
    {
      icon: 'fileText',
      href: '/dashboard/admin/applied-trainers',
      label: 'Applied Trainers',
    },
    {
      icon: 'personGear',
      href: '/dashboard/admin/manage-trainers',
      label: 'Manage Trainers',
    },
    {
      icon: 'briefcase',
      href: '/dashboard/admin/manage-classes',
      label: 'Manage Classes',
    },
    {
      icon: 'newspaper',
      href: '/dashboard/admin/add-forum-post',
      label: 'Add Forum Post',
    },
    {
      icon: 'creditCard',
      href: '/dashboard/admin/transactions',
      label: 'Transactions',
    },
    {
      icon: 'chatDots',
      href: '/dashboard/admin/manage-forum-posts',
      label: 'Manage Forum Post',
    },
  ];

  const navLinksMap = {
    user: userNavLinks,
    trainer: trainerNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || 'user'];

  return <DashboardSidebarClient navItems={navItems} />;
}
