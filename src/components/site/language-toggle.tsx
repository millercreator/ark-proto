import { buttonVariants } from "@/components/ui/button";
import { navLocale } from "@/config/site";
import { cn } from "@/lib/utils";

/** Placeholder: shows the current locale. Wire up real switching when i18n lands. */
export function LanguageToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Language"
      className={cn(
        buttonVariants({ variant: "glass", size: "lg" }),
        "px-4 text-[15px] tracking-[-0.03em]",
        className,
      )}
    >
      {navLocale}
    </button>
  );
}
