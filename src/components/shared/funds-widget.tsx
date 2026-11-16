"use client";

import { ArrowDownIcon } from "lucide-react";
import { useId, useState } from "react";

// Illustrative rate. Replace with a real rate feed.
const RATE = 1352.1;

export function FundsWidget() {
  const id = useId();
  const [naira, setNaira] = useState("250000");
  const usd = (Number(naira || 0) / RATE).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="border border-border bg-card/40 p-5 backdrop-blur-sm md:p-7">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium tracking-[-0.04em]">Add funds</h3>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Live rate
        </p>
      </div>

      <label
        htmlFor={id}
        className="mt-6 block cursor-text border border-border p-4 md:p-5"
      >
        <span className="flex justify-between text-sm text-muted-foreground">
          <span>From your bank</span>
          <span>Naira</span>
        </span>
        <span className="mt-3 flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center bg-muted text-lg">
            ₦
          </span>
          <input
            id={id}
            inputMode="numeric"
            autoComplete="off"
            value={naira ? Number(naira).toLocaleString("en-US") : ""}
            placeholder="0"
            onChange={(e) =>
              setNaira(e.target.value.replace(/\D/g, "").slice(0, 12))
            }
            className="w-full min-w-0 bg-transparent text-3xl font-medium tracking-[-0.04em] tabular-nums outline-none placeholder:text-muted-foreground md:text-4xl"
          />
        </span>
      </label>

      <div className="relative z-10 -my-3 flex justify-center" aria-hidden>
        <span className="flex size-9 items-center justify-center rounded-full border border-border bg-background">
          <ArrowDownIcon className="size-4" />
        </span>
      </div>

      <div className="border border-border p-4 md:p-5">
        <p className="flex justify-between text-sm text-muted-foreground">
          <span>Available to invest</span>
          <span>USD</span>
        </p>
        <p className="mt-3 flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center bg-muted text-lg">
            $
          </span>
          <output
            htmlFor={id}
            className="min-w-0 truncate text-3xl font-medium tracking-[-0.04em] tabular-nums md:text-4xl"
          >
            {usd}
          </output>
        </p>
      </div>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        ₦1,352 per $1, updated through the day
      </p>
    </div>
  );
}
