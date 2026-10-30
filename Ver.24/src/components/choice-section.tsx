import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { AiDiagnostic } from "@/components/ai-diagnostic";

const VIEWPORT = { once: true, margin: "-80px" } as const;

function anim(delay: number) {
  return {
    initial:     { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    VIEWPORT,
    transition:  { duration: 0.5, delay: delay / 1000, ease: "easeOut" },
  } as const;
}

const btnCls = "block w-full text-center px-6 py-3.5 bg-[#D4AF37] text-white text-[0.9rem] font-bold rounded-sm shadow-md hover:bg-[#c19f30] hover:shadow-lg transition-colors";

export function ChoiceSection() {
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <>
    <AiDiagnostic isOpen={diagOpen} onClose={() => setDiagOpen(false)} />
    <section id="services" className="w-full py-24 md:py-32 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* ラベル */}
        <motion.span
          {...anim(0)}
          className="block text-center text-[#D4AF37] font-bold tracking-widest text-sm font-['Noto_Sans_JP'] mb-5"
        >
          お選びください
        </motion.span>

        {/* 見出し */}
        <motion.h2
          {...anim(100)}
          className="text-[1.35rem] md:text-[2.2rem] font-['Noto_Serif_JP'] font-bold text-center text-[#1a1a1a] leading-snug mb-14 md:mb-20"
        >
          あなたは、どちらの<span className="underline underline-offset-4">立場</span>から<br />
          現場を変えようとしていますか。
        </motion.h2>

        {/* 2枚カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* 左カード — 地域企業 */}
          <motion.div
            {...anim(200)}
            className="flex flex-col gap-6 p-7 md:p-9 rounded-sm border-l-4 cursor-default"
            style={{ backgroundColor: "#2C3E30", borderColor: "#D4AF37" }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.22)",
              transition: { duration: 0.2, ease: "easeOut" },
            }}
          >
            <p className="text-white text-[1.1rem] md:text-[1.15rem] font-['Noto_Serif_JP'] font-bold tracking-wide text-center">
              地域企業の経営者、ご担当者様
            </p>
            <div className="flex-1 space-y-3">
              <p className="text-white text-[0.95rem] md:text-[1rem] font-['Noto_Serif_JP'] font-bold leading-relaxed">
                まず、今あるものを見つけるところから。
              </p>
              <p className="text-white/80 text-[0.88rem] md:text-[0.93rem] font-['Noto_Sans_JP'] leading-relaxed">
                組織の中に隠れた課題も、まだ言葉になっていない価値も。<br className="hidden md:block" />
                NDLは、見えにくいものを一緒にほどきます。
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => setDiagOpen(true)} className={btnCls}>
                AIによる無料診断を見る
              </button>
              <Link href="/ai-search-llmo" className={btnCls}>
                AIサーチ、LLMOを見る
              </Link>
            </div>
          </motion.div>

          {/* 右カード — TEC企業 */}
          <motion.div
            {...anim(300)}
            className="flex flex-col gap-6 p-7 md:p-9 rounded-sm border-l-4 cursor-default"
            style={{ backgroundColor: "#111111", borderColor: "#D4AF37" }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.22)",
              transition: { duration: 0.2, ease: "easeOut" },
            }}
          >
            <p className="text-white text-[1.1rem] md:text-[1.15rem] font-['Noto_Serif_JP'] font-bold tracking-wide text-center">
              TEC企業様
            </p>
            <div className="flex-1 space-y-3">
              <p className="text-white text-[0.95rem] md:text-[1rem] font-['Noto_Serif_JP'] font-bold leading-relaxed">
                コミュニケーションコストが<br className="hidden md:block" />
                ボトルネックになっていませんか。
              </p>
              <p className="text-white/80 text-[0.88rem] md:text-[0.93rem] font-['Noto_Sans_JP'] leading-relaxed">
                顧客側の業務整理に、営業・PM・エンジニアの<br className="hidden md:block" />
                時間が溶けていませんか。
              </p>
            </div>
            <Link href="/maesabaki" className={btnCls}>
              "The Maesabaki" を見る
            </Link>
          </motion.div>

        </div>

        {/* サービス一覧ボタン */}
        <motion.div {...anim(450)} className="mt-8 md:mt-10">
          <a
            href="/services"
            className="group flex items-center justify-center gap-3 w-full py-4 bg-[#D4AF37] hover:bg-[#2C3E30] text-[#2C3E30] hover:text-[#D4AF37] font-bold font-['Noto_Sans_JP'] tracking-wider text-sm md:text-base transition-all duration-300"
          >
            サービス一覧を見る
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>

      </div>
    </section>
    </>
  );
}
