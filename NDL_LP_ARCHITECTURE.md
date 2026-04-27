# NDL公式LP — アーキテクチャ＆開発ガイド

> ゼン（Gemini）向けプロジェクト引き継ぎドキュメント  
> 作成日: 2026-04-21 / 担当: セイ (CCO)

---

## 1. プロジェクト概要

| 項目 | 内容 |
|---|---|
| 名称 | Neural Design Lab 公式LP |
| リポジトリ | `Shozo-Kurashige/neural-design-lab-lp` (GitHub) |
| ローカルパス | `/Volumes/NDL_Data/Project/neural-design-lab-lp/` |
| 本番URL | `https://neuraldesignlab.jp` |
| サーバー | heteml（FTPでデプロイ） |
| 開発端末 | macOS / 外付けSSD (`/Volumes/NDL_Data/`) |

---

## 2. 技術スタック

| レイヤー | 技術 |
|---|---|
| フレームワーク | React 18 + TypeScript |
| ビルドツール | Vite 7 |
| スタイリング | Tailwind CSS v3（PostCSSインライン設定） |
| アニメーション | Framer Motion |
| ルーティング | Wouter |
| CMS① | microCMS（実績・お知らせ） |
| CMS② | WordPress Headless（WP REST API）（コラム） |
| フォーム | Formspree |
| 解析 | Google Analytics 4（動的スクリプト注入） |
| DB/カウンター | Firebase Firestore（AI診断DLカウンター） |

---

## 3. ディレクトリ構成

```
neural-design-lab-lp/
├── Ver.14/          # アーカイブ（旧client/のスナップショット）
├── Ver.15/          # 旧安定版ソース（blog bugfix済み）
├── Ver.16/          # 現行開発ソース ← vite.config.tsのrootはここ
│   ├── index.html
│   ├── public/      # 静的アセット（画像）
│   └── src/
│       ├── components/
│       │   ├── whats-up-section.tsx   ★ メインの動的セクション
│       │   ├── header.tsx
│       │   ├── footer.tsx
│       │   ├── ai-diagnostic.tsx      # AIマトリクス診断モーダル
│       │   ├── services-section.tsx
│       │   ├── skills-section.tsx
│       │   ├── process-section.tsx
│       │   ├── price-section.tsx
│       │   ├── about-section.tsx
│       │   └── contact-section.tsx
│       ├── pages/
│       │   ├── home.tsx               # メインLP（ヒーロー＋各セクション）
│       │   ├── Blog.tsx               # ブログ一覧
│       │   ├── BlogPost.tsx           # ブログ詳細
│       │   └── privacy.tsx
│       └── lib/
│           ├── wordpress.ts           # WordPress GraphQL（ブログページ用）
│           └── firebase.ts
├── client/          # 旧作業フォルダ（参照用のみ、ビルド対象外）
├── dist/public/     # ビルド出力 → FTPアップ対象
├── vite.config.ts   # root: Ver.16/ に設定済み
├── .env             # 環境変数（gitignore済み）
├── start-dev.command # ダブルクリックで開発サーバー起動（macOS）
└── package.json
```

---

## 4. 環境変数（.env）

```env
# Firebase
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID

# Google Analytics 4
VITE_GA_MEASUREMENT_ID

# microCMS
VITE_MICROCMS_SERVICE_DOMAIN   # = btm9kuupp9
VITE_MICROCMS_API_KEY
VITE_MICROCMS_WORKS_ENDPOINT   # = works（実績コンテンツタイプ）

# WordPress
VITE_WORDPRESS_API_URL         # GraphQL（ブログページ用）
VITE_WORDPRESS_REST_URL        # REST API（WhatsUpSection コラム用）

# Formspree
VITE_FORMSPREE_FORM_ID
```

> **重要**: `VITE_*` はビルド時にバンドルへ埋め込まれる。  
> 変数を変更したら必ず `npm run build` → FTP再アップが必要。

---

## 5. データアーキテクチャ（WhatsUpSection）

Ver.16の核心。3カラムが**完全独立**でフェッチ・描画する。

