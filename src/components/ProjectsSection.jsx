import { ArrowRight, ExternalLink } from "lucide-react";
import { Github } from "./BrandIcons";
import "./Timeline.css";
import { projects } from "../data/projects";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";
import { AstralButton } from "./motion/AstralButton";

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
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

        <div className="timeline">
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
                <div className="h-48 overflow-hidden">
                  {project.image.endsWith(".mp4") ? (
                    <video
                      src={`${import.meta.env.BASE_URL}${project.image}`}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <img
                      src={`${import.meta.env.BASE_URL}${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, key) => (
                      <span
                        key={key}
                        className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-1">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
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
