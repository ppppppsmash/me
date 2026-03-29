"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

function SunParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const checkDark = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

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
      if (!canvas) return;
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dark = isDarkRef.current;
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
        const alpha = dark ? p.opacity * flicker : p.opacity * flicker * 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(255, 230, 160, ${alpha})`
          : `rgba(255, 180, 50, ${alpha})`;
        ctx.fill();
      });
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-50 pointer-events-none"
    />
  );
}

const darkGradients = {
  first: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(40, 100%, 85%, .10) 0, hsla(40, 100%, 65%, .04) 50%, hsla(40, 100%, 55%, 0) 80%)",
  second: "radial-gradient(50% 50% at 50% 50%, hsla(40, 100%, 85%, .08) 0, hsla(40, 100%, 65%, .03) 80%, transparent 100%)",
  third: "radial-gradient(50% 50% at 50% 50%, hsla(40, 100%, 85%, .06) 0, hsla(40, 100%, 55%, .02) 80%, transparent 100%)",
};

const lightGradients = {
  first: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(40, 100%, 60%, .25) 0, hsla(40, 100%, 50%, .12) 50%, hsla(40, 100%, 45%, 0) 80%)",
  second: "radial-gradient(50% 50% at 50% 50%, hsla(40, 100%, 60%, .20) 0, hsla(40, 100%, 50%, .08) 80%, transparent 100%)",
  third: "radial-gradient(50% 50% at 50% 50%, hsla(40, 100%, 60%, .15) 0, hsla(40, 100%, 45%, .06) 80%, transparent 100%)",
};

export default function Sunny({
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
  className,
}: {
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
  className?: string;
} = {}) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const gradients = isDark ? darkGradients : lightGradients;
  const gradientFirst = gradients.first;
  const gradientSecond = gradients.second;
  const gradientThird = gradients.third;
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
