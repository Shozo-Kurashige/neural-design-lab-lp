"use client";

import React, { useEffect, useState } from "react";
import { AiDiagnostic } from "@/components/ai-diagnostic";

type NavItem =
  | { kind: "anchor"; id: string; label: string }
  | { kind: "action"; label: string; action: "ai-diagnostic" }
  | { kind: "link"; href: string; label: string };

const navItems: NavItem[] = [
  { kind: "anchor", id: "ndl-about",  label: "トップ" },
  { kind: "action", label: "AI診断",   action: "ai-diagnostic" },
  { kind: "link",   href: "/president-excel",  label: "改善モデル01" },
  { kind: "link",   href: "/for-construction", label: "改善モデル02" },
  { kind: "link",   href: "/maesabaki",         label: "TEC企業様" },
  { kind: "link",   href: "/ai-search-llmo",   label: "AIサーチ・LLMO" },
  { kind: "anchor", id: "contact",    label: "お問い合わせ" },
];

const anchorIds = navItems
  .filter((n): n is Extract<NavItem, { kind: "anchor" }> => n.kind === "anchor")
  .map((n) => n.id);

export function HomePageNav() {
  const [activeId, setActiveId] = useState<string>("ndl-about");
  const [diagOpen, setDiagOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  // #challenges が画面上部に達したらナビを表示
  useEffect(() => {
    const checkScroll = () => {
      const el = document.getElementById("challenges");
      if (!el) return;
      setNavVisible(el.getBoundingClientRect().top <= 80);
    };
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    anchorIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* PC専用: フロート型セクションナビ */}
      <nav
        aria-label="ページ内ナビゲーション"
        className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-[90] transition-all duration-500"
        style={{
          opacity: navVisible ? 1 : 0,
          pointerEvents: navVisible ? "auto" : "none",
          transform: `translateY(-50%) translateX(${navVisible ? "0" : "12px"})`,
        }}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-sm border border-[#2C3E30]/10 shadow-lg py-5 px-6">
          <ul className="space-y-3.5">
            {navItems.map((item, i) => {
              const isActive =
                item.kind === "anchor" && activeId === item.id;

              const dotCls = `w-2 h-2 rounded-full shrink-0 transition-colors ${
                isActive ? "bg-[#D4AF37]" : "bg-gray-300"
              }`;
              const textCls = `flex items-center gap-3 text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? "text-[#D4AF37] font-bold"
                  : "text-gray-400 hover:text-[#2C3E30]"
              }`;

              if (item.kind === "anchor") {
                return (
                  <li key={i}>
                    <a href={`#${item.id}`} className={textCls}>
                      <span className={dotCls} />
                      {item.label}
                    </a>
                  </li>
                );
              }

              if (item.kind === "action") {
                return (
                  <li key={i}>
                    <button
                      onClick={() => setDiagOpen(true)}
                      className={`${textCls} cursor-pointer`}
                    >
                      <span className={dotCls} />
                      {item.label}
                    </button>
                  </li>
                );
              }

              return (
                <li key={i}>
                  <a href={item.href} className={textCls}>
                    <span className={dotCls} />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <AiDiagnostic isOpen={diagOpen} onClose={() => setDiagOpen(false)} />
    </>
  );
}
