"use client";

import { ArrowUpRightIcon } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { LanguageToggle } from "@/components/site/language-toggle";
import { MobileMenu } from "@/components/site/mobile-menu";
import { buttonVariants } from "@/components/ui/button";
import { navCta, navLinks, siteConfig } from "@/config/site";

export function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <header className="sticky top-0 z-40 border-b border-border bg-background/75 backdrop-blur-md">
        <nav aria-label="Primary" className="flex h-14 items-stretch md:h-16">
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="flex items-center px-4 outline-none focus-visible:bg-foreground focus-visible:text-background md:border-r md:border-border md:px-6"
          >
            <Logo className="h-4 w-auto md:h-5" />
          </Link>

          {/* Desktop links */}
          <ul
            className="hidden flex-1 items-stretch md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="relative flex">
                  {hovered === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-0.5 bg-foreground"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                      }}
                    />
                  )}
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    onBlur={() => setHovered(null)}
                    className="flex items-center border-r border-border px-6 text-[15px] font-medium tracking-[-0.03em] outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop: locale + CTA */}
          <div className="ml-auto hidden items-center gap-2 border-l border-border px-4 md:flex">
            <LanguageToggle />
            <Link
              href={navCta.href}
              className={buttonVariants({
                size: "lg",
                className:
                  "group h-10 gap-2 px-5 text-[15px] tracking-[-0.03em]",
              })}
            >
              {navCta.label}
              <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile: menu trigger */}
          <div className="ml-auto flex items-center pr-3 md:hidden">
            <MobileMenu />
          </div>
        </nav>
      </header>
    </MotionConfig>
  );
}
