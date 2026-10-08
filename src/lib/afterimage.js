// In-page anchor jumps play as an "afterimage": the old view lingers, blurs
// and dissolves while the destination focuses in (see ::view-transition rules
// in index.css). Browsers without the View Transitions API, and visitors who
// prefer reduced motion, keep the regular smooth scroll.

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const jumpTo = (hash) => {
  const target = document.querySelector(hash);
  if (!target) return false;

  const land = () => {
    target.scrollIntoView({ behavior: "instant", block: "start" });
    history.pushState(null, "", hash);
  };

  if (!document.startViewTransition || prefersReducedMotion()) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", hash);
    return true;
  }

  // The transition is skipped (and its promises reject) when the tab is
  // hidden or another transition starts; the scroll still happens.
  const transition = document.startViewTransition(land);
  transition.ready.catch(() => {});
  transition.finished.catch(() => {});
  return true;
};

// Delegated click handler: any same-page "#section" link gets the afterimage.
export const installAfterimageLinks = () => {
  const onClick = (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest?.('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute("href");
    if (hash.length < 2) return;

    if (jumpTo(hash)) event.preventDefault();
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
};
