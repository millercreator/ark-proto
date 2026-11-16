"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Keeps GSAP ScrollTrigger in lockstep with Lenis's virtual scroll position. */
function ScrollSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Lenis is driven by GSAP's ticker so both share one frame loop.
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, smoothWheel: !reduce }}
    >
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}
