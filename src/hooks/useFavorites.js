import { useState, useEffect } from 'react';

export function useFavorites(email) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites?email=${email}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setFavorites(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [email]);

  return { favorites, loading, setFavorites };
}
