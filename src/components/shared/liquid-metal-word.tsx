"use client";

import { LiquidMetal } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMetalPointer } from "@/lib/chrome";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

// Headroom (in em) around the glyphs so ascenders and descenders are not cropped.
const PAD_Y = 0.22;
const PAD_X = 0.06;

/**
 * One word of a heading rendered as liquid chrome. The real text stays in the
 * DOM (selectable, read by screen readers and search engines) and is only made
 * transparent while the shader is live. A canvas copy of the word, drawn with
 * the exact computed font and tracking, is fed to the shader as its silhouette.
 *
 * The overlay lives inside the word's own box, so any reveal or parallax
 * applied to the parent moves the chrome with it. Until the shader is mounted
 * (or while it is off screen) the plain white text shows instead.
 */
export function LiquidMetalWord({
  children,
  tint = "#ffffff",
}: {
  children: string;
  /** Highlight colour of the metal. Keep it a neutral grey. */
  tint?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const [src, setSrc] = useState("");
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const metalRef = useMetalPointer(70, 45);

  const draw = useCallback(async () => {
    const el = root.current;
    if (!el) return;
    await document.fonts.ready;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;
    const cs = getComputedStyle(el);
    const px = parseFloat(cs.fontSize);
    const padX = px * PAD_X;
    const padY = px * PAD_Y;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round((w + padX * 2) * dpr);
    canvas.height = Math.round((h + padY * 2) * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    ctx.letterSpacing = cs.letterSpacing;
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "alphabetic";
    const m = ctx.measureText(children);
    // Centre the font's content area in the line box, as CSS does.
    const baseline =
      padY +
      (h - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 +
      m.fontBoundingBoxAscent;
    ctx.fillText(children, padX, baseline);
    setSrc(canvas.toDataURL("image/png"));
    el.style.setProperty("--pad-x", `${padX}px`);
    el.style.setProperty("--pad-y", `${padY}px`);
  }, [children]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [draw]);

  // Only run WebGL while the hero is near the viewport.
  useGSAP(
    () => {
      const section = root.current?.closest("section");
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
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

  // Hand over from plain text to chrome only once the shader has had time to
  // paint its first frames, so the word never blinks out.
  useEffect(() => {
    if (!(active && src)) return;
    const t = window.setTimeout(() => setReady(true), 350);
    return () => window.clearTimeout(t);
  }, [active, src]);

  return (
    <span
      ref={root}
      className={`relative inline-block transition-colors duration-300 ${ready ? "text-transparent" : ""}`}
    >
      {children}
      {active && src && (
        <span
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: "calc(var(--pad-y, 0px) * -1)",
            bottom: "calc(var(--pad-y, 0px) * -1)",
            left: "calc(var(--pad-x, 0px) * -1)",
            right: "calc(var(--pad-x, 0px) * -1)",
          }}
        >
          <LiquidMetal
            ref={metalRef}
            className="size-full"
            maxPixelCount={1_000_000}
            image={src}
            fit="contain"
            scale={1}
            colorBack="#00000000"
            colorTint={tint}
            repetition={3}
            softness={0.6}
            shiftRed={0}
            shiftBlue={0}
            distortion={0.04}
            contour={0.15}
            angle={70}
            speed={reduce ? 0 : 0.5}
          />
        </span>
      )}
    </span>
  );
}
