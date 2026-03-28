"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Thunderstorm from "./Thunderstorm";
import Drizzle from "./Drizzle";
import Snow from "./Snow";
import Clouds from "./Clouds";
import Fog from "./Fog";
import Rainy from "./Rainy";
import Windy from "./Windy";
import Sunny from "./Sunny";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const GLITCH_MESSAGES = [
  "You found me.",
  "01001000 01101001",
  "Welcome to the void.",
  "黒澤を見つけた。",
  "There is no spoon.",
];

// Matrix rain effect
function MatrixRain({ onEnd }: { onEnd: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animId: number;
    let frame = 0;

    function animate() {
      if (!canvas) return;
      animId = requestAnimationFrame(animate);
      frame++;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;

        // Random brightness
        if (Math.random() > 0.5) {
          ctx.fillStyle = `rgb(0, ${150 + Math.random() * 105}, 0)`;
        } else {
          ctx.fillStyle = "#0f0";
        }

        ctx.fillText(char, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      if (frame > 360) {
        cancelAnimationFrame(animId);
        onEnd();
      }
    }

    animate();

    return () => cancelAnimationFrame(animId);
  }, [onEnd]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[99999]"
    />
  );
}

// Glitch message
function GlitchMessage({ onEnd }: { onEnd: () => void }) {
  const [message] = useState(
    GLITCH_MESSAGES[Math.floor(Math.random() * GLITCH_MESSAGES.length)]
  );
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchOffset({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 10,
      });
      setTimeout(() => setGlitchOffset({ x: 0, y: 0 }), 50);
    }, 200);

    const timer = setTimeout(() => {
      clearInterval(interval);
      onEnd();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onEnd]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md"
    >
      <div
        className="relative text-center"
        style={{ transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)` }}
      >
        {/* Cyan layer */}
        <p
          className="text-4xl sm:text-6xl font-bold absolute inset-0 opacity-70"
          style={{ color: "#0ff", clipPath: "inset(10% 0 60% 0)", transform: "translate(-4px, -2px)" }}
        >
          {message}
        </p>
        {/* Magenta layer */}
        <p
          className="text-4xl sm:text-6xl font-bold absolute inset-0 opacity-70"
          style={{ color: "#f0f", clipPath: "inset(50% 0 10% 0)", transform: "translate(4px, 2px)" }}
        >
          {message}
        </p>
        {/* Main text */}
        <p className="text-4xl sm:text-6xl font-bold text-white relative">
          {message}
        </p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 1 }}
          className="text-sm text-neutral-500 mt-6 font-mono"
        >
          ↑↑↓↓←→←→BA
        </motion.p>
      </div>
    </motion.div>
  );
}

// Weather chaos - all effects at once
function WeatherChaos({ onEnd }: { onEnd: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onEnd, 8000);
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Thunderstorm />
      <Snow />
      <Clouds />
      <Sunny />
      <Rainy />
      <Drizzle />
      <Windy />
      <Fog />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999]
          text-4xl sm:text-6xl font-bold text-white text-center
          drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
      >
        <p>WEATHER CHAOS</p>
        <p className="text-sm text-neutral-400 mt-2 font-mono">all effects activated</p>
      </motion.div>
    </motion.div>
  );
}

const EFFECTS = [MatrixRain, GlitchMessage, WeatherChaos];

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [EffectComponent, setEffectComponent] = useState<typeof EFFECTS[number] | null>(null);
  const inputRef = useRef<string[]>([]);

  const endEffect = useCallback(() => {
    setActive(false);
    setEffectComponent(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      inputRef.current.push(e.key);

      // Keep only last 10 keys
      if (inputRef.current.length > 10) {
        inputRef.current = inputRef.current.slice(-10);
      }

      // Check match
      if (inputRef.current.length === 10 &&
        inputRef.current.every((key, i) => key === KONAMI[i])
      ) {
        inputRef.current = [];
        if (!active) {
          setActive(true);
          const RandomEffect = EFFECTS[Math.floor(Math.random() * EFFECTS.length)];
          setEffectComponent(() => RandomEffect);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  return (
    <AnimatePresence>
      {active && EffectComponent && <EffectComponent onEnd={endEffect} />}
    </AnimatePresence>
  );
}
