import { useEffect, useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Github } from "./BrandIcons";
import "./Timeline.css";
import { projects } from "../data/projects";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";
import { AstralButton } from "./motion/AstralButton";

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
  // A beam of light runs down the timeline as you read it, landing on each
  // project about when its card arrives.
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 75%"],
  });
  const beam = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle lead="Những Dự Án" accent="Nổi Bật" className="mb-6" />

        <Reveal
          as="p"
          delay={0.3}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Dưới đây là những dự án tiêu biểu tôi đã trực tiếp tham gia phát
          triển. Mỗi sản phẩm đều được đầu tư vào kiến trúc, hiệu năng và trải
          nghiệm người dùng nhằm đảm bảo chất lượng triển khai thực tế.
        </Reveal>

        <div className="timeline" ref={timelineRef}>
          <motion.div
            className="timeline-beam"
            style={{ scaleY: beam }}
            aria-hidden="true"
          />
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div className="timeline-year text-primary text-primary-glow font-bold">
                {project.year}
              </div>
              <Reveal>
                <div className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
                  <div className="aspect-[2/1] overflow-hidden">
                    {project.image.endsWith(".mp4") ? (
                      <AutoplayVideo
                        src={`${import.meta.env.BASE_URL}${project.image}`}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <img
                        src={`${import.meta.env.BASE_URL}${project.image}`}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, key) => (
                          <span
                            key={key}
                            className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex shrink-0 gap-3 pt-1">
                        {project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                          >
                            <ExternalLink size={20} />
                          </a>
                        ) : (
                          <span className="text-muted-foreground opacity-50 cursor-not-allowed">
                            <ExternalLink size={20} />
                          </span>
                        )}
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                          >
                            <Github size={20} />
                          </a>
                        ) : (
                          <span className="text-muted-foreground opacity-50 cursor-not-allowed">
                            <Github size={20} />
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-2">
                      Vai trò: {project.role}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <AstralButton
            className="w-fit flex items-center mx-auto gap-2 px-6 py-2"
            target="_blank"
            href="https://github.com/k4spi4n"
          >
            Xem thêm dự án trên GitHub <ArrowRight size={16} />
          </AstralButton>
        </div>
      </div>
    </section>
  );
};
