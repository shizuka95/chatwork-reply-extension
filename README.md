# Chatwork Auto-Reply Extension

## 概要
ChatworkとGmailでの返信作業を支援するためのChrome拡張機能（PoC）です。  
Chatwork画面にUIを挿入し、返信文の生成・編集・送信を1つのインターフェースで完結させることを目的としています。

## 特徴
- Chatwork上に独自の返信UIを挿入
- LLMによる返信案の生成（将来的に実装）
- Gmail側の自動返信処理は`sendMail.ts`にてPoC段階

## 使用技術
- TypeScript
- Chrome Extension (Manifest V3)
- DOM操作によるUI挿入

## フォルダ構成
- `src/`: TypeScriptファイル
- `dist/`: トランスパイル後のJavaScriptファイル（git管理外）
- `manifest.json`: 拡張機能の設定
- `sendMail.ts`: Gmail送信処理用スクリプト

## ビルド方法

```bash
npm install
npm run build
