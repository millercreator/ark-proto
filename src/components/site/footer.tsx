import Link from "next/link";
import { Logo } from "@/components/logo";
import { LiquidMetalLogo } from "@/components/shared/liquid-metal-logo";
import { footer } from "@/config/content";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 pt-16 md:px-6 md:pt-24">
      <div className="flex flex-col gap-14 md:flex-row md:justify-between">
        <div className="md:w-[32%]">
          <Logo className="h-5 w-auto" />
          <p className="mt-6 max-w-xs text-lg leading-snug tracking-[-0.02em] text-muted-foreground">
            {footer.tagline}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">{footer.credit}</p>
        </div>

        <div className="flex flex-wrap gap-x-16 gap-y-12 md:w-[58%] md:justify-between">
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-lg font-medium tracking-[-0.03em]">
                {col.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="tracking-[-0.01em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <LiquidMetalLogo className="mt-20" />

      <div className="mt-10 flex flex-col gap-4 border-t border-border py-8 text-sm text-muted-foreground md:flex-row md:items-start md:justify-between">
        <p>{footer.copyright}</p>
        <p className="max-w-sm md:text-right">{footer.disclaimer}</p>
      </div>
    </footer>
  );
}
