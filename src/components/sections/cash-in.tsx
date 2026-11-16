import { CheckIcon } from "lucide-react";
import { FundsWidget } from "@/components/shared/funds-widget";
import { LiquidMetalBackdrop } from "@/components/shared/liquid-metal-backdrop";
import { Reveal } from "@/components/shared/reveal";
import { Rule } from "@/components/shared/rule";
import { SectionHeading } from "@/components/shared/section-heading";
import { cashIn } from "@/config/content";

export function CashIn() {
  return (
    <section
      id={cashIn.id}
      className="relative isolate scroll-mt-14 overflow-hidden border-t border-border px-4 py-24 md:scroll-mt-16 md:px-6 md:py-40"
    >
      <LiquidMetalBackdrop
        shape="metaballs"
        fade="edges"
        strength={0.75}
        scale={1.5}
        className="inset-x-0 top-0 h-full max-lg:opacity-30!"
      />
      <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
        <div className="lg:w-[48%]">
          <SectionHeading
            lines={cashIn.heading}
            className="text-[clamp(2.75rem,6.4vw,6rem)] leading-[0.9]"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-snug tracking-[-0.02em] text-muted-foreground md:text-xl">
              {cashIn.body}
            </p>
          </Reveal>
          <ul className="mt-10 max-w-md">
            {cashIn.points.map((point) => (
              <li key={point} className="relative flex items-center gap-3 py-4">
                <Rule />
                <CheckIcon className="size-4 shrink-0" />
                <span className="tracking-[-0.01em]">{point}</span>
              </li>
            ))}
            <li aria-hidden className="relative h-px">
              <Rule />
            </li>
          </ul>
        </div>

        {/* Dropped lower than the heading so the two columns never align */}
        <Reveal className="lg:mt-40 lg:w-[44%]" delay={0.15}>
          <FundsWidget />
        </Reveal>
      </div>
    </section>
  );
}
