import React, { useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";

export function Header({
  simple = false,
  alwaysWhite = false,
}: {
  simple?: boolean;
  alwaysWhite?: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (simple) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[100] py-4 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="/" className="group">
            <h1 className="text-xl md:text-2xl font-['Noto_Serif_JP'] font-bold tracking-wider text-[#2C3E30]">
              Neural Design Lab.
            </h1>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#2C3E30] text-white text-sm font-bold rounded-sm hover:bg-[#3A5240] transition-colors shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            TOPへ戻る
          </a>
        </div>
      </header>
    );
  }

  const menuItems = [
    { label: "大切にしていること", href: "/#philosophy" },
    { label: "最新情報", href: "/#whats-up" },
    { label: "サービス", href: "/#services" },
    { label: "技術・セキュリティ", href: "/#skills" },
    { label: "導入の流れ", href: "/#process" },
    { label: "料金", href: "/#price" },
    { label: "私たちについて", href: "/#about" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-md shadow-sm py-4 border-b border-gray-100">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
            className="relative group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <h1 className="text-xl md:text-2xl font-['Noto_Serif_JP'] font-bold tracking-wider text-[#2C3E30]">
              Neural Design Lab.
            </h1>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm font-medium text-[#2C3E30] hover:text-[#D4AF37] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="/#contact"
              className="px-6 py-2.5 bg-[#2C3E30] text-white text-sm font-bold rounded-sm hover:bg-[#3A5240] transition-colors shadow-sm hover:shadow-md"
            >
              お問い合わせ
            </a>
          </nav>

          <button
            className="lg:hidden p-2 text-[#2C3E30] hover:bg-gray/10 rounded-sm transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="メニューを開く"
          >
            <Menu />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <div className="fixed inset-y-0 right-0 z-[120] w-3/4 max-w-sm bg-white/40 backdrop-blur-xl shadow-2xl border-l border-white/30 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-end p-6 border-b border-gray-100">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#2C3E30] hover:bg-gray-100 rounded-full transition-colors"
                aria-label="メニューを閉じる"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-lg font-['Noto_Serif_JP'] font-bold text-[#2C3E30] hover:text-[#D4AF37] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="p-6 border-t border-gray-100 bg-[#FDFBF7]">
              <a
                href="/#contact"
                className="block w-full text-center py-4 bg-[#2C3E30] text-white text-base font-bold rounded-sm shadow-md active:bg-[#3A5240] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
