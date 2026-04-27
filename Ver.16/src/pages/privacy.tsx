import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3E30] font-['Noto_Sans_JP'] selection:bg-[#D4AF37] selection:text-white">
      <Header simple />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <FadeIn>
              <h1 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-6">
                プライバシーポリシー
              </h1>
              <p className="text-gray-600">
                Neural Design Lab.（以下、「当方」といいます。）は、
                <br className="hidden md:block" />
                お客様の個人情報および機密情報の重要性を認識し、
                <br className="hidden md:block" />
                以下の取り組みを実施いたしております。
              </p>
            </FadeIn>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-sm border border-[#2C3E30]/10 space-y-10 shadow-sm">
            <section>
              <h2 className="text-xl font-['Noto_Serif_JP'] font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">
                1. 個人情報の定義
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 text-justify">
                個人情報とは、個人に関する情報であり、氏名、生年月日、性別、電話番号、電子メールアドレス、職業、勤務先等、特定の個人を識別し得る情報をいいます。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-['Noto_Serif_JP'] font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">
                2. 個人情報の収集・利用
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 text-justify mb-2">
                当方は、以下の目的のため、その範囲内においてのみ、個人情報を収集・利用いたします。
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                <li>お問い合わせに対する回答・確認</li>
                <li>業務遂行に必要なご案内・資料送付</li>
                <li>サービス向上のためのアンケート調査</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-['Noto_Serif_JP'] font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">
                3. 個人情報の第三者提供
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 text-justify">
                当方は、法令に基づく場合等正当な理由によらない限り、事前に本人の同意を得ることなく、個人情報を第三者に開示・提供することはありません。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-['Noto_Serif_JP'] font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">
                4. 機密情報の管理（NDAについて）
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 text-justify">
                当方は、業務上知り得たお客様の技術上・営業上の機密情報（未公開のアイデア、事業計画、社内データ等）について、厳重な管理体制を敷き、第三者への漏洩防止に努めます。
                <br />
                また、詳細なコンサルティングや開発業務を開始するにあたり、必要に応じて別途「秘密保持契約書（NDA）」を締結し、お客様の権利利益を法的に保護する体制を整えております。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-['Noto_Serif_JP'] font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">
                5. お問い合わせ窓口
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 text-justify">
                本ポリシーに関するお問い合わせは、Webサイト内の「お問い合わせフォーム」よりお願いいたします。
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer simple />
    </div>
  );
}
