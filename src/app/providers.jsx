'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
