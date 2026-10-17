import { useEffect, useState } from "react";

export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      const nextProgress = Math.min(
        1,
        Math.max(0, scrollTop / scrollableHeight),
      );

      // Shared with the atmosphere fog and the side rail probe.
      document.documentElement.style.setProperty(
        "--scroll-p",
        nextProgress.toFixed(4),
      );
      setProgress(nextProgress);
    };

    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        calculateProgress();
        ticking = false;
      });
    };

    calculateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateProgress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateProgress);
    };
  }, []);

  // A hairline with a glowing comet head riding at the current position.
  // Idle dimming lives in motion.css, keyed off html[data-idle].
  return (
    <div
      className="hairline pointer-events-none fixed inset-x-0 top-0 z-[60] h-px"
      aria-hidden="true"
    >
      <div
        className="hairline-fill"
        style={{ transform: `scaleX(${progress})` }}
      />
      {progress > 0 && (
        <i className="hairline-head" style={{ left: `${progress * 100}%` }} />
      )}
    </div>
  );
};
