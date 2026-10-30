// Deep-space backdrop on two canvases.
//
// The sky (nebula, the Milky Way and a few thousand faint stars) sits at
// infinity: it is painted once per viewport size and never moves. The
// foreground stars sit at random depths and are redrawn every frame, so they
// twinkle and slide past at the speed their depth gives them as the camera
// drifts, the page scrolls and the cursor moves. When the intro plays they
// also streak in from the centre as the veil opens, as if arriving from warp.

const TAU = Math.PI * 2;

// Room around the viewport so drifting stars never pop in at an edge
const PAD = 40;

// Picked once per visit, so a resize repaints the same sky
const SEED = (Math.random() * 2 ** 31) | 0;

// Star colours by temperature, blue-hot to orange, plus the site's violet.
// Repeats weight the draw toward white.
const TINTS = [
  "170,191,255",
  "202,215,255",
  "202,215,255",
  "248,247,255",
  "248,247,255",
  "248,247,255",
  "255,244,234",
  "255,244,234",
  "255,210,161",
  "196,181,253",
];
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const mod = (a, n) => ((a % n) + n) % n;

const ramp = (lo, hi, x) => {
  const t = Math.min(1, Math.max(0, (x - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
};

// Value noise, summed over four octaves for soft cloudy structure in 0..1.
// The lattice hash is integer-only; it runs a few million times per paint.
const hash = (x, y) => {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + SEED;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
};

const noise = (x, y) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = (x - xi) ** 2 * (3 - 2 * (x - xi));
  const v = (y - yi) ** 2 * (3 - 2 * (y - yi));
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};

const fbm = (x, y) => {
  let sum = 0;
  for (let amp = 0.5; amp > 0.05; amp /= 2) {
    sum += amp * noise(x, y);
    x = x * 2.03 + 17.3;
    y = y * 2.03 + 9.1;
  }
  return sum / 0.9375;
};

// The Milky Way rises across the view on a diagonal from a bright core left
// of centre. For a point, returns its position along the band and off its
// spine (px, and band widths across), how strongly the band glows there and
// how much dust hides it.
const galaxy = (w, h) => {
  const ux = Math.cos(-0.45);
  const uy = Math.sin(-0.45);
  const width = Math.hypot(w, h) * 0.1;
  return (x, y) => {
    const dx = x - w / 2;
    const dy = y - h / 2;
    const along = dx * ux + dy * uy;
    // The spine wanders instead of running dead straight
    const off =
      dy * ux - dx * uy + (noise(along / 500, 7.7) - 0.5) * width * 1.4;
    const across = off / width;
    const band =
      Math.exp(-across * across) *
      (0.5 + 0.5 * Math.exp(-(((along + w * 0.22) / (w * 0.35)) ** 2)));
    // Dust lanes run with the band, so their noise is stretched along it
    const dust =
      ramp(0.45, 0.7, fbm(along / 320 + 40, off / 70)) *
      Math.exp(-((across / 0.6) ** 2));
    return { along, off, across, band, dust };
  };
};

const paintSky = (canvas, w, h, dpr) => {
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d");
  const at = galaxy(w, h);

  // Nebula: worked out on a coarse grid, then smoothly upscaled. The band
  // glows blue-violet at its edges and pale rose along the spine; stray
  // fuchsia-to-cyan wisps drift through the rest of the sky.
  const S = 8;
  const nw = Math.ceil(w / S);
  const nh = Math.ceil(h / S);
  const img = new ImageData(nw, nh);
  for (let j = 0; j < nh; j++) {
    for (let i = 0; i < nw; i++) {
      const x = i * S;
      const y = j * S;
      const { along, off, across, band, dust } = at(x, y);
      const clouds = fbm(along / 420, off / 160);
      const glow =
        Math.min(
          1,
          Math.max(0, band * (0.35 + 1.3 * (clouds - 0.45)) * (1 - 0.75 * dust)) +
            0.06 * Math.exp(-((across / 2.2) ** 2)),
        ) * 0.42;
      const wisp =
        ramp(0.55, 0.78, fbm(x / 520 + 90, y / 520 + 20)) *
        (1 - 0.6 * band) *
        0.2 *
        (1 - glow);
      const alpha = glow + wisp;
      if (alpha < 0.002) continue;
      const spine = Math.exp(-((across / 0.35) ** 2)) * band;
      const hue = ramp(0.38, 0.62, noise(x / 900 + 30, y / 900));
      const o = (j * nw + i) * 4;
      img.data[o] = (glow * (95 + 160 * spine) + wisp * (217 - 183 * hue)) / alpha;
      img.data[o + 1] = (glow * (90 + 125 * spine) + wisp * (70 + 141 * hue)) / alpha;
      img.data[o + 2] = (glow * (235 + 5 * spine) + wisp * 238) / alpha;
      img.data[o + 3] = alpha * 255;
    }
  }
  const coarse = document.createElement("canvas");
  coarse.width = nw;
  coarse.height = nh;
  coarse.getContext("2d").putImageData(img, 0, 0);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(coarse, 0, 0, nw * S * dpr, nh * S * dpr);

  // Faint stars, crowding into the band and dimmed where its dust lies
  ctx.scale(dpr, dpr);
  const count = Math.round((w * h) / 700);
  for (let placed = 0; placed < count; ) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const { band, dust } = at(x, y);
    if (Math.random() > 0.2 + 0.8 * band) continue;
    placed++;
    const m = Math.random() ** 2.5;
    ctx.globalAlpha = (0.2 + 0.6 * m) * (1 - 0.7 * dust);
    ctx.fillStyle = `rgb(${pick(TINTS)})`;
    ctx.beginPath();
    ctx.arc(x, y, 0.3 + 0.7 * m, 0, TAU);
    ctx.fill();
  }
};

// One glow sprite per colour, drawn once and stamped for every star. Bright
// stars get a larger sprite with diffraction spikes, the cross a telescope's
// struts paint on anything bright enough.
const sprites = new Map();
const sprite = (tint, spiked) => {
  const key = tint + spiked;
  if (sprites.has(key)) return sprites.get(key);
  const S = 64;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d");
  // Spiked stars are drawn larger, so their core is tighter in the sprite
  const k = spiked ? 0.4 : 1;
  const glow = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  glow.addColorStop(0, "#fff");
  glow.addColorStop(0.1 * k, `rgba(${tint},0.9)`);
  glow.addColorStop(0.28 * k, `rgba(${tint},0.2)`);
  glow.addColorStop(1, `rgba(${tint},0)`);
  g.fillStyle = glow;
  g.fillRect(0, 0, S, S);
  if (spiked) {
    const ray = (dx, dy) => {
      const r = g.createLinearGradient(0, 0, dx, dy);
      r.addColorStop(0, `rgba(${tint},0)`);
      r.addColorStop(0.36, `rgba(${tint},0.2)`);
      r.addColorStop(0.5, `rgba(${tint},0.9)`);
      r.addColorStop(0.64, `rgba(${tint},0.2)`);
      r.addColorStop(1, `rgba(${tint},0)`);
      return r;
    };
    g.fillStyle = ray(S, 0);
    g.fillRect(0, S / 2 - 0.5, S, 1);
    g.fillStyle = ray(0, S);
    g.fillRect(S / 2 - 0.5, 0, 1, S);
  }
  sprites.set(key, c);
  return c;
};

const makeStars = (w, h) =>
  Array.from({ length: Math.round((w * h) / 6000) }, () => {
    const z = Math.random(); // depth: 0 far, 1 near
    const m = Math.random() ** 3; // brightness: mostly faint, a few bright
    const spiked = m > 0.9 && z > 0.4;
    const tint = pick(TINTS);
    return {
      x: Math.random() * (w + PAD * 2),
      y: Math.random() * (h + PAD * 2),
      z,
      tint,
      img: sprite(tint, spiked),
      r: 0.5 + 1.5 * m + 0.6 * z,
      spread: spiked ? 18 : 6.5,
      a: 0.35 + 0.65 * m,
      // Bright stars scintillate harder, like real ones near the horizon
      amp: 0.12 + 0.4 * m,
      rate: 0.5 + Math.random() * 1.5,
      phase: Math.random() * TAU,
    };
  });

export const startStarfield = (sky, near) => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const ctx = near.getContext("2d");
  // The veil starts opening at 1.3s (motion.css); arrive just ahead of it
  const warpFrom =
    document.documentElement.dataset.intro === "play"
      ? performance.now() + 1000
      : -Infinity;
  let w = 0;
  let h = 0;
  let dpr = 1;
  let stars = [];
  // The camera eases toward the cursor and the scroll position, so the
  // parallax has a little weight to it
  let mx = 0;
  let my = 0;
  let tx = 0;
  let ty = 0;
  let sy = window.scrollY;
  let raf = 0;
  let resizeTimer = 0;

  const setup = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    // ponytail: capped at 1.5 so a 4K sky stays cheap; raise if stars look soft
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    paintSky(sky, w, h, dpr);
    near.width = Math.round(w * dpr);
    near.height = Math.round(h * dpr);
    stars = makeStars(w, h);
  };

  const draw = (now) => {
    const t = now / 1000;
    const warp =
      (1 - Math.min(1, Math.max(0, (now - warpFrom) / 1800))) ** 3;
    mx += (tx - mx) * 0.05;
    my += (ty - my) * 0.05;
    sy += (window.scrollY - sy) * 0.1;

    if (warp > 0.001) sky.style.opacity = 1 - warp;
    else if (sky.style.opacity) sky.style.opacity = "";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = "round";
    for (const s of stars) {
      // Nearer stars drift, scroll and follow the cursor faster
      const depth = 0.1 + 0.9 * s.z;
      let x = mod(s.x - t * 3 * depth, w + PAD * 2) - PAD + mx * depth;
      let y = mod(s.y - sy * 0.08 * depth, h + PAD * 2) - PAD + my * depth;

      if (warp > 0.001) {
        // Coming out of warp each star rushes outward from the centre and
        // brakes into place, its streak shrinking with its speed
        const head = 1 - 0.6 * warp;
        const tail = head * (1 - 0.7 * warp);
        const dx = x - w / 2;
        const dy = y - h / 2;
        x = w / 2 + dx * head;
        y = h / 2 + dy * head;
        ctx.globalAlpha = s.a * Math.min(1, 2 * warp);
        ctx.strokeStyle = `rgb(${s.tint})`;
        ctx.lineWidth = s.r;
        ctx.beginPath();
        ctx.moveTo(w / 2 + dx * tail, h / 2 + dy * tail);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      const flicker =
        1 -
        s.amp *
          (0.5 + 0.5 * Math.sin(t * s.rate + s.phase)) *
          (0.5 + 0.5 * Math.sin(t * s.rate * 2.3 + s.phase * 1.7));
      const size = s.r * s.spread;
      ctx.globalAlpha = s.a * flicker;
      ctx.drawImage(s.img, x - size / 2, y - size / 2, size, size);
    }
  };

  const loop = (now) => {
    draw(now);
    raf = requestAnimationFrame(loop);
  };

  // Mobile browsers resize the viewport as the URL bar slides in and out;
  // the canvases just stretch through that instead of repainting the sky.
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth === w && Math.abs(window.innerHeight - h) < 160) {
        return;
      }
      setup();
      if (reduceMotion) draw(0);
    }, 200);
  };

  const onMove = (e) => {
    tx = (e.clientX - w / 2) / 40;
    ty = (e.clientY - h / 2) / 40;
  };

  setup();
  window.addEventListener("resize", onResize);
  if (reduceMotion) {
    draw(0);
  } else {
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
  }

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(resizeTimer);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousemove", onMove);
  };
};
