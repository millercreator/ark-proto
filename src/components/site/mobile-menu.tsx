"use client";

import { ArrowUpRightIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { LanguageToggle } from "@/components/site/language-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navCta, navLinks, siteConfig } from "@/config/site";

const control = buttonVariants({
  variant: "glass",
  size: "lg",
  className: "gap-2 px-4 text-[15px] tracking-[-0.03em]",
});
const ease = [0.22, 1, 0.36, 1] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={control}>
        Menu
        <span aria-hidden className="text-base leading-none">
          +
        </span>
      </SheetTrigger>

      <SheetContent
        side="top"
        showCloseButton={false}
        data-lenis-prevent
        className="inset-0 h-dvh w-full gap-0 rounded-none border-0 bg-background p-0 text-foreground data-[side=top]:data-ending-style:translate-y-0 data-[side=top]:data-starting-style:translate-y-0"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>

        {/* Top bar mirrors the navbar so the swap feels seamless */}
        <div className="flex h-14 shrink-0 items-center border-b border-border">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label={`${siteConfig.name} home`}
            className="flex items-center px-4 outline-none focus-visible:bg-foreground focus-visible:text-background"
          >
            <Logo className="h-4 w-auto" />
          </Link>
          <div className="ml-auto flex items-center gap-2 pr-3">
            <LanguageToggle />
            <SheetClose className={control}>
              Close
              <span aria-hidden className="text-base leading-none">
                ×
              </span>
            </SheetClose>
          </div>
        </div>

        {/* Oversized, tightly tracked links */}
        <ul className="flex flex-1 flex-col justify-center py-6">
          {navLinks.map((link, i) => {
            const active = pathname === link.href;
            return (
              <li
                key={link.href}
                className="overflow-hidden border-b border-border first:border-t"
              >
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.08 + i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="block px-4 py-2 text-[clamp(2.75rem,14vw,5rem)] leading-[0.92] font-medium tracking-[-0.06em] outline-none focus-visible:bg-foreground focus-visible:text-background"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ul>

        {/* Short paragraph + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.45 }}
          className="flex shrink-0 items-end justify-between gap-6 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <p className="max-w-[16rem] text-sm leading-snug tracking-[-0.01em] text-muted-foreground">
            {siteConfig.blurb}
          </p>
          <Link
            href={navCta.href}
            onClick={() => setOpen(false)}
            className={buttonVariants({
              size: "lg",
              className: "h-11 gap-2 px-5 text-[15px] tracking-[-0.03em]",
            })}
          >
            {navCta.label}
            <ArrowUpRightIcon className="size-4" />
          </Link>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
