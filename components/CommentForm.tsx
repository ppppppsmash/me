"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface CommentFormProps {
  onSubmit: (comment: any) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!name.trim() || !message.trim() || rating === 0) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: name, message, rating }),
      });
      const comment = await res.json();
      if (res.ok) {
        onSubmit(comment);
        setName("");
        setMessage("");
        setRating(0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }, [name, message, rating, onSubmit]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-4 sm:p-5
        dark:bg-white/[0.03] bg-black/[0.02]
        border dark:border-white/[0.06] border-black/[0.06]"
    >
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
          className="w-full px-3 py-2 rounded-lg text-sm
            dark:bg-white/[0.04] bg-black/[0.03]
            border dark:border-white/[0.08] border-black/[0.06]
            dark:text-neutral-200 text-neutral-700
            dark:placeholder-neutral-600 placeholder-neutral-400
            outline-none focus:dark:border-white/[0.15] focus:border-black/[0.12]
            transition-colors"
        />

        <textarea
          placeholder="Leave a comment..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={3}
          className="w-full px-3 py-2 rounded-lg text-sm resize-none
            dark:bg-white/[0.04] bg-black/[0.03]
            border dark:border-white/[0.08] border-black/[0.06]
            dark:text-neutral-200 text-neutral-700
            dark:placeholder-neutral-600 placeholder-neutral-400
            outline-none focus:dark:border-white/[0.15] focus:border-black/[0.12]
            transition-colors"
        />

        <div className="flex items-center justify-between">
          {/* Star rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-colors ${
                    (hoverRating || rating) >= star
                      ? "dark:text-amber-400 text-amber-500"
                      : "dark:text-neutral-600 text-neutral-300"
                  }`}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            ))}
            </div>
            <span className="text-[10px] dark:text-neutral-500 text-neutral-400 min-w-[80px]">
              {(() => {
                const active = hoverRating || rating;
                if (active === 0) return "Rate this site";
                if (active === 1) return "Needs work...";
                if (active === 2) return "Could be better";
                if (active === 3) return "Pretty good!";
                if (active === 4) return "Really cool!";
                return "Masterpiece!";
              })()}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting || !name.trim() || !message.trim() || rating === 0}
            className="px-4 py-1.5 rounded-lg text-[12px] font-medium
              dark:bg-white/[0.08] bg-black/[0.05]
              border dark:border-white/[0.1] border-black/[0.08]
              dark:text-neutral-300 text-neutral-600
              dark:hover:bg-white/[0.12] hover:bg-black/[0.08]
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-colors"
          >
            {submitting ? "..." : "Submit"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
