// Awards and certificates, rendered as cards by AchievementsSection.
// `file` and `link.href` are paths under public/.
export const achievements = [
  {
    name: "Giải Khuyến khích bảng B — CSCV 2026",
    institution:
      "Cuộc thi “Sinh viên An ninh mạng 2026” (CTF jeopardy) · Đội CMC.CBS, Đại học CMC",
    year: "(2026)",
    highlights: ["#10 chung kết", "2.080 điểm", "10 thử thách"],
    file: "achievements/cscv2026-giay-khen.pdf",
    fileLabel: "Giấy khen",
    link: {
      label: "Bảng xếp hạng",
      href: "achievements/cscv2026-scoreboard.webp",
    },
    award: true,
  },
  {
    name: "Chứng chỉ AI của Samsung Innovation Campus (SIC)",
    institution:
      "Hoàn thành chương trình đào tạo chuyên sâu về Trí tuệ nhân tạo do Samsung Electronics Việt Nam xác nhận",
    year: "(2025)",
    file: "skills/cert_SAMSUNG_AI.pdf",
    fileLabel: "Chứng chỉ",
  },
  {
    name: "Chứng chỉ Deep Learning của NVIDIA DLI",
    institution:
      "Hoàn thành khóa đào tạo về Neural Networks, Data Augmentation và tối ưu hóa mô hình từ NVIDIA Deep Learning Institute",
    year: "(2025)",
    file: "skills/cert_NVIDIA-DLI_DL.pdf",
    fileLabel: "Chứng chỉ",
  },
];
