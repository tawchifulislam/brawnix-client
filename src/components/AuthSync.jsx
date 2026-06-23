'use client';

import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

export default function AuthSync() {
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user) {
      fetch('/api/set-token');
    }
  }, [session]);

  return null;
}
