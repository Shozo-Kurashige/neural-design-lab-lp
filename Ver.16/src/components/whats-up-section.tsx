/**
 * WhatsUpSection — Ver.16
 * 実績(Case Study) / お知らせ(News) / コラム(Column) を統合した
 * "NDLは常に動いている" を体現するダイナミックセクション
 */
import React, { useEffect, useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { ArrowRight, Zap, BookOpen, Award, ChevronRight } from "lucide-react";
import { getAllPosts } from "@/lib/wordpress";

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────
type Category = "case-study" | "news" | "column";
type FilterTab = "all" | Category;

type WhatsUpItem = {
  id: string;
  category: Category;
  title: string;
  snippet: string; // ~30文字
  imageUrl?: string;
  date: string;
  url?: string;
  tag?: string;
};

// ─────────────────────────────────────────
// 静的データ：実績 (Case Study)
// ─────────────────────────────────────────
const CASE_STUDIES: WhatsUpItem[] = [
  {
    id: "cs-001",
    category: "case-study",
    title: "戦略マトリクスAIソルバー",
    snippet: "経営判断を4象限で即可視化するWebアプリ。",
    imageUrl: undefined,
    date: "2026-03-15",
    url: "#",
    tag: "CASE STUDY",
  },
  {
    id: "cs-002",
    category: "case-study",
    title: "Rock Spirits 公式サイト",
    snippet: "飲食店のブランドをゼロから設計した事例。",
    imageUrl: undefined,
    date: "2026-02-20",
    url: "#",
    tag: "CASE STUDY",
  },
  {
    id: "cs-003",
    category: "case-study",
    title: "TeamMood Report",
    snippet: "チームの空気を数値で掴む組織診断ツール。",
    imageUrl: undefined,
    date: "2026-01-10",
    url: "#",
    tag: "CASE STUDY",
  },
];

// ─────────────────────────────────────────
// Tab 定義
// ─────────────────────────────────────────
const TABS: { key: FilterTab; label: string; icon: React.ReactNode }[] = [
  { key: "all",        label: "ALL",     icon: <Zap className="w-3.5 h-3.5" /> },
  { key: "case-study", label: "実績",    icon: <Award className="w-3.5 h-3.5" /> },
  { key: "news",       label: "お知らせ", icon: <ChevronRight className="w-3.5 h-3.5" /> },
  { key: "column",     label: "Column",  icon: <BookOpen className="w-3.5 h-3.5" /> },
];

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ja-JP").replace(/\//g, ".");
}

function truncate(str: string, len = 32) {
  if (!str) return "";
  const plain = str.replace(/<[^>]+>/g, "");
  return plain.length > len ? plain.slice(0, len) + "…" : plain;
}

// ─────────────────────────────────────────
// Card Components
// ─────────────────────────────────────────

