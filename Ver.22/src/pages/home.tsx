import React from "react";
import { Header } from "@/components/header";
import { HeroOpening } from "@/components/hero-opening";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-['Noto_Sans_JP']">
      <Header />
      <main>
        <HeroOpening />
      </main>
    </div>
  );
}
