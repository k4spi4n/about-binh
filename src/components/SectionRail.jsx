import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { navItems } from "../data/navigation";
import { useActiveSection } from "../hooks/useActiveSection";

const ids = navItems.map((item) => item.href.slice(1));

/**
 * Desktop-only vertical rail on the right edge: a probe glides down the track
 * with scroll progress and carries a capsule naming the current section,
 * next to a little signal trace. Ticks along the track jump to each section.
 * It only shows while the visitor is actively scrolling (see useQuietChrome).
 */
export const SectionRail = () => {
  const active = useActiveSection(ids);
  const activeItem = navItems.find((item) => item.href === `#${active}`);
  const railRef = useRef(null);

  // Ticks are evenly spaced but sections aren't, so raw page progress drifts
  // off them. Instead the probe moves piecewise: it sits exactly on tick i
  // when section i's top reaches the top of the viewport (where jumps land).
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const stops = ids.map((id, i) => {
        const el = i && document.getElementById(id);
        return el ? Math.min(el.getBoundingClientRect().top + y, max) : 0;
      });

      let i = 0;
      while (i < stops.length - 2 && y >= stops[i + 1]) i++;
      const span = stops[i + 1] - stops[i];
      const f = span > 0 ? Math.min(1, Math.max(0, (y - stops[i]) / span)) : 1;
      railRef.current?.style.setProperty(
        "--rail-p",
        ((i + f) / (stops.length - 1)).toFixed(4),
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    // On the hero there's nothing to track yet, so the rail stays tucked away
    // (hovering the right edge still brings it back).
    <aside
      ref={railRef}
      className={cn("rail hidden lg:block", active === "hero" && "is-home")}
      aria-label="Điều hướng nhanh"
    >
      <div className="rail-track">
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "rail-tick",
              item.href === `#${active}` && "is-active",
            )}
            style={{ "--at": i / (navItems.length - 1) }}
            aria-label={item.name}
          >
            <span className="rail-tick-label">{item.short}</span>
          </a>
        ))}

        <div className="rail-probe" aria-hidden="true">
          <i className="rail-dot" />
          <div className="rail-capsule">
            {/* Keyed so the label replays its swap-in on every change */}
            <span key={active} className="rail-capsule-text">
              {activeItem?.short}
            </span>
            <svg className="rail-wave" viewBox="0 0 40 12" fill="none">
              <path d="M0 6 Q 2.5 1 5 6 T 10 6 T 15 6 T 20 6 T 25 6 T 30 6 T 35 6 T 40 6" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
};
