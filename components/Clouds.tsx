"use client";

import { useEffect, useRef } from "react";

export default function Clouds() {
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

    const PX = 4; // pixel size

    // Mario-style cloud sprite (pixel art)
    // 0 = transparent, 1 = outline, 2 = white fill, 3 = highlight
    const SPRITE = [
      [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
      [0,0,0,0,0,1,2,2,2,1,0,0,0,0,0,1,2,2,2,1,0,0,0,0],
      [0,0,0,0,1,2,2,3,2,2,1,0,0,0,1,2,2,3,2,2,1,0,0,0],
      [0,0,1,1,2,2,3,3,2,2,2,1,1,1,2,2,3,3,2,2,2,1,0,0],
      [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
      [1,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,1],
      [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
      [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    ];

    function createCloudImage(opacity: number): HTMLCanvasElement {
      const off = document.createElement("canvas");
      off.width = SPRITE[0].length * PX;
      off.height = SPRITE.length * PX;
      const c = off.getContext("2d")!;

      const colors: Record<number, string> = isDark
        ? {
            1: `rgba(140, 150, 170, ${opacity * 0.8})`,
            2: `rgba(190, 200, 220, ${opacity})`,
            3: `rgba(220, 230, 245, ${opacity})`,
          }
        : {
            1: `rgba(60, 70, 90, ${opacity * 0.7})`,
            2: `rgba(80, 95, 120, ${opacity})`,
            3: `rgba(100, 115, 140, ${opacity})`,
          };

      SPRITE.forEach((row, y) => {
        row.forEach((val, x) => {
          if (val === 0) return;
          c.fillStyle = colors[val];
          c.fillRect(x * PX, y * PX, PX, PX);
        });
      });

      return off;
    }

    const cloudImages = [0.22, 0.18, 0.25, 0.2].map((op) => createCloudImage(op));

    interface Cloud {
      x: number;
      y: number;
      scale: number;
      speed: number;
      imgIdx: number;
    }

    const clouds: Cloud[] = [];
    for (let i = 0; i < 10; i++) {
      const img = cloudImages[i % cloudImages.length];
      clouds.push({
        x: -200 + Math.random() * (canvas.width + 400),
        y: 20 + Math.random() * canvas.height * 0.4,
        scale: 1.2 + Math.random() * 1.8,
        speed: 0.15 + Math.random() * 0.3,
        imgIdx: i % cloudImages.length,
      });
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Keep pixel art crisp
      ctx.imageSmoothingEnabled = false;

      clouds.forEach((c) => {
        c.x += c.speed;
        const img = cloudImages[c.imgIdx];
        const w = img.width * c.scale;
        const h = img.height * c.scale;

        if (c.x > canvas.width + w) {
          c.x = -w;
          c.y = 20 + Math.random() * canvas.height * 0.4;
        }

        ctx.drawImage(img, c.x, c.y, w, h);
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
