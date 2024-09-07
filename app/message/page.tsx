"use client";

import { TypewriterEffectSmooth } from "@/components/TypewritterEffect";
export default function Message() {
  const words = [
    {
      text: "我",
    },
    {
      text: "很",
    },
    {
      text: "想",
    },
    {
      text: "你",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
