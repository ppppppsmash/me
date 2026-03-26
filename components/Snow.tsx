"use client";

import { useEffect, useRef } from "react";

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const isDark = document.documentElement.classList.contains("dark");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const flakes: {
      x: number; y: number; r: number; speed: number;
      opacity: number; phase: number; swaySpeed: number; swayAmp: number;
    }[] = [];

    for (let i = 0; i < 200; i++) {
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1.5 + Math.random() * 3,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.4 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        swaySpeed: 0.005 + Math.random() * 0.01,
        swayAmp: 0.5 + Math.random() * 1,
      });
    }

    function animate() {
      if (!canvas) return;
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flakes.forEach((f) => {
        f.phase += f.swaySpeed;
        f.x += Math.sin(f.phase) * f.swayAmp;
        f.y += f.speed;

        if (f.y > canvas.height + f.r) {
          f.y = -f.r;
          f.x = Math.random() * canvas.width;
        }
        if (f.x > canvas.width) f.x = 0;
        if (f.x < 0) f.x = canvas.width;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(230, 235, 245, ${f.opacity})`
          : `rgba(80, 100, 140, ${f.opacity})`;
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
      className="fixed inset-0 z-[-5] pointer-events-none"
    />
  );
}
