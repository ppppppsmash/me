"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export default function GlitchText({ children, className }: GlitchTextProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={cn("relative inline-block font-bold", className)}>
      <span className="relative z-10">{children}</span>
      {glitch && (
        <>
          <span
            className="absolute top-0 left-0 z-20 opacity-80"
            style={{
              color: "#0ff",
              clipPath: "inset(10% 0 60% 0)",
              transform: "translate(-3px, -1px)",
            }}
          >
            {children}
          </span>
          <span
            className="absolute top-0 left-0 z-20 opacity-80"
            style={{
              color: "#f0f",
              clipPath: "inset(50% 0 10% 0)",
              transform: "translate(3px, 1px)",
            }}
          >
            {children}
          </span>
        </>
      )}
      <style jsx>{`
        @keyframes glitch-scan {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.03; }
        }
        span:first-child::after {
          content: '';
          position: absolute;
          top: 0;
          left: -5%;
          width: 110%;
          height: 2px;
          background: currentColor;
          opacity: 0;
          animation: glitch-scan 4s linear infinite;
        }
      `}</style>
    </span>
  );
}
