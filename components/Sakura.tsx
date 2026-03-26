"use client";

import { useEffect } from "react";
import { initSakura, cleanupSakura } from "@/utils/sakura";

export default function Sakura() {
  useEffect(() => {
    initSakura();
    return () => cleanupSakura();
  }, []);

  return null;
}
