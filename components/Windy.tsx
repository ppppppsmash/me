"use client";

import { useEffect, useRef } from "react";

export default function Windy() {
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

    interface Drop {
      x: number;
      y: number;
      len: number;
      speed: number;
      windSpeed: number;
      opacity: number;
      width: number;
    }

    const drops: Drop[] = [];
    for (let i = 0; i < 500; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: 18 + Math.random() * 25,
        speed: 16 + Math.random() * 12,
        windSpeed: 6 + Math.random() * 5,
        opacity: 0.12 + Math.random() * 0.22,
        width: 0.6 + Math.random() * 0.8,
      });
    }

    let time = 0;

    function animate() {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Wind gust variation
      const gust = 1 + Math.sin(time * 0.6) * 0.4;

      drops.forEach((d) => {
        const wind = d.windSpeed * gust;
        const endX = d.x - wind * (d.len / d.speed);
        const endY = d.y + d.len;

        ctx.strokeStyle = `rgba(150, 170, 210, ${d.opacity})`;
        ctx.lineWidth = d.width;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        d.y += d.speed;
        d.x -= wind;

        if (d.y > canvas.height || d.x < -20) {
          d.y = -d.len - Math.random() * 80;
          d.x = Math.random() * canvas.width * 1.3;
        }
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
