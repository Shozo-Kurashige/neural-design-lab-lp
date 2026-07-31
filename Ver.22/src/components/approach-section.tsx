import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const VIEWPORT = { once: true, margin: "-100px" } as const;

const steps = [
  {
    name: "聴く。",
    desc: "現場で何が起きているかを、担当者や社長の言葉から拾います。",
  },
  {
    name: "ほどく。",
    desc: "属人化や例外処理が、どこで積み重なっているかを見ます。",
  },
  {
    name: "分ける。",
    desc: "人が判断すべきこと、仕組みにできることを分けます。",
  },
  {
    name: "試す。",
    desc: "小さく試し、無理なく回るかを現場で確かめます。",
  },
  {
    name: "残す。",
    desc: "うまくいった流れを、誰か一人の頑張りに頼らない形で残します。",
  },
];

export function ApproachSection() {
  const prefersReduced = useReducedMotion();

  function anim(delay: number) {
    return {
      initial:     { opacity: 0, y: prefersReduced ? 0 : 10 },
      whileInView: { opacity: 1, y: 0 },
      viewport:    VIEWPORT,
      transition:  {
        duration: prefersReduced ? 0.01 : 0.35,
        delay:    prefersReduced ? 0    : delay / 1000,
        ease:     "easeOut",
      },
    } as const;
  }

  return (
    <section id="approach" className="w-full py-24 md:py-32 bg-[#FDFBF7]">

      <div className="max-w-4xl mx-auto px-6 md:px-12">

        {/* ラベル */}
        <motion.span
          {...anim(0)}
          className="block text-center text-[#D4AF37] font-bold tracking-widest text-sm font-['Noto_Sans_JP'] mb-5"
        >
          まず、やること
        </motion.span>

        {/* 見出し */}
        <motion.h2
          {...anim(100)}
          className="text-[1.35rem] md:text-[1.9rem] font-['Noto_Serif_JP'] font-bold leading-snug text-center mb-14 md:mb-20"
          style={{ color: "#1a1a1a" }}
        >
          最初に、現場をほどきます。
        </motion.h2>

        {/* 5項目 — 見出しから1秒後にフェードイン */}
        <div className="flex flex-col gap-4 md:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              {...anim(200 + i * 60)}
              className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 rounded-sm px-6 py-5 md:px-8 md:py-6 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-default"
              style={{ backgroundColor: "#ffffff", willChange: "opacity, transform" }}
            >
              <p
                className="shrink-0 md:w-28 text-[1.2rem] md:text-[1.35rem] font-['Noto_Serif_JP'] font-bold tracking-wider text-left border-l-4 pl-3 transition-colors duration-300 text-[#1a1a1a] group-hover:text-[#D4AF37]"
                style={{ borderColor: "#D4AF37" }}
              >
                {step.name}
              </p>
              <p
                className="text-[0.95rem] md:text-[1.05rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide text-left"
                style={{ color: "#4a4a4a" }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
