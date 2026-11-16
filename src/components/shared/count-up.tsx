"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const format = (n: number, suffix: string) =>
  `${Math.round(n).toLocaleString("en-US")}${suffix}`;

/** Counts 0 to `to` when scrolled into view. The server renders the final value. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      const state = { v: 0 };
      el.textContent = format(0, suffix);
      gsap.to(state, {
        v: to,
        duration: 2.2,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = format(state.v, suffix);
        },
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    },
    { scope: ref },
  );

  return <span ref={ref}>{format(to, suffix)}</span>;
}
