import { useState, useEffect } from 'react';

export function useBookings(email) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my-bookings?email=${email}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setBookings(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [email]);

  return { bookings, loading, setBookings };
}
