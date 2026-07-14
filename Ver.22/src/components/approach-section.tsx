import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HeroBg } from "@/components/hero-bg";

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
  const ref = useRef<HTMLDivElement>(null);
  // セクション上端が画面に入ったら一度だけ発火
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="relative w-full py-24 md:py-32">
      <HeroBg overlay="rgba(255,255,255,0.90)" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">

        <h2 className="text-[1.35rem] md:text-[1.9rem] font-['Noto_Serif_JP'] font-bold leading-snug text-center mb-14 md:mb-20"
            style={{ color: "#1a1a1a" }}>
          まず、現場をほどきます。
        </h2>

        <div className="flex flex-col gap-4 md:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: i * 0.3, ease: "easeOut" }}
              className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 rounded-sm px-6 py-5 md:px-8 md:py-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-default"
              style={{ backgroundColor: "#FDFBF7" }}
            >
              <p className="shrink-0 md:w-24 text-[1.15rem] md:text-[1.25rem] font-['Noto_Serif_JP'] font-bold tracking-wider text-center md:text-left text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#D4AF37]">
                {step.name}
              </p>
              <p className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide text-center md:text-left"
                 style={{ color: "#4a4a4a" }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
