import { ArrowUp } from "lucide-react";
import { AstralButton } from "./motion/AstralButton";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
      {" "}
      <p className="text-sm text-muted-foreground">
        {" "}
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/k4spi4n"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          Thai Binh (k4spi4n)
        </a>
      </p>
      <AstralButton icon
        href="#hero"
      >
        <ArrowUp size={20} />
      </AstralButton>
    </footer>
  );
};
