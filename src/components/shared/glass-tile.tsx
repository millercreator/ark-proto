import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

/**
 * An icon on a lit glass slab, set in a dark squircle with a rim of light.
 * Two fainter slabs sit behind the front one, like stacked sheets of glass,
 * and fan out slightly when the parent `.group` is hovered. Pure CSS.
 */
export function GlassTile({
  icon: Icon,
  className,
}: {
  icon: ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "glass-tile relative flex size-16 shrink-0 items-center justify-center rounded-[1.4rem] border border-transparent bg-linear-to-b from-[#1b1b1b] to-[#060606] shadow-[inset_0_1px_0_0_rgb(255_255_255/0.2),inset_0_-14px_22px_-14px_rgb(0_0_0/0.7),0_16px_34px_-14px_rgb(0_0_0/0.9)] md:size-[4.5rem] md:rounded-[1.6rem]",
        className,
      )}
    >
      {/* Echo slabs: back is dim, middle is bright. */}
      <span
        aria-hidden
        className="absolute top-1/2 left-[18%] h-[30%] w-[11%] -translate-y-1/2 rounded-[0.4rem] bg-linear-to-b from-white/35 to-white/10 transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-[55%] motion-reduce:transition-none"
      />
      <span
        aria-hidden
        className="absolute top-1/2 left-[26%] h-[40%] w-[14%] -translate-y-1/2 rounded-[0.45rem] bg-linear-to-b from-white/85 to-white/45 shadow-[0_0_12px_rgb(255_255_255/0.15)] transition-transform duration-500 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-[53%] motion-reduce:transition-none"
      />
      {/* Front slab: frosted, with a bright edge and soft light inside. */}
      <span className="absolute top-1/2 left-[39%] flex h-[50%] w-[34%] -translate-y-1/2 items-center justify-center rounded-[0.6rem] border border-white/45 bg-[radial-gradient(90%_80%_at_25%_50%,rgb(255_255_255/0.4),rgb(255_255_255/0.06)_70%)] shadow-[inset_0_0_10px_rgb(255_255_255/0.2),0_0_16px_rgb(255_255_255/0.18)] backdrop-blur-md transition-transform duration-500 ease-out group-hover:-translate-y-[54%] motion-reduce:transition-none">
        <Icon className="size-[60%] text-white drop-shadow-[0_0_6px_rgb(255_255_255/0.5)]" />
      </span>
    </span>
  );
}
