import type { Config } from "tailwindcss";

export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
    // Ver.XX 系ソースを全スキャン（Ver.17以降で使用するクラスを確実に生成）
    "./Ver.*/index.html",
    "./Ver.*/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
