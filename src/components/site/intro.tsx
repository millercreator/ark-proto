"use client";

import { LiquidMetal } from "@paper-design/shaders-react";
import { useCallback, useRef } from "react";
import { Logo } from "@/components/logo";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMetalPointer, type MetalHandle } from "@/lib/chrome";
import { intro, useIntroActive } from "@/lib/intro";
import { INTRO_KEY } from "@/lib/intro-script";

/**
 * Opening sequence: a black screen, the Ark wordmark rises out of the dark and
 * catches the light as liquid chrome, then the whole screen lifts away like a
 * curtain while the hero headline rises into place. Plays once per session;
 * any click, tap or key skips ahead.
 */
export function Intro() {
  const active = useIntroActive();
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const plain = useRef<HTMLDivElement>(null);
  const shader = useRef<MetalHandle | null>(null);
  const pointerRef = useMetalPointer(70, 45);
  const metalRef = useCallback(
    (node: MetalHandle | null) => {
      shader.current = node;
      pointerRef(node);
    },
    [pointerRef],
  );

  useGSAP(
    () => {
      if (!active) return;
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}

      const html = document.documentElement;
      const stop = (e: Event) => e.preventDefault();
      window.addEventListener("wheel", stop, { passive: false });
      window.addEventListener("touchmove", stop, { passive: false });

      let finished = false;
      const end = () => {
        if (finished) return;
        finished = true;
        window.removeEventListener("wheel", stop);
        window.removeEventListener("touchmove", stop);
        window.removeEventListener("keydown", skip);
        window.clearTimeout(failsafe);
        intro.end();
        // Dropping the flag hides the overlay (and unmounts the shader).
        delete html.dataset.intro;
      };

      // The chrome sweeps its highlight across the letters during the hold.
      const sweep = { angle: 70 };
      const tl = gsap.timeline({ onComplete: end });
      tl.fromTo(
        mark.current,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
        0.15,
      )
        .to(plain.current, { opacity: 0, duration: 0.5, ease: "none" }, 0.8)
        .to(
          sweep,
          {
            angle: 190,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () =>
              shader.current?.paperShaderMount?.setUniforms({
                u_angle: sweep.angle,
              }),
          },
          0.8,
        )
        // The curtain lifts; the wordmark travels with it, a little faster.
        .to(
          mark.current,
          { yPercent: -60, opacity: 0, duration: 0.9, ease: "power3.in" },
          2.3,
        )
        .to(
          root.current,
          { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power4.inOut" },
          2.3,
        )
        // The hero starts rising just as the curtain clears its headline.
        .add(() => intro.release(), 2.75);

      const skip = () => {
        if (tl.time() < 2.3) tl.tweenTo(2.3, { duration: 0.35, ease: "none" });
      };
      window.addEventListener("keydown", skip);
      root.current?.addEventListener("pointerdown", skip);

      // Never trap a visitor behind the overlay if frames stall.
      const failsafe = window.setTimeout(() => {
        tl.progress(1);
        end();
      }, 15000);

      return () => {
        tl.kill();
        end();
      };
    },
    { dependencies: [active], scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="intro-overlay fixed inset-0 z-[70] items-center justify-center bg-black"
      style={{ clipPath: "inset(0 0 0 0)", touchAction: "none" }}
    >
      <div
        ref={mark}
        className="relative w-[min(64vw,30rem)] opacity-0"
        style={{ aspectRatio: "186 / 37" }}
      >
        <div ref={plain}>
          <Logo className="h-auto w-full text-white" aria-hidden />
        </div>
        {active && (
          <div className="absolute inset-0">
            <LiquidMetal
              ref={metalRef}
              className="size-full"
              maxPixelCount={1_000_000}
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
              speed={0.5}
            />
          </div>
        )}
      </div>
    </div>
  );
}
