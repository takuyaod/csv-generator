# プロジェクト概要

## 説明

指定されたデータサイズのCSVファイルを生成するためのユーティリティツールです。
テストデータの作成や、大量データの処理検証に使用できます。

## 技術スタック

- Node.js (標準ライブラリのみ使用、外部依存関係なし)

## プロジェクト構造

```
csv-generator/
├── .claude/
│   └── skills/
│       └── generate-csv/
│           ├── SKILL.md              # スキル定義ファイル
│           └── generate-csv.js       # CSV生成スキル本体
├── CLAUDE.md                         # Claude Code向けプロジェクト情報
└── README.md                         # プロジェクト説明
```

## はじめに

### 前提条件

- Node.js (v12以上推奨)

### インストール

依存関係はありません。このプロジェクトはNode.jsの標準ライブラリのみを使用しています。

### プロジェクトの実行

Claude Codeスキルとして実行：

```bash
/generate-csv 10MB
/generate-csv 1GB -o large-data.csv
/generate-csv 500KB -c 10
```

## 開発ガイドライン

### コードスタイル

- Node.js標準ライブラリのみを使用
- 外部依存関係は追加しない
- シンプルで読みやすいコードを心がける

### テスト

手動テストの例：

```bash
# 小さいサイズで動作確認
/generate-csv 1KB -o test.csv

# 中程度のサイズで確認
/generate-csv 10MB -o medium.csv

# カスタム列数で確認
/generate-csv 100KB -c 20 -o custom.csv
```

## Claude Codeへの重要な注意事項

- このプロジェクトは依存関係を持たないことを重視しています
- 新機能を追加する場合も、Node.js標準ライブラリの範囲内で実装してください
- `/generate-csv` スキルはClaude Codeから直接実行できます
- 生成されるCSVファイルは、文字列・数値・日付のランダムなデータを含みます

## よく使うコマンド

```bash
# ヘルプ表示
/generate-csv --help

# 標準的な使用例
/generate-csv 10MB

# 大容量ファイル生成
/generate-csv 1GB -o large-test-data.csv

# カラム数を多くして生成
/generate-csv 50MB -c 20 -o wide-data.csv
```

## 追加リソース

- [Node.js公式ドキュメント](https://nodejs.org/docs/)
- [CSV形式について](https://datatracker.ietf.org/doc/html/rfc4180)
