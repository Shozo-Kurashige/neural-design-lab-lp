"use client";

import React, { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

const questions = [
  "会社の歴史や創業の経緯を、自社サイトに書いていますか？",
  "自社の商品やサービスを、一文で説明できますか？",
  "お客様によく聞かれる質問を、FAQとして整理していますか？",
  "失敗談や改善事例など、自社にしかない経験を発信していますか？",
  "社長や現場のこだわりを、具体的な言葉にしていますか？",
  "ブログやお知らせを、継続的に更新できていますか？",
];

type Answer = boolean | null;

function getResult(yesCount: number) {
  if (yesCount <= 2) {
    return {
      label: "まずは一次情報の棚卸しから",
      desc: "AI検索対策の前に、まず自社の歴史、こだわり、失敗談、お客様の声などを掘り起こす段階です。技術対策より先に、社長や現場の中にある言葉を整理しましょう。",
    };
  }
  if (yesCount <= 4) {
    return {
      label: "コンテンツ設計に進める段階",
      desc: "自社の情報の種はすでにあります。次は、それをFAQ、ブログ、サービスページ、代表メッセージなどに整理し、AIにも人にも伝わる構造にしていく段階です。",
    };
  }
  return {
    label: "LLMO強化・継続改善の段階",
    desc: "すでに発信の土台があります。次は、AI検索での見え方、内部リンク、FAQ、構造化データ、継続発信の設計を見直し、情報資産として育てていく段階です。",
  };
}

export function LlmoDiagnosis() {
  const [answers, setAnswers] = useState<Answer[]>(
    Array(questions.length).fill(null),
  );

  const allAnswered = answers.every((a) => a !== null);
  const yesCount = answers.filter((a) => a === true).length;
  const result = allAnswered ? getResult(yesCount) : null;

  const handleAnswer = (index: number, value: boolean) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(null));
    document
      .getElementById("diagnosis")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white rounded-sm border border-[#2C3E30]/10 shadow-sm p-6 md:p-10">
      <div className="space-y-5">
        {questions.map((q, index) => {
          const answer = answers[index];
          return (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-5 border-b border-gray-100 last:border-b-0 last:pb-0"
            >
              <p className="text-sm md:text-[15px] text-[#2C3E30] leading-relaxed flex-1">
                <span className="text-[#D4AF37] font-bold mr-2">
                  Q{index + 1}.
                </span>
                {q}
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleAnswer(index, true)}
                  className={`px-5 py-2 text-sm font-bold rounded-sm border transition-colors ${
                    answer === true
                      ? "bg-[#2C3E30] text-white border-[#2C3E30]"
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#2C3E30]/40"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleAnswer(index, false)}
                  className={`px-5 py-2 text-sm font-bold rounded-sm border transition-colors ${
                    answer === false
                      ? "bg-gray-200 text-gray-600 border-gray-300"
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#2C3E30]/40"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          result ? "grid-rows-[1fr] mt-8 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {result && (
            <div className="pt-8 border-t border-[#D4AF37]/30">
              <div className="bg-[#2C3E30] text-white rounded-sm p-6 md:p-8">
                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase block mb-2">
                  診断結果（Yes: {yesCount} / {questions.length}）
                </span>
                <h3 className="text-xl md:text-2xl font-['Noto_Serif_JP'] font-bold mb-3">
                  {result.label}
                </h3>
                <p className="text-sm leading-relaxed text-white/85">
                  {result.desc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href="/#contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-white text-sm font-bold rounded-sm hover:bg-[#c19f30] transition-colors"
                >
                  診断結果をもとに相談する
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#2C3E30] text-sm font-bold rounded-sm border border-gray-200 hover:border-[#2C3E30]/40 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  もう一度診断する
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
