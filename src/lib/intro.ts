import { useSyncExternalStore } from "react";

/**
 * The opening sequence plays once per browser session. An inline script in the
 * document head sets `data-intro` on <html> before first paint (so there is no
 * flash of the page), unless the visitor has already seen it or prefers
 * reduced motion. The overlay and the hero both read this module.
 */
let released = false;
let over = false;
const subscribers = new Set<() => void>();

const wanted = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.intro === "1";

export const intro = {
  subscribe(fn: () => void) {
    subscribers.add(fn);
    return () => {
      subscribers.delete(fn);
    };
  },
  /** The overlay is on screen. */
  isActive: () => wanted() && !over,
  /** The page behind the overlay may start its own entrance. */
  isReleased: () => !wanted() || released,
  /** The curtain has cleared the headline: let the hero rise. */
  release() {
    if (released) return;
    released = true;
    subscribers.forEach((fn) => fn());
  },
  /** The overlay is finished and can be removed. */
  end() {
    released = true;
    over = true;
    subscribers.forEach((fn) => fn());
  },
};

// Server snapshots: nothing is playing, but the page entrance waits a tick so
// hydration always matches; the client then reports the real state.
export const useIntroActive = () =>
  useSyncExternalStore(intro.subscribe, intro.isActive, () => false);
export const useIntroReleased = () =>
  useSyncExternalStore(intro.subscribe, intro.isReleased, () => false);
