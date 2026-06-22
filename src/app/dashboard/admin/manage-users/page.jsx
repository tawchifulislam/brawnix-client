'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Loading from '@/app/loading';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminTargetId, setAdminTargetId] = useState(null);

  const fetchUsers = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockToggle = async (id, currentStatus) => {
    const action = currentStatus === 'blocked' ? 'unblock' : 'block';
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${action}/${id}`,
        { method: 'PATCH', credentials: 'include' },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || `User ${action}ed.`);
        fetchUsers();
      } else {
        toast.error(data.message || 'Action failed.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  const handleMakeAdmin = id => {
    setAdminTargetId(id);
  };

  const confirmMakeAdmin = async () => {
    const id = adminTargetId;
    setAdminTargetId(null);
    if (!id) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/make-admin/${id}`,
        { method: 'PATCH', credentials: 'include' },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || 'User promoted to Admin.');
        fetchUsers();
      } else {
        toast.error(data.message || 'Action failed.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  const roleBadge = role => {
    const map = {
      admin: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      trainer: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
      user: 'bg-slate-500/10 text-slate-500 dark:text-slate-400',
    };
    return map[role] || map.user;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
        Manage Users
      </h2>

      {users.length === 0 ? (
        <p className="text-xs font-bold text-slate-400 py-10 text-center">
          No users found.
        </p>
      ) : (
        <div className="w-full overflow-hidden border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-xs font-bold text-slate-700 dark:text-slate-300">
                {users.map(u => (
                  <tr
                    key={u._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                        <Image
                          src={u.image || 'https://unsplash.com'}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-slate-950 dark:text-white font-black truncate max-w-30">
                        {u.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 truncate max-w-50">{u.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${roleBadge(u.role)}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                          u.status === 'blocked'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBlockToggle(u._id, u.status)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors ${
                            u.status === 'blocked'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20'
                          }`}
                        >
                          {u.status === 'blocked' ? 'Unblock' : 'Block'}
                        </button>

                        {u.role !== 'admin' && (
                          <button
                            onClick={() => handleMakeAdmin(u._id)}
                            className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 cursor-pointer transition-colors"
                          >
                            Make Admin
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!adminTargetId}
        title="Promote this user to Admin?"
        description="They will gain full admin privileges."
        confirmLabel="Promote"
        cancelLabel="Cancel"
        onConfirm={confirmMakeAdmin}
        onCancel={() => setAdminTargetId(null)}
      />
    </div>
  );
}
