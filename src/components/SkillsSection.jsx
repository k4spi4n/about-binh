import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, Eye, FileText } from "lucide-react";
import { useLoading } from "../contexts/LoadingContext";
import { SkillRadar } from "./SkillRadar";

const skills = [
  // Education
  {
    name: "Cử Nhân ngành Kỹ Thuật Phần Mềm với Học Bổng Toàn Phần",
    institution: "Đại Học CMC",
    year: "(2024-2027)",
    category: "Học vấn",
  },

  {
    name: "GPA: 3.61 (Tính đến học kỳ Thu năm học 2025-2026)",
    institution: "Đại Học CMC",
    year: "(2025)",
    category: "Học vấn",
  },

  {
    name: "IELTS 8.0",
    institution: "Mình có thể giao tiếp tốt bằng Tiếng Anh",
    year: "",
    category: "Học vấn",
  },

  {
    name: "Chứng chỉ AI của Samsung Innovation Campus (SIC)",
    institution:
      "Hoàn thành khóa học chuyên sâu về Trí tuệ nhân tạo do Samsung Electronics Việt Nam xác nhận và bảo chứng",
    year: "(2025)",
    category: "Học vấn",
  },

  {
    name: "Chứng chỉ Deep Learning của NVIDIA DLI",
    institution:
      "Hoàn thành khóa học về Học sâu của NVIDIA Deep Learning Institute",
    year: "(2025)",
    category: "Học vấn",
    file: "nvidia_DL.pdf",
  },

  {
    name: "Từng là học sinh khối chuyên Ngữ tại",
    institution: "THPT chuyên Nguyễn Trãi - Hải Dương",
    year: "(2021-2024)",
    category: "Học vấn",
  },

  {
    name: "Thành viên đội tuyển Olympic Tin Học của trường và team Nghiên cứu Khoa học",
    institution: "Đại Học CMC",
    year: "(2025)",
    category: "Học vấn",
  },

  // Ngôn ngữ lập trình
  { name: "Python", level: 90, category: "Ngôn ngữ lập trình" },
  { name: "JavaScript", level: 85, category: "Ngôn ngữ lập trình" },
  { name: "TypeScript", level: 80, category: "Ngôn ngữ lập trình" },
  { name: "Java/C++/C#", level: 80, category: "Ngôn ngữ lập trình" },
  { name: "HTML/CSS", level: 85, category: "Ngôn ngữ lập trình" },

  // Frontend
  { name: "React/Next.js", level: 80, category: "Frontend" },
  { name: "Tailwind CSS", level: 85, category: "Frontend" },

  // Backend
  { name: "Django/FastAPI", level: 85, category: "Backend" },
  { name: "MongoDB/PostgreSQL", level: 80, category: "Backend" },
  { name: "Node.js/NestJS", level: 80, category: "Backend" },
  { name: ".NET", level: 75, category: "Backend" },

  // AI
  { name: "PyTorch", level: 90, category: "AI" },
  { name: "NumPy/Pandas", level: 85, category: "AI" },
  { name: "OpenCV", level: 85, category: "AI" },

  // Tools
  { name: "Unity", level: 85, category: "Công cụ" },
  { name: "Photoshop/Premiere", level: 80, category: "Công cụ" },
  { name: "Office 365", level: 90, category: "Công cụ" },
  { name: "Git/GitHub", level: 85, category: "Công cụ" },
  { name: "VS Code", level: 80, category: "Công cụ" },
];

export const SkillsSection = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const { triggerLoading } = useLoading();

  const educationSkills = skills.filter((skill) => skill.category === "Học vấn");
  const technicalSkills = skills.filter((skill) => skill.category !== "Học vấn");

  const getPdfUrl = (filename) => {
    const baseUrl = import.meta.env.BASE_URL.endsWith("/")
      ? import.meta.env.BASE_URL.slice(0, -1)
      : import.meta.env.BASE_URL;
    return `${baseUrl}/skills/${filename}`;
  };

  const handleSkillClick = (skill) => {
    if (skill.file) {
      triggerLoading(() => {
        setSelectedPdf(skill.file);
      });
    }
  };

  useEffect(() => {
    if (selectedPdf) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPdf]);

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Hồ Sơ <span className="text-primary"> Kỹ Năng</span>
        </h2>

        {/* Education Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
             Học Vấn & Chứng Chỉ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationSkills.map((skill, key) => (
              <div
                key={key}
                onClick={() => handleSkillClick(skill)}
                className={cn(
                  "bg-card p-6 rounded-lg shadow-xs card-hover relative group overflow-hidden transition-all duration-300",
                  skill.file && "cursor-pointer",
                )}
              >
                <div
                  className={cn(
                    "transition-transform duration-300 h-full flex flex-col justify-between",
                    skill.file && "group-hover:-translate-y-4",
                  )}
                >
                  <div className="text-left mb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {skill.name}
                      {skill.file && (
                        <FileText className="w-4 h-4 text-primary" />
                      )}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {skill.institution} {skill.year}
                    </p>
                  </div>
                </div>

                {skill.file && (
                  <div className="absolute bottom-0 left-0 w-full p-2 bg-primary flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-4 h-4 text-primary-foreground" />
                    <span className="text-primary-foreground text-xs font-bold uppercase tracking-wider">
                      Click để xem chi tiết
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills - Radar Chart */}
        <div>
           <h3 className="text-2xl font-semibold mb-8 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
             Tech Stack
          </h3>
          <SkillRadar skills={technicalSkills} />
        </div>
      </div>

      {/* PDF Modal remains the same */}
      {selectedPdf && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPdf(null)}
        >
          <div
            className="bg-background w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg truncate pr-4">
                Chứng chỉ: {selectedPdf}
              </h3>
              <button
                onClick={() => setSelectedPdf(null)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 bg-secondary/20 relative">
              <iframe
                src={getPdfUrl(selectedPdf)}
                className="w-full h-full border-none"
                title="Certificate Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
