"use client";

import { LiquidMetal } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";
import { useRef, useState, type ComponentProps } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Shape = NonNullable<ComponentProps<typeof LiquidMetal>["shape"]>;

/**
 * Liquid chrome as a section backdrop: a large, soft-edged form behind the
 * content, monochrome and see-through, faded at its borders so it melts into
 * the black. Position and size come from `className`. It only mounts while
 * its section is near the viewport, and freezes under reduced motion.
 */
export function LiquidMetalBackdrop({
  shape = "metaballs",
  strength = 0.7,
  fade = "radial",
  rise = 0,
  className,
  ...rest
}: {
  shape?: Shape;
  /** 0 to 1: overall opacity of the metal. */
  strength?: number;
  /**
   * "radial" melts the form into black from its centre outward. "edges" lets
   * it cover the whole box, fading only at the top and bottom and thinning
   * toward the left so text there stays crisp.
   */
  fade?: "radial" | "edges";
  /** Starts this many % lower and rises into place as the section arrives. */
  rise?: number;
  className?: string;
} & Partial<ComponentProps<typeof LiquidMetal>>) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const section = root.current?.parentElement;
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom+=300",
        end: "bottom top-=300",
        onToggle: (self) => setActive(self.isActive),
      });
      if (rise && !reduce) {
        gsap.fromTo(
          root.current,
          { yPercent: rise },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 25%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: root, dependencies: [rise, reduce] },
  );

  return (
    <div
      ref={root}
      aria-hidden
      style={{ opacity: strength }}
      className={cn(
        "pointer-events-none absolute -z-10",
        fade === "radial"
          ? "[mask-image:radial-gradient(closest-side,#000_45%,transparent)]"
          : "[mask-image:linear-gradient(to_right,rgb(0_0_0/0.08),rgb(0_0_0/0.08)_20%,#000_54%),linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)] [mask-composite:intersect]",
        className,
      )}
    >
      {active && (
        <LiquidMetal
          className="size-full"
          maxPixelCount={1_300_000}
          shape={shape}
          colorBack="#00000000"
          colorTint="#bdbdbd"
          repetition={2}
          softness={0.4}
          shiftRed={0}
          shiftBlue={0}
          distortion={0.08}
          contour={0.3}
          angle={70}
          scale={0.9}
          speed={reduce ? 0 : 0.35}
          {...rest}
        />
      )}
    </div>
  );
}
