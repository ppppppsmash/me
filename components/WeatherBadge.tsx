"use client";

import { motion } from "framer-motion";

const weatherInfo: Record<string, { icon: string; label: string }> = {
  Thunderstorm: { icon: "⛈", label: "Thunder" },
  Drizzle: { icon: "🌧", label: "Drizzle" },
  Rain: { icon: "🌧", label: "Rain" },
  Snow: { icon: "❄", label: "Snow" },
  Clouds: { icon: "☁", label: "Cloudy" },
  Fog: { icon: "🌫", label: "Fog" },
  Mist: { icon: "🌫", label: "Mist" },
  Haze: { icon: "🌫", label: "Haze" },
  Clear: { icon: "☀", label: "Clear" },
};

export default function WeatherBadge({ weather }: { weather: string | null }) {
  if (!weather) return null;
  const info = weatherInfo[weather];
  if (!info) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed top-3 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-1.5
        px-2.5 py-1 rounded-full
        dark:bg-white/[0.06] bg-black/[0.04]
        border dark:border-white/[0.08] border-black/[0.06]
        backdrop-blur-sm cursor-default select-none"
    >
      <span className="text-sm leading-none">{info.icon}</span>
      <span className="text-[10px] tracking-wider uppercase dark:text-neutral-400 text-neutral-500 font-medium">
        {info.label}
      </span>
    </motion.div>
  );
}
