import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { ArrowLeft } from "lucide-react";

// ── デスクトップ版データ ──────────────────────────────────────
const issues = [
  "現場写真の整理に、意外と時間がかかっている",
  "報告書や安全書類を、毎回一から手作業で作っている",
  "見積・請求・入金の情報が、Excelや紙に散らばっている",
  "協力会社との連絡が、LINE・電話・メールに分かれている",
  "ベテランや社長の判断が、その人にしか分からない",
];

const steps = [
  {
    num: "01",
    title: "整理する",
    desc: "書類・写真・連絡・見積・請求の流れを見える化します。どこに負担があるかを、一緒に確認します。",
  },
  {
    num: "02",
    title: "減らす",
    desc: "重複入力、探す時間、定型書類の作成を減らします。現場のやり方を変えずに、手間だけを軽くします。",
  },
  {
    num: "03",
    title: "補助する",
    desc: "報告書の下書き、資料作成、検索、問い合わせ対応をAIが補助します。判断と確認は、人が担います。",
  },
];

const goals = [
  "現場写真が自動で整理され、探す時間がなくなる",
  "報告書や安全書類がテンプレートで素早く作れる",
  "見積・請求・入金を一か所で把握できる",
  "連絡の内容が整理され、見落としが減る",
  "判断の基準が蓄積され、次の世代へ残せる",
];

