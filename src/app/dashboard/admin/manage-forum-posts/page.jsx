'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { TrashBin } from '@gravity-ui/icons';
import Loading from '@/app/loading';
import Link from 'next/link';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function ManageForumPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const fetchPosts = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/all`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = id => {
    setDeleteTargetId(id);
  };

  const confirmDelete = async () => {
    const id = deleteTargetId;
    setDeleteTargetId(null);
    if (!id) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forum/admin/${id}`,
        { method: 'DELETE', credentials: 'include' },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || 'Post removed.');
        setPosts(prev => prev.filter(p => p._id !== id));
      } else {
        toast.error(data.message || 'Failed to remove.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
        Manage Forum Post
      </h2>

      {posts.length === 0 ? (
        <p className="text-xs font-bold text-slate-400 py-10 text-center bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          No forum posts found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map(post => (
            <div
              key={post._id}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                  <Image
                    src={post.image || 'https://unsplash.com'}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <Link href={`/forum/${post._id}`} target="_blank">
                    <h3 className="text-xs font-black text-slate-950 dark:text-white truncate hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-[10px] text-slate-400 truncate">
                    By {post.authorName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-rose-600 bg-rose-500/10 p-1.5 rounded-lg cursor-pointer hover:bg-rose-500/20 transition-colors shrink-0"
              >
                <TrashBin style={{ fontSize: '14px' }} />
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTargetId}
        title="Remove this post?"
        description="This action cannot be undone."
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
