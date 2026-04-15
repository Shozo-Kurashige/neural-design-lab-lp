import React from "react";
import {
  FileLock,
  PenTool,
  Zap,
  HeartHandshake,
  ShieldCheck,
  Lock,
  Laptop,
} from "lucide-react";
import { FadeIn } from "@/components/fade-in";

export function ProcessSection() {
  const steps = [
    {
      number: "01",
      icon: <FileLock className="w-6 h-6" />,
      title: "ヒアリング・NDA締結",
      desc: "経営の悩み、現場の課題を徹底的に伺います。必要に応じて秘密保持契約（NDA）を締結し、安心して深いお話をしていただける環境を整えます。",
    },
    {
      number: "02",
      icon: <PenTool className="w-6 h-6" />,
      title: "企画・ロードマップ提示",
      desc: "ご予算に合わせて、無理のない導入計画を策定します。高額なシステムありきではなく、「今あるツール」での代用も含めて検討します。",
    },
    {
      number: "03",
      icon: <Zap className="w-6 h-6" />,
      title: "高速アジャイル開発",
      desc: "AI技術を「実装の加速」に活用し、従来の数倍の速度で開発します。※顧客データ等の機密情報はAI学習に利用されないよう、厳格に隔離して扱います。",
    },
    {
      number: "04",
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "納品・伴走運用",
      desc: "作って終わりではありません。現場スタッフ様へのレクチャーやマニュアル作成を行い、定着するまでしっかりと伴走します。",
    },
  ];

  return (
    <section
      id="process"
      className="py-24 bg-[#E8ECE9]/30 relative scroll-mt-20"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <FadeIn>
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
              WORK FLOW
            </span>
            <h2 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
              ご相談から、導入までの流れ
            </h2>
          </FadeIn>
          <p className="mt-6 text-gray-600">
            不安を解消し、納得して進んでいただくために。
            <br className="hidden md:block" />
            透明性の高いプロセスと、堅牢なセキュリティをお約束します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative mb-20">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-[#2C3E30]/10 -z-10 transform translate-y-4"></div>

          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 150}>
              <div className="group relative bg-white p-8 rounded-sm border border-[#2C3E30]/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-['Noto_Serif_JP'] font-bold text-[#E8ECE9] group-hover:text-[#D4AF37]/20 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 bg-[#F5F7F6] rounded-full flex items-center justify-center text-[#2C3E30] group-hover:bg-[#2C3E30] group-hover:text-[#D4AF37] transition-all duration-500 shadow-sm">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-4 group-hover:text-[#D4AF37] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed text-justify flex-1">
                  {step.desc}
                </p>
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6 text-[#2C3E30]/20">
                    <div className="w-0.5 h-8 bg-[#2C3E30]/10"></div>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="bg-white border border-[#2C3E30]/10 rounded-sm p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#2C3E30]"></div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="shrink-0">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="text-xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
                    セキュリティと開発環境について
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed max-w-md text-justify">
                  お客様の大切な情報資産を守るため、物理的・技術的なセキュリティ対策を徹底しております。
                </p>
              </div>

              <div className="flex-1 grid sm:grid-cols-2 gap-6 w-full">
                <div className="flex gap-4">
                  <Lock className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-[#2C3E30] text-sm mb-1">
                      端末の物理的保護
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      開発に使用する全端末にて、生体認証およびBitLockerによるストレージ暗号化を適用。紛失・盗難時のデータ漏洩を防止します。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Laptop className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-[#2C3E30] text-sm mb-1">
                      AI利用の安全管理
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      生成AIの活用に際しては、機密情報のマスキング処理を徹底。お客様のデータがAIの学習に利用されない環境・設定にて運用します。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            ※ プロジェクトの規模により、工程や期間は柔軟に調整いたします。
            <br />
            まずはお気軽にご相談ください。
          </p>
        </div>
      </div>
    </section>
  );
}
