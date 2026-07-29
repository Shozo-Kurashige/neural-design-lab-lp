"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

// ページロードごとにリセット、SPA遷移では保持
let hasPlayed = false;

const subLines = [
  "現場の知恵は残す。",
  "混乱だけをほどく。",
  "AIやDXが、現場で無理なく回る形へ。",
];
const SUB_TOTAL    = subLines.reduce((n, s) => n + [...s].length, 0); // 37
const SUB_INTERVAL = Math.floor(2000 / SUB_TOTAL);                    // 54ms

export function HeroOpening() {
  const [animate] = useState<boolean>(() => {
    if (hasPlayed) return false;
    hasPlayed = true;
    return true;
  });

  const heroRef    = useRef<HTMLDivElement>(null);
  const leadInRef  = useRef<HTMLParagraphElement>(null);
  const typingRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ─── 状態 ─── */
  const [blackVisible,  setBlackVisible]  = useState(animate);
  const [blackMounted,  setBlackMounted]  = useState(animate);
  const [introFadeIn,   setIntroFadeIn]   = useState(false);
  const [flyingText,    setFlyingText]    = useState(animate);
  const [flyingStyle,   setFlyingStyle]   = useState<React.CSSProperties>(
    animate
      ? { position: "absolute", top: "40%", left: "50%", transform: "translateX(-50%)" }
      : {}
  );
  const [leadInVisible, setLeadInVisible] = useState(!animate);
  const [copy1Visible,  setCopy1Visible]  = useState(!animate);
  const [copy2Visible,  setCopy2Visible]  = useState(!animate);
  const [typedChars,    setTypedChars]    = useState(!animate ? SUB_TOTAL : 0);
  const [cursorOn,      setCursorOn]      = useState(false);
  const [bizVisible,    setBizVisible]    = useState(!animate);
  const [ctaVisible,    setCtaVisible]    = useState(!animate);

  /* ─── FLIP: イントロテキストをリードイン位置へ移動 ─── */
  const moveIntroText = useCallback(() => {
    if (!leadInRef.current || !heroRef.current) return;
    const heroRect = heroRef.current.getBoundingClientRect();
    const leadRect = leadInRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      setFlyingStyle({
        position:   "absolute",
        top:        `${leadRect.top - heroRect.top}px`,
        left:       "50%",
        transform:  "translateX(-50%)",
        transition: "top 1000ms cubic-bezier(0.4,0,0.2,1)",
      });
    } else {
      setFlyingStyle({
        position:   "absolute",
        top:        `${leadRect.top - heroRect.top}px`,
        left:       `${leadRect.left - heroRect.left}px`,
        transform:  "translateX(0)",
        transition: "top 1000ms cubic-bezier(0.4,0,0.2,1), left 1000ms cubic-bezier(0.4,0,0.2,1), transform 1000ms cubic-bezier(0.4,0,0.2,1)",
      });
    }

    setTimeout(() => {
      setLeadInVisible(true);
      setFlyingText(false);
    }, 1050);
  }, []);

  /* ─── タイマーシーケンス ─── */
  useEffect(() => {
    if (!animate) return;

    const timers = [
      setTimeout(() => setIntroFadeIn(true),   80),
      setTimeout(() => {
        setBlackVisible(false);                           // 2.0s 黒フェードアウト（2000ms）
        moveIntroText();
      }, 2000),
      setTimeout(() => setBlackMounted(false), 4200),    // 4.2s 黒オーバーレイ DOM 削除
      setTimeout(() => {                                  // 3.5s メインコピー一括表示
        setCopy1Visible(true);
        setCopy2Visible(true);
      }, 3500),
      setTimeout(() => {                                  // 5.0s サブコピー タイプライター開始
        setCursorOn(true);
        let count = 0;
        typingRef.current = setInterval(() => {
          count++;
          setTypedChars(count);
          if (count >= SUB_TOTAL) {
            if (typingRef.current) clearInterval(typingRef.current);
            setTimeout(() => setCursorOn(false), 400);   // 7.0s+0.4s カーソル消去
          }
        }, SUB_INTERVAL);
      }, 5000),
      setTimeout(() => {                                  // 7.5s 業務ラベル＋CTA
        setBizVisible(true);
        setCtaVisible(true);
      }, 7500),
    ];

    return () => {
      timers.forEach(clearTimeout);
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [animate, moveIntroText]);

  /* ─── スタイルヘルパー ─── */
  const fadeIn = (visible: boolean): React.CSSProperties => ({
    opacity:       visible ? 1 : 0,
    transition:    animate ? "opacity 750ms ease-out" : "none",
    pointerEvents: visible ? "auto" : "none",
  });

  return (
    <div ref={heroRef} className="relative w-full z-20">

      {/* 背景画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero_bk.webp')" }}
      />
      <div className="absolute inset-0 bg-black/25" />

      {/* 黒オーバーレイ */}
      {blackMounted && (
        <div
          className="absolute inset-0 bg-black pointer-events-none z-20"
          style={{
            opacity:    blackVisible ? 1 : 0,
            transition: animate ? "opacity 2000ms ease-out" : "none",
          }}
        />
      )}

      {/* フライングテキスト（FLIP） */}
      {flyingText && (
        <p
          className="z-40 pointer-events-none text-white text-[0.95rem] md:text-[1.575rem] font-['Noto_Serif_JP'] tracking-wider"
          style={{
            ...flyingStyle,
            opacity:    introFadeIn ? 1 : 0,
            transition: [flyingStyle.transition, "opacity 750ms ease-out"].filter(Boolean).join(", "),
          }}
        >
          現場を見ている社長へ。
        </p>
      )}

      {/* ─── メインコンテンツ ─── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* 上部：コピーエリア */}
        <div className="flex flex-col md:flex-1 md:justify-center pt-28 md:pt-20 pb-4 px-6 md:px-16 lg:px-28">

          {/* リードインプレースホルダー */}
          <p
            ref={leadInRef}
            className="text-white/75 text-[0.95rem] md:text-[1.575rem] font-['Noto_Serif_JP'] tracking-wider mb-2 md:mb-4 text-center md:text-left"
            style={{ visibility: leadInVisible ? "visible" : "hidden" }}
          >
            現場を見ている社長へ。
          </p>

          {/* メインコピー */}
          <div className="mb-3 md:mb-10">
            <p
              className="text-white text-[2rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] font-['Noto_Serif_JP'] font-bold leading-tight mb-2 md:mb-3 text-center md:text-left"
              style={fadeIn(copy1Visible)}
            >
              AIを入れる前に、
            </p>
            <p
              className="text-white text-[2rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] font-['Noto_Serif_JP'] font-bold leading-tight text-center md:text-left"
              style={{ ...fadeIn(copy2Visible), fontFeatureSettings: '"palt"' }}
            >
              現場の『仕方ない』をほどく。
            </p>
          </div>

          {/* サブコピー — タイプライター（5.0s〜7.0s） */}
          <div className="mb-2 md:mb-6 space-y-1 md:space-y-1.5 text-center md:text-left">
            {subLines.map((line, li) => {
              const lineStart = subLines.slice(0, li).reduce((n, s) => n + [...s].length, 0);
              const lineLen   = [...line].length;
              const charsShow = Math.max(0, Math.min(typedChars - lineStart, lineLen));
              const visible   = typedChars > lineStart;
              const isActive  = typedChars > lineStart && typedChars <= lineStart + lineLen;

              return (
                <p
                  key={li}
                  className="text-white/90 text-[1.05rem] md:text-[1.35rem] font-mono tracking-wider"
                  style={{ opacity: visible ? 1 : 0 }}
                >
                  {[...line].slice(0, charsShow).join("")}
                  {isActive && cursorOn && (
                    <span className="animate-pulse ml-0.5 text-white/80">▋</span>
                  )}
                </p>
              );
            })}
          </div>

          {/* 業務整理ラベル */}
          <p
            className="text-white/65 text-[0.9rem] md:text-[0.95rem] font-['Noto_Sans_JP'] tracking-wide text-center md:text-left"
            style={fadeIn(bizVisible)}
          >
            業務整理・AI活用・DX定着支援
          </p>

        </div>

        {/* 下部：CTAブロック */}
        <div
          className="flex flex-col items-center gap-2 md:gap-5 px-6 pb-6 md:pb-12 pt-5 md:pt-2"
          style={fadeIn(ctaVisible)}
        >
          <p className="text-white/80 text-[0.9rem] md:text-[1.35rem] font-['Noto_Sans_JP'] tracking-wide text-center">
            まずは現場の話を聴かせてください。
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 md:px-12 py-3.5 md:py-5 bg-[#D4AF37] text-white text-[0.9rem] md:text-[1.35rem] font-bold rounded-sm shadow-md hover:bg-[#c19f30] hover:shadow-lg transition-colors"
          >
            初回60分の壁打ちを予約する
          </a>
        </div>

      </div>
    </div>
  );
}
