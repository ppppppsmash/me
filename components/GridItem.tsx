"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

interface GridItemProps {
  area?: string;
  title: string;
  description: React.ReactNode;
  skill: string;
  url: string;
  index?: number;
}

export const GridItem = ({ area, title, description, url, skill, index = 0 }: GridItemProps) => {
  const [open, setOpen] = useState(false);
  const tags = skill.split("+").map((s) => s.trim()).filter(Boolean);

  return (
    <>
      <motion.li
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn("list-none cursor-pointer", area)}
        onClick={() => setOpen(true)}
      >
        <div
          className="block h-full rounded-xl overflow-hidden
            dark:bg-white/[0.03] bg-black/[0.02]
            border dark:border-white/[0.06] border-black/[0.06]
            transition-all duration-300
            dark:hover:bg-white/[0.06] hover:bg-black/[0.04]
            dark:hover:border-white/[0.12] hover:border-black/[0.1]
            hover:translate-y-[-2px]
            group"
        >
          {/* Live preview thumbnail */}
          <div className="relative w-full h-36 sm:h-40 overflow-hidden">
            <iframe
              src={url}
              title={title}
              className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              tabIndex={-1}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/10 transition-all duration-300" />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 flex flex-col gap-3">
            <div>
              <h3 className="text-[14px] sm:text-[15px] font-semibold leading-snug dark:text-neutral-100 text-neutral-800 group-hover:dark:text-rose-400 group-hover:text-rose-500 transition-colors">
                {title}
              </h3>
              <p className="text-[12px] sm:text-[13px] leading-relaxed dark:text-neutral-400 text-neutral-500 mt-1.5 line-clamp-2">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full
                    dark:bg-white/[0.06] dark:text-neutral-400
                    bg-black/[0.04] text-neutral-500
                    transition-colors group-hover:dark:bg-white/[0.1] group-hover:bg-black/[0.07]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.li>

      {/* Detail Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 dark:bg-black/70 bg-black/50 backdrop-blur-sm" />

            {/* Panel */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-4xl h-[85vh] rounded-2xl overflow-hidden
                dark:bg-neutral-900 bg-white
                border dark:border-white/10 border-neutral-200
                shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b dark:border-white/[0.06] border-neutral-200">
                <div className="flex-1 min-w-0">
                  <h2 className="text-[15px] font-semibold dark:text-neutral-100 text-neutral-800 truncate">
                    {title}
                  </h2>
                  <p className="text-[12px] dark:text-neutral-400 text-neutral-500 mt-0.5 truncate">
                    {description}
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] px-3 py-1.5 rounded-lg
                      dark:bg-white/[0.06] dark:hover:bg-white/[0.1] dark:text-neutral-300
                      bg-black/[0.04] hover:bg-black/[0.08] text-neutral-600
                      transition-colors"
                  >
                    Open
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg
                      dark:hover:bg-white/[0.06] hover:bg-black/[0.04]
                      dark:text-neutral-400 text-neutral-500
                      transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 px-5 py-2 border-b dark:border-white/[0.04] border-neutral-100">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full
                      dark:bg-white/[0.06] dark:text-neutral-400
                      bg-black/[0.04] text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Live iframe */}
              <div className="flex-1 relative">
                <iframe
                  src={url}
                  title={title}
                  className="absolute inset-0 w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
