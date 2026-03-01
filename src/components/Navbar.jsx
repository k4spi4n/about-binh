import { cn } from "@/lib/utils";
import { Menu, X, Github, Download } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useLoading } from "../contexts/LoadingContext";

const cvUrl = `${import.meta.env.BASE_URL}documents/CV-2026.pdf`;
const githubUrl = "https://github.com/k4spi4n";

const navItems = [
  { name: "Trang chủ", href: "#hero" },
  { name: "Thông tin cá nhân", href: "#about" },
  { name: "Kỹ năng", href: "#skills" },
  { name: "Dự án", href: "#projects" },
  { name: "Liên hệ", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldShowNav, setShouldShowNav] = useState(true);
  const lastYPos = useRef(0);
  const { triggerLoading } = useLoading();

  const handleDownload = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    triggerLoading(() => {
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = "Thai Binh - CV-2026.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentYPos = window.scrollY;
      const isScrolledDown = currentYPos > lastYPos.current;

      setIsScrolled(currentYPos > 10);

      if (currentYPos < 10) {
        setShouldShowNav(true);
      } else {
        if (isScrolledDown) {
          setShouldShowNav(false);
          setIsMenuOpen(false); // Close mobile menu on scroll down
        } else {
          setShouldShowNav(true);
        }
      }
      lastYPos.current = currentYPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5",
        shouldShowNav ? "top-0" : "-top-24",
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary text-primary-glow flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> About </span> Me
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="animated-gradient-border flex items-center gap-1.5 px-4 py-2 rounded-full text-primary text-primary-glow text-sm font-semibold transition-all duration-300 hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-fuchsia-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:border-transparent"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">@k4spi4n</span>
            </a>
            <a
              href={cvUrl}
              onClick={handleDownload}
              className="animated-gradient-border flex items-center gap-1.5 px-4 py-2 rounded-full text-primary text-primary-glow text-sm font-semibold transition-all duration-300 hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-fuchsia-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:border-transparent cursor-pointer"
            >
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </div>
        </div>

        {/* mobile nav */}

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        >
          <div className="flex flex-col space-y-8 text-xl items-center">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col items-center gap-6 mt-6">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="animated-gradient-border flex items-center gap-2 px-6 py-3 rounded-full text-primary text-primary-glow text-lg font-semibold transition-all duration-300 hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-fuchsia-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:border-transparent"
                aria-label="GitHub Profile"
              >
                <Github className="w-7 h-7" />
                <span className="text-base font-medium">@k4spi4n</span>
              </a>
              <a
                href={cvUrl}
                onClick={handleDownload}
                className="animated-gradient-border flex items-center gap-2 px-6 py-3 rounded-full text-primary text-primary-glow text-lg font-semibold transition-all duration-300 hover:text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-fuchsia-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:border-transparent cursor-pointer"
              >
                <Download className="w-6 h-6" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
