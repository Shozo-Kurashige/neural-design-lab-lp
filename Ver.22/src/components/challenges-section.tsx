import React from "react";
import { motion } from "framer-motion";
import { HeroBg } from "@/components/hero-bg";

const VIEWPORT = { once: true, margin: "-80px" } as const;

function anim(delay: number) {
  return {
    initial:     { opacity: 0, y: -16 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    VIEWPORT,
    transition:  { duration: 0.7, delay: delay / 1000, ease: "easeOut" },
  } as const;
}

export function ChallengesSection() {
  return (
    <section id="challenges" className="relative w-full py-24 md:py-32 -mt-20 z-10">
      <HeroBg overlay="linear-gradient(to bottom, transparent 0px, rgba(255,255,255,0.90) 160px)" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">

        <motion.h2
          {...anim(0)}
          className="text-[1.35rem] md:text-[1.9rem] font-['Noto_Serif_JP'] font-bold leading-snug text-center mb-14 md:mb-20"
          style={{ color: "#1a1a1a" }}
        >
          回ってはいる。<br className="block md:hidden" />でも、余裕があるわけではない。
        </motion.h2>

        <div className="divide-y divide-[rgba(0,0,0,0.12)]">

          {/* 業務の属人化 */}
          <motion.div {...anim(0)} className="py-8 md:py-10 flex flex-col md:flex-row md:items-start gap-3 md:gap-14">
            <p className="md:w-44 shrink-0 text-[1rem] md:text-[1.05rem] font-['Noto_Serif_JP'] font-bold tracking-wider text-center md:text-left"
               style={{ color: "#1a1a1a" }}>
              業務の属人化
            </p>
            <ul className="flex-1 space-y-1.5 text-center md:text-left">
              <li className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide" style={{ color: "#4a4a4a" }}>
                人によって仕事のやり方が違う
              </li>
              <li className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide" style={{ color: "#4a4a4a" }}>
                判断が特定の人に集まっている
              </li>
            </ul>
          </motion.div>

          {/* 古い仕組みの残存 */}
          <motion.div {...anim(300)} className="py-8 md:py-10 flex flex-col md:flex-row md:items-start gap-3 md:gap-14">
            <p className="md:w-44 shrink-0 text-[1rem] md:text-[1.05rem] font-['Noto_Serif_JP'] font-bold tracking-wider text-center md:text-left"
               style={{ color: "#1a1a1a" }}>
              古い仕組みの残存
            </p>
            <ul className="flex-1 space-y-1.5 text-center md:text-left">
              <li className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide" style={{ color: "#4a4a4a" }}>
                古いExcelやシステムが残っている
              </li>
              <li className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide" style={{ color: "#4a4a4a" }}>
                情シスや詳しい人が便利屋になっている
              </li>
            </ul>
          </motion.div>

          {/* AI導入前の混乱 */}
          <motion.div {...anim(600)} className="py-8 md:py-10 flex flex-col md:flex-row md:items-start gap-3 md:gap-14">
            <p className="md:w-44 shrink-0 text-[1rem] md:text-[1.05rem] font-['Noto_Serif_JP'] font-bold tracking-wider text-center md:text-left"
               style={{ color: "#1a1a1a" }}>
              AI導入前の混乱
            </p>
            <ul className="flex-1 space-y-1.5 text-center md:text-left">
              <li className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide" style={{ color: "#4a4a4a" }}>
                AIを導入したいが、どこから<br className="block md:hidden" />手をつけるか分からない
              </li>
              <li className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide" style={{ color: "#4a4a4a" }}>
                例外処理が多く、マニュアルだけでは回らない
              </li>
            </ul>
          </motion.div>

        </div>

        <motion.div
          {...anim(900)}
          className="mt-14 md:mt-20 text-center space-y-1.5"
        >
          <p className="text-[0.95rem] md:text-[1.05rem] font-['Noto_Serif_JP'] leading-relaxed tracking-wider"
             style={{ color: "#1a1a1a" }}>
            現場は、誰かの工夫と頑張りで<br className="block md:hidden" />今日も動いています。
          </p>
          <p className="text-[0.95rem] md:text-[1.05rem] font-['Noto_Serif_JP'] leading-relaxed tracking-wider"
             style={{ color: "#1a1a1a" }}>
            だからこそ、止まる前に、<br className="block md:hidden" />今ある知恵と混乱を整理します。
          </p>
        </motion.div>

      </div>
    </section>
  );
}
