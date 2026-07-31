import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const textCls = "text-[1.35rem] md:text-[2.15rem] leading-relaxed md:leading-loose tracking-wider font-bold font-['M_PLUS_1p'] text-[#4e454a] md:text-[#7d7d7d]";

export function NdlAboutSection() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const margin = typeof window !== "undefined" && window.innerWidth < 768 ? "-80px" : "-300px";
  const isInView = useInView(ref, { once: true, margin });

  return (
    <section className="w-full py-24 md:py-48 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          ref={ref}
          animate={{
            opacity: isInView ? 1 : 0,
            y:       isInView ? 0 : (prefersReduced ? 0 : 20),
          }}
          transition={{ duration: prefersReduced ? 0.01 : 0.6, ease: "easeOut" }}
          className="space-y-6 md:space-y-8"
        >
          {/* ラベル */}
          <span className="block text-[#D4AF37] font-bold tracking-widest text-sm font-['M_PLUS_1p']">
            NDLとは
          </span>

          {/* 本文1 */}
          <p className={textCls}>
            <span className="block">
              大きすぎる改革でも、<br className="block md:hidden" />
              小手先の効率化でもない。
            </span>
            <span className="block">
              その会社、その現場、<br className="block md:hidden" />
              その人たちに合った、
            </span>
            <span className="block">ちょうどいい改善を考えます。</span>
          </p>

          {/* 本文2 */}
          <p className={textCls}>
            経営と現場と技術のあいだに、<br />
            「ちょうどいい」を。
          </p>

          {/* ロゴテキスト */}
          <p className="text-[1.15rem] md:text-[1.3rem] tracking-widest font-bold font-['M_PLUS_1p'] text-[#4e454a] md:text-[#7d7d7d]">
            Neural Design Lab
          </p>
        </motion.div>
      </div>
    </section>
  );
}
