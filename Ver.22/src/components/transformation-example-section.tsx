import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const VIEWPORT = { once: true, margin: "-80px" } as const;

const beforeItems = [
  "複雑な関数が絡み合い、全体を把握できる人が限られている",
  "見積の作成や修正が、社長や特定の担当者に集中している",
  "難工事や例外対応の判断理由が記録されず、毎回ゼロから判断している",
];

const afterItems = [
  "入力、計算、単価情報の役割が整理され、仕組みを理解しやすくなる",
  "チームで見積を作成・確認し、必要な判断だけを社長が行える",
  "例外対応の理由が蓄積され、類似案件の判断に再利用できる",
];

const steps = [
  {
    number: "01",
    title: "整理する",
    desc: "業務の流れ、入力項目、計算ロジック、単価情報を見える化します。",
  },
  {
    number: "02",
    title: "共有する",
    desc: "特定の人だけが扱っていた仕組みを、チームで使える状態に整えます。",
  },
  {
    number: "03",
    title: "継承する",
    desc: "判断理由や例外対応を蓄積し、将来の検索やAI活用につなげます。",
  },
];

// 装飾バレット
function Bullet({ color }: { color: string }) {
  return (
    <span
      className="mt-[0.45em] w-1.5 h-1.5 rounded-full shrink-0 inline-block"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

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

  // ステップ1つ分（PC・モバイル共通構造）
  function StepItem({ step, index, isLast, textSizeClass }: {
    step: typeof steps[0];
    index: number;
    isLast: boolean;
    textSizeClass: string;
  }) {
    return (
      <motion.div {...anim(index * 200)} className="flex gap-3">
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
            style={{ backgroundColor: "#F5F7F6", border: "1px solid rgba(44,62,48,0.12)" }}
          >
            <span className="text-xs font-bold font-['Noto_Sans_JP']" style={{ color: "#2C3E30" }}>
              {step.number}
            </span>
          </div>
          {!isLast && (
            <div
              className="w-px flex-1 min-h-[16px]"
              style={{ backgroundColor: "rgba(44,62,48,0.12)" }}
              aria-hidden="true"
            />
          )}
        </div>
        <div className={`pt-1 ${!isLast ? "pb-4" : ""}`}>
          <p
            className={`font-bold font-['Noto_Serif_JP'] leading-tight mb-0.5 ${textSizeClass}`}
            style={{ color: "#1a1a1a" }}
          >
            {step.title}
          </p>
          <p
            className="text-[0.78rem] font-['Noto_Sans_JP'] leading-snug"
            style={{ color: "#4a4a4a" }}
          >
            {step.desc}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <section id="transformation" className="py-24 md:py-32 bg-[#FDFBF7]">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* ラベル + 見出し + 一文コピー */}
        <div className="text-center mb-10 md:mb-14">
          <motion.span
            {...anim(0)}
            className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-4 font-['Noto_Sans_JP']"
          >
            TRANSFORMATION MODEL
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
            className="text-[0.95rem] md:text-[1.05rem] font-['Noto_Serif_JP'] font-bold"
            style={{ color: "#2C3E30" }}
          >
            社長だけの見積Excelが、チームで動かせる資産へ。
          </motion.p>
        </div>

        {/* 導入文 */}
        <motion.div
          {...anim(250)}
          className="max-w-2xl mx-auto text-center mb-14 md:mb-20 space-y-3"
        >
          <p
            className="text-[1rem] md:text-[1.05rem] font-['Noto_Serif_JP'] leading-relaxed tracking-wider"
            style={{ color: "#1a1a1a" }}
          >
            たとえば、社長だけが扱える見積Excel。
          </p>
          <p
            className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed tracking-wide"
            style={{ color: "#4a4a4a" }}
          >
            NDLは、今ある仕組みを否定して作り直すのではなく、
            <br className="hidden md:block" />
            そこに蓄積された判断や経験を整理し、
            <br className="hidden md:block" />
            チームで使え、次の世代へ残せる仕組みへ育てます。
          </p>
        </motion.div>

        {/* ━━━ PC: Before｜Steps（中央縦積み）｜After ━━━ */}
        <div className="hidden md:flex items-stretch gap-2 lg:gap-3 mb-16 md:mb-20">

          {/* BEFORE */}
          <motion.div
            {...anim(0)}
            className="flex-1 rounded-sm px-6 py-8"
            style={{ backgroundColor: "#F5F7F6" }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-5 font-['Noto_Sans_JP']"
              style={{ color: "#9ca3af" }}
            >
              BEFORE
            </p>
            <ul className="space-y-3.5">
              {beforeItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[0.88rem] font-['Noto_Sans_JP'] leading-relaxed"
                  style={{ color: "#4a4a4a" }}
                >
                  <Bullet color="#9ca3af" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* → 矢印（Before→Steps） */}
          <div
            className="flex items-center self-center flex-shrink-0 text-[1.5rem] px-0.5"
            style={{ color: "rgba(44,62,48,0.2)" }}
            aria-hidden="true"
          >
            ›
          </div>

          {/* 3ステップ（中央縦積み） */}
          <div className="flex-shrink-0 w-44 lg:w-52 flex flex-col justify-center">
            {steps.map((step, i) => (
              <StepItem
                key={i}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
                textSizeClass="text-[0.85rem]"
              />
            ))}
          </div>

          {/* → 矢印（Steps→After） */}
          <div
            className="flex items-center self-center flex-shrink-0 text-[1.5rem] px-0.5"
            style={{ color: "rgba(44,62,48,0.2)" }}
            aria-hidden="true"
          >
            ›
          </div>

          {/* AFTER */}
          <motion.div
            {...anim(200)}
            className="flex-1 rounded-sm px-6 py-8 border shadow-sm"
            style={{ backgroundColor: "#ffffff", borderColor: "rgba(44,62,48,0.18)" }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-5 font-['Noto_Sans_JP']"
              style={{ color: "#D4AF37" }}
            >
              AFTER
            </p>
            <ul className="space-y-3.5">
              {afterItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[0.88rem] font-['Noto_Sans_JP'] leading-relaxed"
                  style={{ color: "#2C3E30" }}
                >
                  <Bullet color="#D4AF37" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ━━━ モバイル: Before → Steps → After（縦一列） ━━━ */}
        <div className="md:hidden flex flex-col gap-3 mb-14">

          {/* BEFORE */}
          <motion.div
            {...anim(0)}
            className="rounded-sm px-6 py-7"
            style={{ backgroundColor: "#F5F7F6" }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4 font-['Noto_Sans_JP']"
              style={{ color: "#9ca3af" }}
            >
              BEFORE
            </p>
            <ul className="space-y-3">
              {beforeItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[0.88rem] font-['Noto_Sans_JP'] leading-relaxed"
                  style={{ color: "#4a4a4a" }}
                >
                  <Bullet color="#9ca3af" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ↓ */}
          <div
            className="text-center text-xl"
            style={{ color: "rgba(44,62,48,0.2)" }}
            aria-hidden="true"
          >
            <i className="fas fa-chevron-down" />
          </div>

          {/* Steps */}
          <div className="px-2">
            {steps.map((step, i) => (
              <StepItem
                key={i}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
                textSizeClass="text-[0.9rem]"
              />
            ))}
          </div>

          {/* ↓ */}
          <div
            className="text-center text-xl"
            style={{ color: "rgba(44,62,48,0.2)" }}
            aria-hidden="true"
          >
            <i className="fas fa-chevron-down" />
          </div>

          {/* AFTER */}
          <motion.div
            {...anim(600)}
            className="rounded-sm px-6 py-7 border shadow-sm"
            style={{ backgroundColor: "#ffffff", borderColor: "rgba(44,62,48,0.18)" }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4 font-['Noto_Sans_JP']"
              style={{ color: "#D4AF37" }}
            >
              AFTER
            </p>
            <ul className="space-y-3">
              {afterItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[0.88rem] font-['Noto_Sans_JP'] leading-relaxed"
                  style={{ color: "#2C3E30" }}
                >
                  <Bullet color="#D4AF37" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
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
