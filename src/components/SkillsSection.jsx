import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, Eye, FileText } from "lucide-react";

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
    // Placeholder if you have this file later
    // file: "samsung_AI.pdf" 
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

  // Frontend
  { name: "HTML/CSS", level: 90, category: "Frontend" },
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "React", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 85, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },

  // Backend
  { name: "Django", level: 80, category: "Backend" },
  { name: "MongoDB", level: 80, category: "Backend" },
  { name: "Node.js", level: 75, category: "Backend" },
  { name: "Java/C++/C#", level: 80, category: "Backend" },
  { name: ".NET", level: 75, category: "Backend" },
  { name: "PostgreSQL/SQL Server", level: 75, category: "Backend" },

  // AI
  { name: "Python", level: 90, category: "AI" },
  { name: "Numpy", level: 75, category: "AI" },
  { name: "OpenCV", level: 75, category: "AI" },

  // Tools
  { name: "Unity", level: 85, category: "Công cụ" },
  { name: "Adobe Photoshop/Premiere/Audition", level: 80, category: "Công cụ" },
  { name: "Unreal Engine", level: 70, category: "Công cụ" },
  { name: "Git/GitHub", level: 75, category: "Công cụ" },
  { name: "VS Code", level: 80, category: "Công cụ" },
];

const categories = [
  "Toàn bộ",
  "Học vấn",
  "Frontend",
  "Backend",
  "AI",
  "Công cụ",
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Toàn bộ");
  const [selectedPdf, setSelectedPdf] = useState(null);

  const filteredSkills = skills.filter(
    (skill) =>
      activeCategory === "Toàn bộ" || skill.category === activeCategory,
  );

  // Helper to construct safe URL
  const getPdfUrl = (filename) => {
    const baseUrl = import.meta.env.BASE_URL.endsWith("/")
      ? import.meta.env.BASE_URL.slice(0, -1)
      : import.meta.env.BASE_URL;
    return `${baseUrl}/skills/${filename}`;
  };

  // Lock body scroll when modal is open
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
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Kỹ Năng <span className="text-primary"> Cá Nhân</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              onClick={() => skill.file && setSelectedPdf(skill.file)}
              className={cn(
                "bg-card p-6 rounded-lg shadow-xs card-hover relative group overflow-hidden",
                skill.file && "cursor-pointer"
              )}
            >
              {/* Hover Overlay for File */}
              {skill.file && (
                <div className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-primary-foreground">
                  <Eye className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-sm">Click để xem chi tiết</span>
                  <span className="text-xs mt-1 opacity-80">(PDF)</span>
                </div>
              )}

              <div className="text-left mb-4 relative z-0">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                   {skill.name}
                   {skill.file && <FileText className="w-4 h-4 text-primary" />}
                </h3>
                {skill.category === "Học vấn" && (
                  <p className="text-muted-foreground text-sm">
                    {skill.institution} {skill.year}
                  </p>
                )}
              </div>
              {skill.category !== "Học vấn" && (
                <>
                  <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden relative z-0">
                    <div
                      className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                      style={{ width: skill.level + "%" }}
                    />
                  </div>

                  <div className="text-right mt-1 relative z-0">
                    <span className="text-sm text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PDF Modal */}
      {selectedPdf && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPdf(null)}
        >
          <div 
            className="bg-background w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg truncate pr-4">
                Xem chứng chỉ: {selectedPdf}
              </h3>
              <button
                onClick={() => setSelectedPdf(null)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-secondary/20 relative">
               <iframe 
                 src={getPdfUrl(selectedPdf)}
                 className="w-full h-full"
                 title="Certificate Viewer"
               />
            </div>
            
            {/* Footer (Optional, for mobile fallback) */}
            <div className="p-3 border-t bg-secondary/10 flex justify-end md:hidden">
               <a 
                 href={getPdfUrl(selectedPdf)} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-primary text-sm font-medium hover:underline"
               >
                 Mở trong tab mới nếu không xem được
               </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};