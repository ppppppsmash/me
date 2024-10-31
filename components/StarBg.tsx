'use client'

import { useEffect, useRef } from "react";

interface StarfieldProps {
  color?: string;
  count?: number;
  className?: string;
}

const StarBg: React.FC<StarfieldProps> = ({
  color = "#FFF",
  count = 200,
  className = "",
}) => {
  const starsCanvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = starsCanvas.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const perspective = canvas.width / 2;
    const stars: { x: number; y: number; z: number; speed: number }[] = [];

    for (let i = 0; i < count; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2 * canvas.width,
        y: (Math.random() - 0.5) * 2 * canvas.height,
        z: Math.random() * canvas.width,
        speed: Math.random() * 5 + 2,
      });
    }

    const hexToRgb = () => {
      let hex = color.replace(/^#/, "");
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((char) => char + char)
          .join("");
      }
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    };

    const drawStar = (star: { x: number; y: number; z: number; speed: number }) => {
      const scale = perspective / (perspective + star.z);
      const x2d = canvas.width / 2 + star.x * scale;
      const y2d = canvas.height / 2 + star.y * scale;
      const size = Math.max(scale * 3, 0.5);
      const prevScale = perspective / (perspective + star.z + star.speed * 15);
      const xPrev = canvas.width / 2 + star.x * prevScale;
      const yPrev = canvas.height / 2 + star.y * prevScale;
      const rgb = hexToRgb();

      ctx.save();
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
      ctx.lineWidth = size * 2.5;
      ctx.shadowBlur = 35;
      ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
      ctx.beginPath();
      ctx.moveTo(x2d, y2d);
      ctx.lineTo(xPrev, yPrev);
      ctx.stroke();
      ctx.restore();

      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(x2d, y2d);
      ctx.lineTo(xPrev, yPrev);
      ctx.stroke();

      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
      ctx.beginPath();
      ctx.arc(x2d, y2d, size / 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        drawStar(star);
        star.z -= star.speed;

        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = (Math.random() - 0.5) * 2 * canvas.width;
          star.y = (Math.random() - 0.5) * 2 * canvas.height;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color, count]);

  return <canvas ref={starsCanvas} className={`absolute inset-0 w-full h-full ${className}`}></canvas>;
};

export default StarBg;