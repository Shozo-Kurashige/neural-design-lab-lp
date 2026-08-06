import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AboutSection } from "@/components/about-section";
import { NeuroDesignSection } from "@/components/neuro-design-section";
import { SkillsSection } from "@/components/skills-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3E30] font-['Noto_Sans_JP']">
      <Header simple backLabel="戻る" />
      <main className="pt-20">
        <AboutSection />
        <NeuroDesignSection />
        <SkillsSection />
      </main>
      <Footer />
    </div>
  );
}
