/**
 * WhatsUpSection — Ver.16 (ハイブリッド・ヘッドレス 3カラム構成)
 *
 * アーキテクチャ:
 *   Column 1 [実績]      ← microCMS /works
 *   Column 2 [お知らせ]  ← microCMS /news
 *   Column 3 [Column]   ← WordPress REST API /wp-json/wp/v2/posts
 *
 * 各カラムは独立してデータフェッチ・ローディング管理するため、
 * 一方のAPIがダウンしても他カラムのレンダリングをブロックしない。
 */
import React, { useEffect, useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { ArrowRight, Award, Bell, BookOpen, Zap } from "lucide-react";

// ─────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────

/** HTMLタグを除去してプレーンテキスト化（XSSリスクなし） */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** 文字数制限付きトリミング */
function truncate(str: string, len = 48): string {
  const plain = stripHtml(str);
  return plain.length > len ? plain.slice(0, len) + "…" : plain;
}

/** 日付フォーマット */
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).replace(/\//g, ".");
}

/** microCMS カテゴリ名の正規化 */
function normalizeMicroCmsCategory(cat?: any): string {
  if (!cat) return "お知らせ";
  if (Array.isArray(cat)) return cat[0]?.name || "お知らせ";
  return typeof cat === "object" ? cat.name || "お知らせ" : String(cat);
}

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

type CardItem = {
  id: string;
  title: string;
  snippet: string;
  imageUrl?: string;
  date: string;
  url?: string;
  badge?: string;
};

type ColumnState = {
  items: CardItem[];
  loading: boolean;
  error: boolean;
};

const INITIAL_STATE: ColumnState = { items: [], loading: true, error: false };

// ─────────────────────────────────────────────────────────
// フォールバック：静的実績データ
// microCMS worksエンドポイント未作成時に表示
// ─────────────────────────────────────────────────────────
const STATIC_WORKS: CardItem[] = [
  {
    id: "cs-001",
    title: "戦略マトリクスAIソルバー",
    snippet: "現状課題と理想のギャップを4象限で即可視化。経営会議の議論を構造化するWebアプリ。",
    date: "2026-03-15",
    url: "https://github.com/Shozo-Kurashige",
    badge: "Web App",
  },
  {
    id: "cs-002",
    title: "Rock Spirits 公式サイト",
    snippet: "飲食店のブランドをゼロから設計。予約導線・SNS連携まで一気通貫で構築。",
    date: "2026-02-20",
    url: "#",
    badge: "LP制作",
  },
  {
    id: "cs-003",
    title: "TeamMood Report",
    snippet: "チームの空気を毎日数値化。Slackと連携した継続型の組織診断ツール。",
    date: "2026-01-10",
    url: "https://github.com/Shozo-Kurashige",
    badge: "SaaS",
  },
];

// ─────────────────────────────────────────────────────────
// Card Components
// ─────────────────────────────────────────────────────────

