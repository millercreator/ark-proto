import { GlassTile } from "@/components/shared/glass-tile";
import { Reveal } from "@/components/shared/reveal";
import { Rule } from "@/components/shared/rule";
import { SectionHeading } from "@/components/shared/section-heading";
import { security } from "@/config/content";

export function Security() {
  return (
    <section
      id="security"
      className="relative isolate scroll-mt-14 overflow-hidden border-t border-border px-4 py-24 md:scroll-mt-16 md:px-6 md:py-40"
    >
      <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
        {/* Heading stays pinned while the pillars scroll past */}
        <div className="lg:sticky lg:top-28 lg:w-[38%] lg:self-start">
          <SectionHeading>{security.heading}</SectionHeading>
        </div>

        <ul className="lg:w-[62%]">
          {security.pillars.map(({ icon: Icon, title, body, tags }) => (
            <li key={title} className="group relative py-8 md:py-12">
              <Rule />
              <Reveal>
                <GlassTile icon={Icon} />
                <h3 className="mt-6 text-[clamp(2rem,4.2vw,3.75rem)] leading-[0.95] font-medium tracking-[-0.055em]">
                  {title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-snug tracking-[-0.01em] text-muted-foreground md:text-lg">
                  {body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
