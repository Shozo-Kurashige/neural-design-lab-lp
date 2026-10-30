"use client";

import React, { useEffect, useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { ArrowRight } from "lucide-react";

type ListItem = {
  id: string;
  title: string;
  date: string;
  url?: string;
};

type SectionState = { items: ListItem[]; loading: boolean; error: boolean };

const STATIC_WORKS: ListItem[] = [
  {
    id: "cs-001",
    title: "戦略マトリクスAIソルバー",
    date: "2026-03-15",
    url: "https://github.com/Shozo-Kurashige",
  },
  {
    id: "cs-002",
    title: "Rock Spirits 公式サイト",
    date: "2026-02-20",
  },
  {
    id: "cs-003",
    title: "TeamMood Report",
    date: "2026-01-10",
    url: "https://github.com/Shozo-Kurashige",
  },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function ItemList({ items, loading, error }: SectionState) {
  if (loading) {
    return (
      <div className="pl-6 border-l-2 border-[#D4AF37]/30 space-y-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-8 animate-pulse">
            <div className="h-3.5 w-24 bg-[#D4AF37]/20 rounded shrink-0" />
            <div className="h-3.5 w-52 bg-[#2C3E30]/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error || items.length === 0) {
    return (
      <p className="pl-6 text-sm text-gray-400">現在取得できません。</p>
    );
  }

  return (
    <div className="pl-6 border-l-2 border-[#D4AF37]/30 space-y-5">
      {items.map((item, i) => (
        <FadeIn key={item.id} delay={i * 70}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8">
            <time className="text-[#D4AF37] text-sm font-medium tracking-wider shrink-0 w-28">
              {formatDate(item.date)}
            </time>
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-[#2C3E30] font-medium
                  hover:text-[#D4AF37] transition-colors leading-relaxed"
              >
                {item.title}
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-0 -translate-x-1
                  group-hover/link:opacity-100 group-hover/link:translate-x-0
                  transition-all duration-200" />
              </a>
            ) : (
              <span className="text-[#2C3E30] font-medium leading-relaxed">{item.title}</span>
            )}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export function WhatsUpSection() {
  const [works, setWorks] = useState<SectionState>({ items: [], loading: true, error: false });
  const [news,  setNews]  = useState<SectionState>({ items: [], loading: true, error: false });

  const domain        = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN as string;
  const apiKey        = import.meta.env.VITE_MICROCMS_API_KEY as string;
  const worksEndpoint = ((import.meta.env as any).VITE_MICROCMS_WORKS_ENDPOINT as string) || "works";

  useEffect(() => {
    if (!domain || !apiKey) {
      setWorks({ items: STATIC_WORKS, loading: false, error: false });
      return;
    }
    fetch(`https://${domain}.microcms.io/api/v1/${worksEndpoint}?limit=5`, {
      headers: { "X-MICROCMS-API-KEY": apiKey },
    })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => {
        const items: ListItem[] = (data.contents || []).map((w: any) => ({
          id:    w.id,
          title: w.title,
          date:  w.publishedDate || w.publishedAt,
          url:   w.url || w.link,
        }));
        setWorks({ items: items.length > 0 ? items : STATIC_WORKS, loading: false, error: false });
      })
      .catch(() => setWorks({ items: STATIC_WORKS, loading: false, error: false }));
  }, []);

  useEffect(() => {
    if (!domain || !apiKey) {
      setNews({ items: [], loading: false, error: true });
      return;
    }
    fetch(`https://${domain}.microcms.io/api/v1/news?limit=5`, {
      headers: { "X-MICROCMS-API-KEY": apiKey },
    })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => {
        const items: ListItem[] = (data.contents || []).map((n: any) => ({
          id:    n.id,
          title: n.title,
          date:  n.publishedDate || n.publishedAt,
          url:   n.url,
        }));
        setNews({ items, loading: false, error: false });
      })
      .catch(() => setNews({ items: [], loading: false, error: true }));
  }, []);

  return (
    <section id="whats-up" className="py-20 bg-white border-t border-[#2C3E30]/10 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* セクションヘッダー */}
        <FadeIn>
          <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3">
            WHAT'S UP
          </span>
          <h2 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-16">
            NDLの今
          </h2>
        </FadeIn>

        {/* 実績 */}
        <div className="mb-14">
          <FadeIn>
            <div className="flex items-baseline gap-4 mb-7">
              <h3 className="text-2xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">実績</h3>
              <span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase">Case Study</span>
            </div>
          </FadeIn>
          <ItemList {...works} />
        </div>

        {/* 区切り */}
        <div className="border-t border-[#2C3E30]/10 mb-14" />

        {/* お知らせ */}
        <div>
          <FadeIn>
            <div className="flex items-baseline gap-4 mb-7">
              <h3 className="text-2xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">お知らせ</h3>
              <span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase">News</span>
            </div>
          </FadeIn>
          <ItemList {...news} />
        </div>

      </div>
    </section>
  );
}
