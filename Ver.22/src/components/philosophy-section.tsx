import React from "react";
import { motion } from "framer-motion";

const VIEWPORT = { once: true, margin: "-80px" } as const;

function anim(delay: number) {
  return {
    initial:     { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    VIEWPORT,
    transition:  { duration: 0.6, delay: delay / 1000, ease: "easeOut" },
  } as const;
}

const pillars = [
  {
    icon: "fas fa-stairs",
    title: "小さく始め、確実に変える",
    body: "大規模な改革よりも、まずは現場で機能する小さな成功を。無理なく続く改善こそ、本当のDXだと考えています。",
  },
  {
    icon: "fas fa-puzzle-piece",
    title: "AIは魔法ではない",
    body: "生成AIは現場を理解し、構造化し、運用設計して初めて力を発揮します。私たちは「導入」だけに終わらず、「現場が自然に使い続ける状態」を設計します。",
  },
  {
    icon: "fas fa-hands-helping",
    title: "現場から逃げない",
    body: `私たちは、提案だけで終わるDXは行いません。現場に入り、運用が定着し、"仕組みが回る"まで伴走します。`,
  },
];

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">

        <div className="text-center mb-20">
          <motion.span
            {...anim(0)}
            className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-4"
          >
            私たちの考え方
          </motion.span>
          <motion.h3
            {...anim(150)}
            className="text-[1.35rem] md:text-[1.75rem] font-['Noto_Serif_JP'] font-bold leading-snug"
            style={{ color: "#1a1a1a" }}
          >
            「提案」だけではなく、現場に定着するところまで「責任」を持つ。
            <br />
            それが、NDLの考える「本当のDX」です。
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              {...anim(i * 200)}
              className="text-center group cursor-default"
            >
              <div className="w-16 h-16 mx-auto bg-[#F5F7F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2C3E30] transition-colors duration-500 shadow-sm group-hover:shadow-md">
                <i className={`${p.icon} text-2xl text-[#2C3E30] group-hover:text-white transition-colors duration-500`} />
              </div>
              <h4 className="text-lg font-bold mb-4 font-['Noto_Serif_JP'] text-[#2C3E30] group-hover:text-[#D4AF37] transition-colors duration-300">
                {p.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed text-justify group-hover:text-[#2C3E30] transition-colors duration-300">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
