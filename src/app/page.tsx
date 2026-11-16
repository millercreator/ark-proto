import { ChromeThread } from "@/components/shared/chrome-thread";
import { marquee } from "@/config/content";
import { CashIn } from "@/components/sections/cash-in";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Marquee } from "@/components/sections/marquee";
import { Markets } from "@/components/sections/markets";
import { Numbers } from "@/components/sections/numbers";
import { Security } from "@/components/sections/security";

// Story order: promise > what you can own > how money moves > how to start >
// why it's safe > proof > questions > call to action.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <ChromeThread />
      <Hero />
      <Marquee words={marquee} />
      <Markets />
      <CashIn />
      <HowItWorks />
      <Security />
      <Numbers />
      <Faq />
      <FinalCta />
    </main>
  );
}
