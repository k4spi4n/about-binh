import { cn } from "@/lib/utils";
import { Menu, X, Github } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useLoading } from "../contexts/LoadingContext";

const cvUrl = `${import.meta.env.BASE_URL}documents/CV-2026.pdf`;
const githubUsername = "k4spi4n";
const githubUrl = `https://github.com/${githubUsername}`;

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
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5",
        shouldShowNav ? "top-0" : "-top-24"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
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
              className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              <Github className="w-6 h-6" />
              <span className="text-sm">@{githubUsername}</span>
            </a>
            <a
              href={cvUrl}
              onClick={handleDownload}
              className="px-4 py-2 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition-colors duration-300 cursor-pointer"
            >
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
              : "opacity-0 pointer-events-none"
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
                className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                <Github className="w-8 h-8" />
                <span>@{githubUsername}</span>
              </a>
              <a
                href={cvUrl}
                onClick={handleDownload}
                className="px-6 py-3 rounded-full border border-primary text-primary text-lg font-semibold hover:bg-primary/10 transition-colors duration-300 cursor-pointer"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};