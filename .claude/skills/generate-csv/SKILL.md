---
name: generate-csv
description: 指定されたサイズのCSVファイルを生成します。テストデータの作成、大量データ処理の検証、パフォーマンステストなどで使用できます。サイズ指定（KB、MB、GB）でCSVファイルが必要な場合に使用してください。
---

# CSV生成スキル

このスキルは、指定されたサイズのCSVファイルをランダムデータで生成します。

## 実行方法

スキルを実行する際は、以下のコマンドを実行してください：

```bash
node .claude/skills/generate-csv/generate-csv.js <サイズ> [オプション]
```

## 使用例

```bash
# 基本的な使い方
node .claude/skills/generate-csv/generate-csv.js 10MB

# 出力ファイル名を指定
node .claude/skills/generate-csv/generate-csv.js 1GB -o large-data.csv

# 列数を指定
node .claude/skills/generate-csv/generate-csv.js 500KB -c 10

# 両方指定
node .claude/skills/generate-csv/generate-csv.js 100MB -o test.csv -c 8
```

## オプション

- `<サイズ>` (必須): 生成するCSVのおおよそのサイズ
  - 単位: `B`, `KB`, `MB`, `GB` (大文字小文字区別なし)
  - 例: `1KB`, `10MB`, `1.5GB`

- `-o, --output <ファイル名>`: 出力ファイル名 (デフォルト: `output.csv`)

- `-c, --columns <数>`: 列数 (デフォルト: `5`)

- `-h, --help`: ヘルプを表示

## 生成されるデータ

CSVファイルには以下のようなランダムなデータが含まれます：

- **文字列列**: ランダムな英数字（5-15文字）
- **数値列**: ランダムな整数（1-100,000）
- **日付列**: ランダムな日付（2020-2025年）

## 注意事項

- 大きなファイル（数GB以上）を生成する場合は、ディスク容量に注意してください
- 生成中は進捗が10%刻みで表示されます
- ファイルは現在のディレクトリに生成されます
