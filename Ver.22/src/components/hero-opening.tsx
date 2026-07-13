"use client";

import React, { useEffect, useState } from "react";

function shouldAnimate(): boolean {
  if (typeof sessionStorage === "undefined") return false;
  const played = sessionStorage.getItem("ndl-hero-v22-played");
  if (!played) {
    sessionStorage.setItem("ndl-hero-v22-played", "1");
    return true;
  }
  return false;
}

export function HeroOpening() {
  const [animate] = useState<boolean>(shouldAnimate);

  // 各要素の表示状態
  const [introVisible, setIntroVisible] = useState(false);
  const [blackVisible, setBlackVisible] = useState(true);
  const [copy1Visible, setCopy1Visible] = useState(false);
  const [copy2Visible, setCopy2Visible] = useState(false);
  const [sub1Visible, setSub1Visible] = useState(false);
  const [sub2Visible, setSub2Visible] = useState(false);
  const [sub3Visible, setSub3Visible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    if (!animate) {
      // アニメーションなし：即座に最終状態へ
      setBlackVisible(false);
      setCopy1Visible(true);
      setCopy2Visible(true);
      setSub1Visible(true);
      setSub2Visible(true);
      setSub3Visible(true);
      setCtaVisible(true);
      return;
    }

    // アニメーションシーケンス
    const timers = [
      // 0〜1.2s: イントロテキスト フェードイン
      setTimeout(() => setIntroVisible(true), 80),
      // 1.2s: イントロテキスト + 黒背景 フェードアウト開始
      setTimeout(() => setIntroVisible(false), 1200),
      setTimeout(() => setBlackVisible(false), 1200),
      // 2.0s: メインコピー 1行目
      setTimeout(() => setCopy1Visible(true), 2000),
      // 2.7s: メインコピー 2行目
      setTimeout(() => setCopy2Visible(true), 2700),
      // 3.5s〜: サブコピー（時差あり）
      setTimeout(() => setSub1Visible(true), 3500),
      setTimeout(() => setSub2Visible(true), 3850),
      setTimeout(() => setSub3Visible(true), 4200),
      // 4.8s: CTA
      setTimeout(() => setCtaVisible(true), 4800),
    ];

    return () => timers.forEach(clearTimeout);
  }, [animate]);

  // トランジションスタイル生成
  const fadeUp = (visible: boolean): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(10px)",
    transition: animate
      ? "opacity 750ms ease-out, transform 750ms ease-out"
      : "none",
    willChange: "opacity, transform",
  });

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* 背景画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero_bk.webp')" }}
      />

      {/* 読みやすさのための薄いオーバーレイ */}
      <div className="absolute inset-0 bg-black/25" />

      {/* 黒背景オーバーレイ（フェードアウト） */}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-20"
        style={{
          opacity: blackVisible ? 1 : 0,
          transition: animate ? "opacity 800ms ease-out" : "none",
        }}
      />

      {/* イントロテキスト「現場を見ている社長へ。」 */}
      <div
        className="absolute inset-0 z-30 flex flex-col items-center pointer-events-none"
        style={{ paddingTop: "36vh" }}
      >
        <p
          className="text-white text-[1.35rem] md:text-[1.65rem] font-['Noto_Serif_JP'] font-bold tracking-[0.12em]"
          style={fadeUp(introVisible)}
        >
          現場を見ている社長へ。
        </p>
      </div>

      {/* メインコンテンツ（ヘッダー分を除いた高さで縦中央） */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center pt-20 pb-24 px-6 md:px-16 lg:px-28">

        {/* メインコピー */}
        <div className="mb-8 md:mb-10">
          <p
            className="text-white text-[2rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] font-['Noto_Serif_JP'] font-bold leading-tight mb-2 md:mb-3 text-center md:text-left"
            style={fadeUp(copy1Visible)}
          >
            AIを入れる前に、
          </p>
          <p
            className="text-white text-[2rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] font-['Noto_Serif_JP'] font-bold leading-tight text-center md:text-left"
            style={fadeUp(copy2Visible)}
          >
            現場の『仕方ない』をほどく。
          </p>
        </div>

        {/* サブコピー */}
        <div className="mb-12 md:mb-16 space-y-1.5 text-center md:text-left">
          <p
            className="text-white/90 text-[1.05rem] md:text-[1.2rem] font-['Noto_Serif_JP'] tracking-wider"
            style={fadeUp(sub1Visible)}
          >
            現場の知恵は残す。
          </p>
          <p
            className="text-white/90 text-[1.05rem] md:text-[1.2rem] font-['Noto_Serif_JP'] tracking-wider"
            style={fadeUp(sub2Visible)}
          >
            混乱だけをほどく。
          </p>
          <p
            className="text-white/85 text-[1.05rem] md:text-[1.2rem] font-['Noto_Serif_JP'] tracking-wider pt-1"
            style={fadeUp(sub3Visible)}
          >
            AIやDXが、現場で無理なく回る形へ。
          </p>
        </div>

        {/* CTA */}
        <div
          className="flex flex-col items-center md:items-start gap-4"
          style={fadeUp(ctaVisible)}
        >
          <p className="text-white/80 text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] tracking-wide">
            まずは現場の話を聴かせてください。
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-4 bg-[#D4AF37] text-white text-[0.9rem] md:text-[0.95rem] font-bold rounded-sm shadow-md hover:bg-[#c19f30] hover:shadow-lg transition-colors"
          >
            初回60分の壁打ちを予約する
          </a>
        </div>

      </div>
    </div>
  );
}
