export const skills = [
  // Education: text fields are { vi, en }; `category` stays "Học vấn" as the
  // key SkillsSection uses to split these from the radar skills.
  {
    name: {
      vi: "Cử nhân Kỹ thuật Phần mềm (Học bổng toàn phần)",
      en: "Bachelor of Software Engineering (Full scholarship)",
    },
    institution: {
      vi: "Đại Học CMC - GPA: 3.5 (tính đến học kỳ Hè 2026)",
      en: "CMC University - GPA: 3.5 (as of Summer 2026)",
    },
    year: "(2024-2027)",
    category: "Học vấn",
  },

  {
    name: "IELTS 7.5",
    institution: {
      vi: "Năng lực giao tiếp và làm việc hiệu quả bằng tiếng Anh",
      en: "Able to communicate and work effectively in English",
    },
    year: "",
    category: "Học vấn",
  },

  {
    name: {
      vi: "Học sinh khối chuyên Ngữ",
      en: "Foreign Language Major (gifted class)",
    },
    institution: {
      vi: "THPT chuyên Nguyễn Trãi - Hải Dương",
      en: "Nguyen Trai High School for the Gifted - Hai Duong",
    },
    year: "(2021-2024)",
    category: "Học vấn",
  },

  // Ngôn ngữ lập trình
  { name: "Python", level: 5, category: "Ngôn ngữ lập trình" },
  { name: "JavaScript", level: 4, category: "Ngôn ngữ lập trình" },
  { name: "TypeScript", level: 3, category: "Ngôn ngữ lập trình" },
  { name: "Java/C++/C#", level: 3, category: "Ngôn ngữ lập trình" },

  // Frontend
  { name: "HTML/CSS", level: 4, category: "Frontend" },
  { name: "React/Next.js", level: 4, category: "Frontend" },
  { name: "Tailwind CSS", level: 4, category: "Frontend" },
  { name: "Ant Design", level: 4, category: "Frontend" },

  // Backend
  { name: "Django/FastAPI", level: 4, category: "Backend" },
  { name: "NoSQL (MongoDB)", level: 2, category: "Backend" },
  { name: "SQL (PostgreSQL)", level: 4, category: "Backend" },
  { name: "Node.js/NestJS", level: 3, category: "Backend" },
  { name: ".NET", level: 2, category: "Backend" },
  { name: "Git/GitHub", level: 4, category: "Backend" },

  // AI
  { name: "PyTorch", level: 4, category: "AI" },
  { name: "NumPy/Pandas", level: 4, category: "AI" },
  { name: "OpenCV", level: 3, category: "AI" },
  { name: "Generative AI (ComfyUI)", level: 4, category: "AI" },
  { name: "Transformers (LLM/VISION)", level: 4, category: "AI" },

  // Security
  { name: "CTF (Jeopardy)", level: 4, category: "Bảo mật" },
  { name: "Web Exploitation", level: 3, category: "Bảo mật" },
  { name: "LLM & AI Agent Security (MCP/RAG)", level: 4, category: "Bảo mật" },
  { name: "Reverse Engineering / Malware Analysis", level: 4, category: "Bảo mật" },
];
