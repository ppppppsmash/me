"use client";

import { SUB_RESUME } from "@/constants";
import { IconCloud } from "@/components/IconCloud";
import { AuroraText } from "@/components/AuroraText";
import { stackSlugs } from "@/constants";
import { GridItem } from "@/components/GridItem";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 + 0.3, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Resume() {
  const images = stackSlugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className="w-full max-w-[800px] md:h-full">
      <div className="p-4 pb-[170px]">
        <h1 className="text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex items-center sticky top-0 z-40 pt-14 pb-2 sm:pt-2">
          <AuroraText className="font-bold">
            Resume
          </AuroraText>
        </h1>

        {/* Skills */}
        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-widest dark:text-neutral-500 text-neutral-400 mb-2 ml-1">
            Skills
          </p>
          <div className="flex justify-center">
            <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden px-6 pb-4 pt-6">
              <IconCloud images={images} />
            </div>
          </div>
        </div>

        {/* Works */}
        <div className="mt-8">
          <p className="text-[11px] uppercase tracking-widest dark:text-neutral-500 text-neutral-400 mb-4 ml-1">
            Works
          </p>
          <ul className="grid md:grid-cols-6 gap-4 row-start-1 col-start-1">
            {SUB_RESUME.map((service, index) => (
              <GridItem
                key={index}
                url={service.url}
                area={service.area}
                title={service.title}
                description={service.description}
                skill={service.skill}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
