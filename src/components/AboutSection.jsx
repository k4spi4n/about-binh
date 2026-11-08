import { BrainCircuit, Code, Gamepad2 } from "lucide-react";
import { useState } from "react";
import { CVDownloadModal } from "./CVDownloadModal";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";
import { AstralButton } from "./motion/AstralButton";

const cvUrl = `${import.meta.env.BASE_URL}documents/CV-2026-VI.pdf`;

const focusAreas = [
  {
    icon: Code,
    title: "Phát triển Full-stack",
    text: "Xây dựng ứng dụng web và mobile từ giao diện đến backend, cơ sở dữ liệu và CI/CD, với sản phẩm đang vận hành thực tế cho doanh nghiệp.",
  },
  {
    icon: BrainCircuit,
    title: "Tích hợp AI",
    text: "Đưa LLM vào sản phẩm: tóm tắt hồ sơ y tế, AI Coach chạy bộ, sinh đề thi tự động, cùng hệ thống điều phối LLM thông minh đa nhà cung cấp.",
  },
  {
    icon: Gamepad2,
    title: "Phát triển Game",
    text: "Phát hành game hành động trên itch.io bằng Unity, cùng các bản thử nghiệm với Unreal Engine.",
  },
];

export const AboutSection = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const handleDownload = (e) => {
    e.preventDefault();
    setIsCVModalOpen(true);
  };

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle lead="Giới Thiệu" accent="Bản Thân" className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal className="space-y-6" delay={0.15}>
            <h3 className="text-2xl font-semibold">
              Định Hướng Full-stack & AI Engineer
            </h3>

            <p className="text-muted-foreground">
              Sinh viên K3 Kỹ thuật Phần mềm tại Đại học CMC (học bổng toàn
              phần, GPA 3.5/4.0, IELTS 7.5). Tôi làm sản phẩm từ giao diện đến
              backend, hạ tầng và tích hợp AI.
            </p>

            <p className="text-muted-foreground">
              Tôi là lập trình viên chính của một hệ thống LMS đang vận hành
              cho 5+ doanh nghiệp, kỹ sư chính của DynaTour (Top 10 NEU Startup
              Olympiad 2026) và đội trưởng đội CMC.CBS (hạng 10/47 đội chung
              khảo CSCV 2026). Hiện tôi tập trung vào Full-stack và đưa AI vào
              sản phẩm thật.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <AstralButton
                href="#contact"
                className="px-6 py-2"
              >
                Thông tin liên hệ
              </AstralButton>
              <AstralButton
                href={cvUrl}
                onClick={handleDownload}
                className="px-6 py-2"
              >
                Tải xuống CV
              </AstralButton>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6">
            {focusAreas.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={0.25 + i * 0.15}>
                <div className="gradient-border p-6 card-hover">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-lg">{title}</h4>
                      <p className="text-muted-foreground">{text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <CVDownloadModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </section>
  );
};
