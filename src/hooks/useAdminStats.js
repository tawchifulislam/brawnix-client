import { useState, useEffect } from 'react';

export function useAdminStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClasses: 0,
    totalBookings: 0,
    roleBreakdown: {},
    classStatusBreakdown: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin-stats`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}
