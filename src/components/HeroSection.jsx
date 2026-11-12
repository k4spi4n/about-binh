import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { DripText } from "./motion/DripText";
import { AstralButton } from "./motion/AstralButton";
import { useLang } from "../i18n/useLang";

export const HeroSection = () => {
  const { lang, t } = useLang();

  // The intro delay only belongs to the first load; after a language switch
  // the greeting should drip in right away instead of sitting blank.
  const [seenLang, setSeenLang] = useState(lang);
  const [switched, setSwitched] = useState(false);
  if (seenLang !== lang) {
    setSeenLang(lang);
    setSwitched(true);
  }
  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL;
  const avatarUrl = `${baseUrl}/documents/avatar.webp`;

  // As the hero scrolls away it recedes: lifts, shrinks slightly and goes
  // out of focus, so the next section feels like a new scene arriving.
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const sceneBlur = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["blur(0px)", "blur(10px)"],
  );
  const sceneStyle = reduceMotion
    ? undefined
    : {
        opacity: sceneOpacity,
        scale: sceneScale,
        y: sceneY,
        filter: sceneBlur,
      };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <motion.div
        className="container max-w-4xl mx-auto text-center z-10"
        style={sceneStyle}
      >
        <div className="relative w-48 h-48 mx-auto mb-10 flex items-center justify-center rounded-full bloom-in">
          {/* Eclipse: purple haze, the rim's outer glow, the rim itself */}
          <span className="avatar-bloom" aria-hidden="true" />
          <span className="avatar-aurora-glow" aria-hidden="true" />
          <span className="avatar-aurora" aria-hidden="true" />

          <img
            src={avatarUrl}
            alt="Thai Binh - Full-stack & AI Engineer"
            className="w-[90%] h-[90%] rounded-full object-cover shadow-lg relative z-20"
          />

          {/* Flare where the light breaks over the rim */}
          <span className="avatar-glint" aria-hidden="true" />
        </div>

        <div className="space-y-6">
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            style={switched ? { "--intro-delay": "0s" } : undefined}
          >
            <DripText key={`g-${lang}`} text={t("hero.greeting")} />{" "}
            <DripText
              key={`n-${lang}`}
              text={t("hero.name")}
              startIndex={Array.from(t("hero.greeting")).length}
              stagger={70}
              className="text-primary text-primary-glow"
            />
          </h1>

          <p
            className="text-base md:text-lg font-semibold text-primary text-primary-glow rise-in"
            style={{ "--rise-delay": "1.1s" }}
          >
            Full-stack • AI • Game Engineer
          </p>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto rise-in"
            style={{ "--rise-delay": "1.3s" }}
          >
            {t("hero.bio")}
          </p>

          <div
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 rise-in"
            style={{ "--rise-delay": "1.5s" }}
          >
            <AstralButton
              href="#skills"
              className="px-8 py-3"
            >
              {t("hero.skills")}
            </AstralButton>
            <AstralButton
              href="#projects"
              className="px-8 py-3"
            >
              {t("hero.projects")}
            </AstralButton>
          </div>
        </div>
      </motion.div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rise-in"
        style={{ "--rise-delay": "2s" }}
      >
        <div className="scroll-hint flex flex-col items-center motion-safe:animate-bounce">
          <span className="text-sm text-muted-foreground mb-2">
            {" "}
            {t("hero.scroll")}{" "}
          </span>
          <ArrowDown className="h-5 w-5 text-primary" />
        </div>
      </div>
    </section>
  );
};
