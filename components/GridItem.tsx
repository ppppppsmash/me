"use client";

import { GlowingEffect } from "@/components/GlowingEffect";
import { LinkPreview } from "@/components/LinkPreview";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

interface GridItemProps {
  area?: string;
  icon?: React.ReactNode;
  title: string;
  description: React.ReactNode;
  skill: string;
  url: string;
}

export const GridItem = ({ area, title, description, url, skill }: GridItemProps) => {
  // Split skill string into tags
  const tags = skill.split("+").map((s) => s.trim()).filter(Boolean);

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("list-none md:min-h-[14rem] min-h-[8rem] col-span-2", area)}
    >
      <LinkPreview url={url}>
        <div className="relative h-full rounded-2.5xl border p-1 md:rounded-3xl rounded-xl">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border-0.75 p-5 backdrop-blur-xl
            bg-white/60 border-neutral-200 shadow-sm
            dark:bg-black/20 dark:border-white/10 dark:shadow-[0px_0px_27px_0px_#2D2D2D]
            md:p-6 transition-all duration-300
            hover:bg-white/80 hover:border-neutral-300
            dark:hover:bg-black/30 dark:hover:border-white/20
            group"
          >
            <div className="relative flex flex-col flex-1 justify-between gap-3 z-10">
              <div>
                <h3 className="text-[15px] font-semibold leading-snug dark:text-neutral-100 text-neutral-800">
                  {title}
                </h3>
                <p className="text-[13px] leading-relaxed dark:text-neutral-400 text-neutral-500 mt-2">
                  {description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-1">
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
        </div>
      </LinkPreview>
    </motion.li>
  );
};
