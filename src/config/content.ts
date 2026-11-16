import {
  ChartColumnIcon,
  FlagIcon,
  Gamepad2Icon,
  GlobeIcon,
  ImageIcon,
  LockIcon,
  ShieldCheckIcon,
  SproutIcon,
  TrendingUpIcon,
} from "lucide-react";

/**
 * Landing page copy, in story order:
 * promise (hero) > what you can own > how money moves > how to start >
 * why it's safe > proof > questions > call to action.
 */

export const markets = {
  heading: "One app, every market",
  items: [
    {
      icon: ChartColumnIcon,
      title: "Stocks, gold & treasuries",
      body: "Own a piece of Apple, real gold, or government bonds, starting with a few dollars.",
      tags: ["Fractional", "24/7", "No minimums"],
    },
    {
      icon: TrendingUpIcon,
      title: "Leveraged trading",
      body: "Trade on prices rising or falling, with your gains or losses multiplied.",
      tags: ["Leverage", "Advanced", "Higher risk"],
    },
    {
      icon: FlagIcon,
      title: "Trade on Events",
      body: "Put money on what you think will happen, in politics, sports, or world events. Get paid the moment the result lands.",
    },
    {
      icon: Gamepad2Icon,
      title: "Games",
      body: "Play different games, grow your money, cash out whenever you choose.",
    },
    {
      icon: SproutIcon,
      title: "Auto-earn",
      soon: true,
      body: "Put idle balances to work, in strategies reviewed by professionals.",
    },
    {
      icon: ImageIcon,
      title: "Collectibles (NFTs)",
      soon: true,
      body: "Collect and trade digital items, right alongside the rest of your portfolio.",
    },
  ],
};

export const marquee = [
  "Stocks",
  "Gold",
  "Crypto",
  "Treasuries",
  "Events",
  "Games",
];

export const cashIn = {
  id: "cash-in",
  heading: ["Cash in.", "Global assets out."],
  body: "Fund with a bank transfer and instantly own dollar assets, gold and crypto. Cash out just as fast. No middlemen, no waiting.",
  points: [
    "Instant bank-transfer funding",
    "Transparent, real-time rates",
    "Withdraw to your bank anytime",
  ],
};

export const howItWorks = {
  heading: "No jargon. No seed phrase. Just start.",
  steps: [
    {
      title: "Sign in",
      body: "Google, X, or email. Takes seconds.",
      chips: ["google", "x", "email"],
    },
    {
      title: "Choose your market",
      body: "Stocks, gold, crypto, or whatever you're after.",
      chips: ["Stocks", "Gold", "Crypto"],
    },
    {
      title: "Fund and trade",
      body: "Top up by bank transfer, buy your first asset in minutes.",
      chips: ["Bank transfer"],
    },
  ],
};

export const security = {
  heading: "Yours alone",
  pillars: [
    {
      icon: LockIcon,
      title: "Non-custodial",
      body: "Your money stays in your own account, not ours. We can't freeze it, lend it out, or lose it.",
      tags: ["Your keys", "No freezes", "Fully yours"],
    },
    {
      icon: GlobeIcon,
      title: "Censorship-resistant",
      body: "Nobody can block your payment or shut you out of your money, not a company, not a government.",
      tags: ["Permissionless", "Open access", "Borderless"],
    },
    {
      icon: ShieldCheckIcon,
      title: "Self-sovereign",
      body: "Take your funds anywhere, anytime. Nothing here is locked to us.",
      tags: ["Full control", "Export anytime", "Transparent"],
    },
  ],
};

export const stats = [
  { value: 12000, suffix: "+", label: "On the waitlist" },
  { text: "Multiple", label: "Markets in one app" },
  { value: 100, suffix: "%", label: "Self-custody, always" },
  { text: "24/7", label: "Global market access" },
];

export const faq = {
  heading: "Good to know",
  items: [
    {
      q: "Is Ark a bank or exchange holding my money?",
      a: "No. Your money stays in your own account, not ours. We can't freeze it or move it.",
    },
    {
      q: "Do I need to understand crypto to use it?",
      a: "No. Sign in with Google, X, or email. No jargon, no seed phrase. Pick a market and start.",
    },
    {
      q: "What can I actually trade?",
      a: "Stocks, gold and treasuries in fractions with no minimums, plus crypto, leveraged trading, events and games. Auto-earn and collectibles (NFTs) are coming soon.",
    },
    {
      q: "How do I fund my account?",
      a: "Top up by bank transfer and instantly own dollar assets, gold and crypto. Rates are transparent and real-time, and you can withdraw to your bank anytime.",
    },
    {
      q: "When does it launch?",
      a: "Ark is opening region by region. Create your account in seconds and you'll be first through the door when it opens in your region.",
    },
  ],
};

export const finalCta = {
  lines: ["Your money.", "Your world.", "Your call."],
  body: "Create your account in seconds and be first through the door when Ark opens in your region.",
  cta: "Get started",
};

export const footer = {
  tagline:
    "The super app for global markets. Own your money, answer to no one.",
  credit: "Powered by Tsion",
  // Placeholder hrefs ("#") need real destinations.
  columns: [
    {
      title: "Product",
      links: [
        { label: "Markets", href: "/#markets" },
        { label: "Funding", href: "/#cash-in" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Get started", href: "https://tsionark.com/portfolio" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Security", href: "/#security" },
        { label: "Careers", href: "#" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "X / Twitter", href: "#" },
        { label: "Telegram", href: "#" },
        { label: "Discord", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Email", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Ark. All rights reserved.",
  disclaimer:
    "Not investment advice. Crypto and market products carry risk, including loss of principal.",
};
