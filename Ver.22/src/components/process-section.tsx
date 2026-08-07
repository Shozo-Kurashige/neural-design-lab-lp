import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  ClipboardList,
  ShieldCheck,
  HeartHandshake,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/fade-in";

// ── 相談前モーダル ─────────────────────────────────────────────
function ConsultModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // 背景スクロール抑制
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // モーダルが開いたらオーバーレイにフォーカスを移す（Escape/onKeyDown が効くように）
  useEffect(() => {
    if (isOpen) setTimeout(() => overlayRef.current?.focus(), 50);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 outline-none"
          onClick={onClose}
          onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consult-modal-title"
          aria-describedby="consult-modal-desc"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md bg-[#FDFBF7] rounded-sm border border-[#2C3E30]/10 shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン (×) */}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="閉じる"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2C3E30] focus:ring-offset-2 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* タイトル */}
            <h2
              id="consult-modal-title"
              className="text-[1.05rem] font-['Noto_Serif_JP'] font-bold text-[#2C3E30] text-center mb-5"
            >
              初回のご相談は無料です
            </h2>

            {/* 本文 */}
            <div
              id="consult-modal-desc"
              className="text-[0.88rem] font-['Noto_Sans_JP'] leading-relaxed text-[#4a4a4a] text-center space-y-3 mb-7"
            >
              <p>
                現在の状況や、まだ整理できていない課題について、<br />
                公開可能な範囲でお聞かせください。
              </p>
              <p>
                無理に契約やサービスをおすすめすることはありません。<br />
                まずは、お互いに安心して話せるかを確認する時間です。
              </p>
            </div>

            {/* ボタン */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }, 250);
                }}
                className="block w-full text-center px-6 py-3.5 bg-[#2C3E30] text-white text-[0.9rem] font-bold font-['Noto_Sans_JP'] rounded-sm hover:bg-[#3A5240] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2C3E30] focus:ring-offset-2"
              >
                相談に進む
              </button>
              <button
                onClick={onClose}
                className="w-full text-center px-6 py-3 text-[0.88rem] font-['Noto_Sans_JP'] text-[#4a4a4a] border border-[#2C3E30]/20 rounded-sm hover:bg-[#E8ECE9]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2C3E30] focus:ring-offset-2"
              >
                閉じる
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── メインセクション ──────────────────────────────────────────────
export function ProcessSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => triggerRef.current?.focus(), 50);
  }, []);

  const steps = [
    {
      number: "01",
      verb: "話す",
      icon: <MessageCircle className="w-6 h-6" />,
      title: "初回相談・情報交換",
      desc: "現在の状況や、気になっていることをお聞かせください。内容がまだ整理されていなくても構いません。初回のご相談・情報交換は無料です。",
    },
    {
      number: "02",
      verb: "確かめる",
      icon: <ClipboardList className="w-6 h-6" />,
      title: "支援範囲・進め方の確認",
      desc: "課題や対象範囲を整理し、Neural Design Labがお役に立てるかを確認します。必要な支援内容、進め方、概算費用をご案内します。",
    },
    {
      number: "03",
      verb: "守る",
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "必要に応じてNDA締結",
      desc: "顧客情報、社内資料、業務フロー、開発情報など、機密性の高い内容を扱う場合は、秘密保持契約を締結したうえで検討を進めます。",
    },
    {
      number: "04",
      verb: "始める",
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "お見積り・ご契約・支援開始",
      desc: "支援範囲と成果物を確認し、正式なお見積りをご提示します。合意後、必要な範囲から支援を開始します。",
    },
  ];

  return (
    <section
      id="process"
      className="py-24 bg-[#FDFBF7] relative scroll-mt-20"
    >
      <ConsultModal isOpen={modalOpen} onClose={closeModal} />

      <div className="container mx-auto px-6 max-w-6xl">

        {/* 見出し */}
        <div className="text-center mb-16">
          <FadeIn>
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
              WORK FLOW
            </span>
            <h2 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
              ご相談から、支援開始までの流れ
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mt-5 text-[0.9rem] md:text-[0.95rem] text-gray-600 font-['Noto_Sans_JP'] leading-relaxed">
              初回のご相談・情報交換は無料です。<br />
              お互いに安心して進められるかを確認したうえで、<br />
              必要な範囲と進め方をご提案します。
            </p>
          </FadeIn>
        </div>

        {/* 4ステップ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative mb-14">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-[#2C3E30]/10 -z-10 transform translate-y-4" />

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

                <p className="text-xs font-bold tracking-widest text-[#D4AF37] font-['Noto_Sans_JP'] mb-1">
                  {step.verb}
                </p>
                <h3 className="text-[0.95rem] font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-3 group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {step.title}
                </h3>
                <p className="text-[0.83rem] text-gray-600 leading-relaxed flex-1 font-['Noto_Sans_JP']">
                  {step.desc}
                </p>

                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6">
                    <div className="w-0.5 h-8 bg-[#2C3E30]/10" />
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 補足文 */}
        <FadeIn delay={350}>
          <p className="text-center text-[0.8rem] text-gray-400 font-['Noto_Sans_JP'] leading-relaxed mb-14">
            より具体的な業務内容や社内資料、顧客情報を含むお話は、<br className="hidden md:block" />
            必要に応じてNDA締結後に進めます。
          </p>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={450}>
          <div className="text-center">
            <button
              ref={triggerRef}
              onClick={openModal}
              className="inline-block px-10 py-4 bg-[#2C3E30] text-white font-['Noto_Sans_JP'] font-bold text-[0.95rem] rounded-sm hover:bg-[#3A5240] transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E30] focus:ring-offset-2"
            >
              まずは相談する（無料）
            </button>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
