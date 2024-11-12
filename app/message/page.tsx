"use client";

import { TypewriterEffectSmooth } from "@/components/TypewritterEffect";
export default function Message() {
  const words = [
    {
      text: "谁",
    },
    {
      text: "看",
    },
    {
      text: "谁",
    },
    {
      text: "小",
    },
    {
      text: "狗",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
