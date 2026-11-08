import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "../i18n/useLang";

// One button that flips between VI and EN; the active language is lit.
export const LangToggle = () => {
  const { lang, setLang, t } = useLang();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "vi" ? "en" : "vi")}
      aria-label={t("lang.switch")}
      title={t("lang.switch")}
      className={cn(
        "flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1.5 text-sm font-semibold",
        "transition-colors duration-300 hover:border-primary hover:bg-primary/10",
      )}
    >
      <Globe className="h-4 w-4 text-primary" aria-hidden="true" />
      {["vi", "en"].map((code, i) => (
        <span key={code} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-foreground/30">|</span>}
          <span
            className={
              lang === code ? "text-primary" : "text-foreground/60"
            }
          >
            {code.toUpperCase()}
          </span>
        </span>
      ))}
    </button>
  );
};
