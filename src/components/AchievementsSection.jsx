import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, FileText, Trophy, ExternalLink } from "lucide-react";
import { achievements } from "../data/achievements";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";
import { PdfViewerModal } from "./PdfViewerModal";

const publicUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

// Feeds the cursor position to the card's spotlight (.achv-card::after)
const trackPointer = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export const AchievementsSection = () => {
  const [selected, setSelected] = useState(null);
  // Stable so the modal's Escape listener isn't re-bound on every render
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section id="achievements" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle lead="Thành Tích &" accent="Chứng Chỉ" className="mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, key) => (
            <Reveal key={item.name} delay={(key % 3) * 0.12} className="h-full">
              <div
                onClick={() =>
                  item.url
                    ? window.open(item.url, "_blank", "noopener,noreferrer")
                    : setSelected(item)
                }
                onPointerMove={trackPointer}
                className={cn(
                  "achv-card p-6 rounded-xl card-hover relative group overflow-hidden cursor-pointer h-full",
                  item.award && "achv-card--award",
                )}
              >
                <div className="transition-transform duration-300 h-full flex flex-col justify-between group-hover:-translate-y-4">
                  <div className="text-left mb-4">
                    <div className="flex items-start justify-between mb-4">
                      <span className="achv-icon">
                        {item.award ? (
                          <Trophy className="w-5 h-5" />
                        ) : (
                          <FileText className="w-5 h-5" />
                        )}
                      </span>
                      <span className="px-2 py-0.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-mono text-primary">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg leading-snug mb-1">
                      {item.name}
                    </h3>
                    <p className="text-foreground/60 text-sm">
                      {item.institution}
                    </p>
                  </div>

                  {(item.highlights || item.link) && (
                    <div className="flex flex-wrap items-center gap-2 text-left">
                      {item.highlights?.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-1 text-xs font-medium rounded-full border border-primary/20 bg-primary/5 text-foreground/80"
                        >
                          {h}
                        </span>
                      ))}
                      {item.link && (
                        <a
                          href={publicUrl(item.link.href)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                          {item.link.label}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 w-full p-2 bg-primary flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Eye className="w-4 h-4 text-primary-foreground" />
                  <span className="text-primary-foreground text-xs font-bold uppercase tracking-wider">
                    Xem {item.fileLabel.toLowerCase()}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <PdfViewerModal
        title={selected ? `${selected.fileLabel}: ${selected.name}` : undefined}
        url={selected ? publicUrl(selected.file) : undefined}
        onClose={closeModal}
      />
    </section>
  );
};
