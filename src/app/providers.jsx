'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AuthProvider } from './context/AuthContext';

export function Providers({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthProvider>{children}</AuthProvider>
    </NextThemesProvider>
  );
}
