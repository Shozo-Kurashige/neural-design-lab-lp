import React from "react";
import { FadeIn } from "@/components/fade-in";
import { Brain, RefreshCw, Wrench, ShieldCheck } from "lucide-react";

const toolCategories = [
  {
    title: "考える・整理する",
    icon: <Brain className="w-6 h-6 text-[#D4AF37]" />,
    description: "散らばった情報をまとめ、判断や文章作成を助けます。",
    toolLabel: "具体的な道具",
    tools: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Microsoft Copilot",
      "NotebookLM",
      "生成AI・LLM",
    ],
  },
  {
    title: "繰り返し作業を減らす",
    icon: <RefreshCw className="w-6 h-6 text-[#D4AF37]" />,
    description:
      "転記、集計、通知など、人が何度も行っている作業を自動化します。今使っているExcelやスプレッドシートを活かした改善から始められます。",
    toolLabel: "具体的な道具",
    tools: [
      "Google Apps Script",
      "RPA",
      "Excel",
      "Googleスプレッドシート",
      "API連携",
      "Google Workspace",
      "Slack",
    ],
  },
  {
    title: "現場に合う仕組みをつくる",
    icon: <Wrench className="w-6 h-6 text-[#D4AF37]" />,
    description:
      "既存の道具では足りない場合に、必要な機能だけを形にします。大きなシステムを最初から作るのではなく、小さく試しながら整えます。",
    toolLabel: "具体的な道具",
    tools: [
      "Webアプリ",
      "業務管理画面",
      "入力フォーム",
      "データベース",
      "AIエージェント",
      "RAG",
      "社内ナレッジ検索",
    ],
  },
  {
    title: "安心して使える状態を守る",
    icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
    description:
      "便利さだけでなく、情報管理や運用方法まで含めて考えます。導入後に困らないよう、誰が、何を、どこまで扱えるかを決めます。",
    toolLabel: "具体的な対応内容",
    tools: [
      "権限・アカウント管理",
      "データの取り扱いルール",
      "多要素認証",
      "端末・通信の保護",
      "NDA・機密情報管理",
      "AIへ入力してよい情報の整理",
    ],
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 bg-[#FDFBF7] scroll-mt-20 border-b border-[#2C3E30]/5"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
              TECH & TOOLS
            </span>
            <h2 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
              改善を支える道具
            </h2>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-loose text-sm md:text-base">
              技術を入れることが目的ではありません。<br />
              仕事の流れや現場の状況を見たうえで、<br className="hidden md:block" />
              必要なときに、必要な道具だけを使います。
              <br className="hidden md:block" />
              <br className="hidden md:block" />
              <span className="block mt-4 md:mt-0">
                既存の仕組みで足りるなら、そのまま活かす。<br />
                自動化やAIが役に立つなら、<br className="hidden md:block" />
                無理なく続けられる形で組み込みます。
              </span>
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolCategories.map((category, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 hover:border-[#D4AF37]/30 transition-colors h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                  <div className="p-2 bg-[#F5F7F6] rounded-full shrink-0">
                    {category.icon}
                  </div>
                  <h3 className="font-['Noto_Serif_JP'] font-bold text-[#2C3E30] text-base leading-snug">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-500 mb-5 leading-relaxed flex-grow">
                  {category.description}
                </p>

                <div>
                  <p className="text-[10px] text-gray-400 font-bold tracking-wider mb-2 uppercase">
                    {category.toolLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={450}>
          <p className="mt-14 text-center text-sm md:text-base text-gray-500 leading-relaxed">
            現場に合わない最新技術より、無理なく使える道具を。<br />
            必要とあらば、AIも自動化もWebアプリも使います。
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
