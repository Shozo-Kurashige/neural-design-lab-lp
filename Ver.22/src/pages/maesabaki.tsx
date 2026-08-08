import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// ── Section 1 data ──────────────────────────────────────────
const cards = [
  { title: "要件", desc: "商談では好感触だったのに、要件整理で止まる。" },
  { title: "見積", desc: "顧客ごとの例外が増え、見積が出せない。" },
  { title: "情報", desc: "営業が聞いた内容と、開発が必要な情報が違う。" },
  { title: "本番", desc: "PoCまでは進むが、本番運用へ移れない。" },
  { title: "時間", desc: "顧客の現場説明に、PMとエンジニアの時間が溶ける。" },
];

// ── Section 2 data ──────────────────────────────────────────
const benefits = [
  "営業が技術提案に集中できる。",
  "PMが顧客整理だけで消耗しない。",
  "エンジニアが曖昧な要望に振り回されない。",
  "見積精度が上がる。",
  "導入後の手戻りが減る。",
  "定着しない案件を減らせる。",
];

const VIEWPORT = { once: true, margin: "-80px" } as const;

function wiv(delay: number, prefersReduced: boolean | null) {
  return {
    initial:     { opacity: 0, y: prefersReduced ? 0 : 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    VIEWPORT,
    transition:  { duration: prefersReduced ? 0.01 : 0.5, delay: delay / 1000, ease: "easeOut" },
  } as const;
}

export default function Maesabaki() {
  const prefersReduced = useReducedMotion();
  const [show, setShow] = useState(false);
  const [cardHidden, setCardHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Section 1: 2s後に全コンテンツを1sかけてフェードイン（CSS transition）
  const s1FadeStyle: React.CSSProperties = {
    opacity:    show ? 1 : 0,
    transition: prefersReduced ? 'none' : 'opacity 1000ms ease-out',
  };

  return (
    <div className="font-['Noto_Sans_JP']">

      {/* ヘッダー */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-4">
          <button
            onClick={() => window.history.length <= 1 ? (window.location.href = "/") : window.history.back()}
            className="flex items-center gap-2 text-white/80 text-sm font-bold tracking-wide hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            戻る
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════════
          Section 1 — 前捌きの課題
      ════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage:    "url('/maesabaki-bk-1.webp')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        {/* フェードインラッパー：2s後に全コンテンツをまとめて表示 */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-12 py-28 md:py-36" style={s1FadeStyle}>

          <p className="text-center text-[#D4AF37] text-sm font-bold tracking-widest mb-6">
            The Maesabaki
          </p>

          <h1 className="text-white text-[1.2rem] md:text-[2.6rem] font-['Noto_Serif_JP'] font-bold leading-snug text-center mb-10 md:mb-14">
            実装の前で止まっている案件を、<br />
            提案できる状態までほどきます。
          </h1>

          <div className="flex flex-col gap-3 md:gap-4 mb-12 md:mb-16">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                className="group flex items-center gap-5 md:gap-7 px-5 py-4 md:px-7 md:py-5 rounded-sm border-l-4 cursor-default"
                style={{ backgroundColor: "rgba(255,255,255,0.70)", borderColor: "#D4AF37" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
              >
                <p className="shrink-0 w-10 md:w-12 text-[1rem] md:text-[1.1rem] font-['Noto_Serif_JP'] font-bold tracking-wider transition-colors duration-200 text-[#1a1a1a] group-hover:text-[#D4AF37]">
                  {card.title}
                </p>
                <p className="text-[0.9rem] md:text-[1rem] font-['Noto_Sans_JP'] leading-relaxed text-[#2a2a2a]">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white text-[0.82rem] md:text-[1.1rem] font-['Noto_Serif_JP'] tracking-wider">
            顧客側の混乱を、御社の実装コストにしません。
          </p>

        </div>

        {/* スクロールインジケーター */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={s1FadeStyle}
        >
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-light">
            Scroll
          </span>
          <motion.div
            animate={prefersReduced ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-0.5"
          >
            <span className="block w-px h-6 bg-white/30" />
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-white/60">
              <path d="M1 1L6 7L11 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>

      </section>

      {/* ════════════════════════════════════════
          Section 2 — 前捌きの効果 & CTA
      ════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage:    "url('/maesabaki-bk-2.webp')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 md:px-12 py-28 md:py-36 flex flex-col items-center gap-10 md:gap-14">

          {/* H2 */}
          <motion.h2
            {...wiv(0, prefersReduced)}
            className="text-white text-[1.3rem] md:text-[2.4rem] font-['Noto_Serif_JP'] font-bold leading-snug text-center"
          >
            案件定義ができるところまで、<br />
            顧客側を整えます。
          </motion.h2>

          {/* ベネフィットカード */}
          <motion.div
            {...wiv(150, prefersReduced)}
            className="group w-full rounded-sm px-7 py-7 md:px-10 md:py-9 cursor-default"
            style={{
              backgroundColor: "rgba(255,255,255,0.40)",
              opacity: cardHidden ? 0 : 1,
              transition: "opacity 0.4s ease",
            }}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255,255,255,1.0)",
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            onTap={() => setCardHidden(h => !h)}
          >
            <p className="text-white group-hover:text-[#1a1a1a] transition-colors duration-200 text-[1rem] md:text-[1.1rem] font-['Noto_Serif_JP'] font-bold mb-5 tracking-wide">
              ■ 前捌きが整うと、こう変わります。
            </p>
            <ul className="space-y-2 mb-6">
              {benefits.map((b, i) => (
                <li key={i} className="text-white group-hover:text-[#2a2a2a] transition-colors duration-200 text-[0.95rem] md:text-[1rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide">
                  ・{b}
                </li>
              ))}
            </ul>
            <p className="text-white/90 group-hover:text-[#2a2a2a] transition-colors duration-200 text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide">
              顧客の業務を棚卸しし、例外・判断・役割・データを整理し、御社が提案・設計・実装できる状態まで整えます。
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div {...wiv(300, prefersReduced)} className="flex flex-col items-center gap-4">
            <p className="text-white/80 text-[0.9rem] md:text-[1rem] font-['Noto_Sans_JP'] tracking-wide text-center">
              まずは、実装前で止まっている<br />案件の話を聴かせてください。
            </p>
            <button
              onClick={() => { window.location.href = "/#contact"; }}
              className="inline-block px-8 md:px-12 py-3.5 md:py-4 bg-[#D4AF37] text-white text-[0.9rem] md:text-[1rem] font-bold tracking-wide rounded-sm shadow-md hover:bg-[#c19f30] hover:shadow-lg transition-colors"
            >
              初回60分の壁打ちを予約する
            </button>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
