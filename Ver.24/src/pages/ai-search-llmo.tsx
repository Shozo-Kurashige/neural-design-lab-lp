import React, { useState } from "react";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { LlmoDiagnosis } from "@/components/llmo/llmo-diagnosis";
import { LlmoFormsAccordion } from "@/components/llmo/llmo-forms-accordion";
import { LlmoPageNav } from "@/components/llmo/llmo-page-nav";
import {
  ArrowRight,
  ChevronDown,
  Search,
  Archive,
  PenTool,
  FileText,
  Compass,
  HeartHandshake,
  MessageCircle,
  LayoutTemplate,
  Globe,
  TrendingUp,
} from "lucide-react";

const supportItems = [
  {
    icon: <Search className="w-7 h-7" />,
    title: "AI検索・LLMO初期診断",
  },
  {
    icon: <Archive className="w-7 h-7" />,
    title: "自社の強み・一次情報の棚卸し",
  },
  {
    icon: <PenTool className="w-7 h-7" />,
    title: "LLMO/AEO向けコンテンツ設計",
  },
  {
    icon: <FileText className="w-7 h-7" />,
    title: "ブログ・FAQ・サービスページ改善",
  },
  {
    icon: <Compass className="w-7 h-7" />,
    title: "AIに伝わる定義文・導線設計",
  },
  {
    icon: <HeartHandshake className="w-7 h-7" />,
    title: "継続発信の伴走支援",
  },
];

const flowSteps = [
  {
    number: "01",
    icon: <MessageCircle className="w-6 h-6" />,
    title: "初回相談",
  },
  {
    number: "02",
    icon: <Archive className="w-6 h-6" />,
    title: "一次情報の棚卸し",
  },
  {
    number: "03",
    icon: <LayoutTemplate className="w-6 h-6" />,
    title: "発信テーマ・ページ構成の設計",
  },
  {
    number: "04",
    icon: <Globe className="w-6 h-6" />,
    title: "Webサイト・ブログへの反映",
  },
  {
    number: "05",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "継続改善",
  },
];

const beforeAfterList = [
  {
    before: "親切丁寧な会社です",
    after: "〇〇地域で、古い設備の更新に悩む中小企業向けに、現場調査から導入後の定着まで支援する会社です",
  },
  {
    before: "お客様に寄り添います",
    after: "見積もりや問い合わせ対応に時間がかかっている企業向けに、業務フローの整理からAI活用まで伴走します",
  },
  {
    before: "高品質なサービスを提供します",
    after: "現場の属人化や手戻りを減らし、考えなくても回る仕組みを一緒に設計します",
  },
];

