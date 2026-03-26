"use client";

import { HOBBY, INFO } from "@/constants";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/3dCard";
import { AuroraText } from "@/components/AuroraText";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 + 0.4, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function About() {
  return (
    <div className="w-full max-w-[800px] md:h-[100vh]">
      <div className="p-4 pb-20">
        <h1 className="text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex items-center sticky top-0 z-40 py-2">
          <AuroraText className="font-bold">
            About Me
          </AuroraText>
        </h1>

        <div className="flex justify-between mt-6">
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-widest dark:text-neutral-500 text-neutral-400 mb-4 ml-1">
              Profile
            </p>
            <dl className="space-y-0.5">
              {INFO.map((info, index) => (
                <motion.div
                  key={info.label}
                  variants={item}
                  initial="hidden"
                  animate="show"
                  custom={index}
                  className="flex items-baseline gap-3 px-3 py-2.5
                    dark:hover:bg-white/[0.03] hover:bg-black/[0.03]
                    rounded-md transition-colors group"
                >
                  <dt className="text-[11px] uppercase tracking-wider dark:text-neutral-500 text-neutral-400 w-20 shrink-0">
                    {info.label}
                  </dt>
                  <dd className="text-sm dark:text-neutral-200 text-neutral-700 group-hover:translate-x-0.5 transition-transform">
                    {info.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>

          <div className="w-full max-w-[240px] m-auto p-0 absolute sm:relative right-0 z-50">
            <CardContainer className="inter-var">
              <CardBody>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src="/images/_me_.png"
                    width="200"
                    className="w-full object-cover group-hover/card:shadow-xl rounded-lg"
                    alt="thumbnail"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-[11px] uppercase tracking-widest dark:text-neutral-500 text-neutral-400 mb-4 ml-1">
            Hobby
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOBBY.map((hobby, index) => (
              <motion.div
                key={hobby.label}
                variants={item}
                initial="hidden"
                animate="show"
                custom={index + INFO.length}
                className="px-4 py-3 rounded-lg
                  dark:bg-white/[0.03] dark:hover:bg-white/[0.06]
                  bg-black/[0.02] hover:bg-black/[0.04]
                  transition-colors group cursor-default"
              >
                <p className="text-[11px] uppercase tracking-wider dark:text-neutral-500 text-neutral-400 mb-1">
                  {hobby.label}
                </p>
                <p className="text-[13px] dark:text-neutral-200 text-neutral-700 leading-relaxed group-hover:translate-x-0.5 transition-transform">
                  {hobby.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
