'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bars,
  BellDot,
  Briefcase,
  Calendar,
  CirclePlus,
  CreditCard,
  FilePlus,
  FileText,
  Heart,
  House,
  Layers,
  Person,
  PersonGear,
  Xmark,
} from '@gravity-ui/icons';

const ICON_MAP = {
  house: House,
  calendar: Calendar,
  heart: Heart,
  fileText: FileText,
  plusCircle: CirclePlus,
  layers: Layers,
  newspaper: FilePlus,
  chatDots: BellDot,
  users: Person,
  personGear: PersonGear,
  briefcase: Briefcase,
  creditCard: CreditCard,
};

export default function DashboardSidebarClient({ navItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map(item => {
        const isActive = pathname === item.href;
        const Icon = ICON_MAP[item.icon];
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold transition-all
              ${
                isActive
                  ? 'bg-orange-600 dark:bg-orange-500 text-white shadow-md shadow-orange-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
              }`}
          >
            {Icon && (
              <Icon
                style={{ fontSize: '18px' }}
                className={isActive ? 'text-white' : 'text-slate-400'}
              />
            )}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 p-4">
        <div className="px-3 py-2 mb-4">
          <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">
            Control Center
          </span>
          <h1 className="text-lg font-black text-slate-950 dark:text-white mt-0.5">
            Dashboard
          </h1>
        </div>
        {navContent}
      </aside>

      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-base font-black text-slate-950 dark:text-white">
          Dashboard
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Bars style={{ fontSize: '20px' }} />
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-72 max-w-[80%] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between mb-6 px-1">
              <div>
                <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">
                  Control Center
                </span>
                <h1 className="text-lg font-black text-slate-950 dark:text-white mt-0.5">
                  Dashboard
                </h1>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Xmark style={{ fontSize: '18px' }} />
              </button>
            </div>
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
