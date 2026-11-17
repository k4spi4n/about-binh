import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger caches positions and only re-measures on window resize and
// load. Here they also move without either: sections change height (language
// switch, lazy media, the scrollbar returning after the intro), and the page
// lands from a 1.04 scale (.page-land, motion.css) that skews the first
// measurement. Re-measure on both.
let timer;
new ResizeObserver(() => {
  clearTimeout(timer);
  timer = setTimeout(() => ScrollTrigger.refresh(), 200);
}).observe(document.body);
document.addEventListener("animationend", (e) => {
  if (e.animationName === "page-land") ScrollTrigger.refresh();
});

export { ScrollTrigger };
