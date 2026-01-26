import { useState } from "react";
import { cn } from "@/lib/utils";

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

  const filteredSkills = skills.filter(
    (skill) =>
      activeCategory === "Toàn bộ" || skill.category === activeCategory,
  );
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
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
                {skill.category === "Học vấn" && (
                  <p className="text-muted-foreground text-sm">
                    {skill.institution} {skill.year}
                  </p>
                )}
              </div>
              {skill.category !== "Học vấn" && (
                <>
                  <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                      style={{ width: skill.level + "%" }}
                    />
                  </div>

                  <div className="text-right mt-1">
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
    </section>
  );
};
