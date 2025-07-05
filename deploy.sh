#!/bin/bash

# XServer デプロイスクリプト
# このスクリプトはデプロイ後に自動実行されます

echo "=== デプロイ後のセットアップ開始 ==="

# 現在のディレクトリを確認
pwd
ls -la

# Node.jsのバージョンを確認
echo "Node.js version:"
node --version
echo "npm version:"
npm --version

# 本番用依存関係をインストール
echo "=== 依存関係をインストール中 ==="
npm install --production --no-optional

# 環境変数ファイルの確認
echo "=== 環境変数ファイルの確認 ==="
if [ -f "firebase_env.json" ]; then
    echo "firebase_env.json が見つかりました"
else
    echo "警告: firebase_env.json が見つかりません"
fi

# .nextディレクトリの確認
echo "=== .nextディレクトリの確認 ==="
if [ -d ".next" ]; then
    echo ".nextディレクトリが見つかりました"
    ls -la .next/
else
    echo "警告: .nextディレクトリが見つかりません"
fi

# publicディレクトリの確認
echo "=== publicディレクトリの確認 ==="
if [ -d "public" ]; then
    echo "publicディレクトリが見つかりました"
    ls -la public/
else
    echo "警告: publicディレクトリが見つかりません"
fi

# package.jsonの確認
echo "=== package.jsonの確認 ==="
if [ -f "package.json" ]; then
    echo "package.jsonが見つかりました"
    cat package.json | grep -E '"name"|"version"|"scripts"'
else
    echo "警告: package.jsonが見つかりません"
fi

echo "=== セットアップ完了 ===" 