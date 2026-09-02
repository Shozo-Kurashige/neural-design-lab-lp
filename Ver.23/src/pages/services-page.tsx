import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ServicesSection } from "@/components/services-section";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3E30] font-['Noto_Sans_JP']">
      <Header simple backLabel="戻る" />
      <main className="pt-20">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
