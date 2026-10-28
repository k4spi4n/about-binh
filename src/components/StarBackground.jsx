import { useEffect, useRef, useState } from "react";

// Stars live on two depth layers: small, faint ones far away and large ones
// close by. Parallax moves the two layers rather than every star, so a mouse
// move costs two transforms instead of a style recalc per star.
const LAYERS = [
  { key: "far", speed: 0.2 },
  { key: "near", speed: 0.5 },
];

const generateStars = () => {
  const numberOfStars = Math.floor(
    (window.innerWidth * window.innerHeight) / 8500,
  );
  const stars = [];

  for (let i = 0; i < numberOfStars; i++) {
    const isSmall = Math.random() < 0.8;
    const size = isSmall ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 2;

    let x, y;
    let validPosition = false;
    let attempts = 0;

    // Simple collision detection for large stars to prevent clustering
    if (!isSmall) {
      while (!validPosition && attempts < 50) {
        x = Math.random() * 100;
        y = Math.random() * 100;
        validPosition = true;

        for (const star of stars) {
          if (star.layer === "near") {
            const dx = star.x - x;
            const dy = star.y - y;
            // Distance squared threshold (5%^2 = 25)
            if (dx * dx + dy * dy < 25) {
              validPosition = false;
              break;
            }
          }
        }
        attempts++;
      }
    }

    if (!validPosition || isSmall) {
      x = Math.random() * 100;
      y = Math.random() * 100;
    }

    stars.push({
      id: i,
      size,
      x,
      y,
      opacity: isSmall ? Math.random() * 0.5 + 0.2 : Math.random() * 0.5 + 0.5,
      animationDuration: Math.random() * 4 + 2,
      layer: isSmall ? "far" : "near",
    });
  }

  return stars;
};

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
  const [stars, setStars] = useState(generateStars);
  const [meteors, setMeteors] = useState(() =>
    Array.from({ length: METEOR_COUNT }, () => spawnMeteor(true)),
  );

  const respawn = (id) =>
    setMeteors((all) => all.map((m) => (m.id === id ? spawnMeteor() : m)));
  const containerRef = useRef(null);

  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => setStars(generateStars()), 200);
    };
    window.addEventListener("resize", handleResize);

    // Parallax follows the cursor, at most once per frame
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    const handleMouseMove = (e) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const el = containerRef.current;
        if (!el) return;
        // Dividing by 25 sets the maximum drift
        el.style.setProperty("--mouse-x", `${(e.clientX - window.innerWidth / 2) / 25}px`);
        el.style.setProperty("--mouse-y", `${(e.clientY - window.innerHeight / 2) / 25}px`);
      });
    };
    if (!reduceMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.clearTimeout(resizeTimer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {LAYERS.map(({ key, speed }) => (
        <div
          key={key}
          className="absolute inset-0"
          style={{
            transform: `translate3d(calc(var(--mouse-x, 0px) * ${speed}), calc(var(--mouse-y, 0px) * ${speed}), 0)`,
            transition: "transform 0.4s var(--ease-settle)",
          }}
        >
          {stars
            .filter((star) => star.layer === key)
            .map((star) => (
              <div
                key={star.id}
                className="star animate-pulse-subtle"
                style={{
                  width: star.size + "px",
                  height: star.size + "px",
                  left: star.x + "%",
                  top: star.y + "%",
                  opacity: star.opacity,
                  animationDuration: star.animationDuration + "s",
                }}
              />
            ))}
        </div>
      ))}

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
    </div>
  );
};
