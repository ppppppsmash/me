"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

function SunParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number;
      y: number;
      r: number;
      speed: number;
      opacity: number;
      phase: number;
      phaseSpeed: number;
      drift: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1 + Math.random() * 2.5,
        speed: 0.1 + Math.random() * 0.3,
        opacity: 0.15 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.005 + Math.random() * 0.01,
        drift: (Math.random() - 0.5) * 0.3,
      });
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.phase += p.phaseSpeed;
        p.x += p.drift + Math.sin(p.phase) * 0.2;
        p.y -= p.speed;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        const flicker = 0.7 + Math.sin(p.phase * 2) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 230, 160, ${p.opacity * flicker})`;
        ctx.fill();
      });
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-50 pointer-events-none"
    />
  );
}

export default function Sunny({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(40, 100%, 85%, .10) 0, hsla(40, 100%, 65%, .04) 50%, hsla(40, 100%, 55%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(40, 100%, 85%, .08) 0, hsla(40, 100%, 65%, .03) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(40, 100%, 85%, .06) 0, hsla(40, 100%, 55%, .02) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
  className,
}: {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
  className?: string;
} = {}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={cn("pointer-events-none fixed inset-0 h-[100svh] w-full overflow-hidden z-[-5]", className)}
    >
      {/* Left light beam */}
      <motion.div
        animate={{
          x: [0, xOffset, 0],
          y: [0, 30, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{ duration: duration * 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
      >
        <motion.div
          animate={{ x: [-100, 200, -100] }}
          transition={{ duration: duration * 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <div
            style={{
              transform: `translateY(${translateY}px) rotate(-45deg)`,
              background: gradientFirst,
              width: `${width}px`,
              height: `${height}px`,
            }}
            className="absolute top-0 left-0"
          />
          <div
            style={{
              transform: "rotate(-45deg) translate(5%, -50%)",
              background: gradientSecond,
              width: `${smallWidth}px`,
              height: `${height}px`,
            }}
            className="absolute top-0 left-0 origin-top-left"
          />
          <div
            style={{
              transform: "rotate(-45deg) translate(-180%, -70%)",
              background: gradientThird,
              width: `${smallWidth}px`,
              height: `${height}px`,
            }}
            className="absolute top-0 left-0 origin-top-left"
          />
        </motion.div>
      </motion.div>

      {/* Right light beam */}
      <motion.div
        animate={{
          x: [0, -xOffset, 0],
          y: [0, -20, 0],
          rotate: [2, -2, 2],
        }}
        transition={{ duration: duration * 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 right-0 w-screen h-screen pointer-events-none"
      >
        <motion.div
          animate={{ x: [100, -150, 100] }}
          transition={{ duration: duration * 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <div
            style={{
              transform: `translateY(${translateY}px) rotate(45deg)`,
              background: gradientFirst,
              width: `${width}px`,
              height: `${height}px`,
            }}
            className="absolute top-0 right-0"
          />
          <div
            style={{
              transform: "rotate(45deg) translate(-5%, -50%)",
              background: gradientSecond,
              width: `${smallWidth}px`,
              height: `${height}px`,
            }}
            className="absolute top-0 right-0 origin-top-right"
          />
          <div
            style={{
              transform: "rotate(45deg) translate(180%, -70%)",
              background: gradientThird,
              width: `${smallWidth}px`,
              height: `${height}px`,
            }}
            className="absolute top-0 right-0 origin-top-right"
          />
        </motion.div>
      </motion.div>

      {/* Floating light particles */}
      <SunParticles />
    </motion.div>
  );
}
