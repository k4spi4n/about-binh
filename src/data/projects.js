export const projects = [
  {
    id: 1,
    role: "Lập trình viên chính · Full-stack & DevOps",
    title: "PMA — Nền tảng LMS B2B cho đào tạo doanh nghiệp",
    description:
      "Dẫn dắt phát triển hệ thống LMS đang vận hành thực tế cho 5+ doanh nghiệp, 10 lớp đào tạo và 20–30 giảng viên, nhân sự. Làm việc trực tiếp với BA để chuyển yêu cầu của quản lý và nhân viên thành tính năng: lịch học tự động né ngày lễ, checklist trợ giảng 5 giai đoạn, điểm danh, kho tài liệu theo lớp, ngân hàng câu hỏi và bài kiểm tra có chấm điểm. Tích hợp Google Calendar, Gmail, Drive; phân quyền 5 vai trò; CI/CD tự triển khai bằng Docker.",
    year: "2026",
    image: "projects/project7.webp",
    tags: ["Next.js", "PostgreSQL", "Docker CI/CD", "Google APIs"],
    demoUrl: "https://b2bpmp.io.vn/",
    githubUrl: "",
  },
  {
    id: 2,
    role: "Kỹ sư chính · nhóm 4 sinh viên",
    title: "DynaTour",
    description:
      "Tour 3D bất động sản dựng từ video điện thoại, giúp khách xem nhà từ xa. Dẫn dắt kỹ thuật toàn hệ thống, trực tiếp xây dựng API FastAPI trên Cloud Run, Supabase Postgres (RLS, RPC trừ điểm idempotent) và pipeline GPU serverless dựng 3D Gaussian Splatting từ video, có bước lọc video bằng CPU trước khi cấp GPU để tiết kiệm chi phí. Đạt Top 10 NEU Startup Olympiad 2026.",
    year: "2026",
    image: "projects/project6.webp",
    tags: ["FastAPI", "Supabase", "3D Gaussian Splatting", "Serverless GPU"],
    demoUrl: "https://dynatour.io.vn/",
    githubUrl: "",
  },
  {
    id: 3,
    role: "Database & Backend/AI · nhóm 4 sinh viên",
    title: "Runny AI",
    description:
      "App Flutter trợ lý chạy bộ: biểu đồ Pace/Heart Rate, theo dõi hao mòn giày (Shoe Tracker), AI Coach đề xuất giáo án. Tôi phụ trách database Supabase và backend/AI: đồng bộ Strava API và xây dựng hệ thống điều phối LLM thông minh trên Edge Functions giữa 4 nhà cung cấp (gồm cả model tự host), chọn theo tính năng và gói tài khoản, có circuit breaker và retry khi nhà cung cấp lỗi.",
    year: "2025 - 2026",
    image: "projects/project5.png",
    tags: ["Flutter", "Supabase", "LLM Routing", "Strava API"],
    demoUrl: "https://runny-ai.onrender.com/",
    githubUrl: "https://github.com/k4spi4n/runny-ai",
  },
  {
    id: 4,
    role: "Phát triển độc lập · Full-stack & AI backend",
    title: "Hệ thống Quản lý Bệnh viện Thông minh tích hợp AI",
    description:
      "Tự xây dựng hệ thống quản lý bệnh viện full-stack (Next.js + FastAPI, Supabase/PostgreSQL) số hóa quy trình vận hành. Tích hợp AI tóm tắt hồ sơ y tế, gợi ý chẩn đoán và trợ lý chat ngay trong trang hồ sơ bệnh án.",
    year: "2025",
    image: "projects/project4.png",
    tags: ["Next.js", "FastAPI", "Supabase · PostgreSQL", "LLM"],
    demoUrl: "",
    githubUrl: "https://github.com/k4spi4n/cmec-hms-web-app",
  },
  {
    id: 5,
    role: "Backend Developer · .NET & MongoDB",
    title: "Website hỗ trợ cá nhân hoá học tập dựa trên AI",
    description:
      "Phụ trách backend .NET và MongoDB cho nền tảng học tập ứng dụng AI: tự động sinh đề thi, bài tập và cá nhân hóa lộ trình học cho từng học sinh; dashboard giúp giáo viên quản lý lớp và theo dõi tiến độ.",
    image: "projects/project1.png",
    year: "2025",
    tags: ["Angular", ".NET", "MongoDB", "AI"],
    demoUrl:
      "https://drive.google.com/drive/folders/163Ht97sw9-aLWYJaNji7lrHm0U07hSyE?usp=drive_link",
    githubUrl: "",
  },
  {
    id: 6,
    role: "Phát triển độc lập (solo)",
    title: "Touhou: Goblin Invasion",
    description:
      "Dự án game đã phát hành trên itch.io, lấy cảm hứng từ bối cảnh và nhân vật của Touhou Project. Sản phẩm tập trung vào lối chơi hành động nhịp độ nhanh, hiệu ứng hình ảnh nổi bật và trải nghiệm chiến đấu mượt mà. Phát triển tiếp nối từ các bản demo game với Unity và Unreal Engine giai đoạn 2021 – 2022.",
    image: "projects/project3.png",
    year: "2022",
    tags: ["Unity", "C#", "3D", "Game Development"],
    demoUrl: "https://k4spi4n.itch.io/touhou-goblins-invasion",
    githubUrl: "",
  },
];
