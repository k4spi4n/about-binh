import { useEffect, useRef, useState } from "react";
import { startStarfield } from "@/lib/starfield";

// Meteor shower. Every meteor falls from one radiant (up and to the right),
// scattered by a few degrees, the way a real shower looks. Depth drives the
// rest: most meteors are distant (short, faint, slow) and a few are close
// (long, bright, fast). Each one respawns somewhere new after it burns out.
const METEOR_COUNT = 7;
const RADIANT = -32; // deg; the streak's head points down and to the left
const METEOR_HUES = [250, 250, 265, 292, 190]; // violet-leaning palette
let meteorSeq = 0;

const spawnMeteor = (first = false) => {
  const depth = Math.random() ** 1.8;
  return {
    id: meteorSeq++,
    x: 8 + Math.random() * 100,
    y: -10 + Math.random() * 55,
    angle: RADIANT + (Math.random() - 0.5) * 10,
    length: 90 + depth * 190,
    thickness: 1.2 + depth * 1.4,
    distance: 260 + depth * 380,
    duration: 2.4 - depth * 1,
    peak: 0.4 + depth * 0.6,
    hue: METEOR_HUES[Math.floor(Math.random() * METEOR_HUES.length)],
    // Exponential gaps: usually a meteor arrives alone, but now and then two
    // or three land close together. The first wave waits for the intro.
    delay: (first ? 2.5 : 0.6) - Math.log(1 - Math.random()) * 6,
  };
};

export const StarBackground = () => {
  const skyRef = useRef(null);
  const starsRef = useRef(null);
  const [meteors, setMeteors] = useState(() =>
    Array.from({ length: METEOR_COUNT }, () => spawnMeteor(true)),
  );

  const respawn = (id) =>
    setMeteors((all) => all.map((m) => (m.id === id ? spawnMeteor() : m)));

  useEffect(() => startStarfield(skyRef.current, starsRef.current), []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <canvas ref={skyRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={starsRef} className="absolute inset-0 h-full w-full" />

      {meteors.map((m) => (
        <i
          key={m.id}
          className="meteor"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            "--angle": `${m.angle}deg`,
            "--len": `${m.length}px`,
            "--thick": `${m.thickness}px`,
            "--dist": `${m.distance}px`,
            "--dur": `${m.duration}s`,
            "--delay": `${m.delay}s`,
            "--peak": m.peak,
            "--hue": m.hue,
          }}
          // The head and tail animate too; only the flight ending counts
          onAnimationEnd={(e) => {
            if (e.animationName === "meteor-fall") respawn(m.id);
          }}
        />
      ))}

      <i className="space-lens" />
    </div>
  );
};
