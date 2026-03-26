"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Fog() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const fogColor = isDark ? "rgba(15,15,25," : "rgba(210,215,225,";

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Base haze */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `${fogColor}0.15)` }}
      />

      {/* Drifting fog layers */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute w-[200vw] h-[30vh]"
          style={{
            top: `${i * 20}%`,
            background: `linear-gradient(90deg,
              ${fogColor}0) 0%,
              ${fogColor}${0.12 + i * 0.02}) 20%,
              ${fogColor}${0.18 + i * 0.02}) 50%,
              ${fogColor}${0.12 + i * 0.02}) 80%,
              ${fogColor}0) 100%
            )`,
            filter: "blur(40px)",
          }}
          animate={{
            x: ["-50%", "0%", "-50%"],
            y: [0, i % 2 === 0 ? 20 : -20, 0],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
