import { cn } from "@/lib/utils";
import { navItems } from "../data/navigation";
import { useActiveSection } from "../hooks/useActiveSection";

const ids = navItems.map((item) => item.href.slice(1));

/**
 * Desktop-only vertical rail on the right edge: a probe glides down the track
 * with scroll progress and carries a capsule naming the current section,
 * next to a little signal trace. Ticks along the track jump to each section.
 */
export const SectionRail = () => {
  const active = useActiveSection(ids);
  const activeItem = navItems.find((item) => item.href === `#${active}`);

  return (
    <aside className="rail hidden lg:block" aria-label="Điều hướng nhanh">
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
