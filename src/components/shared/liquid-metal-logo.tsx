"use client";

import { LiquidMetal } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { chromeLanding, useMetalPointer } from "@/lib/chrome";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * The Ark wordmark as liquid chrome. The shader uses /ark-logo.svg as its
 * silhouette, so the metal follows the real letterforms. The inline SVG stays
 * underneath as the fallback (and while the shader is off screen); it only
 * turns transparent once the chrome has had time to paint.
 */
export function LiquidMetalLogo({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const metalRef = useMetalPointer(70, 45);

  // Only run WebGL while the footer is near the viewport.
  useGSAP(
    () => {
      const footer = root.current?.closest("footer");
      if (!footer) return;
      ScrollTrigger.create({
        trigger: footer,
        start: "top bottom+=300",
        end: "bottom top-=300",
        onToggle: (self) => {
          setActive(self.isActive);
          setReady(false);
        },
      });
    },
    { scope: root },
  );

  // The travelling chrome object lands here: the wordmark opens outward from
  // its centre as the object arrives. Without the thread it is simply visible.
  useEffect(
    () =>
      chromeLanding.subscribe((reveal) => {
        const node = root.current;
        if (!node) return;
        node.style.clipPath =
          reveal >= 1
            ? "none"
            : `ellipse(${reveal * 78}% ${reveal * 78}% at 50% 50%)`;
      }),
    [],
  );

  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => setReady(true), 350);
    return () => window.clearTimeout(t);
  }, [active]);

  return (
    <div
      ref={root}
      data-chrome-landing
      className={`relative ${className ?? ""}`}
    >
      <Logo
        aria-hidden
        className={`h-auto w-full text-foreground transition-opacity duration-300 ${ready ? "opacity-0" : ""}`}
      />
      {active && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <LiquidMetal
            ref={metalRef}
            className="size-full"
            maxPixelCount={1_800_000}
            image="/ark-logo.svg"
            fit="contain"
            scale={1}
            colorBack="#00000000"
            colorTint="#ffffff"
            repetition={3}
            softness={0.6}
            shiftRed={0}
            shiftBlue={0}
            distortion={0.04}
            contour={0.15}
            angle={70}
            speed={reduce ? 0 : 0.4}
          />
        </div>
      )}
    </div>
  );
}
