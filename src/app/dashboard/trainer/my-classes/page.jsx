'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { TrashBin, Pencil, Persons } from '@gravity-ui/icons';
import Loading from '@/app/loading';
import UpdateClassModal from '@/components/Dashboard/UpdateClassModal';
import ViewStudentsModal from '@/components/Dashboard/ViewStudentsModal';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function MyClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingClass, setEditingClass] = useState(null);
  const [viewingClass, setViewingClass] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const fetchClasses = () => {
    if (!user?.email) return;
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/classes/trainer/${user.email}`,
      { credentials: 'include' },
    )
      .then(res => res.json())
      .then(data => {
        setClasses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const handleDelete = id => {
    setDeleteTargetId(id);
  };

  const confirmDelete = async () => {
    const id = deleteTargetId;
    setDeleteTargetId(null);
    if (!id) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classes/${id}`,
        { method: 'DELETE', credentials: 'include' },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || 'Class deleted.');
        setClasses(prev => prev.filter(c => c._id !== id));
      } else {
        toast.error(data.message || 'Failed to delete.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  const statusBadge = status => {
    const map = {
      Approved: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      Pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      Rejected: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    };
    return map[status] || 'bg-slate-500/10 text-slate-500';
  };

  if (isPending || loading) {
    return <Loading />;
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
        My Classes
      </h2>

      {classes.length === 0 ? (
        <p className="text-xs font-bold text-slate-400 py-10 text-center bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          You haven&apos;t created any classes yet.
        </p>
      ) : (
        <div className="w-full overflow-hidden border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-xs font-bold text-slate-700 dark:text-slate-300">
                {classes.map(c => (
                  <tr
                    key={c._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                        <Image
                          src={c.image || 'https://unsplash.com'}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-slate-950 dark:text-white font-black truncate max-w-35">
                        {c.className}
                      </span>
                    </td>
                    <td className="py-3 px-4">{c.category}</td>
                    <td className="py-3 px-4 text-orange-600">${c.price}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${statusBadge(c.status)}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewingClass(c)}
                          className="text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          title="View Students"
                        >
                          <Persons style={{ fontSize: '14px' }} />
                        </button>
                        <button
                          onClick={() => setEditingClass(c)}
                          className="text-orange-600 bg-orange-500/10 p-1.5 rounded-lg cursor-pointer hover:bg-orange-500/20 transition-colors"
                          title="Update"
                        >
                          <Pencil style={{ fontSize: '14px' }} />
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="text-rose-600 bg-rose-500/10 p-1.5 rounded-lg cursor-pointer hover:bg-rose-500/20 transition-colors"
                          title="Delete"
                        >
                          <TrashBin style={{ fontSize: '14px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editingClass && (
        <UpdateClassModal
          classData={editingClass}
          onClose={() => setEditingClass(null)}
          onUpdated={fetchClasses}
        />
      )}

      {viewingClass && (
        <ViewStudentsModal
          classId={viewingClass._id}
          className={viewingClass.className}
          onClose={() => setViewingClass(null)}
        />
      )}

      <ConfirmDialog
        open={!!deleteTargetId}
        title="Delete this class?"
        description="This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
