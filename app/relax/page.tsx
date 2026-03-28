"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import NeonText from "@/components/NeonText";
import CommentForm from "@/components/CommentForm";

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

interface Comment {
  id: string;
  user_name: string;
  message: string;
  rating: number;
  created_at: string;
}

export default function Relax() {
  const [data, setData] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("/api/comments")
      .then((r) => r.json())
      .then((comments) => {
        // Parse stringified JSON if needed
        const parsed = comments.map((c: any) =>
          typeof c === "string" ? JSON.parse(c) : c
        );
        setData(parsed);
      })
      .catch(console.error);
  }, []);

  const handleNewComment = useCallback((comment: Comment) => {
    setData((prev) => [comment, ...prev]);
  }, []);

  return (
    <div className="w-full max-w-[800px] md:h-full">
      <div className="p-4 pb-[170px]">
        <h1 className="text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex items-center sticky top-0 z-40 pt-24 pb-2 sm:pt-2">
          <NeonText color="#f59e0b">Comments</NeonText>
        </h1>

        <div className="mt-6">
          <CommentForm onSubmit={handleNewComment} />
        </div>

        <div className="mt-8 relative">
          <p className="text-[11px] uppercase tracking-widest dark:text-neutral-500 text-neutral-400 mb-4 ml-1">
            {data.length > 0 ? `${data.length} comments` : "No comments yet"}
          </p>

          <ul className="space-y-0.5">
            {data.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="flex items-start gap-3 px-3 py-3
                  dark:bg-white/[0.03] dark:hover:bg-white/[0.06]
                  bg-black/[0.02] hover:bg-black/[0.04]
                  rounded-lg transition-colors"
              >
                {/* Avatar placeholder */}
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold
                  dark:bg-white/[0.08] bg-black/[0.06]
                  dark:text-neutral-400 text-neutral-500">
                  {item.user_name.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium dark:text-neutral-200 text-neutral-700">
                      {item.user_name}
                    </span>
                    <span className="text-[10px] dark:text-neutral-600 text-neutral-400 tabular-nums">
                      {format(new Date(item.created_at), "yyyy-MM-dd HH:mm")}
                    </span>
                  </div>

                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, idx) => (
                      <StarIcon
                        key={idx}
                        className={`h-3 w-3 ${
                          item.rating > idx
                            ? "dark:fill-amber-400 dark:text-amber-400 fill-amber-500 text-amber-500"
                            : "dark:text-neutral-700 text-neutral-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-[13px] dark:text-neutral-400 text-neutral-500 mt-1.5 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
