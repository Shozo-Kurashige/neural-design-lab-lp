import React, { useEffect, useState, useRef } from "react";
import { Leaf, TrendingUp, Users, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ServicesSection } from "@/components/services-section";
import { Header } from "@/components/header";
import { ProcessSection } from "@/components/process-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { SkillsSection } from "@/components/skills-section";
import { PriceSection } from "@/components/price-section";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AiDiagnostic } from "@/components/ai-diagnostic";
import { WhatsUpSection } from "@/components/whats-up-section"; // Ver.16: 統合セクション

type ConsultationItem = {
  text: string;
  href: string;
  orderClass: string;
  isHighlight?: boolean;
};

export default function Home() {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);

  // ▼ GA4 トラッキングコードの動的注入（デプロイ時の消失対策）
  useEffect(() => {
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

    // 1. Google Tag Managerのメインスクリプトを注入
    const scriptTag = document.createElement("script");
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(scriptTag);

    // 2. インラインスクリプト（初期化）を注入
    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(inlineScript);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const bannerBottom = bannerRef.current.getBoundingClientRect().bottom;
        setShowFloatingBtn(bannerBottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (
        !link ||
        !link.hash ||
        !link.hash.startsWith("#") ||
        link.hash === "#"
      )
        return;

      const targetId = link.hash;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const headerOffset = 80;
        const offsetPosition = targetPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };
    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  const consultationItems: ConsultationItem[] = [
    {
      text: "WEBページや\nSNS運用",
      href: "#services",
      orderClass: "order-1 md:order-1",
    },
    {
      text: "AIによる\n無料経営診断",
      href: "#diagnostic-banner",
      orderClass: "order-2 md:order-5",
      isHighlight: true,
    },
    {
      text: "AI活用や\nDXツール導入",
      href: "#services",
      orderClass: "order-3 md:order-2",
    },
    {
      text: "補助金や\n経営相談",
      href: "#services",
      orderClass: "order-4 md:order-3",
    },
    {
      text: "課題が明確でなく\n何から始めていいか\nわからない",
      href: "#process",
      orderClass: "order-5 md:order-4",
    },
    {
      text: "コンサルに相談したいが\n価格が高くて使えない",
      href: "#price",
      orderClass: "order-6 md:order-6",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3E30] font-['Noto_Sans_JP'] selection:bg-[#D4AF37] selection:text-white relative">
      <Header />

      <main className="pt-0">
        <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, delay: 3.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center origin-center z-0"
            style={{ backgroundImage: "url('/hero-bg.webp')" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 3.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center origin-center z-0"
            style={{ backgroundImage: "url('/Opening_bk.webp')" }}
          />

          {/* 背景画像が何に変わっても文字視認性を担保する恒久オーバーレイ */}
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/*
            backdrop-blur はモバイルでは無効化（GPU負荷が高いため）
            PCのみ適用 — hidden md:block で CSS のみ制御
          */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.0, delay: 6.0, ease: "easeInOut" }}
            className="absolute inset-0 z-10 bg-white/20 backdrop-blur-sm hidden md:block"
          />

          {/* ▼ ドラマチック・オープニング ▼ */}
          <motion.div
            initial={{ opacity: 1, scale: 0.95 }}
            animate={{ opacity: [1, 1, 0], scale: [0.95, 1, 1.05] }}
            transition={{
              duration: 8.0,
              times: [0, 0.85, 1],
              ease: "easeInOut",
            }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-4"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="text-white text-sm md:text-xl font-bold tracking-[0.3em] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              ニッポンの中小企業と地方のために
            </motion.p>

            <h1 className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-3xl md:text-6xl font-['Noto_Serif_JP'] font-bold text-white">
              <span className="flex">
                {"現場を知る。".split("").map((char, index) => (
                  <motion.span
                    key={`line1-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.8 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className="inline-block drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="flex">
                {"明日を変える。".split("").map((char, index) => (
                  <motion.span
                    key={`line2-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 1.5 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className="inline-block drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>
          {/* ▲ ここまでオープニングアニメーション ▲ */}

          <div className="relative z-30 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center h-full pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 6.8, ease: "easeOut" }}
              className="text-center mb-12 md:mb-16 flex justify-center w-full"
            >
              <div className="inline-block px-5 py-6 md:px-12 md:py-8 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                <h2 className="text-[1.1rem] sm:text-2xl md:text-4xl lg:text-5xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] leading-relaxed whitespace-nowrap md:whitespace-normal">
                  あなたの話を聴かせてください。
                  <br />
                  <span className="text-[#D1AF]">課題</span>はなんですか？
                </h2>
              </div>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-[800px]">
              {consultationItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{
                    opacity: 0,
                    y: 20,
                    backgroundColor: item.isHighlight
                      ? "rgba(212, 175, 55, 1)"
                      : "rgba(255, 255, 255, 0.9)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    backgroundColor: item.isHighlight
                      ? "rgba(212, 175, 55, 1)"
                      : "rgba(255, 255, 255, 0.9)",
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 7.2 + index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={
                    item.isHighlight
                      ? {
                          scale: 1.05,
                          backgroundColor: "rgba(212, 175, 55, 0.85)",
                          boxShadow: "0 0 30px rgba(212, 175, 55, 0.55)",
                        }
                      : {
                          scale: 1.05,
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          boxShadow: "0 0 20px rgba(212, 175, 55, 0.20)",
                        }
                  }
                  style={{ willChange: "transform, opacity" }}
                  className={`w-36 h-36 md:w-48 md:h-48 rounded-full border
                    flex flex-col items-center justify-center p-4 text-center cursor-pointer group
                    ${item.orderClass} ${
                    item.isHighlight
                      ? "border-[#D4AF37]/70 text-white shadow-[0_0_20px_rgba(212,175,55,0.30)]"
                      : "border-gray-300 text-gray-800 shadow-sm"
                  }`}
                >
                  {item.isHighlight && (
                    <Bot
                      size={20}
                      className="mb-1 text-white opacity-90 group-hover:scale-110 transition-transform"
                    />
                  )}
                  <span
                    className={`text-xs md:text-sm font-bold leading-relaxed whitespace-pre-wrap transition-colors ${
                      item.isHighlight
                        ? "text-white group-hover:text-white"
                        : "group-hover:text-[#D4AF37]"
                    }`}
                  >
                    {item.text}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section id="philosophy" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-20">
              <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-4">
                PHILOSOPHY
              </span>
              <div className="flex justify-center">
                <FadeIn delay={200}>
                  <h3 className="text-3xl font-['Noto_Serif_JP'] font-bold">
                    きれいごとではない、
                    <br />
                    現場の「解」を。
                  </h3>
                </FadeIn>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group cursor-default">
                <div className="w-16 h-16 mx-auto bg-[#F5F7F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2C3E30] transition-colors duration-500 shadow-sm group-hover:shadow-md">
                  <TrendingUp className="w-8 h-8 text-[#2C3E30] group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-lg font-bold mb-4 font-['Noto_Serif_JP'] text-[#2C3E30] group-hover:text-[#D4AF37] transition-colors duration-300">
                  小さな変化から始める
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed text-justify group-hover:text-[#2C3E30] transition-colors duration-300">
                  いきなり大きなDX導入は定着しません。今の業務フローを否定せず、無理なく続けられる「半歩先の改善」をご提案します。
                </p>
              </div>

              <div className="text-center group cursor-default">
                <div className="w-16 h-16 mx-auto bg-[#F5F7F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2C3E30] transition-colors duration-500 shadow-sm group-hover:shadow-md">
                  <Leaf className="w-8 h-8 text-[#2C3E30] group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-lg font-bold mb-4 font-['Noto_Serif_JP'] text-[#2C3E30] group-hover:text-[#D4AF37] transition-colors duration-300">
                  地方と中小企業への想い
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed text-justify group-hover:text-[#2C3E30] transition-colors duration-300">
                  ニッポンを支えているのは、華やかなIT企業ではなく、中小企業と地方の現場です。そこに最新の武器を提供し、共に戦うことが私の使命です。
                </p>
              </div>

              <div className="text-center group cursor-default">
                <div className="w-16 h-16 mx-auto bg-[#F5F7F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2C3E30] transition-colors duration-500 shadow-sm group-hover:shadow-md">
                  <Users className="w-8 h-8 text-[#2C3E30] group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-lg font-bold mb-4 font-['Noto_Serif_JP'] text-[#2C3E30] group-hover:text-[#D4AF37] transition-colors duration-300">
                  非エリートの強み
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed text-justify group-hover:text-[#2C3E30] transition-colors duration-300">
                  私はエリートではありません。だからこそ、現場の「痛み」や「言い出しにくい悩み」が分かります。上からではなく、横に立つ伴走者でありたいと考えます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <WhatsUpSection />

        <section
          id="diagnostic-banner"
          ref={bannerRef}
          className="py-20 bg-[#F5F7F6] border-y border-gray-100 relative z-20"
        >
          <div className="container mx-auto px-4 max-w-4xl text-center flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-8 leading-tight">
              あなたの組織の「
              <span className="underline decoration-[#D4AF37] decoration-2 underline-offset-4">
                隠れた課題
              </span>
              」を可視化しませんか？
            </h3>

            <p className="text-[#2C3E30] mb-3 text-base md:text-lg leading-relaxed max-w-3xl">
              <span className="font-bold">10</span>
              個の簡単な質問に直感で答えるだけ。最新のAIアシスタントが、
              <br className="hidden md:block" />
              組織の現在地と次の一手を即座に診断します。
            </p>

            <p className="text-[#8B0000] font-bold text-lg md:text-xl mb-10 tracking-wide">
              個人情報の収集や、営業行為は一切行いません。
            </p>

            <div className="bg-[#FDFBF7] p-8 md:p-10 rounded-xl w-full max-w-2xl shadow-sm border border-gray-100 flex justify-center">
              <button
                onClick={() => setIsDiagnosticOpen(true)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2C3E30] hover:bg-[#1A2530] text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto min-w-[300px]"
              >
                <Bot size={24} className="text-[#D4AF37]" />
                AI組織診断を無料でスタート
              </button>
            </div>
          </div>
        </section>

        <ServicesSection />
        <SkillsSection />
        <ProcessSection />
        <PriceSection />
        {/* Ver.16: BlogSection は WhatsUpSection に統合済み */}
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
      <ScrollToTop />

      <AiDiagnostic
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
      />

      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed z-[90] bottom-20 right-4 md:bottom-8 md:right-24"
          >
            <a
              href="#diagnostic-banner"
              className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-white shadow-[0_4px_15px_rgba(212,175,55,0.4)] rounded-full font-bold transition-all duration-300 hover:scale-105 px-4 py-3 md:px-5 md:py-3.5 group cursor-pointer"
            >
              <Bot size={20} className="group-hover:animate-bounce" />
              <span className="text-sm md:text-base whitespace-nowrap">
                AI診断
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