/** 実績カード: ゴールドアクセント、ビジュアル強調 */
function CaseStudyCard({ item }: { item: CardItem }) {
  return (
    <a
      href={item.url || "#"}
      target={item.url && !item.url.startsWith("#") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group flex flex-col bg-white border-l-4 border-[#D4AF37] rounded-sm
        shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
    >
      {/* アイキャッチ */}
      <div className="aspect-video bg-[#1a2530] overflow-hidden relative">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-40">
            <Award className="w-8 h-8 text-[#D4AF37]" />
          </div>
        )}
        {item.badge && (
          <span className="absolute top-2 right-2 bg-[#D4AF37] text-white
            text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-widest">
            {item.badge}
          </span>
        )}
      </div>

      {/* テキスト */}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-sm font-bold text-[#2C3E30] leading-snug mb-2
          group-hover:text-[#D4AF37] transition-colors font-['Noto_Serif_JP'] line-clamp-2">
          {item.title}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
          {item.snippet}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <time className="text-[10px] text-gray-400">{formatDate(item.date)}</time>
          <span className="flex items-center gap-1 text-[10px] font-bold text-[#2C3E30]/60
            group-hover:text-[#D4AF37] transition-colors">
            詳しく <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </a>
  );
}

/** お知らせカード: コンパクト、バッジ、鮮度感 */
function NewsCard({ item }: { item: CardItem }) {
  const isNew =
    new Date().getTime() - new Date(item.date).getTime() < 1000 * 60 * 60 * 24 * 30;

  return (
    <a
      href={item.url || "#"}
      target={item.url ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group flex flex-col bg-white border border-gray-100 rounded-sm
        hover:border-[#2C3E30]/20 hover:shadow-sm hover:-translate-y-0.5
        transition-all duration-300 overflow-hidden"
    >
      {/* アイキャッチ */}
      <div className="aspect-video bg-[#EEF0ED] overflow-hidden relative">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100
              group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Bell className="w-6 h-6 text-[#2C3E30]/20" />
          </div>
        )}
        {isNew && (
          <span className="absolute top-2 left-2 bg-emerald-500 text-white
            text-[9px] font-bold px-1.5 py-0.5 rounded-sm tracking-wider">
            NEW
          </span>
        )}
      </div>

      {/* テキスト */}
      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          {item.badge && (
            <span className="bg-[#2C3E30]/6 text-[#2C3E30] border border-[#2C3E30]/12
              text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider shrink-0">
              {item.badge}
            </span>
          )}
          <time className="text-[10px] text-gray-400 ml-auto">{formatDate(item.date)}</time>
        </div>
        <h4 className="text-sm font-bold text-[#2C3E30] leading-snug mb-1.5
          group-hover:text-[#D4AF37] transition-colors line-clamp-2">
          {item.title}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {item.snippet}
        </p>
        {item.url && (
          <div className="mt-2 flex items-center gap-1 text-[10px] text-[#2C3E30]/50
            group-hover:text-[#D4AF37] transition-colors font-bold">
            READ <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        )}
      </div>
    </a>
  );
}

/** Columnカード: ダーク背景、サイバーパンク
 *  ホバー設計メモ:
 *  - bg: #0f1923 → #141e2b（微かに明るく）
 *  - 左アクセントボーダー: teal-800/40 → teal-400/70（強調）
 *  - コンテンツ全体を -translate-y-1（4px上）でスライド
 *  - モバイル(touch): CSS :hover はタップ離脱で即解除 → 残像なし
 */
function ColumnCard({ item }: { item: CardItem }) {
  return (
    <a
      href={item.url || "#"}
      target={item.url ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group flex flex-col bg-[#0f1923] hover:bg-[#141e2b]
        rounded-sm overflow-hidden
        border border-teal-900/40 border-l-2 border-l-teal-800/40
        hover:border-teal-900/60 hover:border-l-teal-400/70
        hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]
        transition-all duration-300"
    >
      {/* サムネ非表示 / COLUMNラベルのみ表示 */}
      <div className="px-4 pt-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
        <span className="text-teal-400 text-[9px] font-bold tracking-[0.2em] font-mono">
          {item.badge || "COLUMN"}
        </span>
      </div>

      {/* テキスト（ホバーで上スライド） */}
      <div className="p-4 flex flex-col flex-1
        translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
        <h4 className="text-sm font-bold text-white/85 leading-snug mb-3
          group-hover:text-teal-300 transition-colors duration-300
          font-['Noto_Serif_JP'] line-clamp-2">
          {item.title}
        </h4>
        {/* スニペット：モノスペース・左アクセントライン */}
        <p className="text-xs text-teal-400/65 font-mono leading-relaxed flex-1
          border-l-2 border-teal-800/60 group-hover:border-teal-400/50
          pl-2.5 line-clamp-3 transition-colors duration-300">
          {item.snippet}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <time className="text-[10px] text-white/25 font-mono">{formatDate(item.date)}</time>
          <span className="text-[10px] text-teal-500/60 group-hover:text-teal-300
            flex items-center gap-1 transition-colors duration-300 font-mono">
            READ <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────────────────
// Skeleton Loader
// ─────────────────────────────────────────────────────────
function CardSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`rounded-sm overflow-hidden animate-pulse ${dark ? "bg-[#141e2b] border border-teal-900/30" : "bg-gray-100"}`}>
      {/* ライトカードのみアイキャッチ領域を表示（ダークはサムネなし） */}
      {!dark && <div className="aspect-video bg-gray-200" />}
      <div className="p-4 space-y-2">
        <div className={`h-2.5 rounded w-1/3 ${dark ? "bg-[#1a2530]" : "bg-gray-200"}`} />
        <div className={`h-4 rounded w-4/5 ${dark ? "bg-[#1a2530]" : "bg-gray-200"}`} />
        <div className={`h-3 rounded w-full ${dark ? "bg-[#1a2530]" : "bg-gray-200"}`} />
        <div className={`h-3 rounded w-2/3 ${dark ? "bg-[#1a2530]" : "bg-gray-200"}`} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Column Header
// ─────────────────────────────────────────────────────────
function ColumnHeader({
  icon,
  label,
  title,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  accent: string;
}) {
  return (
    <div className="mb-6 pb-4 border-b border-[#2C3E30]/10">
      <span className={`flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase mb-2 ${accent}`}>
        {icon}
        {label}
      </span>
      <h3 className="text-lg font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">{title}</h3>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────────────────
export function WhatsUpSection() {
  const [works, setWorks] = useState<ColumnState>(INITIAL_STATE);
  const [news, setNews] = useState<ColumnState>(INITIAL_STATE);
  const [columns, setColumns] = useState<ColumnState>(INITIAL_STATE);

  const domain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN as string;
  const apiKey = import.meta.env.VITE_MICROCMS_API_KEY as string;
  const worksEndpoint = import.meta.env.VITE_MICROCMS_WORKS_ENDPOINT as string || "works";
  const wpRestUrl = import.meta.env.VITE_WORDPRESS_REST_URL as string;

  // ── Column 1: microCMS 実績 ─────────────────────────────
  useEffect(() => {
    if (!domain || !apiKey) {
      // 環境変数未設定 → 静的フォールバック
      setWorks({ items: STATIC_WORKS, loading: false, error: false });
      return;
    }

    fetch(`https://${domain}.microcms.io/api/v1/${worksEndpoint}?limit=4`, {
      headers: { "X-MICROCMS-API-KEY": apiKey },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`microCMS works: ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const items: CardItem[] = (data.contents || []).map((w: any) => ({
          id: w.id,
          title: w.title,
          snippet: truncate(w.content || w.description || w.snippet || w.title, 60),
          imageUrl: w.image?.url || w.eyecatch?.url || w.thumbnail?.url,
          date: w.publishedDate || w.publishedAt,
          url: w.url || w.link,
          badge: normalizeMicroCmsCategory(w.category) || "実績",
        }));
        // microCMSにコンテンツがなければ静的データをフォールバック
        setWorks({ items: items.length > 0 ? items : STATIC_WORKS, loading: false, error: false });
      })
      .catch((e) => {
        console.warn("microCMS works 取得失敗（静的データを使用）:", e.message);
        setWorks({ items: STATIC_WORKS, loading: false, error: false });
      });
  }, []);

  // ── Column 2: microCMS お知らせ ─────────────────────────
  useEffect(() => {
    if (!domain || !apiKey) {
      setNews({ items: [], loading: false, error: true });
      return;
    }

    fetch(`https://${domain}.microcms.io/api/v1/news?limit=5`, {
      headers: { "X-MICROCMS-API-KEY": apiKey },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`microCMS news: ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const items: CardItem[] = (data.contents || []).map((n: any) => ({
          id: n.id,
          title: n.title,
          snippet: truncate(n.body || n.excerpt || n.title, 60),
          imageUrl: n.image?.url || n.eyecatch?.url,
          date: n.publishedDate || n.publishedAt,
          url: n.url,
          badge: normalizeMicroCmsCategory(n.category),
        }));
        setNews({ items, loading: false, error: false });
      })
      .catch((e) => {
        console.error("microCMS news 取得失敗:", e.message);
        setNews({ items: [], loading: false, error: true });
      });
  }, []);

  // ── Column 3: WordPress REST API コラム ─────────────────
  useEffect(() => {
    const baseUrl = wpRestUrl || (() => {
      // VITE_WORDPRESS_API_URL から REST URLを導出 (fallback)
      const graphqlUrl = import.meta.env.VITE_WORDPRESS_API_URL as string;
      return graphqlUrl ? graphqlUrl.replace("/graphql", "/wp-json/wp/v2") : "";
    })();

    if (!baseUrl) {
      setColumns({ items: [], loading: false, error: true });
      return;
    }

    fetch(`${baseUrl}/posts?per_page=4&_embed&_fields=id,date,slug,title,excerpt,_links,_embedded`)
      .then((r) => {
        if (!r.ok) throw new Error(`WP REST: ${r.status}`);
        return r.json();
      })
      .then((posts: any[]) => {
        const items: CardItem[] = posts.map((p) => {
          // アイキャッチ画像：_embed から取得
          const media = p._embedded?.["wp:featuredmedia"];
          const imageUrl = media?.[0]?.source_url;

          return {
            id: String(p.id),
            title: stripHtml(p.title?.rendered || ""),
            snippet: truncate(p.excerpt?.rendered || "", 60),
            imageUrl,
            date: p.date,
            url: `/blog/${p.slug}`,
            badge: "Column",
          };
        });
        setColumns({ items, loading: false, error: false });
      })
      .catch((e) => {
        console.error("WordPress REST 取得失敗:", e.message);
        setColumns({ items: [], loading: false, error: true });
      });
  }, []);

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────
  return (
    <section
      id="whats-up"
      className="py-24 bg-[#F5F7F6] scroll-mt-20 border-t border-[#2C3E30]/8"
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* セクションヘッダー */}
        <FadeIn>
          <div className="mb-14">
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase
              flex items-center gap-2 mb-3">
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

        {/* 3カラムグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start">

          {/* ── Column 1: 実績 ── */}
          <FadeIn delay={0}>
            <div>
              <ColumnHeader
                icon={<Award className="w-3.5 h-3.5" />}
                label="Case Study"
                title="実績"
                accent="text-[#D4AF37]"
              />
              <div className="flex flex-col gap-4">
                {works.loading ? (
                  [0, 1, 2].map((i) => <CardSkeleton key={i} />)
                ) : works.items.length > 0 ? (
                  works.items.map((item) => (
                    <CaseStudyCard key={item.id} item={item} />
                  ))
                ) : (
                  <p className="text-xs text-gray-400 py-8 text-center">
                    準備中です。
                  </p>
                )}
              </div>
            </div>
          </FadeIn>

          {/* ── Column 2: お知らせ ── */}
          <FadeIn delay={100}>
            <div>
              <ColumnHeader
                icon={<Bell className="w-3.5 h-3.5" />}
                label="News"
                title="お知らせ"
                accent="text-emerald-600"
              />
              <div className="flex flex-col gap-4">
                {news.loading ? (
                  [0, 1, 2].map((i) => <CardSkeleton key={i} />)
                ) : news.error ? (
                  <p className="text-xs text-gray-400 py-8 text-center">
                    現在取得できません。
                  </p>
                ) : news.items.length > 0 ? (
                  news.items.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))
                ) : (
                  <p className="text-xs text-gray-400 py-8 text-center">
                    準備中です。
                  </p>
                )}
              </div>
            </div>
          </FadeIn>

          {/* ── Column 3: コラム ── */}
          <FadeIn delay={200}>
            {/* ダーク背景カラム */}
            <div className="bg-[#0a1018] rounded-sm p-5">
              {/* ColumnHeader をダーク向けにインライン定義 */}
              <div className="mb-6 pb-4 border-b border-teal-900/30">
                <span className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase mb-2 text-teal-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  Column
                </span>
                <h3 className="text-lg font-['Noto_Serif_JP'] font-bold text-white/80">
                  思考の断片
                </h3>
              </div>
              <div className="flex flex-col gap-4 -mt-2">
                {columns.loading ? (
                  [0, 1, 2].map((i) => <CardSkeleton key={i} dark />)
                ) : columns.error ? (
                  <p className="text-xs text-teal-400/40 py-8 text-center font-mono">
                    // connection failed
                  </p>
                ) : columns.items.length > 0 ? (
                  columns.items.map((item) => (
                    <ColumnCard key={item.id} item={item} />
                  ))
                ) : (
                  <p className="text-xs text-teal-400/40 py-8 text-center font-mono">
                    // no entries
                  </p>
                )}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
