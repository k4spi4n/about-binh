import { ArrowUp } from "lucide-react";
import { AstralButton } from "./motion/AstralButton";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
      {" "}
      <p className="text-sm text-muted-foreground">
        {" "}
        &copy; {new Date().getFullYear()} Thai Binh
      </p>
      <AstralButton icon
        href="#hero"
      >
        <ArrowUp size={20} />
      </AstralButton>
    </footer>
  );
};
