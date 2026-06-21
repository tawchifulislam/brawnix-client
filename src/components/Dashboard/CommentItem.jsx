'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Pencil, TrashBin, ArrowUturnCcwLeft } from '@gravity-ui/icons';
import CommentForm from './CommentForm';

export default function CommentItem({
  comment,
  allComments,
  currentUser,
  onReply,
  onUpdate,
  onDelete,
  isReply = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const isOwner = currentUser?.email === comment.authorEmail;
  const replies = allComments.filter(c => c.parentId === comment._id);

  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    onUpdate(comment._id, editText);
    setIsEditing(false);
  };

  const handleReplySubmit = text => {
    onReply(text, comment._id);
    setIsReplying(false);
  };

  return (
    <div className={isReply ? 'ml-10 mt-3' : 'mt-4'}>
      <div className="flex gap-3">
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0">
          <Image
            src={comment.authorImage || 'https://unsplash.com'}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl px-4 py-2.5">
            <p className="text-xs font-black text-slate-950 dark:text-white">
              {comment.authorName}
            </p>

            {isEditing ? (
              <div className="mt-1.5 space-y-2">
                <textarea
                  rows={2}
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:outline-none resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="text-[11px] font-bold text-orange-600 cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-[11px] font-bold text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                {comment.text}
              </p>
            )}
          </div>

          {!isEditing && (
            <div className="flex items-center gap-3 mt-1.5 px-1">
              {!isReply && (
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="text-[11px] font-bold text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowUturnCcwLeft style={{ fontSize: '12px' }} />
                  Reply
                </button>
              )}
              {isOwner && (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditText(comment.text);
                    }}
                    className="text-[11px] font-bold text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 cursor-pointer"
                  >
                    <Pencil style={{ fontSize: '12px' }} />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(comment._id)}
                    className="text-[11px] font-bold text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 cursor-pointer"
                  >
                    <TrashBin style={{ fontSize: '12px' }} />
                    Delete
                  </button>
                </>
              )}
            </div>
          )}

          {isReplying && (
            <div className="mt-2">
              <CommentForm
                user={currentUser}
                onSubmit={handleReplySubmit}
                isSubmitting={false}
                placeholder="Write a reply..."
                submitLabel="Reply"
                showAvatar={false}
              />
            </div>
          )}

          {replies.map(reply => (
            <CommentItem
              key={reply._id}
              comment={reply}
              allComments={allComments}
              currentUser={currentUser}
              onReply={onReply}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isReply
            />
          ))}
        </div>
      </div>
    </div>
  );
}
