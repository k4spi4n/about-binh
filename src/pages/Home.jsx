import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { ScrollProgressBar } from "../components/ScrollProgressBar";
import { Atmosphere } from "../components/Atmosphere";
import { SectionRail } from "../components/SectionRail";
import { installAfterimageLinks } from "../lib/afterimage";

export const Home = () => {
  useEffect(() => installAfterimageLinks(), []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgressBar />
      {/* Background Effects */}
      <Atmosphere />
      <StarBackground />
      <SectionRail />

      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main className="page-land">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
