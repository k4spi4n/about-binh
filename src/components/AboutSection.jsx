import { Code, Gamepad2, PencilRuler } from "lucide-react";
import { useState } from "react";
import { CVDownloadModal } from "./CVDownloadModal";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";
import { AstralButton } from "./motion/AstralButton";

const cvUrl = `${import.meta.env.BASE_URL}documents/CV-2026-VI.pdf`;

const focusAreas = [
  {
    icon: Code,
    title: "Phát triển Web",
    text: "Xây dựng website và ứng dụng web hiện đại, chú trọng hiệu năng, tính ổn định và khả năng mở rộng.",
  },
  {
    icon: PencilRuler,
    title: "Thiết kế UI/UX",
    text: "Thiết kế giao diện trực quan và tổ chức luồng trải nghiệm người dùng liền mạch, dễ tiếp cận.",
  },
  {
    icon: Gamepad2,
    title: "Phát triển Game",
    text: "Phát triển gameplay, cơ chế vận hành và nội dung tương tác, chuyển hóa ý tưởng thành trải nghiệm có chiều sâu.",
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
              Trọng tâm phát triển của tôi là Full-stack Engineering và AI
              Engineering, hướng đến thiết kế các hệ thống có kiến trúc rõ ràng,
              khả năng mở rộng bền vững và năng lực vận hành ổn định ở môi
              trường thực tế.
            </p>

            <p className="text-muted-foreground">
              Tôi làm việc theo tư duy sản phẩm: phân tích bài toán đến gốc,
              triển khai giải pháp có thể đo lường và liên tục tối ưu trải
              nghiệm người dùng. Song song đó, tôi phát triển thêm năng lực Game
              Development để nâng chiều sâu về thiết kế tương tác và hệ thống
              thời gian thực.
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
