import React from "react";
import {
  Building,
  Mail,
  MapPin,
  Phone,
  Landmark,
  Award,
  CheckCircle2,
} from "lucide-react";
import { FadeIn } from "@/components/fade-in";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#FDFBF7] relative scroll-mt-20">
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2C3E30]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
              ABOUT US
            </span>
            <h2 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
              私たちについて
            </h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <FadeIn>
              <h3 className="text-2xl md:text-3xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-6 leading-relaxed">
                現場で働く人が、少しでも楽になるように。
              </h3>
              <h4 className="text-md text-[#D4AF37] font-bold mb-8 tracking-wider">
                Neural Design Lab. 代表の想い。
              </h4>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="space-y-6 text-gray-600 leading-loose text-justify font-medium mb-10">
                <p>
                  私がこれまで見てきた現場には、たくさんの「仕方ない」がありました。
                </p>
                <p>
                  人によってやり方が違う。
                  判断が一部の人に集まる。
                  例外対応が積み重なり、誰かの頑張りで何とか回っている。
                  忙しさの中で、改善したくても手がつけられない。
                </p>
                <p>
                  そうした現場を、私は長く見てきました。
                </p>
                <p>
                  AIやDXは、魔法ではありません。
                  ツールを入れただけで、現場が急に楽になるわけでもありません。
                </p>
                <p>
                  けれど、業務の流れを整理し、判断基準を言葉にし、現場の知恵を仕組みに変えていけば、AIは確かに力になります。
                </p>
                <p>
                  Neural Design Labは、現場を置き去りにしないAI・DX支援を行います。
                </p>
                <p>
                  大きな改革を一気に進めるのではなく、まずは目の前の面倒をほどくことから。
                  現場で働く人が、明日少しでも動きやすくなることから。
                </p>
                <p>
                  その積み重ねが、会社の力になると考えています。
                </p>
                <p>
                  「先生」ではなく「パートナー」として。あなたの現場に、私たちを招いてください。
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-[#D4AF37]/30 p-6 rounded-sm shadow-sm relative overflow-hidden">
                <Award className="absolute -top-4 -right-4 w-24 h-24 text-[#D4AF37]/10 pointer-events-none" />

                <h3 className="text-sm font-bold text-[#2C3E30] mb-4 flex items-center gap-2 border-b border-gray-200 pb-2 relative z-10">
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                  保有資格・認定（大手グローバル人材企業 社内認定）
                </h3>

                <ul className="space-y-3 relative z-10">
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#2C3E30] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#2C3E30]">
                        課題解決力 2.0
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        本質的なボトルネック抽出とロジカルシンキング
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#2C3E30] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#2C3E30]">
                        RPA中級（WinActor）
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        業務自動化シナリオ構築・運用改善スキル
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#2C3E30] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#2C3E30]">
                        キャリアコンサルティングSkill
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        組織課題へのアプローチと対人支援力
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>

          <div className="space-y-12">
            <FadeIn delay={300}>
              <div className="mx-auto max-w-[240px] md:max-w-[320px]">
                <div className="relative aspect-[4/5] rounded-md overflow-hidden shadow-lg border border-[#2C3E30]/10 group">
                  <img
                    src="/Self.webp"
                    alt="Neural Design Lab. 代表"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#2C3E30]/10 group-hover:bg-[#2C3E30]/0 transition-colors duration-700"></div>
                </div>
                <p className="text-right text-sm text-gray-500 mt-3 font-['Noto_Serif_JP'] px-2">
                  代表：藏重 彰三
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="bg-white p-8 rounded-sm shadow-sm border border-[#2C3E30]/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]"></div>

                <h4 className="flex items-center gap-2 text-lg font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-6">
                  <Building className="w-5 h-5 text-[#D4AF37]" />
                  事業概要
                </h4>

                <dl className="space-y-4 text-sm">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-100 pb-4">
                    <dt className="font-bold text-[#2C3E30] w-24 shrink-0">
                      屋号
                    </dt>
                    <dd className="text-gray-600">
                      Neural Design Lab.（ニューロ・デザイン・ラボ）
                    </dd>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-100 pb-4">
                    <dt className="font-bold text-[#2C3E30] w-24 shrink-0">
                      代表
                    </dt>
                    <dd className="text-gray-600">藏重 彰三</dd>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-100 pb-4">
                    <dt className="font-bold text-[#2C3E30] w-24 shrink-0">
                      インボイス
                    </dt>
                    <dd className="text-gray-600">T4810961484046</dd>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-100 pb-4">
                    <dt className="font-bold text-[#2C3E30] w-24 shrink-0 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      所在地
                    </dt>
                    <dd className="text-gray-600">
                      〒142-0042
                      <br />
                      東京都品川区豊町 6-12-9
                    </dd>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-100 pb-4">
                    <dt className="font-bold text-[#2C3E30] w-24 shrink-0 flex items-start gap-2">
                      <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                      連絡先
                    </dt>
                    <dd className="text-gray-600">
                      <a
                        href="mailto:info@neuraldesignlab.jp"
                        className="hover:text-[#D4AF37] transition-colors"
                      >
                        info@neuraldesignlab.jp
                      </a>
                      <br />
                      <span className="flex items-center gap-1 mt-1">
                        <Phone className="w-3 h-3" /> 050-1286-2360
                      </span>
                    </dd>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-100 pb-4">
                    <dt className="font-bold text-[#2C3E30] w-24 shrink-0">
                      事業内容
                    </dt>
                    <dd className="text-gray-600">
                      <ul className="list-disc list-inside space-y-1">
                        <li>業務改善コンサルティング</li>
                        <li>生成AI導入・活用支援</li>
                        <li>Webサイト制作・運用</li>
                        <li>動画制作・編集</li>
                      </ul>
                    </dd>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-100 pb-4">
                    <dt className="font-bold text-[#2C3E30] w-24 shrink-0 flex items-start gap-2">
                      <Landmark className="w-4 h-4 text-gray-400 mt-0.5" />
                      取引銀行
                    </dt>
                    <dd className="text-gray-600">
                      <ul className="list-disc list-inside space-y-1">
                        <li>みずほ銀行　五反田支店</li>
                        <li>城南信用金庫　大井支店</li>
                      </ul>
                    </dd>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <dt className="font-bold text-[#2C3E30] w-24 shrink-0">
                      所属団体
                    </dt>
                    <dd className="text-gray-600">
                      東京商工会議所
                    </dd>
                  </div>
                </dl>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}