import { Code, Gamepad2, PencilRuler } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const cvUrl = `${import.meta.env.BASE_URL}documents/CV-2026.pdf`;

export const AboutSection = () => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="about" className="py-24 px-4 relative">
      <div ref={ref} className="container mx-auto max-w-5xl">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-12 text-center ${
            isIntersecting ? "animate-scroll-fade-in" : "opacity-0"
          }`}
        >
          Về<span className="text-primary"> Mình</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 ${
              isIntersecting ? "animate-scroll-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-2xl font-semibold">
              Một Lập Trình Viên đầy Đam Mê
            </h3>

            <p className="text-muted-foreground">
              Với hơn 5 năm kinh nghiệm, mình thổi hồn vào các sản phẩm số, từ
              những ứng dụng web thích ứng mượt mà trên mọi thiết bị, cho đến
              những thế giới game đầy mê hoặc.
            </p>

            <p className="text-muted-foreground">
              Động lực của mình đến từ việc giải quyết những thách thức phức tạp
              bằng các giải pháp sáng tạo và tinh tế. Mình luôn trong hành trình
              khám phá những công nghệ mới, đặc biệt là ứng dụng AI để đưa ra
              những sản phẩm hữu ích nhất.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a
                href="#contact"
                className="px-6 py-2 rounded-full border border-primary text-primary font-semibold transition-all duration-300 hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-fuchsia-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:border-transparent"
              >
                Thông tin liên hệ
              </a>
              <a
                href={cvUrl}
                download="Thai Binh - CV-2026.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary font-semibold transition-all duration-300 hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-fuchsia-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:border-transparent"
              >
                Download CV
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
                    Kiến tạo các website và ứng dụng web hiện đại, mang lại trải
                    nghiệm mượt mà và hiệu quả.
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
                    Phác thảo những giao diện trực quan và xây dựng hành trình
                    người dùng liền mạch, không gián đoạn.
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
                    Xây dựng thế giới, luật chơi và câu chuyện. Biến ý tưởng
                    thành những cuộc phiêu lưu tương tác hấp dẫn.
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
