import React from "react";
import { Header } from "@/components/header";
import { HeroOpening } from "@/components/hero-opening";
import { ChallengesSection } from "@/components/challenges-section";
import { ApproachSection } from "@/components/approach-section";
import { PhilosophySection } from "@/components/philosophy-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-['Noto_Sans_JP']">
      <Header />
      <main>
        <HeroOpening />
        <ChallengesSection />
        <ApproachSection />
        <PhilosophySection />
      </main>
    </div>
  );
}
