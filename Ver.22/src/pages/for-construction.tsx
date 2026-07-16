import React, { useState } from "react";

export default function ForConstruction() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-['Noto_Sans_JP'] text-[#173B2C]">

      {/* ヘッダー */}
      <header className="w-full bg-white border-b border-[#D9E7DE]">
        <div className="max-w-md md:max-w-5xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between">
          <a href="/" className="text-sm font-bold tracking-wide text-[#173B2C]">
            Neural Design Lab
          </a>
          <p className="text-[11px] text-[#2F6B4F]">近隣企業様向けご案内</p>
        </div>
      </header>

      {/* ① 共感と問題提起 */}
      <section className="bg-[#173B2C] text-white">
        <div className="max-w-md md:max-w-5xl mx-auto px-5 md:px-8 pt-10 pb-12 md:pt-16 md:pb-20">
          <div className="md:flex md:gap-16 md:items-start">

            {/* 左：ラベル・見出し・導入文 */}
            <div className="md:flex-1">
              <p className="text-xs font-medium tracking-wide text-emerald-200 mb-3">
                建設会社・工務店・リフォーム会社の皆さまへ
              </p>
              <h1 className="text-2xl md:text-3xl md:leading-snug leading-snug font-bold mb-4">
                建設会社の「書類・写真・連絡」の<br className="md:hidden" />
                手作業を、少しずつ減らすご提案
              </h1>
              <p className="text-[15px] md:text-base leading-relaxed text-emerald-50/90 md:mb-0 mb-8">
                現場のやり方を大きく変えずに、報告書・安全書類・写真整理・見積まわりの負担を軽くします。
              </p>
            </div>

            {/* 右：チェックリスト・注記・CTA */}
            <div className="md:w-[380px] md:shrink-0 md:mt-0">
              <div className="bg-white/5 border border-white/15 rounded-2xl p-5 mb-5 md:mb-4">
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

          </div>
        </div>
      </section>

      {/* ② NDLの進め方 */}
      <section id="about" className="bg-[#F6FAF7]">
        <div className="max-w-md md:max-w-5xl mx-auto px-5 md:px-8 pt-12 pb-12">

          <p className="text-xs font-bold text-[#2F6B4F] mb-2">NDLの進め方</p>
          <h2 className="text-xl md:text-2xl leading-snug font-bold text-[#173B2C] mb-4">
            最初にやるのは、ツール導入ではなく<br className="md:hidden" />「業務の棚卸し」です
          </h2>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-gray-700 mb-3">
            今のやり方を否定するつもりはありません。まずは書類・写真・連絡・見積・請求の流れを、一緒に見える化するところから始めます。
          </p>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-gray-700 mb-10">
            手作業、二重入力、探す時間、属人化した判断、例外対応――そうした負担がどこにあるかを整理したうえで、Excel・Google Workspace・クラウド・AIなどを、必要な分だけ、無理なく続けられる形で取り入れます。
          </p>

          <div className="md:grid md:grid-cols-3 md:gap-5">
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
              <div key={phase.num} className="bg-white rounded-2xl border border-[#D9E7DE] p-5 mb-4 md:mb-0 shadow-sm">
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
        <div className="max-w-md md:max-w-5xl mx-auto px-5 md:px-8 pt-12 pb-8">

          <p className="text-xs font-bold text-[#2F6B4F] mb-2">はじめの一歩</p>
          <h2 className="text-xl md:text-2xl leading-snug font-bold text-[#173B2C] mb-6">
            たとえば、こんな作業から<br className="md:hidden" />始められます
          </h2>

          <ul className="space-y-2.5 md:space-y-0 md:grid md:grid-cols-2 md:gap-2.5 mb-10">
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
          <div id="contact" className="bg-[#173B2C] rounded-2xl p-6 mb-10 md:max-w-2xl md:mx-auto">
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
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur border-t border-[#D9E7DE] px-5 py-3 z-50">
        <a
          href="/#contact"
          className="block text-center rounded-full bg-[#173B2C] text-white font-bold text-[14px] py-3 active:scale-[0.98] transition"
        >
          30分だけ、情報交換する
        </a>
      </div>
      <div className="h-16 md:hidden" />

    </div>
  );
}
