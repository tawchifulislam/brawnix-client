'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import ConfirmDialog from '../ConfirmDialog';
import Loading from '@/app/loading';

function subscribe() {
  return () => {};
}

function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const mounted = useIsMounted();
  const { data: session } = authClient.useSession();
  const user = mounted ? session?.user : null;

  const fetchComments = () => {
    fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/api/comments/${postId}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setComments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handlePostComment = async (text, parentId = null) => {
    if (!user) {
      toast.error('Please login first to comment!');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PROXY_URL}/api/comments`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            postId,
            text,
            parentId,
            authorEmail: user.email,
          }),
        },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        fetchComments();
      } else {
        toast.error(data.message || 'Failed to post comment.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateComment = async (id, text) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PROXY_URL}/api/comments/${id}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        fetchComments();
      } else {
        toast.error(data.message || 'Failed to update.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  const handleDeleteComment = id => {
    setDeleteTargetId(id);
  };

  const confirmDeleteComment = async () => {
    const id = deleteTargetId;
    setDeleteTargetId(null);
    if (!id) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PROXY_URL}/api/comments/${id}`,
        { method: 'DELETE', credentials: 'include' },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Comment deleted.');
        setComments(prev => prev.filter(c => c._id !== id));
      } else {
        toast.error(data.message || 'Failed to delete.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  const topLevelComments = comments.filter(c => !c.parentId);

  return (
    <div className="mt-10">
      <h3 className="text-base font-black text-slate-950 dark:text-white tracking-tight mb-4">
        Comments ({comments.length})
      </h3>

      <CommentForm
        user={user}
        onSubmit={text => handlePostComment(text)}
        isSubmitting={isSubmitting}
      />

      {loading ? (
        <Loading />
      ) : topLevelComments.length === 0 ? (
        <p className="text-xs font-bold text-slate-400 py-6 text-center">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        topLevelComments.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            allComments={comments}
            currentUser={user}
            onReply={handlePostComment}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
          />
        ))
      )}

      <ConfirmDialog
        open={!!deleteTargetId}
        title="Delete this comment?"
        description="This action cannot be undone."
        onConfirm={confirmDeleteComment}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
