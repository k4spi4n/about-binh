import { ArrowRight, ExternalLink, Github } from "lucide-react";
import "./Timeline.css";
import { projects } from "../data/projects";

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Những Dự Án
          <span className="text-primary"> Nổi Bật </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Xin giới thiệu một số dự án tâm huyết của minh. Mỗi sản phẩm là thành
          quả của quá trình trau chuốt cẩn thận, đặt trọng tâm vào từng chi
          tiết, hiệu suất hoạt động và trải nghiệm mang lại cho người dùng.
        </p>

        <div className="timeline">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div className="timeline-year text-primary font-bold">
                {project.year}
              </div>
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
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="animated-gradient-border w-fit flex items-center mx-auto gap-2 px-6 py-2 rounded-full text-primary font-semibold transition-all duration-300 hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-fuchsia-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:border-transparent"
            target="_blank"
            href=""
          >
            Ghé qua Github của mình nhé! <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
