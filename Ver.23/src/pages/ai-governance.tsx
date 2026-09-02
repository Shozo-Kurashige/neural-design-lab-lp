import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";

export default function AiGovernance() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3E30] font-['Noto_Sans_JP'] selection:bg-[#D4AF37] selection:text-white">
      <Header simple />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <FadeIn>
              <h1 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-6">
                AIガバナンスに関するNDLの思想と方針
              </h1>
              <p className="text-gray-600">
                2026年6月版　Neural Design Lab（NDL）
              </p>
            </FadeIn>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-sm border border-[#2C3E30]/10 space-y-10 shadow-sm">

            <section>
              <h2 className="text-xl font-['Noto_Serif_JP'] font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">
                1. はじめに
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 text-justify mb-3">
                生成AIの急速な普及にともない、EU・米国・日本をはじめとする各国でAIの利活用に関するルール整備が加速しています。特に法律・医療・金融・雇用など、人の判断や権利に影響し得る領域では、AIの透明性・安全性・説明責任に関する要件が国際的な標準となりつつあります。
              </p>
              <p className="text-sm leading-relaxed text-gray-700 text-justify">
                NDLは、この動向を常に把握し、必要に応じて本ポリシーを改訂します。プロダクトの品質と責任担保のために、AI関連の最新情報のキャッチアップは、NDLの継続的な責務と位置づけています。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-['Noto_Serif_JP'] font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">
                2. NDLのAIに対する基本思想
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 text-justify mb-3">
                NDLはAIを「万能な答えを出す存在」とは捉えていません。
              </p>
              <p className="text-sm leading-relaxed text-gray-700 text-justify mb-3">
                AIは、人間の判断を補助し、現場の負荷を軽減し、情報を整理するための道具です。同時に、誤りを犯す可能性があり、文脈を読み違える可能性があり、感情を持たない存在でもあります。
              </p>
              <p className="text-sm leading-relaxed text-gray-700 text-justify">
                だからこそ、AIを適切にコントロールする「人間の設計」が不可欠です。NDLが関わるすべてのプロダクトにおいて、AIは主役ではなく、人間の判断と信頼を支える補助線として位置づけます。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-['Noto_Serif_JP'] font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">
                3. NDLが設計で守る5つの原則
              </h2>
              <div className="space-y-6">
                {[
                  {
                    num: "1",
                    title: "説明できること",
                    body: "AIがどの情報を参照し、どう判断したかを、後から確認できる設計にします。ブラックボックスにしません。",
                  },
                  {
                    num: "2",
                    title: "記録を残すこと",
                    body: "入力・出力・判断の過程を必要な範囲でログとして保持します。何かあったとき、説明できる状態を維持します。",
                  },
                  {
                    num: "3",
                    title: "人間が最後に判断すること",
                    body: "重要な決定は、AIだけで完結させません。必ず人間が確認・判断できる構造にします。",
                  },
                  {
                    num: "4",
                    title: "安全な範囲を設計すること",
                    body: "AIが回答してよい範囲を明確に定め、危険・緊急・専門的判断が必要な内容は、人への引き継ぎを優先します。",
                  },
                  {
                    num: "5",
                    title: "過信しないこと",
                    body: "特定のAIモデルの性能に依存した設計はしません。何のために・どこまで・どう使うかを、つねに人間が決めます。",
                  },
                ].map((item) => (
                  <div key={item.num} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2C3E30] text-[#D4AF37] font-bold text-sm flex items-center justify-center">
                      {item.num}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#2C3E30] mb-1">{item.title}</p>
                      <p className="text-sm leading-relaxed text-gray-700 text-justify">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-['Noto_Serif_JP'] font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">
                4. プロダクト設計への適用
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 text-justify mb-3">
                NDLが関わるプロダクトは、上記の思想と原則に基づき、AIとの接続を含む周辺設計全体にわたって、高品位のガバナンスをもって構築にあたります。
              </p>
              <p className="text-sm leading-relaxed text-gray-700 text-justify">
                「使えるから使う」ではなく、「なぜ使うか・どこで止めるか」を設計の起点に置くこと。それがNDLの、AIとの向き合い方です。
              </p>
            </section>

            <div className="border-t border-[#2C3E30]/10 pt-6 text-xs text-gray-500 leading-relaxed text-justify">
              <p>
                本ポリシーは、国内外のAIガバナンス動向を踏まえ、随時改訂します。
                <br />
                最終改訂：2026年6月　　Neural Design Lab　藏重彰三
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer simple />
    </div>
  );
}
