import { useEffect } from "react";

/**
 * Publishes two page-wide flags on <html> that CSS uses to keep the
 * navigation chrome out of the way:
 *
 * - data-idle="true" once the visitor has stopped scrolling or pressing keys
 *   for `delay` ms. Plain mouse movement doesn't count, so reading with a
 *   restless cursor doesn't keep summoning the trackers.
 * - data-scrolled="true" once the page has left the very top, which retires
 *   the hero's "scroll down" hint.
 */
export const useQuietChrome = (delay = 1500) => {
  useEffect(() => {
    const root = document.documentElement;
    let timer;

    const wake = () => {
      if (root.dataset.idle !== "false") root.dataset.idle = "false";
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        root.dataset.idle = "true";
      }, delay);
    };

    const onScroll = () => {
      wake();
      const scrolled = String(window.scrollY > 40);
      if (root.dataset.scrolled !== scrolled) root.dataset.scrolled = scrolled;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", wake);
    window.addEventListener("touchstart", wake, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", wake);
      window.removeEventListener("touchstart", wake);
      delete root.dataset.idle;
      delete root.dataset.scrolled;
    };
  }, [delay]);
};
