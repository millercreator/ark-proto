import { useCallback, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** True when pointer-driven effects make sense: a real cursor, motion allowed. */
export function canReact() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type PointerListener = (x: number, y: number) => void;

const listeners = new Set<PointerListener>();
const target = { x: 0, y: 0 };
const current = { x: 0, y: 0 };
let started = false;

function start() {
  if (started) return;
  started = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true },
  );
  // One shared, eased pointer for every chrome surface on the page.
  gsap.ticker.add(() => {
    const dx = target.x - current.x;
    const dy = target.y - current.y;
    if (Math.abs(dx) < 0.0004 && Math.abs(dy) < 0.0004) return;
    current.x += dx * 0.09;
    current.y += dy * 0.09;
    listeners.forEach((l) => l(current.x, current.y));
  });
}

/** Subscribe to the eased pointer, each axis normalised to -1..1. */
export function onPointer(listener: PointerListener) {
  start();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Just enough of a Paper shader element to drive its uniforms directly. */
export type MetalHandle = {
  paperShaderMount?: { setUniforms: (u: Record<string, number>) => void };
};

/**
 * Makes a LiquidMetal's reflections follow the cursor by writing the shader's
 * angle uniform directly (no React re-render per mouse move). Pass the returned
 * callback as the shader's `ref`.
 */
export function useMetalPointer(base = 70, range = 45) {
  const el = useRef<MetalHandle | null>(null);
  const ref = useCallback((node: MetalHandle | null) => {
    el.current = node;
  }, []);

  useEffect(() => {
    if (!canReact()) return;
    return onPointer((x, y) => {
      el.current?.paperShaderMount?.setUniforms({
        u_angle: base + x * range - y * range * 0.4,
      });
    });
  }, [base, range]);

  return ref;
}

/**
 * Progress (0 to 1) of the travelling chrome object landing in the footer
 * wordmark. The footer logo listens and reveals itself in step. Until the
 * thread has run at least once, nothing has been emitted and the logo is
 * simply visible.
 */
const landingListeners = new Set<(reveal: number) => void>();
export const chromeLanding = {
  subscribe(fn: (reveal: number) => void) {
    landingListeners.add(fn);
    return () => {
      landingListeners.delete(fn);
    };
  },
  emit(reveal: number) {
    landingListeners.forEach((fn) => fn(reveal));
  },
};
