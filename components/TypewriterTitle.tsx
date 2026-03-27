"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface TypewriterTitleProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function TypewriterTitle({ text, className, speed = 80 }: TypewriterTitleProps) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        // Cursor blinks then disappears
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={cn("font-bold", className)}>
      <span className="dark:text-neutral-100 text-neutral-800">{displayed}</span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[2px] h-[0.8em] dark:bg-neutral-100 bg-neutral-800 ml-0.5 align-middle"
        />
      )}
    </span>
  );
}
