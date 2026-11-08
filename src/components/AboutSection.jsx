import { BrainCircuit, Code, Gamepad2 } from "lucide-react";
import { useState } from "react";
import { CVDownloadModal } from "./CVDownloadModal";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";
import { AstralButton } from "./motion/AstralButton";
import { useLang } from "../i18n/useLang";

const focusAreas = [
  { icon: Code, key: "about.focus1" },
  { icon: BrainCircuit, key: "about.focus2" },
  { icon: Gamepad2, key: "about.focus3" },
];

export const AboutSection = () => {
  const { lang, t } = useLang();
  const cvUrl = `${import.meta.env.BASE_URL}documents/CV-2026-${lang.toUpperCase()}.pdf`;
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const handleDownload = (e) => {
    e.preventDefault();
    setIsCVModalOpen(true);
  };

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle lead={t("about.lead")} accent={t("about.accent")} className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal className="space-y-6" delay={0.15}>
            <h3 className="text-2xl font-semibold">
              {t("about.heading")}
            </h3>

            <p className="text-muted-foreground">
              {t("about.p1")}
            </p>

            <p className="text-muted-foreground">
              {t("about.p2")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <AstralButton
                href="#contact"
                className="px-6 py-2"
              >
                {t("about.contact")}
              </AstralButton>
              <AstralButton
                href={cvUrl}
                onClick={handleDownload}
                className="px-6 py-2"
              >
                {t("cv.download")}
              </AstralButton>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6">
            {focusAreas.map(({ icon: Icon, key }, i) => (
              <Reveal key={key} delay={0.25 + i * 0.15}>
                <div className="gradient-border p-6 card-hover">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-lg">{t(`${key}.title`)}</h4>
                      <p className="text-muted-foreground">{t(`${key}.text`)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <CVDownloadModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </section>
  );
};