/** 実績カード：ビジュアル大きく、ゴールドボーダー */
function CaseStudyCard({ item, featured }: { item: WhatsUpItem; featured?: boolean }) {
  return (
    <a
      href={item.url || "#"}
      target={item.url && item.url !== "#" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`group flex flex-col bg-white border border-[#D4AF37]/30 rounded-sm shadow-sm
        hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden
        ${featured ? "md:col-span-2 lg:col-span-2" : ""}`}
    >
      {/* アイキャッチ */}
      <div className={`relative overflow-hidden bg-[#1a2530] ${featured ? "aspect-[16/7]" : "aspect-video"}`}>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-60">
            <Award className="w-10 h-10 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest">CASE STUDY</span>
          </div>
        )}
        {/* ゴールドボーダー：左端 */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]" />
        {/* バッジ */}
        <span className="absolute top-3 right-3 bg-[#D4AF37] text-white text-[10px] font-bold
          px-2 py-0.5 tracking-widest rounded-sm">
          CASE STUDY
        </span>
      </div>

      {/* テキスト */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className={`font-['Noto_Serif_JP'] font-bold text-[#2C3E30] mb-2 leading-snug
          group-hover:text-[#D4AF37] transition-colors
          ${featured ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{item.snippet}</p>
        <div className="mt-4 flex items-center justify-between">
          <time className="text-xs text-gray-400">{formatDate(item.date)}</time>
          <span className="flex items-center gap-1 text-xs font-bold text-[#2C3E30]
            group-hover:text-[#D4AF37] transition-colors">
            詳しく見る <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </a>
  );
}

/** お知らせカード：コンパクト、[UPDATE]タグ、鮮度強調 */
function NewsCard({ item }: { item: WhatsUpItem }) {
  const isNew = (new Date().getTime() - new Date(item.date).getTime()) < 1000 * 60 * 60 * 24 * 30;

  return (
    <a
      href={item.url || "#"}
      target={item.url ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group flex flex-col bg-[#FDFBF7] border border-[#2C3E30]/10 rounded-sm
        hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* アイキャッチ */}
      <div className="aspect-video bg-[#EEF0ED] overflow-hidden relative">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-[#2C3E30]/30" />
          </div>
        )}
        {isNew && (
          <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-bold
            px-1.5 py-0.5 rounded-sm tracking-wider animate-pulse">
            NEW
          </span>
        )}
      </div>

      {/* テキスト */}
      <div className="p-4 flex flex-col flex-1">
        {/* バッジ行 */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-[#2C3E30]/8 text-[#2C3E30] border border-[#2C3E30]/15
            text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider">
            {item.tag || "お知らせ"}
          </span>
          <time className="text-[11px] text-gray-400 ml-auto">{formatDate(item.date)}</time>
        </div>

        <h3 className="text-sm font-bold text-[#2C3E30] leading-snug mb-2
          group-hover:text-[#D4AF37] transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-2">{item.snippet}</p>

        {item.url && (
          <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#2C3E30]/60
            group-hover:text-[#D4AF37] transition-colors">
            READ <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </a>
  );
}

/** Columnカード：ダーク背景、サイバーパンク/フューチャリスティック */
function ColumnCard({ item }: { item: WhatsUpItem }) {
  return (
    <a
      href={item.url || "#"}
      target={item.url ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group flex flex-col bg-[#0f1923] rounded-sm overflow-hidden
        hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] hover:-translate-y-1
        transition-all duration-300 border border-teal-500/10"
    >
      {/* アイキャッチ */}
      <div className="aspect-video overflow-hidden relative bg-[#1a2530]">
        {item.imageUrl ? (
          <>
            <img src={item.imageUrl} alt={item.title}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90
                group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1923] via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* グリッドライン演出 */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(45,212,191,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.5) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <BookOpen className="w-8 h-8 text-teal-400/40 relative z-10" />
          </div>
        )}
        {/* COLUMN ラベル */}
        <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-teal-400 text-[10px] font-bold tracking-[0.2em] font-mono">
            COLUMN
          </span>
        </div>
      </div>

      {/* テキスト */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-white/90 leading-snug mb-3
          group-hover:text-teal-300 transition-colors line-clamp-2 font-['Noto_Serif_JP']">
          {item.title}
        </h3>

        {/* スニペット：モノスペース・アクセントカラー */}
        <p className="text-xs text-teal-400/70 font-mono leading-relaxed flex-1 line-clamp-2
          border-l-2 border-teal-500/30 pl-2">
          {item.snippet}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <time className="text-[10px] text-white/30 font-mono">{formatDate(item.date)}</time>
          <span className="text-[11px] text-teal-400/60 group-hover:text-teal-300
            flex items-center gap-1 transition-colors font-mono">
            READ <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────
export function WhatsUpSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [newsItems, setNewsItems] = useState<WhatsUpItem[]>([]);
  const [columnItems, setColumnItems] = useState<WhatsUpItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingColumns, setLoadingColumns] = useState(true);

  // ── microCMS: お知らせ取得 ──
  useEffect(() => {
    const domain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
    const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

    if (!domain || !apiKey) {
      setLoadingNews(false);
      return;
    }

    fetch(`https://${domain}.microcms.io/api/v1/news?limit=5`, {
      headers: { "X-MICROCMS-API-KEY": apiKey },
    })
      .then((r) => r.json())
      .then((data) => {
        const items: WhatsUpItem[] = (data.contents || []).map((n: any) => ({
          id: n.id,
          category: "news" as Category,
          title: n.title,
          snippet: truncate(n.body || n.excerpt || n.title, 32),
          imageUrl: n.eyecatch?.url,
          date: n.publishedDate || n.publishedAt,
          url: n.url,
          tag: getCategoryName(n.category),
        }));
        setNewsItems(items);
      })
      .catch((e) => console.error("microCMS取得エラー:", e))
      .finally(() => setLoadingNews(false));
  }, []);

  // ── WordPress: コラム取得 ──
  useEffect(() => {
    getAllPosts()
      .then((data) => {
        if (!data) return;
        const items: WhatsUpItem[] = data.slice(0, 4).map((p: any) => ({
          id: p.slug,
          category: "column" as Category,
          title: p.title,
          snippet: truncate(p.excerpt || p.title, 32),
          imageUrl: p.featuredImage?.node?.sourceUrl,
          date: p.date,
          url: `/blog/${p.slug}`,
          tag: "Column",
        }));
        setColumnItems(items);
      })
      .catch((e) => console.error("WordPress取得エラー:", e))
      .finally(() => setLoadingColumns(false));
  }, []);

  // ── 全アイテム統合 & ソート ──
  const allItems: WhatsUpItem[] = [...CASE_STUDIES, ...newsItems, ...columnItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filtered =
    activeTab === "all" ? allItems : allItems.filter((i) => i.category === activeTab);

  const isLoading = loadingNews || loadingColumns;

  // ── カウント（タブバッジ用） ──
  const counts = {
    all: allItems.length,
    "case-study": CASE_STUDIES.length,
    news: newsItems.length,
    column: columnItems.length,
  };

  return (
    <section
      id="whats-up"
      className="py-24 bg-[#F5F7F6] scroll-mt-20 border-t border-[#2C3E30]/8"
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── ヘッダー ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <FadeIn>
            <div>
              <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                WHAT'S UP
              </span>
              <h2 className="text-3xl md:text-4xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
                NDLの今
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                実績・お知らせ・思考の断片をリアルタイムに。
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ── フィルタータブ ── */}
        <FadeIn delay={100}>
          <div className="flex flex-wrap gap-2 mb-10">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-sm
                  border transition-all duration-200
                  ${
                    activeTab === tab.key
                      ? "bg-[#2C3E30] text-white border-[#2C3E30] shadow-sm"
                      : "bg-white text-[#2C3E30]/60 border-[#2C3E30]/20 hover:border-[#2C3E30]/60 hover:text-[#2C3E30]"
                  }`}
              >
                {tab.icon}
                {tab.label}
                {counts[tab.key] > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-normal
                      ${activeTab === tab.key
                        ? "bg-white/20 text-white"
                        : "bg-[#2C3E30]/8 text-[#2C3E30]/50"
                      }`}
                  >
                    {counts[tab.key]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* ── グリッド ── */}
        {isLoading ? (
          /* スケルトンローダー */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-sm bg-white animate-pulse">
                <div className="aspect-video bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>現在表示できるコンテンツがありません。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, index) => {
              /* ALL表示時：最初のcase-studyをfeatured（2カラム幅）に */
              const isFeatured =
                activeTab === "all" &&
                item.category === "case-study" &&
                index === filtered.findIndex((i) => i.category === "case-study");

              return (
                <FadeIn
                  key={item.id}
                  delay={index * 60}
                  className={isFeatured ? "md:col-span-2 lg:col-span-2" : ""}
                >
                  {item.category === "case-study" && (
                    <CaseStudyCard item={item} featured={isFeatured} />
                  )}
                  {item.category === "news" && <NewsCard item={item} />}
                  {item.category === "column" && <ColumnCard item={item} />}
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// ── microCMS カテゴリ名ユーティリティ ──
function getCategoryName(cat?: any): string {
  if (!cat) return "お知らせ";
  if (Array.isArray(cat)) return cat[0]?.name || "お知らせ";
  return typeof cat === "object" ? cat.name || "お知らせ" : String(cat);
}
