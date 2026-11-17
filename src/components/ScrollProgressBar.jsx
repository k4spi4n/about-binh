import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export const ScrollProgressBar = () => {
  const headRef = useRef(null);

  // Page progress goes out as --scroll-p on <html>: the hairline draws from
  // it (motion.css) and so does the atmosphere fog. ScrollTrigger caches the
  // page height, so a scroll frame is one style write: no layout read, no
  // React render.
  useEffect(() => {
    const root = document.documentElement;
    const write = ({ progress }) => {
      root.style.setProperty("--scroll-p", progress.toFixed(4));
      if (headRef.current) headRef.current.hidden = progress === 0;
    };
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: write,
      onRefresh: write,
    });
    return () => st.kill();
  }, []);

  // A hairline with a glowing comet head riding at the current position.
  // Idle dimming lives in motion.css, keyed off html[data-idle].
  return (
    <div
      className="hairline pointer-events-none fixed inset-x-0 top-0 z-[60] h-px"
      aria-hidden="true"
    >
      <div className="hairline-fill" />
      <i ref={headRef} className="hairline-head" hidden />
    </div>
  );
};
