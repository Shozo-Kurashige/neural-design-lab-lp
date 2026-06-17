import React from "react";
import { Check, HelpCircle } from "lucide-react";
import { FadeIn } from "@/components/fade-in";

const plans = [
  {
    name: "スポット相談・単発支援",
    price: "33,000",
    unit: "円 (税込) / 回",
    description:
      "「何から手をつければいいか分からない」という方向け。60分の壁打ちで、霧が晴れるように課題を整理します。",
    features: [
      "オンライン/対面での現状ヒアリング",
      "業務フローのボトルネック診断",
      "「まずやるべきこと」の優先順位付け",
      "使用すべきツール・補助金の選定",
    ],
    isPopular: false,
  },
  {
    name: "DX顧問・伴走パートナー",
    price: "55,000",
    unit: "円 (税込)〜 / 月",
    description:
      "大手コンサルの1/10以下の価格で、実務直結の支援を。月1回の定例とチャット相談で、着実に現場を変えていきます。",
    features: [
      "月1回の定例戦略ミーティング",
      "チャットツールでの無制限相談",
      "AI/ITツールの選定・導入サポート",
      "ベンダー（外注先）との折衝代行",
      "社員様向けのAI活用レクチャー",
    ],
    isPopular: true,
  },
  {
    name: "Web制作・システム開発",
    price: "165,000",
    unit: "円 (税込)〜",
    description:
      "最新のAI開発手法(v0/Replit等)を駆使することで、開発工数を劇的に圧縮。高品質なシステムを適正価格で。",
    features: [
      "コーポレートサイト・LP制作",
      "業務自動化ツール（GAS/Make）開発",
      "社内専用AIチャットボット構築",
      "保守・運用マニュアル作成",
      "納品後の修正・運用サポート",
    ],
    isPopular: false,
  },
];

export function PriceSection() {
  return (
    <section id="price" className="py-24 bg-[#E8ECE9]/30 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <FadeIn>
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
              PRICE & VALUE
            </span>
            <h2 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
              提供価値と価格
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mt-8 bg-white p-8 rounded-sm shadow-md border-t-4 border-[#D4AF37] text-center max-w-4xl mx-auto">
              <h3 className="text-lg md:text-xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] leading-relaxed mb-6">
                Neural Design Lab. の価格は、
                <br />
                <span className="text-[#D4AF37]">AI活用による工数削減</span>、
                <span className="text-[#D4AF37]">固定費の最小化</span>、<br />
                そして
                <span className="text-[#D4AF37]">
                  「中小企業の伴走」を使命とする理念
                </span>
                に基づいています。
              </h3>

              <div className="w-16 h-0.5 bg-gray-200 mx-auto mb-6"></div>

              <p className="text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto">
                一般的なコンサルティング会社は、立派なオフィス代や営業マンの人件費が価格に乗っています。
                <br />
                <span className="bg-yellow-100/50 px-1 font-bold text-[#2C3E30]">
                  （大手なら月額200万円〜、中堅でも30万円〜が相場）
                </span>
                <br />
                私たちは「安かろう悪かろう」ではなく、最新技術で無駄を削ぎ落とした
                <br />
                <strong>「合理的で、理念に基づいた適正価格」</strong>
                でサービスを提供します。
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div
                className={`
                relative bg-white rounded-sm border p-8 h-full flex flex-col
                ${
                  plan.isPopular
                    ? "border-[#D4AF37] shadow-xl scale-105 z-10"
                    : "border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                }
              `}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase shadow-sm whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-2 text-center">
                  {plan.name}
                </h3>

                <div className="text-center mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-[#2C3E30]">
                    {plan.price}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500 ml-1">
                    {plan.unit}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-8 leading-relaxed text-center min-h-[4em]">
                  {plan.description}
                </p>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[#2C3E30]"
                    >
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto text-center">
                  <a
                    href="#contact"
                    className={`
                    block w-full py-3 text-sm font-bold transition-colors border
                    ${
                      plan.isPopular
                        ? "bg-[#2C3E30] text-white border-[#2C3E30] hover:bg-[#3A5240]"
                        : "bg-white text-[#2C3E30] border-[#2C3E30] hover:bg-[#2C3E30] hover:text-white"
                    }
                  `}
                  >
                    相談する
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <HelpCircle className="w-3 h-3" />
            <span>
              上記は目安です。プロジェクトの規模や難易度に応じて、事前にお見積もりを提示いたします。
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
