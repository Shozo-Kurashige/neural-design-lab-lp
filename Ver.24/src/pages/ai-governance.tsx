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
                2026年10月版　Neural Design Lab（NDL）
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
                NDLは、国内外のルールや技術の動向を定期的に確認し、必要に応じて本ポリシーを見直します。プロダクトの品質と責任担保のために、AI関連の最新情報のキャッチアップは、NDLの継続的な責務と位置づけています。
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
              <p className="text-sm leading-relaxed text-gray-700 text-justify mb-3">
                だからこそ、AIを適切にコントロールする「人間の設計」が不可欠です。NDLが関わる場面において、AIは主役ではなく、人間の判断と信頼を支える補助線として位置づけます。
              </p>
              <p className="text-sm leading-relaxed text-gray-700 text-justify">
                AIの安全な活用は、導入前の業務整理から始まります。NDLは、業務の目的、情報の所在、人が行う判断、例外的な対応を確認したうえで、AIに任せる範囲と任せない範囲を設計します。この導入前の整理を、NDLでは「前捌き」と呼んでいます。
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
                    body: "AIの内部の判断をすべて説明できるとは考えません。そのかわり、何のために、どの情報を使い、どこまで任せているのかを、人が後から説明できる設計にします。",
                  },
                  {
                    num: "2",
                    title: "記録を残すこと",
                    body: "入力・参照した資料・設定・出力・人の確認や修正を、必要な範囲で記録します。記録も守るべき情報として扱い、保存期間と閲覧できる人を、情報の性質や契約条件に応じて決めます。何かあったとき、説明できる状態を維持します。",
                  },
                  {
                    num: "3",
                    title: "人間が最後に判断すること",
                    body: "重要な決定は、AIだけで完結させません。人の確認が必要な場面を、影響の大きさと取り消しやすさで見極め、確認が形だけにならない設計にします。最終的な判断と責任は人が担います。個人の処遇に影響する判断には、AIの出力を単独で用いません。また、AIの生成物を公開・利用する場合は、用途に応じて、内容の正確性や第三者の権利に配慮し、人が確認します。",
                  },
                  {
                    num: "4",
                    title: "任せる範囲と、止め方を設計すること",
                    body: "AIが回答してよい範囲、参照できる情報、実行できる操作は、目的に必要な範囲にとどめ、定期的に見直します。外部への影響が大きい操作や、取り消しにくい操作には、人の承認を挟みます。異常時にどこで止め、どう元の業務へ戻すかも、あらかじめ決めます。危険・緊急・専門的判断が必要な内容は、人への引き継ぎを優先します。",
                  },
                  {
                    num: "5",
                    title: "過信しないこと",
                    body: "特定のAIモデルや製品の性能・仕様だけを前提にしません。目的、費用、安全性、保守性、運用負荷を踏まえて選び、依存する外部サービスを事前に把握したうえで、変更や終了があっても業務への影響を抑えられるよう配慮します。モデルや設定、業務の変更でAIの挙動は変わり得るため、見直しの機会を設けます。何のために・どこまで・どう使うかは、つねに人間が決めます。",
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
                4. 設計への適用と、NDLの責任範囲
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 text-justify mb-3">
                NDLは、担う範囲（助言、試作、設計、実装、運用支援）に応じて、必要な管理策を設計・提案します。お客様、外部事業者、NDLの役割分担は、最初に整理します。責任の分担、費用負担、保存期間、利用条件、成果物の権利の扱いなど、具体的な条件は、契約書や仕様書、覚書等で、案件ごとに合意します。
              </p>
              <p className="text-sm leading-relaxed text-gray-700 text-justify mb-3">
                試作は試作として扱い、本番運用に移す際には、管理策をあらためて見直します。
              </p>
              <p className="text-sm leading-relaxed text-gray-700 text-justify mb-3">
                お客様の情報を外部のAIサービスで扱う場合は、入力する範囲、サービスの利用条件、モデル学習への利用の有無、情報の保存・管理条件を確認し、合意のうえで扱います。機密性の高い情報や未公開の情報は、原則として、モデル学習に利用されない条件を確認できるサービス・設定で扱います。取り扱いの厳しさは、情報の重要度や案件の性質に応じて決めます。
              </p>
              <p className="text-sm leading-relaxed text-gray-700 text-justify mb-3">
                重大な異常が起きた場合に備え、異常の報告、停止の判断と実行、お客様への連絡、影響範囲の確認、復旧の判断を、誰がどの経路で担うかを、案件の性質とNDLの責任範囲に応じて、あらかじめ決めます。法令や契約上の報告・通知義務がある場合は、それに従います。
              </p>
              <p className="text-sm leading-relaxed text-gray-700 text-justify">
                「使えるから使う」ではなく、「なぜ使うか・どこで止めるか」を設計の起点に置くこと。過度な管理を増やさず、現場が無理なく運用できる仕組みにすること。それがNDLの、AIとの向き合い方です。
              </p>
            </section>

            <div className="border-t border-[#2C3E30]/10 pt-6 text-xs text-gray-500 leading-relaxed text-justify">
              <p className="mb-3">
                本ポリシーは、国内外のAIガバナンス動向を踏まえ、随時見直します。
              </p>
              <p className="mb-1 font-bold text-gray-600">改訂履歴</p>
              <p>
                2026年6月：初版
                <br />
                2026年10月：行動・権限の管理、情報の取り扱い、責任範囲を追記
              </p>
              <p className="mt-3">
                最終改訂：2026年10月　Neural Design Lab　藏重彰三
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer simple />
    </div>
  );
}
