import React from "react";
import { motion } from "framer-motion";

const VIEWPORT = { once: true, margin: "-80px" } as const;

function anim(delay: number) {
  return {
    initial:     { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    VIEWPORT,
    transition:  { duration: 0.7, delay: delay / 1000, ease: "easeOut" },
  } as const;
}

const items = [
  {
    title: "業務の属人化",
    details: [
      "人によって仕事のやり方が違う",
      "判断が特定の人に集まっている",
    ],
    delay: 1000,
  },
  {
    title: "古い仕組の残存",
    details: [
      "古いExcelやシステムが残っている",
      "情シスや詳しい人が便利屋になっている",
    ],
    delay: 1100,
  },
  {
    title: "AI導入前の混乱",
    details: [
      "AIを導入したいが、どこから​手をつけるか分からない",
      "例外処理が多く、マニュアルだけでは回らない",
    ],
    delay: 1200,
  },
];

export function ChallengesSection() {
  return (
    <section id="challenges" className="w-full py-24 md:py-32 -mt-20 z-10 bg-white" style={{ position: "relative" }}>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">

        {/* ラベル */}
        <motion.span
          {...anim(0)}
          className="block text-center text-[#D4AF37] font-bold tracking-widest text-sm font-['Noto_Sans_JP'] mb-5"
        >
          よくあるケース
        </motion.span>

        {/* 見出し */}
        <motion.h2
          {...anim(100)}
          className="text-[1.35rem] md:text-[2.1rem] font-['Noto_Serif_JP'] font-bold leading-snug text-center mb-14 md:mb-20 whitespace-nowrap"
          style={{ color: "#1a1a1a" }}
        >
          回ってはいる。<br className="block md:hidden" />でも、余裕があるわけではない。
        </motion.h2>

        {/* 3項目 — 見出し表示から2秒後にフェードイン */}
        <div className="max-w-4xl mx-auto divide-y divide-[rgba(0,0,0,0.12)]">
          {items.map((item) => (
            <motion.div
              key={item.title}
              {...anim(item.delay)}
              className="py-4 md:py-5 flex flex-col md:flex-row md:items-start gap-2 md:gap-8 md:pl-[8rem]"
            >
              <p
                className="md:w-40 shrink-0 text-[1rem] md:text-[1.15rem] font-['Noto_Serif_JP'] font-bold tracking-wider text-left border-l-4 pl-3 whitespace-nowrap"
                style={{ color: "#1a1a1a", borderColor: "#D4AF37" }}
              >
                {item.title}
              </p>
              <ul className="flex-1 space-y-1 text-left">
                {item.details.map((text, j) => (
                  <li
                    key={j}
                    className="text-[0.95rem] md:text-[1rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide"
                    style={{ color: "#4a4a4a" }}
                  >
                    ・{text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 末尾メッセージ — 見出しと同タイミングでフェードイン */}
        <motion.div
          {...anim(0)}
          className="mt-14 md:mt-20 text-center space-y-1.5"
        >
          <p
            className="text-[0.95rem] md:text-[1.1rem] font-['Noto_Serif_JP'] leading-relaxed tracking-wider"
            style={{ color: "#1a1a1a" }}
          >
            現場は、誰かの工夫と頑張りで<br className="block md:hidden" />今日も動いています。
          </p>
          <p
            className="text-[0.95rem] md:text-[1.1rem] font-['Noto_Serif_JP'] leading-relaxed tracking-wider"
            style={{ color: "#1a1a1a" }}
          >
            だからこそ、止まる前に、<br className="block md:hidden" />今ある知恵と混乱を整理します。
          </p>
        </motion.div>

      </div>
    </section>
  );
}
