"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface NeonTextProps {
  children: string;
  className?: string;
  color?: string;
}

export default function NeonText({ children, className, color = "#a855f7" }: NeonTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn("relative inline-block font-bold", className)}
      style={{
        color: color,
        textShadow: `
          0 0 7px ${color}80,
          0 0 20px ${color}40,
          0 0 40px ${color}20
        `,
      }}
    >
      <motion.span
        animate={{
          textShadow: [
            `0 0 7px ${color}80, 0 0 20px ${color}40, 0 0 40px ${color}20`,
            `0 0 10px ${color}a0, 0 0 30px ${color}60, 0 0 60px ${color}30`,
            `0 0 7px ${color}80, 0 0 20px ${color}40, 0 0 40px ${color}20`,
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
