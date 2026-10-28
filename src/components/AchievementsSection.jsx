import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, FileText, Trophy, ExternalLink } from "lucide-react";
import { useLoading } from "../contexts/LoadingContext";
import { achievements } from "../data/achievements";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";
import { PdfViewerModal } from "./PdfViewerModal";

const publicUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

export const AchievementsSection = () => {
  const [selected, setSelected] = useState(null);
  const { triggerLoading } = useLoading();

  const handleClick = (item) => {
    triggerLoading(() => {
      setSelected(item);
    });
  };

  // Stable so the modal's Escape listener isn't re-bound on every render
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section id="achievements" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle lead="Thành Tích &" accent="Chứng Chỉ" className="mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, key) => (
            <Reveal key={item.file} delay={(key % 3) * 0.12} className="h-full">
              <div
                onClick={() => handleClick(item)}
                className={cn(
                  "bg-card p-6 rounded-lg shadow-xs card-hover relative group overflow-hidden cursor-pointer h-full",
                  item.award && "ring-1 ring-primary/40",
                )}
              >
                <div className="transition-transform duration-300 h-full flex flex-col justify-between group-hover:-translate-y-4">
                  <div className="text-left mb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {item.award && (
                        <Trophy className="w-4 h-4 text-primary shrink-0" />
                      )}
                      {item.name}
                      {!item.award && (
                        <FileText className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.institution} {item.year}
                    </p>
                  </div>

                  {(item.highlights || item.link) && (
                    <div className="flex flex-wrap items-center gap-2 text-left">
                      {item.highlights?.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
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
