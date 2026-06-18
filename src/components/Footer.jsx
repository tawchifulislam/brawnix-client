import React from 'react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Classes', path: '/classes' },
    { name: 'Community Forum', path: '/forum' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1 flex flex-col gap-4">
            <Logo size={36} showText={true} />
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Elevate your fitness journey with next-generation gym management
              and elite training tracking.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2.5">
                <svg
                  className="h-4 w-4 text-orange-600 dark:text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>support@brawnix.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg
                  className="h-4 w-4 text-orange-600 dark:text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+880 1234-567890</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                aria-label="X (formerly Twitter)"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-[#1877F2] dark:hover:bg-[#1877F2] transition-all duration-300"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-linear-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.01 3.8.058 1.02.047 1.704.208 2.312.444a4.902 4.902 0 011.751 1.139 4.902 4.902 0 011.139 1.751c.236.608.396 1.29.444 2.312.047 1.015.058 1.37.058 3.8s-.01 2.784-.058 3.8c-.047 1.02-.208 1.704-.444 2.312a4.902 4.902 0 01-1.139 1.751 4.902 4.902 0 01-1.751 1.139c-.608.236-1.29.396-2.312.444-1.015.047-1.37.058-3.8.058s-2.784-.01-3.8-.058c-1.02-.047-1.704-.208-2.312-.444a4.902 4.902 0 01-1.751-1.139 4.902 4.902 0 01-1.139-1.751c-.236-.608-.396-1.29-.444-2.312-.047-1.015-.058-1.37-.058-3.8s.01-2.784.058-3.8c.047-1.02.208-1.704.444-2.312a4.902 4.902 0 011.139-1.751 4.902 4.902 0 011.751-1.139c.608-.236 1.29-.396 2.312-.444 1.015-.047 1.37-.058 3.8-.058zM12 6.865A5.135 5.135 0 1017.135 12 5.135 5.135 0 0012 6.865zm0 8.441a3.306 3.306 0 110-6.612 3.306 3.306 0 010 6.612zm5.416-9.6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            &copy; {currentYear}{' '}
            <span className="font-bold text-slate-900 dark:text-slate-100">
              Brawnix
            </span>
            . All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Crafted for Elite Fitness Centers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
