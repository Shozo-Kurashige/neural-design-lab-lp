"use client";

import React, { useState } from "react";
import {
  Bot,
  Code2,
  LineChart,
  Smartphone,
  CheckCircle2,
  MessageCircleHeart,
} from "lucide-react";
import { FadeIn } from "@/components/fade-in";

const services = [
  {
    icon: <LineChart className="w-8 h-8" />,
    title: "業務改善コンサルティング",
    description:
      "「何から始めればいいか分からない」という状態から、現場の課題を整理し、最適なデジタル活用ロードマップを描きます。",
    features: [
      "現状分析・課題抽出",
      "DXロードマップ策定",
      "補助金・助成金活用支援",
    ],
    secretMessage:
      'いきなり"大きな投資"は不要。確実に現場が楽になる一手を考えましょう。',
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "生成AI導入・活用支援",
    description:
      "ChatGPTなどの生成AIを実務に組み込み、議事録作成、メール対応、資料作成などの事務作業を劇的に効率化します。",
    features: [
      "社内AIチャットボット開発",
      "業務自動化スクリプト作成",
      "社内研修・ワークショップ",
    ],
    secretMessage:
      '難しい技術の話は後回し。まず"どこが面倒か"を聴かせてください。',
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Web制作・システム開発",
    description:
      "デザインの美しさだけでなく、更新のしやすさやセキュリティを重視した、「稼働し続ける」Webサイトやシステムを構築します。",
    features: [
      "コーポレートサイト制作",
      "業務システム開発",
      "セキュリティ対策・保守",
    ],
    secretMessage:
      "作った後のことまで、一緒に考えます。納品がゴールではありません。",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "SNS運用・コンテンツ制作",
    description:
      "「バズる」ことよりも「信頼を積み重ねる」ことを重視。企業の想いや技術力を、適切な言葉とデザインで発信し、ファンを育てます。",
    features: [
      "Instagram/X/LINE運用代行",
      "ショート動画制作・編集",
      "投稿カレンダー作成・分析",
    ],
    secretMessage:
      "あなたらしい言葉で、届けるべき人に届ける。それが一丁目一番地です。",
  },
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-24 bg-[#E8ECE9]/30 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <FadeIn>
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
              OUR SERVICES
            </span>
            <h2 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
              提供サービス
            </h2>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
              コンサルティングから開発、そして日々の情報発信まで。
              <br className="hidden md:block" />
              ワンストップで伴走できるのが、私たちの強みです。
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <FadeIn key={index} delay={index * 100}>
                <div
                  onClick={() => toggleCard(index)}
                  className={`bg-white rounded-sm border transition-all duration-300 group flex flex-col h-full cursor-pointer overflow-hidden ${
                    isActive
                      ? "shadow-xl border-[#D4AF37]/50"
                      : "border-gray-100 shadow-sm hover:shadow-lg"
                  }`}
                >
                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <div className="mb-6 inline-flex p-4 bg-[#F5F7F6] rounded-full text-[#2C3E30] group-hover:bg-[#2C3E30] group-hover:text-[#D4AF37] transition-colors duration-300 self-start">
                      {service.icon}
                    </div>

                    <h3 className="text-xl md:text-2xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-4 group-hover:text-[#D4AF37] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mt-auto">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 text-right">
                      <span
                        className={`text-xs font-bold tracking-wider transition-opacity duration-300 ${isActive ? "text-[#D4AF37] opacity-100" : "text-gray-400 opacity-0 group-hover:opacity-100"}`}
                      >
                        {isActive ? "CLOSE" : "TAP TO READ"}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`grid transition-all duration-500 ease-in-out bg-[#2C3E30] ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 md:px-10 md:py-8 flex items-start gap-4">
                        <MessageCircleHeart className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                        <p className="text-white font-['Noto_Serif_JP'] leading-relaxed text-[15px] tracking-wide">
                          {service.secretMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
