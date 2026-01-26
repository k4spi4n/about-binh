import { ArrowRight, ExternalLink, Github } from "lucide-react";
import "./Timeline.css";

const projects = [
  {
    id: 1,
    title:
      "Hệ thống Quản lý Bệnh viện Thông minh tích hợp AI hỗ trợ Chẩn đoán và Tóm tắt Hồ sơ Y tế",
    description:
      "Dự án NCKH phát triển Hệ thống Thông tin và Quản lý Bệnh viện toàn diện, số hóa quy trình vận hành trên nền tảng Supabase (PostgreSQL) và Next.js. Được tích hợp AI để hỗ trợ giải trình, tóm tắt hồ sơ y tế và phối hợp chẩn đoán, nâng cao hiệu quả và độ chính xác trong quản lý và điều trị.",
    year: "2025",
    image: "projects/project4.png",
    tags: ["PostgreSQL", "Supabase", "NextJS"],
    demoUrl: "",
    githubUrl: "https://github.com/AkasameVN26/cmec-hms-web-app",
  },
  {
    id: 2,
    title: "Website hỗ trợ cá nhân hoá học tập dựa trên AI",
    description:
      "Nền tảng nâng cao chất lượng và hiệu quả giáo dục thông qua việc tự động hóa quy trình tạo đề thi, bài tập, đồng thời cá nhân hóa trải nghiệm học tập cho học sinh bằng các gợi ý và phân tích chuyên sâu dựa trên AI. Hệ thống giúp giáo viên dễ dàng quản lý lớp học và theo dõi tiến độ học tập của từng cá nhân, góp phần tối ưu hóa công tác giảng dạy trong kỷ nguyên số.",
    image: "projects/project1.png",
    year: "2025",
    tags: ["Angular", ".NET", "MongoDB"],
    demoUrl:
      "https://drive.google.com/drive/folders/163Ht97sw9-aLWYJaNji7lrHm0U07hSyE?usp=drive_link",
    githubUrl: "",
  },

  {
    id: 3,
    title: "ML AIMBOT VALORANT",
    description:
      "Từng bước tiến vào mảng học máy - Computer Vision với quyết tâm tạo ra aimbot có độ chính xác và tốc độ phản hồi cực cao trong thời gian thực. Thành công nho nhỏ nhưng là động lực to lớn để mình đi theo con đường ML/AI Engineer.",
    image: "projects/project2.mp4",
    year: "2023 - 2024",
    tags: ["OpenCV", "NumPy", "Hacking"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    id: 4,
    title: "Touhou: Goblin Invasion",
    description:
      "Một dự án game khá hoàn chỉnh đã được publish trên itch.io. Lấy cảm hứng bối cảnh cùng dàn nhân vật từ series game nổi tiếng Touhou Project, gameplay bắn quái và hiệu ứng đồ hoạ đẹp mắt",
    image: "projects/project3.png",
    year: "2022",
    tags: ["Unity"],
    demoUrl: "https://daindadev.itch.io/touhou-goblins-invasion",
    githubUrl: "",
  },
  {
    id: 5,
    title: "Vài dự án demo game đơn giản",
    description: "Khởi đầu của hành trình vào thế giới lập trình",
    image: "projects/project0.mp4",
    year: "2021 - 2022",
    tags: ["Unity", "Unreal Engine"],
    demoUrl: "",
    githubUrl: "",
  },
];

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
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
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
