"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Lets a section step back as the next one arrives: as the section's bottom
 * edge travels up the screen its content shrinks toward the bottom and dims.
 * Scroll-linked, and skipped under reduced motion.
 */
export function Recede({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const section = el?.closest("section");
      if (
        !el ||
        !section ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      gsap.to(el, {
        scale: 0.95,
        opacity: 0.2,
        transformOrigin: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "bottom 90%",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
