"use client";

import { LiquidMetal } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  canReact,
  chromeLanding,
  onPointer,
  useMetalPointer,
} from "@/lib/chrome";
import { gsap } from "@/lib/gsap";

/**
 * A waypoint on the object's journey. Positions are the object's centre in
 * viewport units (vw / vh). A waypoint is reached when the named edge of the
 * element sits `at` (0 to 1) of the way down the viewport.
 */
type Waypoint = {
  id?: string;
  edge?: "top" | "bottom";
  at?: number;
  x: number;
  y: number;
  s: number;
  r: number;
  o: number;
};

// The route keeps to the empty right and left margins of each section, tucking
// against the edge where the copy runs wide.
const desktop: Waypoint[] = [
  { x: 92, y: 36, s: 1, r: 0, o: 1 },
  { id: "markets", at: 0.55, x: 84, y: 40, s: 0.55, r: 70, o: 1 },
  { id: "markets", at: 0, x: 99, y: 52, s: 0.3, r: 150, o: 1 },
  { id: "markets", edge: "bottom", at: 1, x: 99, y: 52, s: 0.3, r: 220, o: 1 },
  { id: "cash-in", edge: "bottom", at: 1, x: 99, y: 50, s: 0.3, r: 300, o: 1 },
  { id: "how-it-works", at: 0.4, x: 88, y: 55, s: 0.55, r: 380, o: 1 },
  {
    id: "how-it-works",
    edge: "bottom",
    at: 0.9,
    x: 88,
    y: 45,
    s: 0.5,
    r: 460,
    o: 1,
  },
  { id: "security", at: 0.6, x: 99, y: 50, s: 0.3, r: 520, o: 1 },
  {
    id: "security",
    edge: "bottom",
    at: 1,
    x: 99,
    y: 50,
    s: 0.3,
    r: 600,
    o: 1,
  },
  { id: "numbers", at: 0.3, x: 82, y: 78, s: 0.5, r: 660, o: 1 },
  { id: "faq", at: 0, x: 12, y: 62, s: 0.45, r: 740, o: 1 },
  { id: "faq", edge: "bottom", at: 1, x: 12, y: 60, s: 0.45, r: 800, o: 1 },
  { id: "get-started", at: 0.45, x: 84, y: 26, s: 0.7, r: 900, o: 1 },
  {
    id: "get-started",
    edge: "bottom",
    at: 0.75,
    x: 82,
    y: 28,
    s: 0.65,
    r: 960,
    o: 1,
  },
];

// Phones have no spare margin, so the object stays with the hero, steps aside
// and only returns for the landing.
const mobile: Waypoint[] = [
  { x: 86, y: 24, s: 1, r: 0, o: 1 },
  { id: "markets", at: 0.7, x: 100, y: 18, s: 0.5, r: 90, o: 0 },
  { id: "get-started", at: 0.6, x: 50, y: 20, s: 0.4, r: 900, o: 0 },
  {
    id: "get-started",
    edge: "bottom",
    at: 0.75,
    x: 55,
    y: 30,
    s: 0.6,
    r: 960,
    o: 0,
  },
];

