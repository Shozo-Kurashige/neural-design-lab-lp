import React, { useState } from "react";
import { Send, CheckCircle, Loader2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/fade-in";

export function ContactSection() {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setErrorMessage("送信に失敗しました。時間をおいて再度お試しください。");
      }
    } catch (error) {
      setErrorMessage("ネットワークエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#E8ECE9]/30 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <FadeIn>
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
              CONTACT
            </span>
            <h2 className="text-3xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-4">
              お問い合わせ
            </h2>
            <p className="text-gray-600">
              プロジェクトのご相談、お見積もりなど、
              <br className="md:hidden" />
              お気軽にお問い合わせください。
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-6">
            <FadeIn delay={100}>
              <div className="bg-white p-6 rounded-sm shadow-sm border border-[#2C3E30]/5 text-center">
                <div className="w-10 h-10 bg-[#E8ECE9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#2C3E30]">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#2C3E30] mb-1">E-mail</h3>
                <p className="text-xs text-gray-500 mb-3">24時間受付</p>
                <a
                  href="mailto:info@neuraldesignlab.jp"
                  className="text-[#D4AF37] font-bold text-sm hover:underline break-all"
                >
                  info@neuraldesignlab.jp
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-white p-6 rounded-sm shadow-sm border border-[#2C3E30]/5 text-center">
                <div className="w-10 h-10 bg-[#E8ECE9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#2C3E30]">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#2C3E30] mb-1">Phone</h3>
                <p className="text-xs text-gray-500 mb-3">平日 10:00〜18:00</p>
                <a
                  href="tel:05012862360"
                  className="text-[#2C3E30] font-['Noto_Serif_JP'] font-bold text-xl hover:text-[#D4AF37] transition-colors"
                >
                  050-1286-2360
                </a>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-2">
            <FadeIn delay={300}>
              <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-[#2C3E30]/5">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#2C3E30]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-[#2C3E30]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2C3E30] mb-4">
                      送信いたしました
                    </h3>
                    <p className="text-gray-600 mb-8">
                      お問い合わせありがとうございます。
                      <br />
                      内容を確認の上、担当者よりご連絡させていただきます。
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      variant="outline"
                      className="border-[#2C3E30] text-[#2C3E30] hover:bg-[#F5F7F6]"
                    >
                      フォームに戻る
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#2C3E30]">
                          お名前 <span className="text-[#D4AF37]">*</span>
                        </label>
                        <Input
                          name="name"
                          required
                          placeholder="山田 太郎"
                          className="bg-[#FDFBF7] border-[#2C3E30]/20 h-12 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#2C3E30]">
                          会社名
                        </label>
                        <Input
                          name="company"
                          placeholder="株式会社〇〇"
                          className="bg-[#FDFBF7] border-[#2C3E30]/20 h-12 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#2C3E30]">
                        メールアドレス <span className="text-[#D4AF37]">*</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        required
                        placeholder="example@company.jp"
                        className="bg-[#FDFBF7] border-[#2C3E30]/20 h-12 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#2C3E30]">
                        お問い合わせ内容{" "}
                        <span className="text-[#D4AF37]">*</span>
                      </label>
                      <Textarea
                        name="message"
                        required
                        placeholder="ご相談内容をご記入ください"
                        className="bg-[#FDFBF7] border-[#2C3E30]/20 min-h-[160px] resize-none focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-red-500 text-sm text-center">
                        {errorMessage}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#2C3E30] hover:bg-[#3A5240] text-white font-bold h-14 text-lg rounded-sm transition-all tracking-wide"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin" /> 送信中...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          送信する <Send className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
