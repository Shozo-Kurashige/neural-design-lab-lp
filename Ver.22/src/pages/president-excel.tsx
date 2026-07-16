import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";

const issues = [
  "複雑な関数が絡み合い、全体を把握できる人が限られている",
  "見積の作成や修正が、社長や特定担当者に集中している",
  "単価や材料情報が、複数のシートやファイルに散らばっている",
  "難工事や例外対応の判断理由が記録されず、毎回ゼロから判断している",
];

const steps = [
  {
    num: "01",
    title: "整理する",
    desc: "業務の流れ、入力項目、計算ロジック、単価情報を見える化します。",
  },
  {
    num: "02",
    title: "共有する",
    desc: "特定の人だけが扱っていた仕組みを、チームで使える状態に整えます。",
  },
  {
    num: "03",
    title: "継承する",
    desc: "判断理由や例外対応を蓄積し、将来の検索やAI活用につなげます。",
  },
];

const goals = [
  "入力、計算、単価情報の役割が整理され、仕組みを理解しやすくなる",
  "チームで見積を作成・確認し、必要な判断だけを社長が行える",
  "単価、材料、過去案件を一元的に参照できる",
  "例外対応の理由が蓄積され、類似案件の判断に再利用できる",
];

export default function PresidentExcel() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-['Noto_Sans_JP']">
      <Header simple />

      <main className="pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">

          {/* Hero */}
          <FadeIn>
            <div className="text-center mb-16 md:mb-20">
              <span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase block mb-5 font-['Noto_Sans_JP']">
                改善モデル 01
              </span>
              <h1
                className="text-[1.5rem] md:text-[2.1rem] font-['Noto_Serif_JP'] font-bold leading-snug mb-8"
                style={{ color: "#1a1a1a" }}
              >
                社長だけが扱える見積Excelを、<br className="hidden md:block" />会社の資産へ変える。
              </h1>
              <div className="max-w-2xl mx-auto space-y-4">
                <p
                  className="text-[0.95rem] md:text-[1rem] font-['Noto_Serif_JP'] leading-relaxed"
                  style={{ color: "#1a1a1a" }}
                >
                  長年使われてきた見積Excelには、<br className="hidden md:block" />
                  単価、判断基準、例外対応、現場の経験が蓄積されています。
                </p>
                <p
                  className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed"
                  style={{ color: "#4a4a4a" }}
                >
                  NDLは、それを否定して作り直すのではなく、<br className="hidden md:block" />
                  中にある知恵を整理し、チームで使え、<br className="hidden md:block" />
                  次の世代へ残せる仕組みへ育てます。
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-10 md:space-y-14">

            {/* 現状の課題 */}
            <FadeIn>
              <section className="bg-white rounded-sm border px-7 md:px-10 py-9 shadow-sm" style={{ borderColor: "rgba(44,62,48,0.10)" }}>
                <h2
                  className="text-[1rem] md:text-[1.1rem] font-['Noto_Serif_JP'] font-bold mb-6 border-l-4 pl-4"
                  style={{ color: "#1a1a1a", borderColor: "#D4AF37" }}
                >
                  現状の課題
                </h2>
                <ul className="space-y-3.5">
                  {issues.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[0.9rem] font-['Noto_Sans_JP'] leading-relaxed"
                      style={{ color: "#4a4a4a" }}
                    >
                      <span className="mt-[0.45em] w-1.5 h-1.5 rounded-full shrink-0 bg-[#9ca3af]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>

            {/* NDLの改善ステップ */}
            <FadeIn>
              <section>
                <h2
                  className="text-[1rem] md:text-[1.1rem] font-['Noto_Serif_JP'] font-bold mb-3 border-l-4 pl-4"
                  style={{ color: "#1a1a1a", borderColor: "#D4AF37" }}
                >
                  NDLの改善ステップ
                </h2>
                <p
                  className="text-[0.88rem] font-['Noto_Sans_JP'] leading-relaxed mb-6"
                  style={{ color: "#4a4a4a" }}
                >
                  いきなりAI化するのではなく、段階的に現場を整えます。
                </p>
                <div className="space-y-3">
                  {steps.map((step, i) => (
                    <div
                      key={i}
                      className="flex gap-5 items-start bg-white rounded-sm border px-6 py-5 shadow-sm"
                      style={{ borderColor: "rgba(44,62,48,0.10)" }}
                    >
                      <div
                        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#F5F7F6", border: "1px solid rgba(44,62,48,0.12)" }}
                      >
                        <span className="text-xs font-bold font-['Noto_Sans_JP']" style={{ color: "#2C3E30" }}>
                          {step.num}
                        </span>
                      </div>
                      <div className="pt-0.5">
                        <p className="text-[0.95rem] font-['Noto_Serif_JP'] font-bold mb-1" style={{ color: "#1a1a1a" }}>
                          {step.title}
                        </p>
                        <p className="text-[0.88rem] font-['Noto_Sans_JP'] leading-relaxed" style={{ color: "#4a4a4a" }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* 目指す状態 */}
            <FadeIn>
              <section className="bg-white rounded-sm border px-7 md:px-10 py-9 shadow-sm" style={{ borderColor: "rgba(44,62,48,0.10)" }}>
                <h2
                  className="text-[1rem] md:text-[1.1rem] font-['Noto_Serif_JP'] font-bold mb-6 border-l-4 pl-4"
                  style={{ color: "#1a1a1a", borderColor: "#D4AF37" }}
                >
                  目指す状態
                </h2>
                <ul className="space-y-3.5">
                  {goals.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[0.9rem] font-['Noto_Sans_JP'] leading-relaxed"
                      style={{ color: "#2C3E30" }}
                    >
                      <span className="mt-[0.45em] w-1.5 h-1.5 rounded-full shrink-0 bg-[#D4AF37]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>

            {/* 将来のAI活用 */}
            <FadeIn>
              <section>
                <h2
                  className="text-[1rem] md:text-[1.1rem] font-['Noto_Serif_JP'] font-bold mb-4 border-l-4 pl-4"
                  style={{ color: "#1a1a1a", borderColor: "#D4AF37" }}
                >
                  将来のAI活用
                </h2>
                <p
                  className="text-[0.9rem] font-['Noto_Sans_JP'] leading-relaxed"
                  style={{ color: "#4a4a4a" }}
                >
                  判断理由や例外対応が蓄積されれば、<br />
                  将来的には過去の類似案件を検索したり、<br />
                  見積の下書きや判断補助にAIを使えるようになります。
                </p>
              </section>
            </FadeIn>

            {/* 結論 */}
            <FadeIn>
              <section className="border-t pt-10" style={{ borderColor: "rgba(44,62,48,0.10)" }}>
                <p
                  className="text-[1rem] md:text-[1.05rem] font-['Noto_Serif_JP'] font-bold leading-relaxed tracking-wider mb-3"
                  style={{ color: "#1a1a1a" }}
                >
                  ツールを入れることが、ゴールではありません。
                </p>
                <p
                  className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed"
                  style={{ color: "#4a4a4a" }}
                >
                  社長の経験を奪うのではなく、<br className="hidden md:block" />
                  会社の中で使い続けられる形へ変えることが目的です。
                </p>
              </section>
            </FadeIn>

            {/* CTA */}
            <FadeIn>
              <section className="text-center pt-4">
                <p
                  className="text-[0.9rem] font-['Noto_Sans_JP'] mb-6"
                  style={{ color: "#4a4a4a" }}
                >
                  まずは、現場の状況をお聞かせください。
                </p>
                <a
                  href="/#contact"
                  className="inline-block px-10 py-4 rounded-sm font-['Noto_Sans_JP'] font-bold text-[0.95rem] transition-opacity duration-200 hover:opacity-80"
                  style={{ backgroundColor: "#2C3E30", color: "#ffffff" }}
                >
                  初回60分の壁打ちを予約する
                </a>
              </section>
            </FadeIn>

          </div>
        </div>
      </main>

      <Footer simple />
    </div>
  );
}
