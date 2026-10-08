import { useEffect, useState } from "react";

export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    const idleDelayMs = 1500;
    let idleTimerId;

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

    const markUserActive = () => {
      setIsIdle((prev) => (prev ? false : prev));
      window.clearTimeout(idleTimerId);
      idleTimerId = window.setTimeout(() => {
        setIsIdle((prev) => (prev ? prev : true));
      }, idleDelayMs);
    };

    let ticking = false;

    const handleScroll = () => {
      markUserActive();

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
    markUserActive();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateProgress);
    window.addEventListener("pointerdown", markUserActive, { passive: true });
    window.addEventListener("mousemove", markUserActive, { passive: true });
    window.addEventListener("touchstart", markUserActive, { passive: true });
    window.addEventListener("keydown", markUserActive);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateProgress);
      window.removeEventListener("pointerdown", markUserActive);
      window.removeEventListener("mousemove", markUserActive);
      window.removeEventListener("touchstart", markUserActive);
      window.removeEventListener("keydown", markUserActive);
      window.clearTimeout(idleTimerId);
    };
  }, []);

  // A hairline with a glowing comet head riding at the current position.
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px"
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 bg-border/50 transition-opacity duration-500 ${
          isIdle ? "opacity-40" : "opacity-100"
        }`}
      />
      <div
        className={`hairline-fill transition-opacity duration-500 ${
          isIdle ? "opacity-50" : "opacity-100"
        }`}
        style={{ transform: `scaleX(${progress})` }}
      />
      <i
        className={`hairline-head transition-opacity duration-500 ${
          isIdle || progress === 0 ? "opacity-0" : "opacity-100"
        }`}
        style={{ left: `${progress * 100}%` }}
      />
    </div>
  );
};
