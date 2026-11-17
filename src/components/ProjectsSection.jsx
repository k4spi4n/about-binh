import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import { Github } from "./BrandIcons";
import "./Projects.css";
import { projects } from "../data/projects";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";
import { DripText } from "./motion/DripText";
import { AstralButton } from "./motion/AstralButton";
import { useLang } from "../i18n/useLang";

// One real planet per project, innermost first (Mercury to Uranus; Neptune
// has no project to carry). au = semi-major axis, days = sidereal period,
// L0 = mean heliocentric longitude at J2000 (JPL), r = equatorial radius in
// Earth radii, sat = colour saturation.
const PLANETS = [
  { name: "Mercury", au: 0.387, days: 87.969, L0: 252.25, r: 0.383, hue: 30, sat: 0.3 },
  { name: "Venus", au: 0.723, days: 224.701, L0: 181.98, r: 0.949, hue: 48, sat: 0.85 },
  { name: "Earth", au: 1, days: 365.256, L0: 100.46, r: 1, hue: 212, sat: 1 },
  { name: "Mars", au: 1.524, days: 686.98, L0: 355.45, r: 0.532, hue: 10, sat: 1 },
  { name: "Jupiter", au: 5.203, days: 4332.59, L0: 34.4, r: 11.21, hue: 28, sat: 0.8 },
  { name: "Saturn", au: 9.537, days: 10759.22, L0: 49.95, r: 9.45, hue: 44, sat: 0.85, ringed: true },
  { name: "Uranus", au: 19.19, days: 30688.5, L0: 313.24, r: 4.01, hue: 186, sat: 0.8 },
];
const planetOf = (i) => PLANETS[i % PLANETS.length];

// Calibration knobs. One Earth year plays in YEAR_S seconds, so every
// period keeps its true ratio (Mercury 14s, Uranus 84 minutes). Orbit width
// follows the log of the distance: the planets sit roughly evenly on that
// scale, so the inner four (the spotlight projects) get as much room as the
// giants instead of huddling round the sun. The innermost orbit starts at
// 30% so the tilted view never passes Mercury through the sun (8%).
const YEAR_S = 60;
const J2000 = Date.UTC(2000, 0, 1, 12);
const [AU_MIN, AU_MAX] = [PLANETS[0].au, PLANETS[PLANETS.length - 1].au];
const orbitWidth = (au) =>
  30 + (66 * Math.log(au / AU_MIN)) / Math.log(AU_MAX / AU_MIN);
// Diameter follows the cube root of the real radius: Jupiter still reads as
// the giant without Mercury shrinking out of sight. In cqw (% of the
// system's width) so it scales with the stage; the floor keeps the rocky
// planets visible on phones.
const SIZE_CQW = 1.7;
const planetSize = (r) =>
  `max(0.45rem, ${(SIZE_CQW * Math.cbrt(r)).toFixed(2)}cqw)`;
// Where the planet really is today, as degrees counter-clockwise from the
// vernal equinox direction (the right-hand edge of the stage).
const longitudeNow = ({ L0, days }) =>
  (((L0 + (360 * (Date.now() - J2000)) / 864e5 / days) % 360) + 360) % 360;
const pad = (n) => String(n).padStart(2, "0");

// Loops only while on screen, so off-screen clips don't keep decoding, and
// stays on its first frame for visitors who prefer reduced motion.
const AutoplayVideo = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video ref={ref} loop muted playsInline preload="metadata" {...props} />
  );
};

