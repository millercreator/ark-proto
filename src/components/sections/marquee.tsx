"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Oversized ticker of everything you can own. It drifts on its own and the
 * scroll velocity whips it faster; scrolling up reverses it.
 */
export function Marquee({ words }: { words: readonly string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !track.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const tween = gsap.to(track.current, {
        xPercent: -50,
        duration: 45,
        ease: "none",
        repeat: -1,
      });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = Math.min(Math.abs(self.getVelocity()) / 300, 10);
          gsap.to(tween, {
            timeScale: self.direction * (1 + boost),
            duration: 0.25,
            overwrite: true,
            onComplete: () => {
              gsap.to(tween, { timeScale: self.direction, duration: 1.4 });
            },
          });
        },
      });
    },
    { scope: root },
  );

  // Words are brushed chrome (a hard "horizon" in the gradient, like a
  // reflection), split by small lit-glass diamonds that echo the hero object.
  const group = (
    <div className="flex shrink-0 items-center">
      {words.map((word) => (
        <span key={word} className="flex items-center">
          <span className="bg-[linear-gradient(180deg,#ffffff_0%,#dcdce2_36%,#6b6b72_49%,#f1f1f5_52%,#ffffff_70%,#9b9ba3_100%)] bg-clip-text px-[0.12em] text-transparent">
            {word}
          </span>
          <span
            aria-hidden
            className="glass-tile mx-[0.22em] size-[0.26em] shrink-0 rotate-45 rounded-[0.05em] border border-transparent bg-linear-to-br from-white/30 to-white/5 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.3),0_10px_30px_-10px_rgb(0_0_0/0.9)] backdrop-blur-md"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="overflow-hidden border-t border-border [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] py-6 md:py-10"
    >
      <div
        ref={track}
        className="flex w-max text-[clamp(4rem,12vw,11rem)] leading-[0.95] font-medium tracking-[-0.06em] whitespace-nowrap"
      >
        {group}
        {group}
      </div>
    </div>
  );
}
