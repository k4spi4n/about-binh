import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export const ScrollProgressBar = () => {
  // Page progress goes out as --scroll-p on <html>: the atmosphere fog and
  // the rail read it (motion.css). ScrollTrigger caches the
  // page height, so a scroll frame is one style write: no layout read, no
  // React render.
  useEffect(() => {
    const root = document.documentElement;
    const write = ({ progress }) => {
      root.style.setProperty("--scroll-p", progress.toFixed(4));
    };
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: write,
      onRefresh: write,
    });
    return () => st.kill();
  }, []);

  return null;
};
