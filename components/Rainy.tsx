"use client";

import { useEffect, useRef } from "react";

export default function Rainy() {
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
      opacity: number;
      width: number;
    }

    interface Splash {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      maxRadius: number;
    }

    const drops: Drop[] = [];
    for (let i = 0; i < 400; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: 15 + Math.random() * 20,
        speed: 12 + Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.25,
        width: 0.8 + Math.random() * 0.7,
      });
    }

    const splashes: Splash[] = [];

    function animate() {
      if (!canvas) return;
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw rain drops
      drops.forEach((d) => {
        ctx.strokeStyle = `rgba(160, 180, 220, ${d.opacity})`;
        ctx.lineWidth = d.width;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 3, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;
        d.x -= 2;

        // Hit the ground — create splash
        if (d.y > canvas.height) {
          if (Math.random() < 0.3) {
            splashes.push({
              x: d.x,
              y: canvas.height - 2,
              radius: 1,
              opacity: 0.4,
              maxRadius: 4 + Math.random() * 6,
            });
          }
          d.y = -d.len - Math.random() * 100;
          d.x = Math.random() * canvas.width;
        }
        if (d.x < 0) d.x = canvas.width;
      });

      // Draw splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        ctx.strokeStyle = `rgba(160, 180, 220, ${s.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, s.radius, s.radius * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();

        s.radius += 0.4;
        s.opacity *= 0.92;

        if (s.radius > s.maxRadius || s.opacity < 0.01) {
          splashes.splice(i, 1);
        }
      }
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
