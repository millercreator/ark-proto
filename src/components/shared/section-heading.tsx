"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Line = string | { text: string; className?: string };

/**
 * Big, long, tightly tracked editorial heading. Words rise out of a mask,
 * one after another, when the heading scrolls into view.
 */
export function SectionHeading({
  children,
  lines,
  drift = 0,
  className,
  ...props
}: Omit<ComponentProps<"h2">, "children"> & {
  children?: string;
  lines?: readonly Line[];
  /** Parallax depth in px: the heading lags the content by this much. */
  drift?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const resolved = (lines ?? [children ?? ""]).map((l) =>
    typeof l === "string" ? { text: l, className: undefined } : l,
  );

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      if (drift) {
        gsap.fromTo(
          el,
          { y: -drift },
          {
            y: drift,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { yPercent: 115, rotate: 5 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [drift] },
  );

  return (
    <h2
      ref={ref}
      aria-label={resolved.map((l) => l.text).join(" ")}
      className={cn(
        "text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.9] font-medium tracking-[-0.065em] text-balance",
        className,
      )}
      {...props}
    >
      {resolved.map((line) => (
        <span
          key={line.text}
          aria-hidden
          className={cn("block", line.className)}
        >
          {line.text.split(" ").map((word, i) => (
            <span key={i}>
              <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                <span
                  data-word
                  className="inline-block origin-bottom-left will-change-transform"
                >
                  {word}
                </span>
              </span>{" "}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
