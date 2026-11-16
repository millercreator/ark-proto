import { CountUp } from "@/components/shared/count-up";
import { Reveal } from "@/components/shared/reveal";
import { Rule } from "@/components/shared/rule";
import { stats } from "@/config/content";

// One ruled ledger: the lead figure towers, the rest step down in scale, and
// every caption hangs from the same right-hand axis so the four read as one.
const sizes = [
  "text-[clamp(4.5rem,17vw,16rem)]",
  "text-[clamp(3rem,8.5vw,8rem)]",
  "text-[clamp(3rem,8.5vw,8rem)]",
  "text-[clamp(3rem,8.5vw,8rem)]",
];

export function Numbers() {
  return (
    <section
      id="numbers"
      className="relative isolate overflow-hidden border-t border-border px-4 py-24 md:px-6 md:py-40"
    >
      {/* Hover one figure and the others recede, as in the markets list. */}
      <ul className="[&:has(li:hover)>li:not(:hover)]:opacity-35">
        {stats.map((stat, i) => (
          <li
            key={stat.label}
            className="relative py-8 transition-opacity duration-500 md:py-12"
          >
            <Rule />
            <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-12">
              <p
                className={`${sizes[i]} leading-[0.88] font-medium tracking-[-0.07em] tabular-nums`}
              >
                {"value" in stat && stat.value !== undefined ? (
                  <CountUp to={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.text
                )}
              </p>
              <p className="text-base tracking-[-0.01em] text-muted-foreground md:w-[34%] md:pb-3 md:text-lg">
                {stat.label}
              </p>
            </Reveal>
          </li>
        ))}
        <li aria-hidden className="relative h-px">
          <Rule />
        </li>
      </ul>
    </section>
  );
}