export default function ForConstruction() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          デスクトップ版（改善モデル 02 フォーマット）
      ════════════════════════════════════════ */}
      <div className="hidden md:block min-h-screen bg-[#FDFBF7] font-['Noto_Sans_JP']">
        <Header simple />

        <main className="pt-28 pb-24">
          <div className="container mx-auto px-6 max-w-4xl">

            {/* Hero */}
            <FadeIn>
              <div className="text-center mb-16 md:mb-20">
                <span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase block mb-5 font-['Noto_Sans_JP']">
                  改善モデル 02
                </span>
                <h1
                  className="text-[1.5rem] md:text-[2.1rem] font-['Noto_Serif_JP'] font-bold leading-snug mb-8"
                  style={{ color: "#1a1a1a" }}
                >
                  散在する現場情報を、<br />会社で使い続けられる仕組みへ変える。
                </h1>
                <div className="max-w-2xl mx-auto space-y-4">
                  <p
                    className="text-[0.95rem] md:text-[1rem] font-['Noto_Serif_JP'] leading-relaxed"
                    style={{ color: "#1a1a1a" }}
                  >
                    報告書・安全書類・現場写真・連絡――<br />
                    現場にある情報は、実は会社の財産です。
                  </p>
                  <p
                    className="text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] leading-relaxed"
                    style={{ color: "#4a4a4a" }}
                  >
                    NDLは、現場のやり方を否定して作り直すのではなく、<br />
                    散らばった情報を整理し、チームで使え、<br />
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
                    よくある悩み
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
                    最初にやるのは、ツール導入ではなく「業務の棚卸し」です。<br />
                    手作業、二重入力、探す時間、属人化した判断、例外対応――<br />
                    そうした負担がどこにあるかを一緒に整理します。
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
                    現場の情報が整理・蓄積されれば、将来的には報告書の下書きや<br />
                    問い合わせ対応にAIを活用できるようになります。<br />
                    まずは、Excel・Google Workspace・クラウドなど軽量なものを、<br />
                    必要な分だけ、無理なく続けられる形で取り入れます。
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
                    現場のやり方を活かしながら、<br />
                    考えなくても回る仕組みをつくることが目的です。
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

      {/* ════════════════════════════════════════
          モバイル版（既存デザイン）
      ════════════════════════════════════════ */}
      <div className="block md:hidden min-h-screen bg-white font-['Noto_Sans_JP'] text-[#173B2C]">

        {/* ヘッダー */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-[#D9E7DE]">
          <div className="max-w-md mx-auto px-5 py-3 flex items-center justify-between">
            <button
              onClick={() => window.history.length <= 1 ? (window.location.href = "/") : window.history.back()}
              className="flex items-center gap-1.5 text-sm font-bold tracking-wide text-[#173B2C]"
            >
              <ArrowLeft className="w-4 h-4" />
              戻る
            </button>
            <p className="text-[11px] text-[#2F6B4F]">近隣企業様向けご案内</p>
          </div>
        </header>

        {/* ① 共感と問題提起 */}
        <section className="bg-[#173B2C] text-white pt-12">
          <div className="max-w-md mx-auto px-5 pt-10 pb-12">
            <p className="text-xs font-medium tracking-wide text-emerald-200 mb-3">
              建設会社・工務店・リフォーム会社の皆さまへ
            </p>
            <h1 className="text-2xl leading-snug font-bold mb-4">
              建設会社の「書類・写真・連絡」の<br />
              手作業を、少しずつ減らすご提案
            </h1>
            <p className="text-[15px] leading-relaxed text-emerald-50/90 mb-8">
              現場のやり方を大きく変えずに、報告書・安全書類・写真整理・見積まわりの負担を軽くします。
            </p>

            <div className="bg-white/5 border border-white/15 rounded-2xl p-5 mb-5">
              <p className="text-sm font-bold mb-4">こんな心当たり、ありませんか？</p>
              <ul className="space-y-3">
                {[
                  "現場写真の整理に、意外と時間がかかっている",
                  "報告書や安全書類を、毎回一から手作業で作っている",
                  "見積・請求・入金の情報が、Excelや紙に散らばっている",
                  "協力会社との連絡が、LINE・電話・メールに分かれている",
                  "ベテランや社長の判断が、その人にしか分からない",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-300/90" />
                    <span className="text-[14px] leading-relaxed text-emerald-50/90">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[13px] leading-relaxed text-emerald-100/80 mb-6">
              ひとつでも当てはまれば、お力になれることがあるかもしれません。
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="/#contact"
                className="block text-center rounded-full bg-white text-[#173B2C] font-bold text-[15px] py-3.5 shadow-sm active:scale-[0.98] transition"
              >
                30分だけ、情報交換する
              </a>
              <a
                href="#about"
                className="block text-center rounded-full border border-white/40 text-white text-[14px] py-3 active:scale-[0.98] transition"
              >
                改善できそうな作業を相談する
              </a>
            </div>
          </div>
        </section>

        {/* ② NDLの進め方 */}
        <section id="about" className="bg-[#F6FAF7]">
          <div className="max-w-md mx-auto px-5 pt-12 pb-12">

            <p className="text-xs font-bold text-[#2F6B4F] mb-2">NDLの進め方</p>
            <h2 className="text-xl leading-snug font-bold text-[#173B2C] mb-4">
              最初にやるのは、ツール導入ではなく<br />「業務の棚卸し」です
            </h2>
            <p className="text-[14px] leading-relaxed text-gray-700 mb-3">
              今のやり方を否定するつもりはありません。まずは書類・写真・連絡・見積・請求の流れを、一緒に見える化するところから始めます。
            </p>
            <p className="text-[14px] leading-relaxed text-gray-700 mb-10">
              手作業、二重入力、探す時間、属人化した判断、例外対応――そうした負担がどこにあるかを整理したうえで、Excel・Google Workspace・クラウド・AIなどを、必要な分だけ、無理なく続けられる形で取り入れます。
            </p>

            <div className="space-y-4">
              {[
                {
                  num: 1,
                  label: "整理する",
                  desc: "書類・写真・連絡・見積・請求の流れを見える化します。",
                  asis: "情報がバラバラで、全体像が見えにくい",
                  tobe: "どこに負担があるか、誰でも分かる",
                },
                {
                  num: 2,
                  label: "減らす",
                  desc: "重複入力、探す時間、定型書類の作成を減らします。",
                  asis: "同じ内容を何度も入力・転記している",
                  tobe: "入力は一度、書類はテンプレート化",
                },
                {
                  num: 3,
                  label: "補助する",
                  desc: "報告書の下書き、資料作成、検索、問い合わせ対応をAIが補助します。",
                  asis: "資料作成や問い合わせ対応を一人で抱えている",
                  tobe: "下書きはAI、確認と判断は人が担う",
                },
              ].map((phase) => (
                <div key={phase.num} className="bg-white rounded-2xl border border-[#D9E7DE] p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#173B2C] text-white text-xs font-bold shrink-0">
                      {phase.num}
                    </span>
                    <p className="font-bold text-[#173B2C] text-[15px]">{phase.label}</p>
                  </div>
                  <p className="text-[13px] leading-relaxed text-gray-600 mb-4">{phase.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#F6FAF7] rounded-xl p-3">
                      <p className="text-[10px] font-bold text-gray-400 mb-1">As-Is（現状）</p>
                      <p className="text-[12.5px] leading-snug text-gray-700">{phase.asis}</p>
                    </div>
                    <div className="bg-[#EAF3EC] rounded-xl p-3">
                      <p className="text-[10px] font-bold text-[#2F6B4F] mb-1">To-Be（改善後）</p>
                      <p className="text-[12.5px] leading-snug text-[#173B2C]">{phase.tobe}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ③ 具体例 ＋ CTA ＋ 会社情報 */}
        <section className="bg-white">
          <div className="max-w-md mx-auto px-5 pt-12 pb-8">

            <p className="text-xs font-bold text-[#2F6B4F] mb-2">はじめの一歩</p>
            <h2 className="text-xl leading-snug font-bold text-[#173B2C] mb-6">
              たとえば、こんな作業から<br />始められます
            </h2>

            <ul className="space-y-2.5 mb-10">
              {[
                "現場写真の自動整理",
                "報告書の下書き作成",
                "安全書類・定型書類の作成補助",
                "近隣説明資料のたたき台作成",
                "見積・請求・入金状況の一覧化",
                "協力会社との連絡内容の整理・要約",
                "過去案件・施工事例の検索性改善",
                "ホームページ・採用ページ・お問い合わせ導線の見直し",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-[#F6FAF7] rounded-xl p-3.5">
                  <span className="mt-0.5 text-[#2F6B4F] text-sm shrink-0">・</span>
                  <span className="text-[13.5px] leading-relaxed text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA ボックス */}
            <div id="contact" className="bg-[#173B2C] rounded-2xl p-6 mb-10">
              <h3 className="text-white font-bold text-[17px] leading-snug mb-3">
                まずは30分、情報交換だけでも結構です
              </h3>
              <p className="text-[13.5px] leading-relaxed text-emerald-50/85 mb-2">
                近隣の建設会社様向けに、業務改善・AI活用・Webまわりのご相談を承っています。
              </p>
              <p className="text-[13.5px] leading-relaxed text-emerald-50/85 mb-6">
                無理な営業はいたしません。必要な時に、お気軽にお声がけください。
              </p>
              <a
                href="/#contact"
                className="block text-center rounded-full bg-white text-[#173B2C] font-bold text-[15px] py-3.5 shadow-sm active:scale-[0.98] transition mb-3"
              >
                30分相談してみる
              </a>
              <p className="text-center text-[11px] text-emerald-100/70">
                A4資料またはお名刺のQRからお進みいただけます
              </p>
            </div>

            {/* 会社情報 */}
            <div className="border-t border-[#D9E7DE] pt-6 pb-4">
              <p className="text-[13px] font-bold text-[#173B2C] mb-1">Neural Design Lab</p>
              <p className="text-[12px] text-gray-500 mb-3">代表：藏重彰三</p>
              <p className="text-[12.5px] leading-relaxed text-[#2F6B4F] font-medium">
                現場のやり方を活かしながら、<br />考えなくても回る仕組みをつくります。
              </p>
            </div>

          </div>
        </section>

        {/* モバイル固定CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-[#D9E7DE] px-5 py-3 z-50">
          <a
            href="/#contact"
            className="block text-center rounded-full bg-[#173B2C] text-white font-bold text-[14px] py-3 active:scale-[0.98] transition"
          >
            30分だけ、情報交換する
          </a>
        </div>
        <div className="h-16" />

      </div>
    </>
  );
}
