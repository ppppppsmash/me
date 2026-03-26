"use client";

import { useEffect, useRef } from "react";

export default function Drizzle() {
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

    // Fine, gentle rain drops
    const drops: { x: number; y: number; len: number; speed: number; opacity: number; drift: number }[] = [];
    for (let i = 0; i < 250; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: 8 + Math.random() * 10,
        speed: 3 + Math.random() * 4,
        opacity: 0.2 + Math.random() * 0.3,
        drift: (Math.random() - 0.5) * 0.4,
      });
    }

    // Mist layer
    let time = 0;

    function animate() {
      if (!canvas) return;
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // Soft mist overlay
      const mistAlpha = 0.03 + Math.sin(time * 0.8) * 0.01;
      ctx.fillStyle = `rgba(180, 190, 210, ${mistAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw fine drizzle
      drops.forEach((d) => {
        ctx.strokeStyle = `rgba(150, 170, 210, ${d.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.drift * d.len, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;
        d.x += d.drift;

        if (d.y > canvas.height) {
          d.y = -d.len;
          d.x = Math.random() * canvas.width;
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
