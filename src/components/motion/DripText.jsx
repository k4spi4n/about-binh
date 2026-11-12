import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { glyph } from "@/lib/cipher";

// How long a glyph keeps flickering as code after it starts to appear (ms)
const DECODE_MS = 480;

// Small deterministic jitter so every glyph falls a slightly different
// distance and tilt, without changing between renders.
const jitter = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Splits text into glyphs that condense out of a blur one by one, as if
 * dripping into place. Each arrives as a flickering cipher character and
 * decodes into the real letter once it has landed. Words stay unbreakable so wrapping still happens only
 * between words.
 *
 * - `startIndex` continues the stagger from a previous DripText, so a heading
 *   split across differently styled spans still reads as one sweep.
 * - `whenVisible` waits until the text scrolls into view; otherwise it plays
 *   right away (after the intro veil, via --intro-delay).
 */
export const DripText = ({
  text,
  className,
  charClassName,
  startIndex = 0,
  delay = 0,
  stagger = 38,
  whenVisible = false,
}) => {
  const ref = useRef(null);
  const [play, setPlay] = useState(!whenVisible);

  useEffect(() => {
    if (!whenVisible || !ref.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [whenVisible]);

  // Decode: until its moment comes, each glyph shows a random stand-in. The
  // stand-in lives in data-g and is painted by ::after (motion.css) over the
  // real, transparent letter, so layout and React's text never change.
  useEffect(() => {
    const root = ref.current;
    if (
      !play ||
      !root ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }
    const chars = [...root.querySelectorAll(".drip-c")];
    const lead = whenVisible
      ? 0
      : parseFloat(getComputedStyle(root).getPropertyValue("--intro-delay")) *
          1000 || 0;
    const t0 = performance.now() + lead + delay * 1000;
    let id = 0;
    const tick = () => {
      const ms = performance.now() - t0;
      let pending = false;
      chars.forEach((c) => {
        const at = Number(c.style.getPropertyValue("--i")) * stagger + DECODE_MS;
        if (ms < at) {
          c.dataset.g = glyph();
          pending = true;
        } else {
          delete c.dataset.g;
        }
      });
      if (!pending) clearInterval(id);
    };
    id = setInterval(tick, 50);
    tick();
    return () => {
      clearInterval(id);
      chars.forEach((c) => delete c.dataset.g);
    };
  }, [play, whenVisible, delay, stagger]);

  const words = text.normalize("NFC").split(/(\s+)/);
  let index = startIndex;

  return (
    <span
      ref={ref}
      className={cn("drip", className)}
      data-play={play}
      data-scroll={whenVisible || undefined}
      aria-label={text}
      role="text"
      style={{ "--drip-delay": `${delay}s` }}
    >
      {words.map((word, w) => {
        if (/^\s+$/.test(word)) return word;
        return (
          <span key={w} className="drip-word" aria-hidden="true">
            {Array.from(word).map((char) => {
              const i = index++;
              const r = jitter(i + 1);
              return (
                <span
                  key={i}
                  className={cn("drip-c", charClassName)}
                  style={{
                    "--i": i,
                    "--stagger": `${stagger}ms`,
                    "--fall": `${(-0.35 - r * 0.35).toFixed(3)}em`,
                    "--tilt": `${((r - 0.5) * 10).toFixed(2)}deg`,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

DripText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  charClassName: PropTypes.string,
  startIndex: PropTypes.number,
  delay: PropTypes.number,
  stagger: PropTypes.number,
  whenVisible: PropTypes.bool,
};
