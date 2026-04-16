import React from "react";
import { FadeIn } from "@/components/fade-in";
import { Code2, ShieldCheck, Cpu, Terminal } from "lucide-react";

const skillCategories = [
  {
    title: "AI & LLM",
    icon: <Cpu className="w-6 h-6 text-[#D4AF37]" />,
    description: "用途に合わせて最適な頭脳（AIモデル）を選定・活用します。",
    skills: [
      "OpenAI API (GPT-4o)",
      "Anthropic (Claude 4.6)",
      "Google Gemini",
      "Microsoft Copilot",
      "Adobe Express / ImageFX",
    ],
  },
  {
    title: "AI Development",
    icon: <Code2 className="w-6 h-6 text-[#D4AF37]" />,
    description: "AIコーディングツールを駆使し、圧倒的なスピードで開発。",
    skills: [
      "Claude Code / Replit",
      "Node.js  / VS Code",
      "React / TypeScript",
      "Tailwind CSS",
      "Github",
    ],
  },
  {
    title: "Business Automation",
    icon: <Terminal className="w-6 h-6 text-[#D4AF37]" />,
    description: "バラバラな業務ツールを繋ぎ、面倒なルーチンワークを自動化。",
    skills: [
      "Google Apps Script (GAS)",
      "Winactor (RPA)",
      "WordPress / Google Analytics",
      "Notion / Gamma",
      "Slack / Discord",
    ],
  },
  {
    title: "Security & Policy",
    icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
    description: "技術力だけでなく、物理的・法的な安全性を徹底。",
    skills: [
      "BitLocker (全端末暗号化)",
      "多要素・生体認証ロック",
      "NDA (秘密保持契約) 締結",
      "AI学習データ除外設定",
      "VPN / セキュア通信",
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
              TECHNOLOGY STACK
            </span>
            <h2 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
              技術とセキュリティ
            </h2>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
              流行の技術を追うだけではありません。
              <br />
              お客様の資産を守り、長く使い続けられる「枯れた技術」と
              <br />
              「最新技術」を最適なバランスで選定します。
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 hover:border-[#D4AF37]/30 transition-colors h-full">
                <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                  <div className="p-2 bg-[#F5F7F6] rounded-full">
                    {category.icon}
                  </div>
                  <h3 className="font-['Noto_Serif_JP'] font-bold text-[#2C3E30] text-lg">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-500 mb-6 leading-relaxed h-10">
                  {category.description}
                </p>

                <ul className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-[#2C3E30] font-medium"
                    >
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
