import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { LiquidMetalBackdrop } from "@/components/shared/liquid-metal-backdrop";
import { Magnetic } from "@/components/shared/magnetic";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { finalCta } from "@/config/content";
import { navCta } from "@/config/site";

const indents = ["", "md:pl-[10vw]", "md:pl-[20vw]"];

export function FinalCta() {
  return (
    <section
      id="get-started"
      className="relative isolate scroll-mt-14 overflow-hidden border-t border-border px-4 py-28 md:scroll-mt-16 md:px-6 md:py-48"
    >
      <LiquidMetalBackdrop
        shape="circle"
        fade="edges"
        strength={0.5}
        scale={1}
        rise={14}
        className="-top-[20%] -left-[12%] h-full w-full max-lg:opacity-30!"
      />
      <SectionHeading
        drift={64}
        lines={finalCta.lines.map((text, i) => ({
          text,
          className: indents[i],
        }))}
        className="text-[clamp(3rem,11vw,10.5rem)] leading-[0.88] tracking-[-0.07em]"
      />

      <Reveal
        className="mt-12 flex flex-col items-start gap-8 border-t border-border pt-6 md:mt-20 md:ml-auto md:w-[min(30rem,42vw)]"
        delay={0.1}
      >
        <p className="text-lg leading-snug tracking-[-0.02em] text-muted-foreground md:text-xl">
          {finalCta.body}
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
            {finalCta.cta}
            <ArrowUpRightIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
