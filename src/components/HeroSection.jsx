import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { DripText } from "./motion/DripText";
import { AstralButton } from "./motion/AstralButton";

export const HeroSection = () => {
  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL;
  const avatarUrl = `${baseUrl}/documents/avatar.png`;

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
        <div className="relative w-48 h-48 mx-auto mb-10 flex items-center justify-center rounded-full profile-picture-container bloom-in">
          {/* Ambient bloom */}
          <span className="avatar-bloom" aria-hidden="true" />
          {/* Rotating aurora ring + its blurred halo */}
          <span className="avatar-aurora-glow" aria-hidden="true" />
          <span className="avatar-aurora" aria-hidden="true" />
          {/* Slow dashed HUD ring */}
          <span className="avatar-dashes" aria-hidden="true" />

          {/* Orbits — far half, drawn behind the avatar */}
          <span className="orbit-clip orbit-clip--a is-back" aria-hidden="true">
            <span className="orbit orbit--a">
              <span className="orbit-spin">
                <span className="orbit-dot" />
              </span>
            </span>
          </span>
          <span className="orbit-clip orbit-clip--b is-back" aria-hidden="true">
            <span className="orbit orbit--b">
              <span className="orbit-spin">
                <span className="orbit-dot" />
              </span>
            </span>
          </span>

          <img
            src={avatarUrl}
            alt="Thai Binh - Full-stack & AI Engineer"
            className="w-[90%] h-[90%] rounded-full object-cover shadow-lg relative z-20"
          />

          {/* Same orbits again, clipped to the near half so particles
              sweep in front of the avatar */}
          <span className="orbit-clip orbit-clip--a is-front" aria-hidden="true">
            <span className="orbit orbit--a">
              <span className="orbit-spin">
                <span className="orbit-dot" />
              </span>
            </span>
          </span>
          <span className="orbit-clip orbit-clip--b is-front" aria-hidden="true">
            <span className="orbit orbit--b">
              <span className="orbit-spin">
                <span className="orbit-dot" />
              </span>
            </span>
          </span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <DripText text="Xin chào, tôi là" />{" "}
            <DripText
              text="Thái Bình"
              startIndex={15}
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
            className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto rise-in"
            style={{ "--rise-delay": "1.3s" }}
          >
            Sinh viên Kỹ thuật Phần mềm tại Đại học CMC, theo đuổi lộ trình
            Full-stack và AI Engineering với định hướng xây dựng sản phẩm có
            kiến trúc vững chắc, hiệu năng cao và tác động thực tiễn cho người
            dùng.
          </p>

          <div
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 rise-in"
            style={{ "--rise-delay": "1.5s" }}
          >
            <AstralButton
              href="#skills"
              className="px-8 py-3"
            >
              Xem hồ sơ kỹ năng
            </AstralButton>
            <AstralButton
              href="#projects"
              className="px-8 py-3"
            >
              Xem dự án nổi bật
            </AstralButton>
          </div>
        </div>
      </motion.div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rise-in"
        style={{ "--rise-delay": "2s" }}
      >
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-sm text-muted-foreground mb-2">
            {" "}
            Cuộn xuống để khám phá thêm{" "}
          </span>
          <ArrowDown className="h-5 w-5 text-primary" />
        </div>
      </div>
    </section>
  );
};