```
WhatsUpSection
 ├── Column 1「実績」
 │    └── microCMS /works?limit=4
 │         フィールド: title, content, image, category, url
 │         フォールバック: 静的データ（STATIC_WORKS）
 │
 ├── Column 2「お知らせ」
 │    └── microCMS /news?limit=5
 │         フィールド: title, content, image, category, url
 │         url空 → クリック無効（cursor-default）
 │
 └── Column 3「思考の断片（Column）」
      └── WP REST API /wp-json/wp/v2/posts?per_page=4&_embed
           excerpt.rendered → stripHtml()でサニタイズ
           サムネ非表示（画像フィールドは取得するが描画しない）
           リンク先: /blog/{slug}（内部遷移）
```

**フェイルセーフ設計:**
- 各カラムのuseEffectは独立 → 一方がダウンしても他カラムはレンダリング継続
- worksが404 → STATIC_WORKSにフォールバック
- url未設定カード → `e.preventDefault()` でトップ飛び防止

---

## 6. microCMSスキーマ

### 実績（works）
| フィールドID | 型 | 用途 |
|---|---|---|
| title | テキスト | カードタイトル |
| content | テキストエリア | スニペット |
| image | 画像 | アイキャッチ |
| category | コンテンツ参照 | バッジ表示 |
| url | テキスト | 外部リンク（空可） |

### お知らせ（news）
| フィールドID | 型 | 用途 |
|---|---|---|
| title | テキスト | カードタイトル |
| content | テキストエリア ※リッチエディタ不推奨 | スニペット |
| image | 画像 | アイキャッチ |
| category | コンテンツ参照 | バッジ表示 |
| url | テキスト | 外部リンク（空可） |

---

## 7. ビルド＆デプロイ手順

```bash
# 1. 開発サーバー起動
npm run dev        # または start-dev.command をダブルクリック

# 2. 本番ビルド
npm run build      # → dist/public/ に出力

# 3. FTPアップ（全ファイル）
dist/public/
├── index.html
├── favicon.png
├── *.webp（画像）
└── assets/
    ├── index-******.js
    └── index-******.css
```

> ビルドごとにassetsのハッシュが変わる。**毎回全量アップ**が確実。

---

## 8. Gitブランチ戦略

```
main                  ← 本番（Ver.15ベース）
└── feat/ver16-whats-up  ← Ver.16開発中（未マージ）
```

- 新機能は `feat/xxx` ブランチで開発
- 検証OKで `main` にマージ → 本番反映
- **現状**: Ver.16は `feat/ver16-whats-up` で本番FTPアップ済み（mainへの正式マージは未実施）

---

## 9. ナビゲーション構成（Ver.16）

| # | ラベル | アンカー |
|---|---|---|
| 1 | 大切にしていること | `/#philosophy` |
| 2 | 最新情報 | `/#whats-up` |
| 3 | サービス | `/#services` |
| 4 | 技術・セキュリティ | `/#skills` |
| 5 | 導入の流れ | `/#process` |
| 6 | 料金 | `/#price` |
| 7 | 私たちについて | `/#about` |
| CTA | お問い合わせ | `/#contact` |

---

## 10. 既知の設計ルール・制約

| 項目 | 内容 |
|---|---|
| Tailwind | **v3固定**（v4はconfig破壊的変更のため保留） |
| PostCSS設定 | `vite.config.ts` にインライン記述（OneDrive遅延対策） |
| バージョン管理 | ソースは `Ver.XX/` フォルダで世代管理 |
| 画像 | ヒーロー背景はCSS背景（lazy対象外）。`<img>`タグはlazy設定済み |
| GA4 | `home.tsx` のuseEffect内で動的スクリプト注入（消失対策） |
| モバイルホバー | Tailwind hover:はタップ離脱で即解除。追加対処不要と判断済み |
| URLなしカード | `e.preventDefault()` + `cursor-default`（全3カラム統一） |

---

## 11. 今後の積み残しタスク

- [ ] `feat/ver16-whats-up` → `main` への正式マージ
- [ ] Tailwind CSS v4 アップグレード（別タスク）
- [ ] `works` コンテンツの充実（現在1件）
- [ ] ブログセクション（`blog-section.tsx`）の扱い検討（Ver.16では非表示状態）
