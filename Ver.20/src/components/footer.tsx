import React from "react";
import { Instagram, ArrowLeft } from "lucide-react";

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Footer({ simple = false }: { simple?: boolean }) {
  const currentYear = new Date().getFullYear();

  if (simple) {
    return (
      <footer className="bg-[#2C3E30] text-white py-8 border-t border-[#D4AF37]/20">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} Neural Design Lab. All rights reserved.
          </p>
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            TOPページへ戻る
          </a>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#2C3E30] text-white py-16 border-t border-[#D4AF37]/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-['Noto_Serif_JP'] font-bold tracking-widest mb-4">
              Neural Design Lab.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              現場を知る、明日を変える。
              <br />
              最新テクノロジーと現場叩き上げの知見で、
              <br />
              地方・中小企業の「確かな一歩」を共に創ります。
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/neural_design_lab/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-white transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://x.com/design20251111"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-white transition-all duration-300 group"
                aria-label="X (Twitter)"
              >
                <XIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase mb-6">
              SITEMAP
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="/#philosophy" className="hover:text-[#D4AF37] transition-colors">
                  大切にしていること
                </a>
              </li>
              <li>
                <a href="/#whats-up" className="hover:text-[#D4AF37] transition-colors">
                  最新情報
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-[#D4AF37] transition-colors">
                  サービス
                </a>
              </li>
              <li>
                <a href="/#skills" className="hover:text-[#D4AF37] transition-colors">
                  技術・セキュリティ
                </a>
              </li>
              <li>
                <a href="/#process" className="hover:text-[#D4AF37] transition-colors">
                  導入の流れ
                </a>
              </li>
              <li>
                <a href="/#price" className="hover:text-[#D4AF37] transition-colors">
                  料金
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase mb-6">
              CONTACT
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="/#about"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  私たちについて
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  お問い合わせフォーム
                </a>
              </li>
              <li className="pt-2">
                <span className="block text-xs text-gray-500 mb-1">E-mail</span>
                <a
                  href="mailto:info@neuraldesignlab.jp"
                  className="hover:text-[#D4AF37] transition-colors font-medium"
                >
                  info@neuraldesignlab.jp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Neural Design Lab. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="hover:text-[#D4AF37] transition-colors"
            >
              プライバシーポリシー
            </a>
            <a
              href="/ai-governance"
              className="hover:text-[#D4AF37] transition-colors"
            >
              AIガバナンス方針
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
