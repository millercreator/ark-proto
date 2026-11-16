# Ark: project rules

## Design direction

Tech editorial: big headings and titles that run long with tight letter spacing,
short paragraphs, unconventional layouts (not a conventional grid unless asked).

## DO NOT (until the user explicitly says otherwise)

- Do NOT number text or labels (no `01`, `02`, `1.`, `(01)`, "Step 1", index counters, etc.).
- Do NOT add hairline / eyebrow text: no small uppercase or monospace kicker labels
  above or beside headings, nav items, cards, or sections.
- Hairline borders / thin divider lines are ALLOWED for now (user decision). Do not remove them unless told to.
- If a design seems to need one of these, leave it out and ask first.

## Creative latitude (user granted)

- Any shader from `@paper-design/shaders-react` may be used (keep them monochrome, subtle, and mounted only near the viewport).
- Icons, symbols and imagery may be sourced from the web where useful (prefer free/open sources such as `simple-icons` or lucide).
- Add rich motion freely: GSAP (+ ScrollTrigger, synced with Lenis) and Motion are both installed. Always respect `prefers-reduced-motion`.
