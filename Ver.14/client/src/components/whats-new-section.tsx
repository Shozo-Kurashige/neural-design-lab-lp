import React, { useEffect, useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { Bell, ArrowRight } from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
  category?: any; // 配列でも文字でもオブジェクトでも何でも受け止める
  publishedDate?: string; // 私たちが作った日付
  publishedAt: string; // microCMSが裏で自動で作る「絶対にある日付」
  url?: string;
};

export function WhatsNewSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const domain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
        const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

        if (!domain || !apiKey) {
          console.error("microCMSのAPIキーが設定されていません");
          return;
        }

        const response = await fetch(
          `https://${domain}.microcms.io/api/v1/news?limit=3`,
          {
            headers: {
              "X-MICROCMS-API-KEY": apiKey,
            },
          },
        );

        if (!response.ok) throw new Error("データの取得に失敗しました");
        const data = await response.json();
        setNews(data.contents);
      } catch (error) {
        console.error("microCMS取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // 日付フォーマット（自作の日付が空なら、microCMSの自動作成日を使う）
  const formatDate = (customDate?: string, defaultDate?: string) => {
    const targetDate = customDate || defaultDate;
    if (!targetDate) return "";
    const date = new Date(targetDate);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("ja-JP").replace(/\//g, ".");
  };

  // カテゴリ名抽出（Agentの暴走やデータの揺れを完全に吸収する安全装置）
  const getCategoryName = (cat?: any) => {
    if (!cat) return "お知らせ";
    if (Array.isArray(cat)) {
      if (!cat[0]) return "お知らせ";
      return typeof cat[0] === "object" ? cat[0].name || "お知らせ" : cat[0];
    }
    return typeof cat === "object" ? cat.name || "お知らせ" : cat;
  };

  if (loading || news.length === 0) return null;

  return (
    <section
      id="news"
      className="py-20 bg-[#FDFBF7] relative scroll-mt-20 border-t border-[#D4AF37]/20"
    >
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <FadeIn>
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase block mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              What's New
            </span>
            <h2 className="text-2xl md:text-3xl font-['Noto_Serif_JP'] font-bold text-[#2C3E30]">
              最新情報
            </h2>
          </FadeIn>
        </div>

        <div className="border-t border-[#2C3E30]/10">
          {news.map((item, index) => (
            <FadeIn key={item.id} delay={index * 100}>
              <div className="group border-b border-[#2C3E30]/10 py-6 transition-colors hover:bg-white/50">
                <a
                  href={item.url || "#"}
                  target={item.url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`flex flex-col md:flex-row md:items-center gap-4 px-4 ${
                    !item.url && "cursor-default"
                  }`}
                  onClick={(e) => !item.url && e.preventDefault()}
                >
                  <div className="flex items-center gap-4 md:w-48 shrink-0">
                    <time className="text-gray-500 font-medium text-sm">
                      {formatDate(item.publishedDate, item.publishedAt)}
                    </time>
                    <span className="bg-[#2C3E30]/5 text-[#2C3E30] text-xs font-bold px-3 py-1 rounded-sm border border-[#2C3E30]/10">
                      {getCategoryName(item.category)}
                    </span>
                  </div>
                  <p className="text-[#2C3E30] font-medium flex-1 group-hover:text-[#D4AF37] transition-colors leading-relaxed">
                    {item.title}
                  </p>
                  {item.url && (
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#D4AF37] transition-colors shrink-0 hidden md:block" />
                  )}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
