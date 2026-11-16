import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { GlassPointer } from "@/components/providers/glass-pointer";
import { Intro } from "@/components/site/intro";
import { introScript } from "@/lib/intro-script";
import { Footer } from "@/components/site/footer";
import { MotionProvider } from "@/components/providers/motion-provider";
import { Navbar } from "@/components/site/navbar";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Ark", template: "%s | Ark" },
  description: "Ark prototype",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Intro />
        <GlassPointer />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <MotionProvider>
              <SmoothScroll>
                <Suspense
                  fallback={
                    <div className="h-14 border-b border-border md:h-16" />
                  }
                >
                  <Navbar />
                </Suspense>
                {children}
                <Footer />
              </SmoothScroll>
            </MotionProvider>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
