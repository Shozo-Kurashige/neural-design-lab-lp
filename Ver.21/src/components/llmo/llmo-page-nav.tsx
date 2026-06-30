"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";

const navItems = [
  { id: "hero", label: "トップ" },
  { id: "llmo-explained", label: "LLMOとは" },
  { id: "diagnosis", label: "自社診断" },
  { id: "forms", label: "4つの型" },
  { id: "before-after", label: "Before/After" },
  { id: "support", label: "支援内容" },
  { id: "flow", label: "相談の流れ" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "無料相談" },
];

export function LlmoPageNav() {
  const [activeId, setActiveId] = useState(navItems[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 共通ヘッダーバー：PC=ロゴ+TOPへ戻る／モバイル=ロゴ+ハンバーガー */}
      <header className="fixed top-0 left-0 right-0 z-[100] py-4 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="/" className="group">
            <h1 className="text-xl md:text-2xl font-['Noto_Serif_JP'] font-bold tracking-wider text-[#2C3E30]">
              Neural Design Lab.
            </h1>
          </a>

          <a
            href="/"
            className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-[#2C3E30] text-white text-sm font-bold rounded-sm hover:bg-[#3A5240] transition-colors shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            TOPへ戻る
          </a>

          <button
            className="lg:hidden p-2 text-[#2C3E30] hover:bg-gray/10 rounded-sm transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="メニューを開く"
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* PC専用: フロート型セクションナビ */}
      <nav
        aria-label="ページ内ナビゲーション"
        className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-[90]"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-sm border border-[#2C3E30]/10 shadow-lg py-4 px-5">
          <ul className="space-y-2.5">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`flex items-center gap-2.5 text-xs whitespace-nowrap transition-colors ${
                      isActive
                        ? "text-[#D4AF37] font-bold"
                        : "text-gray-400 hover:text-[#2C3E30]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                        isActive ? "bg-[#D4AF37]" : "bg-gray-300"
                      }`}
                    />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* モバイル専用: ドロワーメニュー */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-[110] bg-black/30 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed inset-y-0 right-0 z-[120] w-3/4 max-w-sm bg-white shadow-2xl border-l border-gray-100 flex flex-col">
            <div className="flex items-center justify-end p-6 border-b border-gray-100">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#2C3E30] hover:bg-gray-100 rounded-full transition-colors"
                aria-label="メニューを閉じる"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-6 flex flex-col">
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-3.5 text-base font-['Noto_Serif_JP'] font-bold border-b border-gray-50 transition-colors ${
                      isActive ? "text-[#D4AF37]" : "text-[#2C3E30]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="p-6 border-t border-gray-100 bg-[#FDFBF7]">
              <a
                href="/"
                className="flex items-center justify-center gap-2 w-full text-center py-4 bg-[#2C3E30] text-white text-base font-bold rounded-sm shadow-md active:bg-[#3A5240] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                TOPへ戻る
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
