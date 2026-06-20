import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 antialiased"
      >
        <Providers>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className:
              'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-xl font-bold text-xs shadow-xl',
          }}
        />
      </body>
    </html>
  );
}
