import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

// Small deterministic jitter so every glyph falls a slightly different
// distance and tilt, without changing between renders.
const jitter = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Splits text into glyphs that condense out of a blur one by one, as if
 * dripping into place. Words stay unbreakable so wrapping still happens only
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
