import { Recede } from "@/components/shared/recede";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/config/content";

export function Faq() {
  return (
    <section
      id="faq"
      className="relative isolate scroll-mt-14 overflow-hidden border-t border-border px-4 py-24 md:scroll-mt-16 md:px-6 md:py-40"
    >
      <Recede>
        <SectionHeading className="max-w-[10ch]">{faq.heading}</SectionHeading>

        <Reveal className="mt-16 lg:ml-auto lg:w-[68%]" delay={0.1}>
          <Accordion
            defaultValue={["faq-0"]}
            className="border-t border-border"
          >
            {faq.items.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`faq-${i}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="rounded-none py-6 text-[clamp(1.25rem,2.2vw,1.75rem)] leading-tight font-medium tracking-[-0.03em] hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-xl text-base leading-snug tracking-[-0.01em] text-muted-foreground md:text-lg">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Recede>
    </section>
  );
}
