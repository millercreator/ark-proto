"use client";

import { useEffect } from "react";

/**
 * Feeds the cursor position to every `.glass-btn` so its inner glow follows
 * the pointer. One delegated listener covers buttons in portals too.
 */
export function GlassPointer() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(
        ".glass-btn, .glass-tile",
      );
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        "--mx",
        `${((e.clientX - r.left) / r.width) * 100}%`,
      );
      el.style.setProperty(
        "--my",
        `${((e.clientY - r.top) / r.height) * 100}%`,
      );
    };
    const leave = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(
        ".glass-btn, .glass-tile",
      );
      if (!el || el.contains(e.relatedTarget as Node | null)) return;
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
    };
  }, []);
  return null;
}
