import { useEffect, useState } from "react";

// Total length of the opening sequence; must cover the longest animation in
// the .veil rules in index.css.
const VEIL_MS = 2300;

const rings = [
  { r: 58, color: "hsl(var(--primary))", delay: 0 },
  { r: 72, color: "#d946ef", delay: 0.12 },
  { r: 88, color: "#22d3ee", delay: 0.24 },
];

// Four-pointed sparkle, drawn around the origin.
const SPARKLE =
  "M0,-9 C0.9,-2.4 2.4,-0.9 9,0 C2.4,0.9 0.9,2.4 0,9 C-0.9,2.4 -2.4,0.9 -9,0 C-2.4,-0.9 -0.9,-2.4 0,-9Z";

/**
 * Opening sequence: three orbits draw themselves around a glowing core, then
 * a widening circular window opens from the centre to reveal the page while
 * the orbits drift outward and dissolve. Whether it plays is decided once in
 * main.jsx (html[data-intro]), so the hero can time itself against it.
 */
export const IntroVeil = () => {
  const [visible, setVisible] = useState(
    () => document.documentElement.dataset.intro === "play",
  );

  useEffect(() => {
    if (!visible) return undefined;
    // Leave html[data-intro] as it is: --intro-delay hangs off it, and changing
    // that mid-flight would make the hero's still-running entrance animations
    // skip straight to their end. A separate flag releases the scroll lock.
    const done = () => {
      setVisible(false);
      document.documentElement.dataset.veil = "gone";
    };
    const timer = setTimeout(done, VEIL_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="veil" aria-hidden="true">
      <div className="veil-sheet" />
      <div className="veil-rim" />
      <div className="veil-stage">
        <i className="veil-core" />
        {rings.map(({ r, color, delay }, i) => (
          <svg
            key={r}
            className="veil-orbit"
            viewBox="-100 -100 200 200"
            style={{
              "--ring-delay": `${delay}s`,
              "--ring-turn": `${(i * 137 + 40) % 360}deg`,
              "--ring-color": color,
            }}
          >
            <circle className="veil-arc" r={r} pathLength="100" />
            <path
              className="veil-spark"
              d={SPARKLE}
              transform={`translate(${r} 0) scale(${0.45 + i * 0.08})`}
            />
          </svg>
        ))}
      </div>
    </div>
  );
};
