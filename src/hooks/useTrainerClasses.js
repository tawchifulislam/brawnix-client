import { useState, useEffect, useCallback } from 'react';

export function useTrainerClasses(email) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!email) {
      return;
    }

    let active = true;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/trainer/${email}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (active) setClasses(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [email, refreshKey]);

  const refetch = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return { classes, loading, setClasses, refetch };
}
