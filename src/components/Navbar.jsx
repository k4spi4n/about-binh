import { cn } from "@/lib/utils";
import { Menu, X, Download } from "lucide-react";
import { Github } from "./BrandIcons";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // The bar slides away with a transform rather than animating `top`. Its
    // transform and backdrop-filter would trap any `fixed` child inside the
    // bar, so the menu overlay and the CV modal are portalled to <body>.
    <nav
      className={cn(
        "fixed top-0 w-full z-40 transition-[translate,padding,background-color,box-shadow] duration-500 ease-[var(--ease-settle)]",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5",
        !shouldShowNav && !isMenuOpen && "-translate-y-full",
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
        <div className="hidden xl:flex items-center space-x-8">
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
          className="xl:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {createPortal(
          <div
            className={cn(
              // Below the bar (z-40) so the close button stays on top, above
              // the side rail (z-35).
              "fixed inset-0 bg-background/95 backdrop-blur-md z-[38] flex flex-col items-center justify-center",
              "transition-opacity duration-500 ease-[var(--ease-settle)] xl:hidden",
              isMenuOpen
                ? "menu-open opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            )}
            aria-hidden={!isMenuOpen}
          >
            <div className="flex flex-col space-y-8 text-xl items-center">
              {navItems.map((item, key) => (
                <a
                  key={key}
                  href={item.href}
                  className={cn(
                    "menu-item hover:text-primary",
                    item.href === `#${activeSection}`
                      ? "text-primary"
                      : "text-foreground/80",
                  )}
                  style={{ "--i": key }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div
                className="menu-item flex flex-col items-center gap-6 mt-6"
                style={{ "--i": navItems.length }}
              >
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
          </div>,
          document.body,
        )}
      </div>
      <CVDownloadModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />
    </nav>
  );
};
