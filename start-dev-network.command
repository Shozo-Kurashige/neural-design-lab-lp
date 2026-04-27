#!/bin/bash
# ──────────────────────────────────────────
#  NDL LP — ネットワーク公開モード起動スクリプト
#  スマホ・タブレットからの動作確認用
#  同じWi-Fiに繋がっていればアクセス可能
# ──────────────────────────────────────────

cd "$(dirname "$0")"

echo "========================================"
echo "  Neural Design Lab LP — Network Dev"
echo "  PC:     http://localhost:5173"
echo "  スマホ: 起動後に表示される Network URL"
echo "========================================"
echo ""

if [ ! -f ".env" ]; then
  echo "⚠️  警告: .env ファイルが見つかりません"
  echo ""
fi

if [ ! -d "node_modules" ]; then
  echo "📦 node_modules をインストール中..."
  npm install
  echo ""
fi

echo "🚀 ネットワーク公開モードで起動中..."
echo "   スマホは同じWi-Fiに接続してください"
echo ""
npm run dev -- --host
