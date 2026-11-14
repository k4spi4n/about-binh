// `role`, `title`, `label` and `description` are { vi, en }. `label` is the
// short name shown on the planet picker.
export const projects = [
  {
    id: 1,
    label: { vi: "PMA", en: "PMA" },
    role: {
      vi: "Lập trình viên chính · Full-stack & DevOps",
      en: "Lead developer · Full-stack & DevOps",
    },
    title: {
      vi: "PMA — Nền tảng LMS B2B cho đào tạo doanh nghiệp",
      en: "PMA — B2B LMS platform for corporate training",
    },
    description: {
      vi: "Dẫn dắt phát triển hệ thống LMS đang vận hành thực tế cho một doanh nghiệp đào tạo và các khách hàng doanh nghiệp của họ, với hơn 10 lớp đào tạo và hơn 30 giảng viên, nhân sự. Làm việc trực tiếp với BA để chuyển yêu cầu của quản lý và nhân viên thành tính năng: lịch học tự động né ngày lễ, checklist trợ giảng 5 giai đoạn, điểm danh, kho tài liệu theo lớp, ngân hàng câu hỏi và bài kiểm tra có chấm điểm. Tích hợp Google Calendar, Gmail, Drive; phân quyền 5 vai trò; CI/CD tự triển khai bằng Docker.",
      en: "Led development of an LMS running in production for a training company and its corporate clients, with 10+ training classes and 30+ instructors and staff. Worked directly with the BA to turn manager and employee requirements into features: auto-scheduling that skips public holidays, a 5-stage teaching-assistant checklist, attendance, per-class document library, question bank and graded quizzes. Integrated Google Calendar, Gmail and Drive; 5-role access control; Docker-based CI/CD auto-deployment.",
    },
    year: "2026",
    image: "projects/project7.webp",
    tags: ["Next.js", "PostgreSQL", "Docker CI/CD", "Google APIs"],
    demoUrl: "https://b2bpmp.io.vn/",
    githubUrl: "",
  },
  {
    id: 2,
    label: { vi: "DynaTour", en: "DynaTour" },
    role: {
      vi: "Kỹ sư chính · nhóm 4 sinh viên",
      en: "Lead engineer · team of 4 students",
    },
    title: { vi: "DynaTour", en: "DynaTour" },
    description: {
      vi: "Tour 3D bất động sản dựng từ video điện thoại, giúp khách xem nhà từ xa. Dẫn dắt kỹ thuật toàn hệ thống, trực tiếp xây dựng API FastAPI trên Cloud Run, Supabase Postgres (RLS, RPC trừ điểm idempotent) và pipeline GPU serverless dựng 3D Gaussian Splatting từ video, có bước lọc video bằng CPU trước khi cấp GPU để tiết kiệm chi phí. Đạt Top 10 NEU Startup Olympiad 2026.",
      en: "3D real-estate tours built from phone video, so buyers can view homes remotely. Led the technical side of the whole system and built the FastAPI API on Cloud Run, Supabase Postgres (RLS, idempotent point-deduction RPC) and a serverless GPU pipeline that builds 3D Gaussian Splatting from video, with a CPU video-filter step before a GPU is allocated to cut cost. Top 10, NEU Startup Olympiad 2026.",
    },
    year: "2026",
    image: "projects/project6.webp",
    tags: ["FastAPI", "Supabase", "3D Gaussian Splatting", "Serverless GPU"],
    demoUrl: "https://dynatour.io.vn/",
    githubUrl: "",
  },
  {
    id: 7,
    label: { vi: "Pair Time", en: "Pair Time" },
    role: {
      vi: "Lập trình viên game · Godot .NET & C#",
      en: "Game developer · Godot .NET & C#",
    },
    title: {
      vi: "Pair Time — Bạn đồng hành cho người code",
      en: "Pair Time — A coding companion game",
    },
    description: {
      vi: "Game mô phỏng cozy cho Windows đã phát hành trên itch.io (bản 1.1): nhân vật Amane chung phòng với bạn trong lúc các coding agent chạy trong terminal nhúng ngay trong game (Claude Code, Codex, OpenCode qua ConPTY). Cô phản ứng theo hook của từng phiên, hiện trạng thái trên chiếc ghim tóc, và có chế độ overlay trong suốt luôn nằm trên cùng. Gồm hệ thống kinh tế xu/XP, cửa hàng, hơn 70 cảnh hội thoại, Pomodoro và Office mode. Không gọi mạng, không thu thập dữ liệu.",
      en: "A cozy Windows simulation released on itch.io (v1.1): Amane shares a room with you while your coding agents run in terminals embedded in the game (Claude Code, Codex, OpenCode over ConPTY). She reacts to each session's hooks, shows its state on her hair pin, and has a transparent always-on-top overlay mode. It also has a coin/XP economy, a shop, 70+ written scenes, a Pomodoro timer and an Office mode. No network requests, no telemetry.",
    },
    year: "2026",
    image: "projects/project8.png",
    tags: ["Godot .NET", "C#", "ConPTY", "Game Development"],
    demoUrl: "https://k4spi4n.itch.io/pair-time",
    githubUrl: "",
  },
  {
    id: 3,
    label: { vi: "Runny AI", en: "Runny AI" },
    role: {
      vi: "Database & Backend/AI · nhóm 4 sinh viên",
      en: "Database & Backend/AI · team of 4 students",
    },
    title: { vi: "Runny AI", en: "Runny AI" },
    description: {
      vi: "App Flutter trợ lý chạy bộ: biểu đồ Pace/Heart Rate, theo dõi hao mòn giày (Shoe Tracker), AI Coach đề xuất giáo án. Tôi phụ trách database Supabase và backend/AI: đồng bộ Strava API và xây dựng hệ thống điều phối LLM thông minh trên Edge Functions giữa 4 nhà cung cấp (gồm cả model tự host), chọn theo tính năng và gói tài khoản, có circuit breaker và retry khi nhà cung cấp lỗi.",
      en: "A Flutter running-assistant app: Pace/Heart Rate charts, shoe wear tracking (Shoe Tracker) and an AI Coach that suggests training plans. I own the Supabase database and the backend/AI: Strava API sync and an LLM routing system on Edge Functions across 4 providers (including a self-hosted model), chosen by feature and account plan, with a circuit breaker and retry when a provider fails.",
    },
    year: "2025 - 2026",
    image: "projects/project5.png",
    tags: ["Flutter", "Supabase", "LLM Routing", "Strava API"],
    demoUrl: "https://runny-ai.onrender.com/",
    githubUrl: "https://github.com/k4spi4n/runny-ai",
  },
  {
    id: 4,
    label: { vi: "Quản lý Bệnh viện", en: "Hospital System" },
    role: {
      vi: "Phát triển độc lập · Full-stack & AI backend",
      en: "Solo developer · Full-stack & AI backend",
    },
    title: {
      vi: "Hệ thống Quản lý Bệnh viện Thông minh tích hợp AI",
      en: "AI-integrated Smart Hospital Management System",
    },
    description: {
      vi: "Tự xây dựng hệ thống quản lý bệnh viện full-stack (Next.js + FastAPI, Supabase/PostgreSQL) số hóa quy trình vận hành. Tích hợp AI tóm tắt hồ sơ y tế, gợi ý chẩn đoán và trợ lý chat ngay trong trang hồ sơ bệnh án.",
      en: "Built a full-stack hospital management system on my own (Next.js + FastAPI, Supabase/PostgreSQL) that digitizes operational workflows. Integrated AI for medical-record summarization, diagnosis suggestions and a chat assistant right inside the patient record page.",
    },
    year: "2025",
    image: "projects/project4.png",
    tags: ["Next.js", "FastAPI", "Supabase · PostgreSQL", "LLM"],
    demoUrl: "",
    githubUrl: "https://github.com/k4spi4n/cmec-hms-web-app",
  },
  {
    id: 5,
    label: { vi: "Học tập AI", en: "AI Learning" },
    role: {
      vi: "Backend Developer · .NET & MongoDB",
      en: "Backend developer · .NET & MongoDB",
    },
    title: {
      vi: "Website hỗ trợ cá nhân hoá học tập dựa trên AI",
      en: "AI-based personalized learning website",
    },
    description: {
      vi: "Phụ trách backend .NET và MongoDB cho nền tảng học tập ứng dụng AI: tự động sinh đề thi, bài tập và cá nhân hóa lộ trình học cho từng học sinh; dashboard giúp giáo viên quản lý lớp và theo dõi tiến độ.",
      en: "Built the .NET and MongoDB backend for an AI learning platform: auto-generated exams and assignments, and a personalized learning path for each student, plus a dashboard for teachers to manage classes and track progress.",
    },
    image: "projects/project1.png",
    year: "2025",
    tags: ["Angular", ".NET", "MongoDB", "AI"],
    demoUrl:
      "https://drive.google.com/drive/folders/163Ht97sw9-aLWYJaNji7lrHm0U07hSyE?usp=drive_link",
    githubUrl: "",
  },
  {
    id: 6,
    label: { vi: "Goblin Invasion", en: "Goblin Invasion" },
    role: {
      vi: "Phát triển độc lập (solo)",
      en: "Solo developer",
    },
    title: { vi: "Touhou: Goblin Invasion", en: "Touhou: Goblin Invasion" },
    description: {
      vi: "Dự án game đã phát hành trên itch.io, lấy cảm hứng từ bối cảnh và nhân vật của Touhou Project. Sản phẩm tập trung vào lối chơi hành động nhịp độ nhanh, hiệu ứng hình ảnh nổi bật và trải nghiệm chiến đấu mượt mà. Phát triển tiếp nối từ các bản demo game với Unity và Unreal Engine giai đoạn 2021 – 2022.",
      en: "A game released on itch.io, inspired by the setting and characters of Touhou Project. It focuses on fast-paced action, striking visual effects and smooth combat. It grew out of game demos built with Unity and Unreal Engine in 2021–2022.",
    },
    image: "projects/project3.png",
    year: "2022",
    tags: ["Unity", "C#", "3D", "Game Development"],
    demoUrl: "https://k4spi4n.itch.io/touhou-goblins-invasion",
    githubUrl: "",
  },
];
