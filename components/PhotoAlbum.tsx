"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Replace these with your actual photos
const PHOTOS = [
  { src: "https://picsum.photos/seed/k1/600/400", caption: "Tokyo" },
  { src: "https://picsum.photos/seed/k2/400/600", caption: "Kyoto" },
  { src: "https://picsum.photos/seed/k3/600/400", caption: "Yokohama" },
  { src: "https://picsum.photos/seed/k4/500/500", caption: "Kamakura" },
  { src: "https://picsum.photos/seed/k5/600/400", caption: "Shibuya" },
  { src: "https://picsum.photos/seed/k6/400/600", caption: "Akihabara" },
  { src: "https://picsum.photos/seed/k7/600/400", caption: "Enoshima" },
  { src: "https://picsum.photos/seed/k8/500/500", caption: "Shinjuku" },
];

export default function PhotoAlbum() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest dark:text-neutral-500 text-neutral-400 mb-4 ml-1">
        Gallery
      </p>

      <div className="columns-2 sm:columns-3 gap-3 space-y-3">
        {PHOTOS.map((photo, i) => (
          <motion.div
            key={i}
            className="break-inside-avoid cursor-pointer overflow-hidden rounded-lg group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            onClick={() => setSelected(i)}
            layoutId={`photo-${i}`}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full object-cover transition-transform duration-500
                  group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20
                transition-colors duration-300 flex items-end p-2">
                <span className="text-[10px] text-white opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {photo.caption}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center
              bg-black/80 backdrop-blur-md cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={`photo-${selected}`}
              className="relative max-w-[90vw] max-h-[80vh]"
            >
              <img
                src={PHOTOS[selected].src}
                alt={PHOTOS[selected].caption}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <p className="absolute -bottom-8 left-0 right-0 text-center
                text-sm text-white/80">
                {PHOTOS[selected].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
