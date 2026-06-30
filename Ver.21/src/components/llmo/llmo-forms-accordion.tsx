"use client";

import React, { useState } from "react";

const forms = [
  {
    num: "壱",
    title: "自分を知る",
    definition: "自社にしかない歴史・動機・こだわりを、自分たちの言葉で言語化することである。",
    desc: "まず、会社の歴史や仕事への思いを整理します。きれいな文章にする必要はありません。自分たちが何者なのかを、自分たちの言葉で見つけることから始めます。",
    questions: [
      "会社の歴史を300文字で書いてみる",
      "なぜ今の仕事をしているのかを書く",
      "自社のこだわりを10個書き出す",
    ],
  },
  {
    num: "弐",
    title: "経験を掘る",
    definition: "成功談ではなく、肝が冷えた失敗談と、お客さんが喜んだ瞬間を言葉にすることである。",
    desc: "現場で起きた失敗や、お客様に喜ばれた経験は、競合には真似できない一次情報です。AIにも人にも届く、強い情報資産になります。",
    questions: [
      "失敗して肝が冷えた経験はありますか？",
      "お客様に喜ばれた出来事はありますか？",
      "社員やチームの強みを言葉にできますか？",
    ],
  },
  {
    num: "参",
    title: "定義する",
    definition: "「〜を目指しています」ではなく、「我が社は〇〇である」と言い切ることである。",
    desc: "掘り起こした情報をもとに、自社やサービスを言い切ります。「親切丁寧」や「高品質」だけでは伝わりません。誰の、どんな困りごとを、どう解決するのかを具体化します。",
    questions: [
      "「我が社は＊＊＊＊である」と言い切る",
      "「我が社の商品・サービスは＊＊＊＊である」と言い切る",
      "他社ではなく、自社が選ばれる理由を書く",
    ],
  },
  {
    num: "奥義",
    title: "家族に話してみる",
    definition: "家族に話して伝わらない言葉は、まだ磨かれていない。伝わるまで磨き直すことである。",
    desc: "整理した言葉を、家族や身近な人に話してみます。伝わらなければ、まだ磨けます。難しい言葉を削り、誰にでも伝わる言葉にすることもLLMO対策の一部です。",
    questions: [
      "家族に話して伝わりますか？",
      "「それってこういうこと？」と相手の言葉で返ってきますか？",
      "専門用語を使わずに説明できますか？",
    ],
  },
];

export function LlmoFormsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {forms.map((form, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={form.num}
            className={`bg-white rounded-sm border transition-colors duration-300 overflow-hidden ${
              isOpen ? "border-[#D4AF37]/50 shadow-md" : "border-gray-100 shadow-sm"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full flex flex-col gap-2 px-6 md:px-8 py-5 md:py-6 text-left"
            >
              {/* 型番号 ＋ 型名 */}
              <div className="flex items-center gap-4">
                <span
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                    isOpen
                      ? "bg-[#2C3E30] text-[#D4AF37]"
                      : "bg-[#F5F7F6] text-[#2C3E30]"
                  }`}
                >
                  {form.num}
                </span>
                <h3 className="text-base md:text-lg font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
                  {form.title}
                </h3>
              </div>

              {/* 定義文 */}
              <p className="text-sm text-gray-500 leading-relaxed pl-14">
                「{form.definition}」
              </p>

              {/* 詳しく / 閉じる */}
              <div className="flex justify-end">
                <span className="text-xs text-[#2C3E30]/60 font-bold tracking-wider">
                  {isOpen ? "閉じる ∧" : "詳しく ∨"}
                </span>
              </div>
            </button>

            <div
              className={`grid transition-all duration-500 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <p className="text-sm text-gray-600 leading-relaxed text-justify mb-5">
                    {form.desc}
                  </p>
                  <ul className="space-y-2">
                    {form.questions.map((q, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-[#2C3E30]"
                      >
                        <span className="text-[#D4AF37] font-bold shrink-0">
                          ・
                        </span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
