"use client";

import { useEffect, useRef } from "react";

export default function Thunderstorm() {
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

    // Rain drops
    const drops: { x: number; y: number; len: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 300; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: 12 + Math.random() * 18,
        speed: 14 + Math.random() * 10,
        opacity: 0.15 + Math.random() * 0.25,
      });
    }

    // Lightning state
    let flashOpacity = 0;
    let flashDecay = 0;
    let nextFlash = performance.now() + 2000 + Math.random() * 5000;
    let boltSegments: { x1: number; y1: number; x2: number; y2: number }[] = [];
    let boltOpacity = 0;

    function generateBolt() {
      const segments: typeof boltSegments = [];
      let x = canvas.width * (0.2 + Math.random() * 0.6);
      let y = 0;
      const targetY = canvas.height * (0.5 + Math.random() * 0.3);

      while (y < targetY) {
        const nx = x + (Math.random() - 0.5) * 80;
        const ny = y + 20 + Math.random() * 40;
        segments.push({ x1: x, y1: y, x2: nx, y2: ny });

        // Branch occasionally
        if (Math.random() < 0.25) {
          const bx = nx + (Math.random() - 0.5) * 60;
          const by = ny + 15 + Math.random() * 30;
          segments.push({ x1: nx, y1: ny, x2: bx, y2: by });
        }

        x = nx;
        y = ny;
      }
      return segments;
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();

      // Flash
      if (now > nextFlash) {
        flashOpacity = 0.25 + Math.random() * 0.15;
        flashDecay = 0.92 + Math.random() * 0.04;
        boltSegments = generateBolt();
        boltOpacity = 1;
        nextFlash = now + 3000 + Math.random() * 8000;
      }

      // Draw flash overlay
      if (flashOpacity > 0.01) {
        ctx.fillStyle = `rgba(200, 200, 255, ${flashOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        flashOpacity *= flashDecay;
      }

      // Draw bolt
      if (boltOpacity > 0.02) {
        ctx.strokeStyle = `rgba(220, 220, 255, ${boltOpacity})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = `rgba(150, 150, 255, ${boltOpacity * 0.8})`;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        boltSegments.forEach((s) => {
          ctx.moveTo(s.x1, s.y1);
          ctx.lineTo(s.x2, s.y2);
        });
        ctx.stroke();
        ctx.shadowBlur = 0;
        boltOpacity *= 0.93;
      }

      // Draw rain
      drops.forEach((d) => {
        ctx.strokeStyle = `rgba(180, 200, 230, ${d.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;
        d.x -= 1.5;

        if (d.y > canvas.height) {
          d.y = -d.len;
          d.x = Math.random() * canvas.width;
        }
        if (d.x < 0) d.x = canvas.width;
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
