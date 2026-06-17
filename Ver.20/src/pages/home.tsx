import React, { useEffect, useState, useRef } from "react";
import { Bot } from "lucide-react";
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
import { NeuroDesignSection } from "@/components/neuro-design-section"; // Ver.18: NDL定義セクション

type ConsultationItem = {
  text: string;
  href: string;
  orderClass: string;
  isHighlight?: boolean;
  isLLMO?: boolean;
};

export default function Home() {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const [mobileVideoEnded, setMobileVideoEnded] = useState(false);
  const [pcVideoEnded, setPcVideoEnded] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ver.19: autoPlay ポリシー回避 — ref 経由で明示的に play() を呼ぶ
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true; // 一部ブラウザで属性よりプロパティ設定が優先される
    v.play().catch(() => {
      // 自動再生ブロック時はポスター画像のまま静止
    });
  }, []);

  // スマホ動画: onEnded が発火しない場合の fallback（15秒）
  useEffect(() => {
    const timer = setTimeout(() => setMobileVideoEnded(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  // PC動画: onEnded が発火しない場合の fallback（15秒）
  useEffect(() => {
    const timer = setTimeout(() => setPcVideoEnded(true), 15000);
    return () => clearTimeout(timer);
  }, []);

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
      text: "WEBページやSNS運用",
      href: "#services",
      orderClass: "order-1",
    },
    {
      text: "AI活用やDXツール導入",
      href: "#services",
      orderClass: "order-2",
    },
    {
      text: "補助金や経営相談",
      href: "#services",
      orderClass: "order-3",
    },
    {
      text: "AIによる無料経営相談（おすすめ）",
      href: "#diagnostic-banner",
      orderClass: "order-4",
      isHighlight: true,
    },
    {
      text: "AI検索・LLMO対策支援（New!）",
      href: "#services",
      orderClass: "order-5",
      isLLMO: true,
    },
    {
      text: "課題が明確ではなく何から始めていいかわからない",
      href: "#process",
      orderClass: "order-6",
    },
    {
      text: "コンサルに相談したいが高くて使えない",
      href: "#price",
      orderClass: "order-7",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3E30] font-['Noto_Sans_JP'] selection:bg-[#D4AF37] selection:text-white relative">
      <Header />

      <main className="pt-0">
        {/*
          ── Ver.19 Hero ──
          スマホ: 動画を aspect-video バナー表示（16:9 全景）→ 相談ボタンを下に配置
          PC    : 従来通り min-h-screen 全画面 + コンテンツオーバーレイ
        */}

        {/* ▼ スマホ専用: 動画バナー */}
        {/* mt-[58px]: ヘッダー73px - 15px → 被り約15px(≈4mm)に抑制 */}
        <div className="md:hidden relative w-full overflow-hidden mt-[58px] h-[calc(56.25vw+120px)]">
          <video
            ref={videoRef}
            src="/Opening_mov.mp4"
            className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-[1.37] origin-[center_37%]"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/Before_mov.webp"
            onEnded={() => setMobileVideoEnded(true)}
          />
          <div className="absolute inset-0 bg-black/15 z-10" />

          {/* 動画終了後: 見出しパネルをオーバーレイ */}
          <AnimatePresence>
            {mobileVideoEnded && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-[#2C3E30]/65"
              >
                <div className="inline-block px-5 py-5 rounded-2xl bg-white/10 border border-white/20 text-center mx-6">
                  <h2 className="text-[1.05rem] font-['Noto_Serif_JP'] font-bold text-white leading-relaxed">
                    あなたの話を聴かせてください。
                    <br />
                    <span className="text-[#D4AF37]">課題</span>はなんですか？
                  </h2>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ▼ スマホ専用: 相談リスト（動画終了後にスライドイン） */}
        <AnimatePresence>
          {mobileVideoEnded && (
            <div className="md:hidden bg-[#2C3E30] px-3 py-3 flex flex-col gap-2">
              {consultationItems.map((item, index) => {
                const fromRight = index % 2 === 0;
                return (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: fromRight ? 80 : -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.12, ease: "easeOut" }}
                    style={{ willChange: "transform, opacity" }}
                    className={`flex items-center justify-between w-full px-4 py-3.5 cursor-pointer group
                      ${item.isHighlight
                        ? "bg-[#D4AF37] text-white"
                        : item.isLLMO
                        ? "bg-[#2C3E30] border border-white/40 text-white"
                        : "bg-white/85 text-gray-800"
                      }`}
                  >
                    <span className={`text-sm font-bold leading-relaxed ${!item.isHighlight && !item.isLLMO ? "group-hover:text-[#D4AF37]" : ""}`}>
                      {item.text}
                    </span>
                    <span className="font-bold ml-3 shrink-0 text-sm">{">>"}</span>
                  </motion.a>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* ▼ PC専用: 全画面ヒーロー + コンテンツオーバーレイ */}
        <section ref={bannerRef} className="hidden md:flex relative w-full min-h-screen items-center justify-center overflow-hidden">
          <video
            src="/Opening_mov.mp4"
            className={`absolute inset-0 w-full h-full object-cover object-center z-0 transition-[filter] duration-1000 ease-in-out ${pcVideoEnded ? "blur-[3px]" : ""}`}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/Before_mov.webp"
            onEnded={() => setPcVideoEnded(true)}
          />
          <div className="absolute inset-0 bg-black/20 z-10" />
          <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 6.8, ease: "easeOut" }}
              className="text-center mb-16 flex justify-center w-full"
            >
              <div className="inline-block px-12 py-8 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                <h2 className="text-4xl lg:text-5xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] leading-relaxed">
                  あなたの話を聴かせてください。
                  <br />
                  <span className="text-[#D4AF37]">課題</span>はなんですか？
                </h2>
              </div>
            </motion.div>
            <div className="flex flex-col gap-2 w-full max-w-xl">
              {consultationItems.map((item, index) => {
                const fromRight = index % 2 === 0;
                return (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: fromRight ? 80 : -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 7.2 + index * 0.12, ease: "easeOut" }}
                    whileHover={{ x: 4 }}
                    style={{ willChange: "transform, opacity" }}
                    className={`flex items-center justify-between w-full px-6 py-4 cursor-pointer group
                      ${item.isHighlight
                        ? "bg-[#D4AF37] text-white"
                        : item.isLLMO
                        ? "bg-[#2C3E30] border border-white/40 text-white"
                        : "bg-white/85 text-gray-800 hover:bg-white/95"
                      }`}
                  >
                    <span className={`font-bold leading-relaxed transition-colors ${!item.isHighlight && !item.isLLMO ? "group-hover:text-[#D4AF37]" : ""}`}>
                      {item.text}
                    </span>
                    <span className="font-bold ml-6 shrink-0 transition-transform group-hover:translate-x-1">{">>"}</span>
                  </motion.a>
                );
              })}
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
                  <h3 className="text-3xl font-['Noto_Serif_JP'] font-bold leading-snug">
                    「提案」だけではなく、現場に定着するところまで「責任」を持つ。
                    <br />
                    それが、NDLの考える「本当のDX」です。
                  </h3>
                </FadeIn>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group cursor-default">
                <div className="w-16 h-16 mx-auto bg-[#F5F7F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2C3E30] transition-colors duration-500 shadow-sm group-hover:shadow-md">
                  <i className="fas fa-stairs text-2xl text-[#2C3E30] group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-lg font-bold mb-4 font-['Noto_Serif_JP'] text-[#2C3E30] group-hover:text-[#D4AF37] transition-colors duration-300">
                  小さく始め、確実に変える
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed text-justify group-hover:text-[#2C3E30] transition-colors duration-300">
                  大規模な改革よりも、まずは現場で機能する小さな成功を。
                  無理なく続く改善こそ、本当のDXだと考えています。
                </p>
              </div>

              <div className="text-center group cursor-default">
                <div className="w-16 h-16 mx-auto bg-[#F5F7F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2C3E30] transition-colors duration-500 shadow-sm group-hover:shadow-md">
                  <i className="fas fa-puzzle-piece text-2xl text-[#2C3E30] group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-lg font-bold mb-4 font-['Noto_Serif_JP'] text-[#2C3E30] group-hover:text-[#D4AF37] transition-colors duration-300">
                  AIは魔法ではない
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed text-justify group-hover:text-[#2C3E30] transition-colors duration-300">
                  生成AIは現場を理解し、構造化し、運用設計して初めて力を発揮します。
                  私たちは「導入」だけに終わらず、「現場が自然に使い続ける状態」を設計します。
                </p>
              </div>

              <div className="text-center group cursor-default">
                <div className="w-16 h-16 mx-auto bg-[#F5F7F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2C3E30] transition-colors duration-500 shadow-sm group-hover:shadow-md">
                  <i className="fas fa-hands-helping text-2xl text-[#2C3E30] group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-lg font-bold mb-4 font-['Noto_Serif_JP'] text-[#2C3E30] group-hover:text-[#D4AF37] transition-colors duration-300">
                  現場から逃げない
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed text-justify group-hover:text-[#2C3E30] transition-colors duration-300">
                  私たちは、提案だけで終わるDXは行いません。
                  現場に入り、運用が定着し、"仕組みが回る"まで伴走します。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ver.18: ニューロデザイン定義セクション */}
        <NeuroDesignSection />

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
