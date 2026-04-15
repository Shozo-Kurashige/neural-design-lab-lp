#!/bin/bash
# ──────────────────────────────────────────
#  NDL LP — 開発サーバー起動スクリプト
#  ダブルクリックで起動できます
# ──────────────────────────────────────────

# スクリプトが置かれているディレクトリ（= プロジェクトルート）に移動
cd "$(dirname "$0")"

echo "========================================"
echo "  Neural Design Lab LP — Dev Server"
echo "  http://localhost:5173"
echo "========================================"
echo ""

# .env が存在するか確認
if [ ! -f ".env" ]; then
  echo "⚠️  警告: .env ファイルが見つかりません"
  echo "   プロジェクトルートに .env を配置してください"
  echo ""
fi

# node_modules がなければインストール
if [ ! -d "node_modules" ]; then
  echo "📦 node_modules が見つかりません。インストールを開始します..."
  npm install
  echo ""
fi

echo "🚀 開発サーバーを起動中..."
echo ""
npm run dev
