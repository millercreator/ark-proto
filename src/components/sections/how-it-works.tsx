import { ArrowDownRightIcon, MailIcon } from "lucide-react";
import { siGoogle, siX } from "simple-icons";
import { BrandIcon } from "@/components/shared/brand-icon";
import { Reveal } from "@/components/shared/reveal";
import { Rule } from "@/components/shared/rule";
import { SectionHeading } from "@/components/shared/section-heading";
import { howItWorks } from "@/config/content";
import { cn } from "@/lib/utils";

// Each step steps further right: order is shown by position and arrows, not numbers.
const indents = ["", "md:pl-[16vw]", "md:pl-[32vw]"];

const chipClass =
  "flex h-9 items-center justify-center gap-2 rounded-full border border-border px-3 text-sm";

function Chip({ value }: { value: string }) {
  if (value === "google")
    return (
      <li className={chipClass} title="Google">
        <BrandIcon icon={siGoogle} className="size-4" />
      </li>
    );
  if (value === "x")
    return (
      <li className={chipClass} title="X">
        <BrandIcon icon={siX} className="size-4" />
      </li>
    );
  if (value === "email")
    return (
      <li className={chipClass} title="Email">
        <MailIcon className="size-4" />
      </li>
    );
  return <li className={chipClass}>{value}</li>;
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative isolate scroll-mt-14 overflow-hidden border-t border-border px-4 py-24 md:scroll-mt-16 md:px-6 md:py-40"
    >
      <SectionHeading className="max-w-[15ch]">
        {howItWorks.heading}
      </SectionHeading>

      <ol className="mt-16 md:mt-28">
        {howItWorks.steps.map((step, i) => (
          <li
            key={step.title}
            className={cn("relative py-8 md:py-14", indents[i])}
          >
            <Rule />
            <Reveal className="md:max-w-3xl">
              <h3 className="flex items-start gap-3 text-[clamp(2rem,4.6vw,4.25rem)] leading-[0.95] font-medium tracking-[-0.055em]">
                {step.title}
                <ArrowDownRightIcon className="mt-[0.3em] size-[0.7em] shrink-0 text-muted-foreground" />
              </h3>
              <p className="mt-4 max-w-sm text-base leading-snug tracking-[-0.01em] text-muted-foreground md:text-lg">
                {step.body}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {step.chips.map((chip) => (
                  <Chip key={chip} value={chip} />
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
