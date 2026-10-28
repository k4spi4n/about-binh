import { SkillRadar } from "./SkillRadar";
import { skills } from "../data/skills";
import { Reveal } from "./motion/Reveal";
import { SectionTitle } from "./motion/SectionTitle";

export const SkillsSection = () => {
  const educationSkills = skills.filter(
    (skill) => skill.category === "Học vấn",
  );
  const technicalSkills = skills.filter(
    (skill) => skill.category !== "Học vấn",
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle lead="Hồ Sơ" accent="Kỹ Năng" className="mb-12" />

        {/* Technical Skills - Radar Chart */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
            Tech Stack
          </h3>
          <Reveal>
            <SkillRadar skills={technicalSkills} />
          </Reveal>
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
            Học Vấn
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationSkills.map((skill, key) => (
              <Reveal key={key} delay={(key % 3) * 0.12} className="h-full">
              <div className="bg-card p-6 rounded-lg shadow-xs card-hover relative overflow-hidden h-full">
                <div className="text-left">
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {skill.institution} {skill.year}
                  </p>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
