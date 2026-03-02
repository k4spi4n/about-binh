import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL;
  const avatarUrl = `${baseUrl}/documents/avatar.png`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center rounded-full profile-picture-container">
          <img
            src={avatarUrl}
            alt="Thai Binh - Full-stack & AI Engineer"
            className="w-[90%] h-[90%] rounded-full object-cover shadow-lg relative z-20"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Xin chào, tôi là</span>
            <span className="text-primary text-primary-glow opacity-0 animate-fade-in-delay-1">
              {" "}
              Thái Bình
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
            </span>
          </h1>

          <p className="text-base md:text-lg font-semibold text-primary text-primary-glow opacity-0 animate-fade-in-delay-2">
            Full-stack Engineer • AI Engineer
          </p>

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            Sinh viên Kỹ thuật Phần mềm tại Đại học CMC, theo đuổi lộ trình
            Full-stack và AI Engineering với định hướng xây dựng sản phẩm có
            kiến trúc vững chắc, hiệu năng cao và tác động thực tiễn cho người
            dùng.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-delay-4">
            <a
              href="#skills"
              className="animated-gradient-border px-8 py-3 rounded-full text-primary text-primary-glow font-semibold transition-all duration-300 hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-fuchsia-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:border-transparent"
            >
              Xem hồ sơ kỹ năng
            </a>
            <a
              href="#projects"
              className="animated-gradient-border px-8 py-3 rounded-full text-primary text-primary-glow font-semibold transition-all duration-300 hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-fuchsia-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:border-transparent"
            >
              Xem dự án nổi bật
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">
          {" "}
          Cuộn xuống để khám phá thêm{" "}
        </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