type Stop = Waypoint & { scroll: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * One chrome diamond that travels the whole page, then lands in the footer
 * wordmark. It lives in a fixed layer behind the content, scrubbed by scroll
 * along the waypoints above, tilts toward the cursor, and drives the footer
 * logo's reveal when it arrives. Under reduced motion it stays put in the hero.
 */
export function ChromeThread() {
  const layer = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(true);
  const still = useReducedMotion();
  const metalRef = useMetalPointer(70, 45);

  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wide = window.matchMedia("(min-width: 768px)");

    let stops: Stop[] = [];
    let vw = 0;
    let vh = 0;
    let logoDocY = 0;
    let logoX = 0;

    const measure = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      let prev = 0;
      stops = (wide.matches ? desktop : mobile).flatMap((w) => {
        let scroll = 0;
        if (w.id) {
          const node = document.getElementById(w.id);
          if (!node) return [];
          const r = node.getBoundingClientRect();
          scroll =
            r.top +
            window.scrollY +
            (w.edge === "bottom" ? r.height : 0) -
            (w.at ?? 0) * vh;
        }
        // Waypoints must advance down the page.
        scroll = Math.max(prev, scroll);
        prev = scroll;
        return [{ ...w, scroll }];
      });
      const logo = document.querySelector("[data-chrome-landing]");
      if (logo) {
        const r = logo.getBoundingClientRect();
        logoDocY = r.top + window.scrollY + r.height / 2;
        logoX = r.left + r.width / 2;
      }
    };

    const sample = (scroll: number): Waypoint => {
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (scroll <= first.scroll) return first;
      for (let i = 0; i < stops.length - 1; i++) {
        const a = stops[i];
        const b = stops[i + 1];
        if (scroll < b.scroll) {
          const t = (scroll - a.scroll) / (b.scroll - a.scroll);
          return {
            x: lerp(a.x, b.x, t),
            y: lerp(a.y, b.y, t),
            s: lerp(a.s, b.s, t),
            r: lerp(a.r, b.r, t),
            o: lerp(a.o, b.o, t),
          };
        }
      }
      return last;
    };

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    measure();

    if (reduced) {
      // Static sculpture in the hero: no travel, no landing.
      el.style.position = "absolute";
      const w = stops[0];
      gsap.set(el, { x: (w.x / 100) * vw, y: (w.y / 100) * vh, opacity: 1 });
      return;
    }

    const cur = { x: 0, y: 0, s: 1, r: 0, o: 0 };
    const landing = { p: 0, target: 0 };
    let first = true;
    let isLive = true;
    let lastReveal = -1;
    let dirty = true;
    let tx = 0;
    let ty = 0;
    let ts = 1;
    let to = 0;
    let lastScroll = -1;

    const land = (to: 0 | 1) => {
      landing.target = to;
      gsap.to(landing, {
        p: to,
        duration: 1.5,
        ease: "power3.inOut",
        overwrite: true,
      });
    };

    const tick = (_: number, dtMs: number) => {
      const scroll = window.scrollY;

      // Time-based landing once the footer wordmark is on screen.
      if (logoDocY) {
        const logoY = logoDocY - scroll;
        if (logoY < vh * 0.85 && landing.target !== 1) land(1);
        else if (logoY > vh * 0.97 && landing.target !== 0) land(0);
      }
      if (!dirty && !first && landing.p === landing.target) {
        const settled =
          Math.abs(cur.x - tx) + Math.abs(cur.y - ty) < 0.3 &&
          Math.abs(cur.s - ts) < 0.001 &&
          Math.abs(cur.o - to) < 0.002 &&
          scroll === lastScroll;
        if (settled) return;
      }
      lastScroll = scroll;
      dirty = false;

      const base = sample(scroll);
      tx = (base.x / 100) * vw;
      ty = (base.y / 100) * vh;
      ts = base.s;
      let tr = base.r;
      to = base.o;
      const p = landing.p;
      if (p > 0) {
        tx = lerp(tx, logoX, p);
        ty = lerp(ty, logoDocY - scroll, p);
        ts = lerp(ts, 1.25, p);
        tr += 160 * p;
        to = clamp01(to * (1 - p) + 3.6 * p * (1 - p));
      }

      const k = first ? 1 : 1 - Math.exp((-dtMs / 1000) * 9);
      first = false;
      cur.x = lerp(cur.x, tx, k);
      cur.y = lerp(cur.y, ty, k);
      cur.s = lerp(cur.s, ts, k);
      cur.r = lerp(cur.r, tr, k);
      cur.o = lerp(cur.o, to, k);
      gsap.set(el, {
        x: cur.x,
        y: cur.y,
        scale: cur.s,
        rotation: cur.r,
        opacity: cur.o,
      });

      const visible = cur.o > 0.02;
      if (visible !== isLive) {
        isLive = visible;
        setLive(visible);
      }
      const reveal = smooth(clamp01((p - 0.3) / 0.7));
      if (reveal !== lastReveal) {
        lastReveal = reveal;
        chromeLanding.emit(reveal);
      }
    };
    gsap.ticker.add(tick);

    let raf = 0;
    const remeasure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        measure();
        dirty = true;
      });
    };
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    document.fonts?.ready.then(remeasure);

    // The object tilts toward the cursor like a physical piece of metal.
    const offPointer = canReact()
      ? onPointer((x, y) => {
          if (!tilt.current) return;
          gsap.set(tilt.current, {
            rotationY: x * 14,
            rotationX: -y * 14,
            transformPerspective: 900,
          });
        })
      : undefined;

    return () => {
      gsap.ticker.remove(tick);
      gsap.killTweensOf(landing);
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      offPointer?.();
      chromeLanding.emit(1);
    };
  }, []);

  return (
    <div
      ref={layer}
      aria-hidden
      className={`pointer-events-none fixed top-0 left-0 -z-10 aspect-square w-[72vw] opacity-0 will-change-transform md:w-[min(30vw,30rem)]`}
    >
      <div ref={tilt} className="size-full">
        {live && (
          <LiquidMetal
            ref={metalRef}
            className="size-full"
            maxPixelCount={1_300_000}
            shape="diamond"
            colorBack="#00000000"
            colorTint="#bdbdbd"
            repetition={2}
            softness={0.3}
            shiftRed={0}
            shiftBlue={0}
            distortion={0.06}
            contour={0.4}
            angle={70}
            scale={0.8}
            speed={still ? 0 : 0.6}
          />
        )}
      </div>
    </div>
  );
}
