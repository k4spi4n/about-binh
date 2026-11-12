import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Github } from "./BrandIcons";
import "./Projects.css";
import { projects } from "../data/projects";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";
import { DripText } from "./motion/DripText";
import { AstralButton } from "./motion/AstralButton";
import { useLang } from "../i18n/useLang";

// One planet per project, innermost first: colour, size (rem) and whether it
// wears a ring. Orbit width, speed and starting angle follow from the index.
const PLANETS = [
  { hue: 250, size: 0.95 },
  { hue: 187, size: 1.2 },
  { hue: 292, size: 1.05 },
  { hue: 35, size: 1.45, ringed: true },
  { hue: 150, size: 1 },
  { hue: 330, size: 1.25 },
];
const planetOf = (i) => PLANETS[i % PLANETS.length];
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
  // source of truth: picking a planet just scrolls to its stop.
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  // Where each planet starts on its orbit, rolled fresh on every visit: a
  // random turn for the whole system, golden-angle spacing so neighbours
  // never line up, and some scatter on top.
  const [phases] = useState(() => {
    const turn = Math.random() * 360;
    return projects.map(
      (_, i) => (turn + i * 137.5 + (Math.random() - 0.5) * 70) % 360,
    );
  });
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setActive(Math.min(count - 1, Math.floor(p * count))),
  );

  const pick = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const top = window.scrollY + track.getBoundingClientRect().top;
    const span = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / count) * span, behavior: "smooth" });
  };

  const project = projects[active];
  const title = l(project.title);
  const src = `${import.meta.env.BASE_URL}${project.image}`;

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
              <div className="solar">
                <i className="solar-sun" aria-hidden="true" />
                {projects.map((p, i) => {
                  const { hue, size, ringed } = planetOf(i);
                  return (
                    <div
                      key={p.id}
                      className="solar-orbit"
                      data-active={i === active || undefined}
                      style={{
                        "--d": `${28 + (i * 62) / Math.max(1, count - 1)}%`,
                        "--period": `${40 + i * 16}s`,
                        "--phase": `${phases[i]}deg`,
                        "--hue": hue,
                        "--size": `${size}rem`,
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
                        title={l(p.title)}
                        onClick={() => pick(i)}
                      >
                        {ringed && <i />}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="solar-legend" role="group" aria-label={t("projects.pick")}>
                {projects.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={i === active}
                    aria-label={l(p.title)}
                    title={l(p.title)}
                    style={{ "--hue": planetOf(i).hue }}
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
                    <img src={src} alt={title} />
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