const faqItems = [
  {
    q: "LLMOとSEOは何が違いますか？",
    a: "SEOは検索エンジンに見つけてもらうための考え方です。LLMOは、AIが自社の情報を理解し、誰かに説明できる状態を整える考え方です。両者は対立するものではなく、これからは両方を意識する必要があります。",
  },
  {
    q: "構造化データやSchema.orgは必要ですか？",
    a: "必要になる場合があります。ただし、最初にやるべきことではありません。まずは自社にしかない一次情報を整理し、その後で構造化データやFAQ設計を検討します。",
  },
  {
    q: "ブログを書いていない会社でも相談できますか？",
    a: "はい。むしろ、何を書けばよいか分からない会社こそ、一次情報の棚卸しから始める価値があります。",
  },
  {
    q: "小さな会社でもLLMO対策は意味がありますか？",
    a: "あります。会社の規模よりも、自社にしかない経験や言葉があるかどうかが重要です。中小企業には、大企業が真似できない現場の一次情報があります。",
  },
  {
    q: "すぐに問い合わせは増えますか？",
    a: "即効性を保証するものではありません。NDLのLLMO支援は、自社の情報を長期的な資産として整える取り組みです。結果として、検索やAI経由で見つけられやすくなる土台を作ります。",
  },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-sm md:text-base font-bold text-[#2C3E30]">
                <span className="text-[#D4AF37] mr-2">Q{index + 1}.</span>
                {item.q}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-500 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed text-justify">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AiSearchLlmo() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3E30] font-['Noto_Sans_JP'] selection:bg-[#D4AF37] selection:text-white">
      <LlmoPageNav />

      <main className="pt-32 pb-24">
        {/* 1. Hero */}
        <section id="hero" className="container mx-auto px-6 max-w-4xl text-center mb-24 scroll-mt-24">
          <FadeIn>
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-4">
              AI SEARCH / LLMO
            </span>
            <h1 className="text-2xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-8 leading-relaxed">
              AIに見つけてもらう前に、
              <br />
              自社の言葉を見つける。
            </h1>
            <div className="text-sm md:text-base text-gray-600 leading-relaxed text-justify max-w-2xl mx-auto space-y-4">
              <p>
                ChatGPT、Google AI、Perplexity、Copilotなど、AIが情報を探し、要約し、紹介する時代になりました。
                これからのWebサイトは、人間に読まれるだけでなく、AIにも正しく理解される必要があります。
              </p>
              <p>
                しかし、AI検索・LLMO対策は、難しい技術から始めるものではありません。
                まず必要なのは、会社の歴史、現場のこだわり、失敗から学んだこと、お客様に喜ばれた経験など、自社にしか書けない一次情報を掘り起こすことです。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <a
                href="#diagnosis"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-white text-sm font-bold rounded-sm hover:bg-[#c19f30] transition-colors shadow-sm hover:shadow-md"
              >
                まずは自社の状態を診断する
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#2C3E30] text-sm font-bold rounded-sm border border-[#2C3E30]/20 hover:border-[#2C3E30]/50 transition-colors"
              >
                相談・壁打ちをする
              </a>
            </div>
          </FadeIn>
        </section>

        {/* 2. LLMOとは */}
        <section id="llmo-explained" className="bg-white py-20 mb-24 scroll-mt-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-['Noto_Serif_JP'] font-bold text-center mb-10 leading-relaxed">
                LLMOとは、自社の言葉を
                <br className="md:hidden" />
                AIにも人にも伝わる形に整えること。
              </h2>
              <div className="text-sm md:text-base text-gray-600 leading-relaxed text-justify space-y-4">
                <p>
                  LLMOとは、Large Language Model Optimization の略で、ChatGPTなどの大規模言語モデルに、自社の情報を正しく理解・参照してもらうための考え方です。
                </p>
                <p>
                  ただし、NDLではLLMOを単なる「AI向けSEO」とは考えていません。
                </p>
                <p className="font-bold text-[#2C3E30]">
                  AIに媚びるためのテクニックではなく、自社にしかない経験や言葉を、AIにも人にも伝わる形に整えること。
                  それが、NDLの考えるAI検索・LLMO対策です。
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 3. 簡易診断 */}
        <section id="diagnosis" className="container mx-auto px-6 max-w-3xl mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <FadeIn>
              <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
                SELF CHECK
              </span>
              <h2 className="text-2xl md:text-3xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
                自社の状態を簡単に診断する
              </h2>
              <p className="mt-4 text-sm text-gray-600">
                6つの質問に Yes / No で答えるだけ。今の自社の段階が見えてきます。
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={150}>
            <LlmoDiagnosis />
          </FadeIn>
        </section>

        {/* 4. 壱の型・弐の型・参の型・奥義 */}
        <section id="forms" className="bg-white py-20 mb-24 scroll-mt-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-12">
              <FadeIn>
                <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
                  FOUR FORMS
                </span>
                <h2 className="text-2xl md:text-3xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
                  一次情報を掘り起こす、4つの型
                </h2>
                <p className="mt-4 text-sm text-gray-600">
                  壱の型から順に、自社の言葉を見つけていきます。
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={150}>
              <LlmoFormsAccordion />
            </FadeIn>
          </div>
        </section>

        {/* 5. Before / After */}
        <section id="before-after" className="container mx-auto px-6 max-w-4xl mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
                AIに伝わりにくい言葉を、伝わる言葉へ。
              </h2>
            </FadeIn>
          </div>
          <div className="space-y-6">
            {beforeAfterList.map((item, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="grid md:grid-cols-2 gap-3 md:gap-0 bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 md:border-r border-gray-100">
                    <span className="text-xs font-bold text-gray-400 tracking-widest block mb-2">
                      BEFORE
                    </span>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      「{item.before}」
                    </p>
                  </div>
                  <div className="p-6 bg-[#F5F7F6]">
                    <span className="text-xs font-bold text-[#D4AF37] tracking-widest block mb-2">
                      AFTER
                    </span>
                    <p className="text-sm text-[#2C3E30] leading-relaxed font-medium">
                      「{item.after}」
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 6. NDLが支援できること */}
        <section id="support" className="bg-white py-20 mb-24 scroll-mt-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <FadeIn>
                <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
                  SUPPORT
                </span>
                <h2 className="text-2xl md:text-3xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
                  NDLが支援できること
                </h2>
              </FadeIn>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {supportItems.map((item, index) => (
                <FadeIn key={index} delay={index * 80}>
                  <div className="bg-[#F5F7F6] rounded-sm p-6 h-full flex flex-col items-center text-center gap-4 border border-transparent hover:border-[#D4AF37]/40 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#2C3E30] shadow-sm">
                      {item.icon}
                    </div>
                    <p className="text-sm font-bold text-[#2C3E30] leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 7. 相談の流れ */}
        <section id="flow" className="container mx-auto px-6 max-w-5xl mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <FadeIn>
              <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
                FLOW
              </span>
              <h2 className="text-2xl md:text-3xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
                相談の流れ
              </h2>
            </FadeIn>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-[#2C3E30]/10 -z-10 translate-y-4"></div>
            {flowSteps.map((step, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="bg-white p-6 rounded-sm border border-[#2C3E30]/5 shadow-sm h-full flex flex-col items-center text-center">
                  <span className="text-3xl font-['Noto_Serif_JP'] font-bold text-[#E8ECE9] mb-2">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 bg-[#F5F7F6] rounded-full flex items-center justify-center text-[#2C3E30] mb-4">
                    {step.icon}
                  </div>
                  <p className="text-sm font-bold text-[#2C3E30] leading-relaxed">
                    {step.title}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 8. FAQ */}
        <section id="faq" className="bg-white py-20 mb-24 scroll-mt-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-12">
              <FadeIn>
                <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
                  FAQ
                </span>
                <h2 className="text-2xl md:text-3xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
                  よくあるご質問
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={150}>
              <FaqAccordion />
            </FadeIn>
          </div>
        </section>

        {/* 9. CTA */}
        <section id="cta" className="container mx-auto px-6 max-w-3xl scroll-mt-24">
          <FadeIn>
            <div className="bg-[#2C3E30] text-white rounded-sm p-8 md:p-14 text-center">
              <h2 className="text-2xl md:text-3xl font-['Noto_Serif_JP'] font-bold mb-8 leading-relaxed">
                まずは、社長の話を聴かせてください。
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-white/85 text-justify max-w-xl mx-auto space-y-1 mb-10">
                <p>
                  AI検索やLLMOと聞くと、難しい技術の話に感じるかもしれません。
                </p>
                <p>でも、最初に必要なのは、社長や現場の中にある言葉です。</p>
                <p>なぜこの仕事をしているのか。</p>
                <p>どんなお客様に喜ばれてきたのか。</p>
                <p>どんな失敗から学んできたのか。</p>
                <p>何を大切にしているのか。</p>
                <p className="pt-2">
                  その話の中に、AIにも人にも届く情報の種があります。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-white text-sm font-bold rounded-sm hover:bg-[#c19f30] transition-colors"
                >
                  相談・壁打ちをする
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#diagnosis"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white text-sm font-bold rounded-sm border border-white/30 hover:bg-white/20 transition-colors"
                >
                  自社サイトの見え方を確認したい
                </a>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer simple />
    </div>
  );
}
