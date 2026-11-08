// Awards and certificates, rendered as cards by AchievementsSection.
// Text fields are { vi, en }. `file` and `link.href` are paths under public/.
// A card with `url` opens that external page in a new tab instead of the
// PDF viewer.
export const achievements = [
  {
    name: {
      vi: "Giải Khuyến khích bảng B — CSCV 2026",
      en: "Consolation Prize, Division B — CSCV 2026",
    },
    institution: {
      vi: "Cuộc thi “Sinh viên An ninh mạng 2026” (CTF jeopardy) · Đội trưởng đội CMC.CBS, Đại học CMC",
      en: "“Vietnam Student Cybersecurity Contest 2026” (jeopardy CTF) · Captain of team CMC.CBS, CMC University",
    },
    year: "2026",
    highlights: {
      vi: ["#10/47 đội chung khảo", "334 đội dự thi", "2.080 điểm"],
      en: ["#10 of 47 finalist teams", "334 teams entered", "2,080 points"],
    },
    file: "achievements/cscv2026-giay-khen.pdf",
    fileLabel: { vi: "Giấy khen", en: "Certificate of merit" },
    link: {
      label: { vi: "Bảng xếp hạng", en: "Scoreboard" },
      href: "achievements/cscv2026-scoreboard.webp",
    },
    award: true,
  },
  {
    name: {
      vi: "Top 10 NEU Startup Olympiad 2026",
      en: "Top 10, NEU Startup Olympiad 2026",
    },
    institution: {
      vi: "Dự án DynaTour — tour 3D bất động sản từ video điện thoại · Đại học Kinh tế Quốc dân",
      en: "DynaTour project — 3D real-estate tours from phone video · National Economics University",
    },
    year: "2026",
    url: "https://www.facebook.com/share/p/19iPfzjrJd/",
    fileLabel: { vi: "Bài đăng", en: "Post" },
    award: true,
  },
  {
    name: {
      vi: "Giải Khuyến khích — Sinh viên Nghiên cứu khoa học cấp trường",
      en: "Consolation Prize — CMC University Student Research Contest",
    },
    institution: {
      vi: "Cuộc thi Sinh viên nghiên cứu khoa học năm học 2025–2026 · Đại học CMC (kèm giấy chứng nhận tham gia)",
      en: "Undergraduate Research Conference AY 2025–2026 · CMC University (with participation certificate)",
    },
    year: "2026",
    file: "achievements/cmc-nckh-2026.pdf",
    fileLabel: { vi: "Giấy khen", en: "Certificate of merit" },
    award: true,
  },
  {
    name: {
      vi: "Chứng chỉ AI của Samsung Innovation Campus (SIC)",
      en: "Samsung Innovation Campus (SIC) AI Certificate",
    },
    institution: {
      vi: "Hoàn thành chương trình đào tạo chuyên sâu về Trí tuệ nhân tạo do Samsung Electronics Việt Nam xác nhận",
      en: "Completed an in-depth Artificial Intelligence training program certified by Samsung Electronics Vietnam",
    },
    year: "2025",
    file: "skills/cert_SAMSUNG_AI.pdf",
    fileLabel: { vi: "Chứng chỉ", en: "Certificate" },
  },
  {
    name: {
      vi: "Chứng chỉ Deep Learning của NVIDIA DLI",
      en: "NVIDIA DLI Deep Learning Certificate",
    },
    institution: {
      vi: "Hoàn thành khóa đào tạo về Neural Networks, Data Augmentation và tối ưu hóa mô hình từ NVIDIA Deep Learning Institute",
      en: "Completed NVIDIA Deep Learning Institute training on neural networks, data augmentation and model optimization",
    },
    year: "2025",
    file: "skills/cert_NVIDIA-DLI_DL.pdf",
    fileLabel: { vi: "Chứng chỉ", en: "Certificate" },
  },
];
