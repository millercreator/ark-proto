"use client";

import { ArrowUpRightIcon } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic } from "@/components/shared/magnetic";
import { LiquidMetalWord } from "@/components/shared/liquid-metal-word";
import { buttonVariants } from "@/components/ui/button";
import { navCta } from "@/config/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntroReleased } from "@/lib/intro";

const ease = [0.22, 1, 0.36, 1] as const;

// Each line is its own block on desktop (staircase indent) and flows
// naturally on mobile so the type can stay huge.
// The one word rendered as liquid chrome; everything else stays crisp white.
const metalWord = "Money";

const lines = [
  { words: ["Control", "Your", "Money"], indent: "" },
  { words: ["and", "Access"], indent: "md:pl-[14vw]" },
  { words: ["Global", "Markets"], indent: "md:pl-[5vw]" },
];

export function Hero() {
  let wordIndex = 0;
  // Entrance waits for the opening sequence, if one is playing.
  const released = useIntroReleased();
  const section = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  // Hero exit: after a short hold the headline tightens, its three lines pull
  // apart in opposite directions (desktop, where each line is its own block),
  // and the whole block drifts up and fades slower than the page scrolls.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const scrollTrigger = {
        trigger: section.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(heading.current, {
        yPercent: -14,
        scale: 0.94,
        transformOrigin: "0% 100%",
        opacity: 0.25,
        ease: "none",
        scrollTrigger,
      });
      gsap.to(copy.current, {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger,
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const dirs = [-9, 11, -6];
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line, i) => {
          gsap.to(line, {
            xPercent: dirs[i] ?? 0,
            ease: "power1.in",
            scrollTrigger: {
              trigger: section.current,
              start: "top+=60 top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });
    },
    { scope: section },
  );

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={section}
        className="relative isolate flex min-h-[calc(100svh-3.5rem)] flex-col justify-end overflow-hidden px-4 pt-16 pb-10 md:min-h-[calc(100svh-4rem)] md:px-6 md:pb-14"
      >
        <h1
          ref={heading}
          className="text-[clamp(3.25rem,15.5vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.065em] md:text-[9.4vw]"
        >
          {lines.map((line, li) => (
            <span
              key={line.words.join(" ")}
              data-line={li}
              className={`inline md:block ${line.indent}`}
            >
              {line.words.map((word) => {
                const i = wordIndex++;
                return (
                  <span key={word}>
                    <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                      <motion.span
                        className="inline-block"
                        initial={{ y: "110%" }}
                        animate={released ? { y: 0 } : undefined}
                        transition={{
                          duration: 1,
                          ease,
                          delay: 0.15 + i * 0.08,
                        }}
                      >
                        {word === metalWord ? (
                          <LiquidMetalWord>{word}</LiquidMetalWord>
                        ) : (
                          word
                        )}
                      </motion.span>
                    </span>{" "}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Offset column: short paragraph, then the CTA beneath it */}
        <div ref={copy}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={released ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
            className="mt-10 flex flex-col items-start gap-8 border-t border-border pt-6 md:mt-14 md:ml-auto md:w-[min(30rem,42vw)]"
          >
            <p className="text-lg leading-snug tracking-[-0.02em] text-muted-foreground md:text-xl">
              Buy Stocks, Gold and Crypto, Trade, Predict Outcome and Grow Your
              Money, all from one place.
            </p>
            <Magnetic>
              <Link
                href={navCta.href}
                className={buttonVariants({
                  size: "lg",
                  className:
                    "group h-12 gap-2 px-6 text-[15px] font-medium tracking-[-0.03em]",
                })}
              >
                Get Started
                <ArrowUpRightIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