export const ProjectsSection = () => {
  const { t, l } = useLang();
  const count = projects.length;
  const total = pad(count);

  // The stage pins while the tall track scrolls past, and how far through
  // the track you are decides which planet is tuned in. Scroll is the single
  // source of truth: picking a planet just scrolls to its stop. When scrolling
  // comes to rest inside the track it settles on the nearest planet, or on
  // the track's ends so leaving the section is never fought.
  const trackRef = useRef(null);
  const stRef = useRef(null);
  const [active, setActive] = useState(0);
  // Each planet starts where it really is in the sky today. CSS rotates
  // clockwise, so the counter-clockwise longitude is negated.
  const [phases] = useState(() =>
    projects.map((_, i) => -longitudeNow(planetOf(i))),
  );
  useEffect(() => {
    const tune = ({ progress }) =>
      setActive(Math.min(count - 1, Math.floor(progress * count)));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: tune,
      onRefresh: tune,
      snap: reduce
        ? undefined
        : {
            snapTo: [0, ...projects.map((_, i) => (i + 0.5) / count), 1],
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: "power1.inOut",
          },
    });
    stRef.current = st;
    return () => st.kill();
  }, [count]);

  // Off screen the system holds still (data-idle pauses its animations)
  const solarRef = useRef(null);
  useEffect(() => {
    const el = solarRef.current;
    const io = new IntersectionObserver(([entry]) =>
      el.toggleAttribute("data-idle", !entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pick = (i) => {
    const st = stRef.current;
    if (!st) return;
    const top = st.start + ((i + 0.5) / count) * (st.end - st.start);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const project = projects[active];
  const title = l(project.title);
  const src = `${import.meta.env.BASE_URL}${project.image}`;
  const next = (active + 1) % count;
  const nextSrc = `${import.meta.env.BASE_URL}${projects[next].image}`;

  return (
    <section id="projects" className="pt-24 pb-12 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <Reveal
          as="p"
          delay={0.3}
          className="text-center text-muted-foreground max-w-2xl mx-auto"
        >
          {t("projects.intro")}
        </Reveal>

        <div className="solar-track" ref={trackRef} style={{ "--stops": count }}>
          <div className="solar-stage">
            {/* The title rides along in the pinned view */}
            <SectionTitle
              lead={t("projects.lead")}
              accent={t("projects.accent")}
              className="solar-title"
            />
            <div className="solar-side">
              <div className="solar" ref={solarRef}>
                <div className="solar-plane">
                  <i className="solar-sun" aria-hidden="true" />
                  {projects.map((p, i) => {
                    const planet = planetOf(i);
                    const { hue, sat, r, ringed } = planet;
                    return (
                      <div
                        key={p.id}
                        className="solar-orbit"
                        data-active={i === active || undefined}
                        style={{
                          "--r": orbitWidth(planet.au) / 100,
                          "--period": `${(planet.days / 365.256) * YEAR_S}s`,
                          "--phase": `${phases[i]}deg`,
                          "--hue": hue,
                          "--sat": sat,
                          "--size": planetSize(r),
                        }}
                      >
                        <i className="solar-beam" aria-hidden="true" />
                        {/* The legend below is the keyboard path; planets are
                            a moving pointer target only */}
                        <button
                          type="button"
                          className="solar-planet"
                          tabIndex={-1}
                          aria-hidden="true"
                          title={`${planet.name} · ${l(p.title)}`}
                          onClick={() => pick(i)}
                        />
                        {ringed && <i className="solar-ring" aria-hidden="true" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="solar-legend" role="group" aria-label={t("projects.pick")}>
                {projects.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={i === active}
                    aria-label={l(p.title)}
                    title={l(p.title)}
                    style={{ "--hue": planetOf(i).hue, "--sat": planetOf(i).sat }}
                    onClick={() => pick(i)}
                  >
                    {l(p.label)}
                  </button>
                ))}
              </div>
              <p className="solar-hint">{t("projects.hint")}</p>
            </div>

            <div className="solar-panel" aria-live="polite">
              <article
                key={project.id}
                className="signal-card"
                style={{ "--hue": planetOf(active).hue }}
              >
                <header className="signal-head">
                  <span className="signal-id">
                    <i aria-hidden="true" />
                    <span>
                      {t("projects.signal")} <b>{pad(active + 1)}</b> / {total}
                    </span>
                  </span>
                  <span className="signal-year">{project.year}</span>
                </header>

                <div className="signal-media">
                  {project.image.endsWith(".mp4") ? (
                    <AutoplayVideo src={src} />
                  ) : (
                    <img src={src} alt={title} loading="lazy" decoding="async" />
                  )}
                </div>

                <div className="signal-body">
                  {/* Decodes each time a project tunes in; it never waits on
                      the page intro */}
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ "--intro-delay": "0s" }}
                  >
                    <DripText key={title} text={title} stagger={14} />
                  </h3>
                  <p className="text-primary text-sm font-medium mb-2">
                    {t("projects.role", { role: l(project.role) })}
                    {!project.githubUrl && (
                      <span className="text-muted-foreground font-normal">
                        {" "}· {t("projects.private")}
                      </span>
                    )}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {l(project.description)}
                  </p>

                  <div className="signal-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  {(project.demoUrl || project.githubUrl) && (
                    <div className="signal-links">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={14} aria-hidden="true" />
                          {t("projects.demo")}
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={14} aria-hidden="true" />
                          {t("projects.source")}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>

              <button
                key={projects[next].id}
                type="button"
                className="signal-next"
                style={{ "--hue": planetOf(next).hue }}
                aria-label={`${t("projects.next")}: ${l(projects[next].title)}`}
                onClick={() => pick(next)}
              >
                {nextSrc.endsWith(".mp4") ? (
                  <video src={nextSrc} muted preload="metadata" />
                ) : (
                  <img src={nextSrc} alt="" loading="lazy" decoding="async" />
                )}
                <span aria-hidden="true">
                  {t("projects.next")} · {pad(next + 1)}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <AstralButton
            className="w-fit flex items-center mx-auto gap-2 px-6 py-2"
            target="_blank"
            href="https://github.com/k4spi4n"
          >
            {t("projects.more")} <ArrowRight size={16} />
          </AstralButton>
        </div>
      </div>
    </section>
  );
};
