import { Code, Gamepad2, PencilRuler } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useLoading } from "../contexts/LoadingContext";

const cvUrl = `${import.meta.env.BASE_URL}documents/CV-2026.pdf`;

export const AboutSection = () => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const { triggerLoading } = useLoading();

  const handleDownload = (e) => {
    e.preventDefault();
    triggerLoading(() => {
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = "Thai Binh - CV-2026.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <section id="about" className="py-24 px-4 relative">
      <div ref={ref} className="container mx-auto max-w-5xl">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-12 text-center ${
            isIntersecting ? "animate-scroll-fade-in" : "opacity-0"
          }`}
        >
          Giới Thiệu
          <span className="text-primary text-primary-glow"> Bản Thân</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 ${
              isIntersecting ? "animate-scroll-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
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
              <a
                href="#contact"
                className="animated-gradient-border px-6 py-2 rounded-full text-primary text-primary-glow font-semibold transition-all duration-300 hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-fuchsia-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:border-transparent"
              >
                Thông tin liên hệ
              </a>
              <a
                href={cvUrl}
                onClick={handleDownload}
                className="animated-gradient-border px-6 py-2 rounded-full text-primary text-primary-glow font-semibold transition-all duration-300 hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-fuchsia-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:border-transparent cursor-pointer"
              >
                Tải xuống CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div
              className={`gradient-border p-6 card-hover ${
                isIntersecting ? "animate-scroll-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Phát triển Web</h4>
                  <p className="text-muted-foreground">
                    Xây dựng website và ứng dụng web hiện đại, chú trọng hiệu
                    năng, tính ổn định và khả năng mở rộng.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`gradient-border p-6 card-hover ${
                isIntersecting ? "animate-scroll-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <PencilRuler className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Thiết kế UI/UX</h4>
                  <p className="text-muted-foreground">
                    Thiết kế giao diện trực quan và tổ chức luồng trải nghiệm
                    người dùng liền mạch, dễ tiếp cận.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`gradient-border p-6 card-hover ${
                isIntersecting ? "animate-scroll-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Phát triển Game</h4>
                  <p className="text-muted-foreground">
                    Phát triển gameplay, cơ chế vận hành và nội dung tương tác,
                    chuyển hóa ý tưởng thành trải nghiệm có chiều sâu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
