import React from "react";

type HeroBgProps = {
  /** rgba文字列で指定。デフォルトは白5%オーバーレイ */
  overlay?: string;
};

/** hero_bk.webp を背景に使うセクション共通の背景レイヤー */
export function HeroBg({ overlay = "rgba(255,255,255,0.05)" }: HeroBgProps) {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero_bk.webp')" }}
      />
      <div className="absolute inset-0" style={{ background: overlay }} />
    </>
  );
}
