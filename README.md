# Neural Design Lab Official LP

Neural Design Lab の公式ランディングページ。
地方・中小企業の DX を支援するパートナーとしての会社情報・サービス紹介・お問い合わせフォームを提供する。

## Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **CMS:** microCMS（ブログ・ニュース）
- **Auth / DB:** Firebase (Firestore)
- **Form:** Formspree
- **Analytics:** Google Analytics 4

## Getting Started

### 1. リポジトリをクローン

```bash
git clone https://github.com/<your-org>/neural-design-lab-lp.git
cd neural-design-lab-lp
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. 環境変数を設定

```bash
cp .env.example .env
```

`.env` を開き、各サービスの値を入力してください。
取得場所はそれぞれ `.env.example` のコメントを参照。

> **注意:** `.env` は `.gitignore` により Git 管理対象外です。
> 実際のキーを絶対にコミットしないでください。

### 4. 開発サーバーを起動

```bash
npm run dev
```

### 5. プロダクションビルド

```bash
npm run build
```

## Security Notes

| サービス | キーの種類 | 公開可否 |
|---------|-----------|--------|
| Firebase `apiKey` | クライアント識別子 | 公開前提（Security Rules で保護） |
| Firebase `appId` / `measurementId` | 識別子 | 公開前提 |
| MicroCMS API Key | 真の秘密情報 | **非公開必須** |
| Formspree Form ID | フォーム識別子 | 非公開推奨 |
| Google Analytics ID | 計測識別子 | 公開前提 |

Firebase Security Rules および microCMS の API キー制限（ドメイン制限）を必ず設定してください。

## Project Structure

```
.
├── src/                  # ソースコード
├── public/               # 静的アセット
├── .env.example          # 環境変数テンプレート（コミット対象）
├── .env                  # 実際の環境変数（コミット対象外）
├── .gitignore
├── vite.config.ts
└── package.json
```

## License

© Neural Design Lab. All rights reserved.
