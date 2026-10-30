# CLAUDE.md — Neural Design Lab LP 開発ガイド

NDL公式LP（neuraldesignlab.jp）の開発・保守における作業手順と注意事項。
セイコ（Claude Code）との協働時に参照する。

---

## プロジェクト構成

```
neural-design-lab-lp/
├── vite.config.ts          ← ビルド設定（アクティブバージョンをここで指定）
├── package.json
├── tailwind.config.ts
├── Ver.22/                 ← 旧バージョン（参照用）
├── Ver.23/                 ← 旧バージョン（参照用）
├── Ver.24/                 ← 現行バージョン（2026年10月〜）
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── components/
│       └── pages/
├── dist/
│   └── public/             ← FTPアップロード対象（ビルド出力先）
└── node_modules/           ← プロジェクトルートにのみ存在
```

**Ver.XX フォルダの中には node_modules・vite.config・package.json は存在しない。**
ビルド設定はすべてプロジェクトルートで管理する。

---

## バージョン切り替え手順（新Ver作成時）

新しいバージョンを作成する際は、以下の順番を必ず守る。

```bash
# 1. 前バージョンからコピー（node_modulesはルートにあるため不要）
cp -r Ver.24 Ver.25

# 2. vite.config.ts を更新（★ここを忘れると旧バージョンがビルドされる）
# root と @ エイリアスの両方を新バージョン名に変更する
```

```ts
// vite.config.ts
root: path.resolve(import.meta.dirname, "Ver.25"),   // ← 変更
"@": path.resolve(import.meta.dirname, "Ver.25", "src"),  // ← 変更
```

```bash
# 3. ソース編集
# 4. ビルド
npm run build

# 5. ビルド内容の確認（新テキストが含まれているか）
grep -c "確認したいテキスト" dist/public/assets/index-*.js

# 6. dev serverで動作確認
npm run dev

# 7. コミット（vite.config.ts と Ver.XX/ を両方含める）
git add vite.config.ts Ver.25/
git commit -m "feat: ..."
```

### ⚠️ 過去の失敗事例（2026年9月）

Ver.23作成時、`vite.config.ts` の更新をコミットに含めなかった。  
結果として、Ver.23のソースが正しくコミットされていたにもかかわらず、  
`npm run build` を実行するたびにVer.22がビルドされ続けた。  
`dist/public` にはVer.23の変更が一切反映されないまま本番運用した。

**教訓：バージョン切り替え時は `vite.config.ts` の更新をセットで行い、  
ビルド後に grep でテキスト確認を行うことを標準手順とする。**

---

## ビルド・デプロイ

```bash
# ビルド（dist/public に出力）
cd /Volumes/NDL-Data/Project/neural-design-lab-lp
npm run build

# dev server（ローカル確認用）
npm run dev
# → http://localhost:5173
```

**FTPアップロードはNDL代表者が行う。セイコはFTP操作をしない。**

ビルド後、セイコが報告する差分：
- **A（新規）**：新しいハッシュのJSファイル
- **B（変更）**：index.html（アセット参照ハッシュが変わる）
- **C（削除候補）**：旧ハッシュのJSファイル
- **変更なし**：CSS・静的アセット（ハッシュが変わらない場合）

アップロード先：`/Volumes/NDL-Data/Project/neural-design-lab-lp/dist/public/`

---

## Git運用

- **push はしない**（NDL代表者が判断するまでローカルのみ）
- コミットメッセージの末尾に帰属行を付与：
  ```
  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  ```
- Ver.XX フォルダと vite.config.ts は同一コミットに含める

---

## 作業フロー（セイコとの協働）

1. 変更内容を確認・合意
2. 必要に応じて新Verフォルダを作成
3. ソース編集
4. ビルド（`npm run build`）
5. ビルド内容をgrepで検証
6. dev serverで画面確認（セイコがブラウザで確認）
7. **代表者がLocalで動作確認**
8. 確認OKの連絡を受けてコミット
9. FTPアップロード対象ファイルを報告
10. **FTPアップロードは代表者が実施**

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026-10-30 | 初版作成。Ver.23ビルド欠落の経緯を踏まえ、バージョン切り替え手順と失敗事例を記載 |
