import { GlassTile } from "@/components/shared/glass-tile";
import { Reveal } from "@/components/shared/reveal";
import { Rule } from "@/components/shared/rule";
import { SectionHeading } from "@/components/shared/section-heading";
import { markets } from "@/config/content";

export function Markets() {
  return (
    <section
      id="markets"
      className="relative isolate scroll-mt-14 overflow-hidden border-t border-border px-4 py-24 md:scroll-mt-16 md:px-6 md:py-40"
    >
      <SectionHeading className="max-w-[11ch]" drift={48}>
        {markets.heading}
      </SectionHeading>

      {/* A ruled index: hover one row and the rest recede while it slides forward. */}
      <ul className="mt-16 md:mt-28 [&:has(li:hover)>li:not(:hover)]:opacity-35">
        {markets.items.map(({ icon: Icon, title, body, tags, soon }) => (
          <li
            key={title}
            className="group relative py-8 transition-opacity duration-500 md:py-12"
          >
            <Rule />
            <Reveal className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
              <div className="flex items-start gap-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 md:w-[56%] md:group-hover:translate-x-6">
                <GlassTile icon={Icon} className="mt-0.5 md:mt-1" />
                <h3 className="text-[clamp(2rem,5.2vw,4.75rem)] leading-[0.95] font-medium tracking-[-0.055em] text-balance">
                  {title}
                  {soon && (
                    <span className="ml-3 inline-block translate-y-[-0.15em] border border-border px-2 py-0.5 align-middle text-xs font-normal tracking-normal text-muted-foreground">
                      soon
                    </span>
                  )}
                </h3>
              </div>
              <div className="md:w-[34%] md:pt-2">
                <p className="text-base leading-snug tracking-[-0.01em] text-muted-foreground md:text-lg">
                  {body}
                </p>
                {tags && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-sm"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
