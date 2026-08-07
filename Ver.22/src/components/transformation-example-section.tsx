import React from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";

const VIEWPORT = { once: true, margin: "-80px" } as const;

const cards = [
  {
    label:      "改善モデル 01",
    title:      "属人化した見積業務",
    body:       "社長だけが扱える見積Excelを、チームで使え、判断を残せる仕組みへ。",
    href:       "/president-excel",
    // PC: 右下ドロップシャドウ（赤）→ hover で消える
    pcShadow:   "md:shadow-[6px_6px_10px_rgba(239,68,68,0.4)]",
    // タイトル: mobile=赤固定 / PC=通常→hover赤
    titleClass: "text-red-500 md:text-[#1a1a1a] md:group-hover:text-red-500",
  },
  {
    label:      "改善モデル 02",
    title:      "散在する現場情報",
    body:       "報告書・安全書類・現場写真・連絡を整理し、現場の負担を軽くする仕組みへ。",
    href:       "/for-construction",
    // PC: 右下ドロップシャドウ（緑）→ hover で消える
    pcShadow:   "md:shadow-[6px_6px_10px_rgba(34,197,94,0.4)]",
    // タイトル: mobile=緑固定 / PC=通常→hover緑
    titleClass: "text-green-400 md:text-[#1a1a1a] md:group-hover:text-green-400",
  },
];

export function TransformationExampleSection() {
  const prefersReduced = useReducedMotion();

  function anim(delay: number) {
    return {
      initial:     { opacity: 0, y: prefersReduced ? 0 : 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport:    VIEWPORT,
      transition:  {
        duration: prefersReduced ? 0.01 : 0.6,
        delay:    prefersReduced ? 0    : delay / 1000,
        ease:     "easeOut",
      },
    } as const;
  }

  return (
    <section id="transformation-example-section" className="py-24 md:py-32 bg-[#FDFBF7] scroll-mt-20">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* ラベル・見出し・サブコピー */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            {...anim(0)}
            className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-4 font-['Noto_Sans_JP']"
          >
            改善モデル
          </motion.span>
          <motion.h2
            {...anim(100)}
            className="text-[1.35rem] md:text-[1.9rem] font-['Noto_Serif_JP'] font-bold leading-snug mb-4"
            style={{ color: "#1a1a1a" }}
          >
            現場の知恵を、
            <br className="md:hidden" />
            会社の資産に変える。
          </motion.h2>
          <motion.p
            {...anim(200)}
            className="text-[0.9rem] md:text-[1rem] font-['Noto_Sans_JP']"
            style={{ color: "#4a4a4a" }}
          >
            誰かしか使えない現場の知見を、
            <br className="md:hidden" />
            チームで動かせる資産へ。
          </motion.p>
        </div>

        {/* 改善モデル 2カード */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-8 mb-16 md:mb-20">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              {...anim(i * 150)}
              className="rounded-sm"
            >
              <Link
                href={card.href}
                className={[
                  "group block h-full rounded-sm px-7 py-8 border",
                  "transition-all duration-300",
                  // モバイル: 常に黒反転・シャドウなし
                  "bg-[#0f0f0f] border-[rgba(255,255,255,0.07)]",
                  // PC: 白背景・カード色シャドウ → hover で黒反転・シャドウ消去
                  "md:bg-white md:border-[rgba(44,62,48,0.12)]",
                  "md:hover:bg-[#0f0f0f] md:hover:border-[rgba(255,255,255,0.07)] md:hover:shadow-none",
                  card.pcShadow,
                ].join(" ")}
              >
                {/* ラベル */}
                <p className="text-xs font-bold tracking-widest uppercase mb-4 font-['Noto_Sans_JP'] transition-colors duration-300 text-white/40 md:text-[#9ca3af] md:group-hover:text-white/40">
                  {card.label}
                </p>

                {/* タイトル */}
                <h3
                  className={[
                    "text-[1.1rem] md:text-[1.2rem] font-['Noto_Serif_JP'] font-bold leading-snug mb-3",
                    "transition-colors duration-300",
                    card.titleClass,
                  ].join(" ")}
                >
                  {card.title}
                </h3>

                {/* 本文 */}
                <p className="text-[0.9rem] font-['Noto_Sans_JP'] leading-relaxed mb-6 transition-colors duration-300 text-white/65 md:text-[#4a4a4a] md:group-hover:text-white/65">
                  {card.body}
                </p>

                {/* CTA */}
                <span className="text-[0.85rem] font-['Noto_Sans_JP'] font-bold inline-flex items-center gap-1 transition-colors duration-200 text-white/50 md:text-[#9ca3af] md:group-hover:text-white/50">
                  詳しく見る <span aria-hidden="true">›</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* まとめメッセージ */}
        <motion.div {...anim(0)} className="text-center space-y-2.5">
          <p
            className="text-[1rem] md:text-[1.05rem] font-['Noto_Serif_JP'] font-bold leading-relaxed tracking-wider"
            style={{ color: "#1a1a1a" }}
          >
            ツールを入れることが、
            <br className="md:hidden" />
            ゴールではありません。
          </p>
          <p
            className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide"
            style={{ color: "#4a4a4a" }}
          >
            現場にある知恵を整理し、誰か一人に
            <br className="md:hidden" />
            頼らなくても、業務と判断が無理なく
            <br className="md:hidden" />
            続いていく状態をつくります。
          </p>
        </motion.div>

      </div>
    </section>
  );
}
