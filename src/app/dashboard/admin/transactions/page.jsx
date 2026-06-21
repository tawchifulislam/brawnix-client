'use client';

import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setTransactions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
        Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-xs font-bold text-slate-400 py-10 text-center bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          No transactions found.
        </p>
      ) : (
        <div className="w-full overflow-hidden border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">User Email</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-xs font-bold text-slate-700 dark:text-slate-300">
                {transactions.map(t => (
                  <tr
                    key={t._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="py-3 px-4 truncate max-w-45">
                      {t.userEmail}
                    </td>
                    <td className="py-3 px-4 text-slate-950 dark:text-white font-black truncate max-w-35">
                      {t.className}
                    </td>
                    <td className="py-3 px-4 text-orange-600">${t.price}</td>
                    <td className="py-3 px-4">
                      {t.date
                        ? new Date(t.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="py-3 px-4 font-mono text-[10px] text-slate-400 truncate max-w-40">
                      {t.transactionId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
