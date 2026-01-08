# CSV Generator

指定されたデータサイズのCSVファイルを生成するためのユーティリティツールです。

## 特徴

- **依存関係ゼロ**: Node.js標準ライブラリのみを使用
- **柔軟なサイズ指定**: B, KB, MB, GB単位で指定可能
- **カスタマイズ可能**: 列数や出力ファイル名を自由に設定
- **進捗表示**: 生成中の進捗をリアルタイムで表示
- **効率的**: ストリーミング書き込みでメモリ効率が良い
- **Claude Codeスキル対応**: `/generate-csv` コマンドで実行可能

## 必要要件

- Node.js (v12以上推奨)

外部依存関係は一切ありません。

## 使い方

### Claude Codeスキルとして使用

Claude Code環境内で、スラッシュコマンドとして実行できます：

```bash
/generate-csv 10MB
```

オプション付きの例：

```bash
# 出力ファイル名を指定
/generate-csv 1GB -o large-data.csv

# 列数を指定
/generate-csv 500KB -c 10

# 両方指定
/generate-csv 100MB -o test.csv -c 8
```

### ヘルプ表示

```bash
/generate-csv --help
```

## オプション

| オプション | 説明 | デフォルト |
|-----------|------|-----------|
| `<サイズ>` | 生成するCSVのおおよそのサイズ（例: 1KB, 10MB, 1GB） | 必須 |
| `-o, --output` | 出力ファイル名 | `output.csv` |
| `-c, --columns` | 列数 | `5` |
| `-h, --help` | ヘルプを表示 | - |

## サイズ指定について

以下の単位が使用できます（大文字小文字区別なし）：

- `B` - バイト
- `KB` - キロバイト (1,024バイト)
- `MB` - メガバイト (1,024 KB)
- `GB` - ギガバイト (1,024 MB)

例：
- `1KB` - 約1,024バイト
- `10MB` - 約10,485,760バイト
- `1.5GB` - 約1,610,612,736バイト

## 生成されるデータ

CSVファイルには以下のような列が含まれます：

- **文字列列**: ランダムな英数字（5-15文字）
- **数値列**: ランダムな整数（1-100,000）
- **日付列**: ランダムな日付（2020-2025年）

例：
```csv
column_1,column_2,column_3,column_4,column_5
aBcDeFgHiJk,45678,2023-05-12,lMnOpQrSt,89012
XyZaBcD,23456,2021-11-30,eFgHiJkLm,67890
```

## 使用例

### テストデータの作成

```bash
# 小規模テスト用
/generate-csv 1MB -o test-small.csv

# 中規模テスト用
/generate-csv 100MB -o test-medium.csv

# 大規模テスト用
/generate-csv 1GB -o test-large.csv
```

### カスタムフォーマット

```bash
# 幅広いCSV（20列）
/generate-csv 50MB -c 20 -o wide-data.csv

# 少ない列数（3列）
/generate-csv 10MB -c 3 -o narrow-data.csv
```

## プロジェクト構造

```
csv-generator/
├── .claude/
│   └── skills/
│       └── generate-csv/
│           ├── SKILL.md              # スキル定義ファイル
│           └── generate-csv.js       # CSV生成スキル本体
├── CLAUDE.md                         # Claude Code向けドキュメント
└── README.md                         # このファイル
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 貢献

バグ報告や機能リクエストは、GitHubのIssuesでお願いします。

## 注意事項

- 非常に大きなファイル（数GB以上）を生成する場合、ディスク容量に注意してください
- 生成されるデータはランダムなため、実際のデータ分析には使用できません
- テスト・検証目的での使用を想定しています
