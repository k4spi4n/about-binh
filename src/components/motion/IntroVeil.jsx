import { useEffect, useState } from "react";
import { glyph } from "@/lib/cipher";

// Total length of the opening sequence; must cover the longest animation in
// the .veil rules in motion.css.
const VEIL_MS = 3100;

// Partial orbits around the iris: radius, drawn length (% of the circle),
// starting angle, seconds per turn and direction.
const arcs = [
  { r: 58, len: 64, turn: 20, spin: 16, dir: "normal" },
  { r: 70, len: 30, turn: 160, spin: 11, dir: "reverse" },
  { r: 84, len: 78, turn: 250, spin: 22, dir: "normal" },
];

// The signal: the handle shown under the aperture, the same in every language
const SIGNAL = "k4spi4n";

// The name arrives as cipher glyphs and decodes left to right; when the window
// opens it scrambles back into code as it dissolves. Times in ms.
const DECODE_AT = 800;
const DECODE_STEP = 90;
const ENCODE_AT = 2000;
const ENCODE_STEP = 30;

// Status line under the name: noise while the name decodes, then it resolves
// into this, left to right, and locks.
const STATUS = "signal decoded";
const STATUS_AT = DECODE_AT + SIGNAL.length * DECODE_STEP;
const STATUS_STEP = 22;

const blades = [0, 60, 120, 180, 240, 300];

// Four-pointed sparkle, drawn around the origin.
const SPARKLE =
  "M0,-9 C0.9,-2.4 2.4,-0.9 9,0 C2.4,0.9 0.9,2.4 0,9 C-0.9,2.4 -2.4,0.9 -9,0 C-2.4,-0.9 -0.9,-2.4 0,-9Z";

/**
 * Opening sequence: an aperture. Fine orbits, a tick ring and focus brackets
 * draw themselves on a dark sheet; a pale six-blade iris grows out of the
 * spark at the centre, twists open onto the page itself, and then the window
 * widens past the edges of the screen while the instrument drifts out of
 * frame. Under it the name drops in as cipher glyphs, decodes letter by
 * letter, then scrambles back into code as the window opens. Behind it the starfield arrives out of warp (lib/starfield.js).
 * Whether it plays is decided once in main.jsx (html[data-intro]), so the
 * hero can time itself against it.
 */
export const IntroVeil = () => {
  // null until the first tick: the letters are still invisible then
  const [cipher, setCipher] = useState(null);
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

  useEffect(() => {
    if (!visible) return undefined;
    const t0 = performance.now();
    const id = setInterval(() => {
      const ms = performance.now() - t0;
      setCipher({
        letters: [...SIGNAL].map((c, i) => {
          const coded =
            c !== " " &&
            (ms < DECODE_AT + i * DECODE_STEP || ms > ENCODE_AT + i * ENCODE_STEP);
          return { c: coded ? glyph() : c, coded };
        }),
        status: [...STATUS]
          .map((c, i) =>
            c === " " || ms > STATUS_AT + i * STATUS_STEP ? c : glyph(),
          )
          .join(""),
        locked: ms > STATUS_AT + STATUS.length * STATUS_STEP,
      });
    }, 50);
    return () => clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  const { letters, status, locked } = cipher ?? {
    letters: [...SIGNAL].map((c) => ({ c, coded: false })),
    status: "",
    locked: false,
  };

  return (
    <div className="veil" aria-hidden="true">
      <div className="veil-sheet" />
      <div className="veil-rim" />
      <i className="veil-rule" />
      <div className="veil-id">
        <p className="veil-name">
          {letters.map(({ c, coded }, i) => (
            <span key={i} data-coded={coded || undefined} style={{ "--i": i }}>
              {c}
            </span>
          ))}
        </p>
        <i className="veil-strip" />
        <p className="veil-status" data-locked={locked || undefined}>
          {status}
        </p>
      </div>
      <svg className="veil-stage" viewBox="-100 -100 200 200">
        <defs>
          <clipPath id="veil-disc-clip">
            <circle r="46" />
          </clipPath>
        </defs>

        <circle className="veil-ticks" r="94" pathLength="100" />
        <path
          className="veil-brackets"
          d="M-98,-84V-98H-84 M84,-98H98V-84 M98,84V98H84 M-84,98H-98V84"
        />

        {arcs.map(({ r, len, turn, spin, dir }, i) => (
          <g key={r} transform={`rotate(${turn})`}>
            <g
              className="veil-orbit"
              style={{
                "--ring-delay": `${i * 0.12}s`,
                "--ring-len": len,
                "--ring-spin": `${spin}s`,
                "--ring-dir": dir,
              }}
            >
              <circle className="veil-arc" r={r} pathLength="100" />
              <circle className="veil-dot" cx={r} r={1.6 + i * 0.5} />
            </g>
          </g>
        ))}

        <path className="veil-spark" d={SPARKLE} />

        {/* The iris: six half-planes sliding off the centre, fills first and
            seams on top so no blade can paint over its neighbour's edge */}
        <g className="veil-disc">
          <g className="veil-iris" clipPath="url(#veil-disc-clip)">
            {blades.map((t) => (
              <rect
                key={t}
                className="veil-blade"
                style={{ "--t": `${t}deg` }}
                y="-120"
                width="120"
                height="240"
              />
            ))}
            {blades.map((t) => (
              <line
                key={t}
                className="veil-blade veil-seam"
                style={{ "--t": `${t}deg` }}
                y2="120"
              />
            ))}
          </g>
          <circle className="veil-disc-rim" r="46" />
          <circle className="veil-disc-halo" r="50" pathLength="100" />
        </g>
      </svg>
    </div>
  );
};
