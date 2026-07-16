import React from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";

const VIEWPORT = { once: true, margin: "-80px" } as const;

const cards = [
  {
    label: "改善モデル 01",
    title: "属人化した見積業務",
    body: "社長だけが扱える見積Excelを、チームで使え、判断を残せる仕組みへ。",
    href: "/president-excel",
  },
  {
    label: "改善モデル 02",
    title: "散在する現場情報",
    body: "報告書・安全書類・現場写真・連絡を整理し、現場の負担を軽くする仕組みへ。",
    href: "/for-construction",
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
    <section id="transformation" className="py-24 md:py-32 bg-[#FDFBF7]">
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
            現場の知恵を、会社の資産に変える。
          </motion.h2>
          <motion.p
            {...anim(200)}
            className="text-[0.9rem] md:text-[1rem] font-['Noto_Sans_JP']"
            style={{ color: "#4a4a4a" }}
          >
            誰かしか使えない現場の知見を、チームで動かせる資産へ。
          </motion.p>
        </div>

        {/* 改善モデル 2カード */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-16 md:mb-20">
          {cards.map((card, i) => (
            <motion.div key={i} {...anim(i * 150)}>
              <Link
                href={card.href}
                className="group block h-full rounded-sm px-7 py-8 border shadow-sm hover:shadow-md transition-shadow duration-300"
                style={{ backgroundColor: "#ffffff", borderColor: "rgba(44,62,48,0.12)" }}
              >
                <p
                  className="text-xs font-bold tracking-widest uppercase mb-4 font-['Noto_Sans_JP']"
                  style={{ color: "#9ca3af" }}
                >
                  {card.label}
                </p>
                <h3
                  className="text-[1.1rem] md:text-[1.2rem] font-['Noto_Serif_JP'] font-bold leading-snug mb-3"
                  style={{ color: "#1a1a1a" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-[0.9rem] font-['Noto_Sans_JP'] leading-relaxed mb-6"
                  style={{ color: "#4a4a4a" }}
                >
                  {card.body}
                </p>
                <span
                  className="text-[0.85rem] font-['Noto_Sans_JP'] font-bold inline-flex items-center gap-1 transition-colors duration-200 group-hover:text-[#2C3E30]"
                  style={{ color: "#9ca3af" }}
                >
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
            ツールを入れることが、ゴールではありません。
          </p>
          <p
            className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide"
            style={{ color: "#4a4a4a" }}
          >
            現場にある知恵を整理し、誰か一人に頼らなくても、
            <br className="hidden md:block" />
            業務と判断が無理なく続いていく状態をつくります。
          </p>
        </motion.div>

      </div>
    </section>
  );
}
