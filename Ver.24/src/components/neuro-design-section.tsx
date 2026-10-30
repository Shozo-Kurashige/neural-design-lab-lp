import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/fade-in";

const TAGS = ["業務改善", "DX", "AI活用", "中小企業", "現場設計", "業務フロー"];

export function NeuroDesignSection() {
  return (
    <section
      id="neuro-design"
      className="py-24 bg-[#F5F7F6] relative overflow-hidden scroll-mt-20"
    >
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#2C3E30]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">

        {/* ① ラベル＋見出し */}
        <div className="text-center mb-14">
          <FadeIn>
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-5">
              NEURO DESIGN
            </span>
            <h2 className="text-2xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] leading-snug whitespace-nowrap">
              ニューロデザインとは何か
            </h2>
          </FadeIn>
        </div>

        {/* ② 一行定義（最重要 — 最上部に配置） */}
        <FadeIn delay={80}>
          <div className="bg-[#2C3E30] rounded-2xl px-8 py-10 md:px-12 md:py-12 mb-6 text-center">
            <p className="text-white font-['Noto_Serif_JP'] text-lg md:text-xl leading-relaxed">
              ニューロデザインとは、<br />
              <span className="text-[#D4AF37] font-bold">
                "現場が自然に回る状態"
              </span>
              を設計することです。
            </p>
          </div>
        </FadeIn>

        {/* ③ 本文カード */}
        <FadeIn delay={160}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-12 md:px-14 md:py-14">

            {/* 補足説明 */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-10">
              脳科学的な知見そのものではありません。<br className="hidden md:block" />
              現場の意思決定・業務フロー・情報の流れを構造化し、<br className="hidden md:block" />
              人が自然に動ける形に設計することです。
            </p>

            {/* 区切り線 */}
            <div className="w-10 h-[2px] bg-[#D4AF37] mb-10" />

            {/* 強調文 */}
            <p className="text-[#2C3E30] font-bold text-base md:text-xl font-['Noto_Serif_JP'] leading-relaxed mb-10">
              つまり、
              <span className="border-b-2 border-[#D4AF37]">
                「考えなくても回る仕組み」
              </span>
              を作る設計思想です。
            </p>

            {/* 最終定義 */}
            <p className="text-sm md:text-base text-gray-700 leading-loose">
              マーケティングやデザインに閉じた概念ではなく、<br className="hidden md:block" />
              業務改善・DX・AI活用までを含めた中小企業への支援、<br className="hidden md:block" />
              すなわち{" "}
              <span className="font-bold text-[#2C3E30]">
                "現場で機能する設計"
              </span>{" "}
              そのものを指します。
            </p>

            {/* タグ */}
            <div className="flex flex-wrap gap-2 mt-12">
              {TAGS.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  className="text-xs px-3 py-1 rounded-full bg-[#2C3E30]/8 text-[#2C3E30] border border-[#2C3E30]/15 font-medium cursor-default"
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ④ PHILOSOPHYへの橋渡し */}
        <FadeIn delay={240}>
          <p className="text-center text-sm text-gray-400 mt-10 leading-relaxed">
            この設計思想が、Neural Design Lab. のすべての支援の根底にあります。
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
