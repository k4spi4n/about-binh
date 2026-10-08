import { cn } from "@/lib/utils";
import { Menu, X, Download } from "lucide-react";
import { Github } from "./BrandIcons";
import { useEffect, useState, useRef } from "react";
import { CVDownloadModal } from "./CVDownloadModal";
import { navItems } from "../data/navigation";
import { useActiveSection } from "../hooks/useActiveSection";
import { AstralButton } from "./motion/AstralButton";

const sectionIds = navItems.map((item) => item.href.slice(1));

const cvUrl = `${import.meta.env.BASE_URL}documents/CV-2026-VI.pdf`;
const githubUrl = "https://github.com/k4spi4n";


export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldShowNav, setShouldShowNav] = useState(true);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const lastYPos = useRef(0);
  const activeSection = useActiveSection(sectionIds);

  const handleDownload = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setIsCVModalOpen(true);
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
            <span className="text-glow text-foreground"> Hồ sơ </span> cá nhân
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className={cn(
                "nav-link text-foreground/80 hover:text-primary transition-colors duration-300",
                item.href === `#${activeSection}` && "is-active text-primary",
              )}
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center gap-4">
            <AstralButton
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">@k4spi4n</span>
            </AstralButton>
            <AstralButton
              href={cvUrl}
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 text-sm"
            >
              <Download className="w-5 h-5" />
              Tải xuống CV
            </AstralButton>
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
              <AstralButton
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 text-lg"
                aria-label="GitHub Profile"
              >
                <Github className="w-7 h-7" />
                <span className="text-base font-medium">@k4spi4n</span>
              </AstralButton>
              <AstralButton
                href={cvUrl}
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 text-lg"
              >
                <Download className="w-6 h-6" />
                Tải xuống CV
              </AstralButton>
            </div>
          </div>
        </div>
      </div>
      <CVDownloadModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </nav>
  );
};
