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

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1"
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 bg-border/60 transition-opacity duration-300 ${
          isIdle ? "opacity-60" : "opacity-100"
        }`}
      />
      <div
        className={`h-full origin-left rounded-r-full bg-gradient-to-r from-primary via-fuchsia-500 to-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.45)] transition-[transform,opacity,filter] duration-300 ease-out ${
          isIdle
            ? "opacity-45 blur-[0.4px] saturate-75"
            : "opacity-95 blur-0 saturate-95"
        }`}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};
