#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Claude Code Skill: CSV生成
 * 指定されたサイズのCSVファイルを生成
 */

// コマンドライン引数の解析
function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    console.log(`
CSV生成スキル - 指定サイズのCSVファイルを生成します

使用方法:
  /generate-csv <サイズ> [オプション]

引数:
  <サイズ>           生成するCSVのおおよそのサイズ
                     例: 1KB, 10MB, 1GB
                     単位: B, KB, MB, GB (大文字小文字区別なし)

オプション:
  -o, --output <ファイル名>   出力ファイル名 (デフォルト: output.csv)
  -c, --columns <数>          列数 (デフォルト: 5)
  -h, --help                  このヘルプを表示

例:
  /generate-csv 10MB
  /generate-csv 1GB -o large-data.csv
  /generate-csv 500KB -c 10
`);
    process.exit(0);
  }

  const config = {
    size: args[0],
    output: null, // 後で設定
    columns: 5
  };

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '-o' || args[i] === '--output') {
      config.output = args[++i];
    } else if (args[i] === '-c' || args[i] === '--columns') {
      config.columns = parseInt(args[++i], 10);
    }
  }

  // ファイル名が指定されていない場合、サイズを含むデフォルト名を設定
  if (!config.output) {
    config.output = `output/output_${config.size}.csv`;
  }

  return config;
}

// サイズ文字列をバイト数に変換
function parseSize(sizeStr) {
  const match = sizeStr.match(/^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)$/i);

  if (!match) {
    throw new Error('無効なサイズ形式です。例: 10MB, 1GB');
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  const multipliers = {
    'B': 1,
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024
  };

  return Math.floor(value * multipliers[unit]);
}

// ランダムな文字列を生成
function randomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ランダムな数値を生成
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// CSVの行を生成
function generateRow(columns) {
  const row = [];
  for (let i = 0; i < columns; i++) {
    const type = i % 3;
    if (type === 0) {
      // 文字列
      row.push(randomString(randomNumber(5, 15)));
    } else if (type === 1) {
      // 数値
      row.push(randomNumber(1, 100000));
    } else {
      // 日付
      const date = new Date(2020 + randomNumber(0, 5), randomNumber(0, 11), randomNumber(1, 28));
      row.push(date.toISOString().split('T')[0]);
    }
  }
  return row.join(',') + '\n';
}

// ヘッダー行を生成
function generateHeader(columns) {
  const headers = [];
  for (let i = 0; i < columns; i++) {
    headers.push(`column_${i + 1}`);
  }
  return headers.join(',') + '\n';
}

// メイン処理
async function generateCSV(targetSize, outputFile, columns) {
  console.log(`CSV生成を開始します...`);
  console.log(`  目標サイズ: ${targetSize.toLocaleString()} バイト`);
  console.log(`  出力ファイル: ${outputFile}`);
  console.log(`  列数: ${columns}`);

  // 出力ディレクトリが存在しない場合は作成
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const writeStream = fs.createWriteStream(outputFile);
  let currentSize = 0;

  // ヘッダー書き込み
  const header = generateHeader(columns);
  writeStream.write(header);
  currentSize += Buffer.byteLength(header);

  // 進捗表示用
  let lastProgress = 0;
  const startTime = Date.now();

  // バックプレッシャーを処理する関数
  const writeWithBackpressure = (data) => {
    return new Promise((resolve) => {
      if (!writeStream.write(data)) {
        writeStream.once('drain', resolve);
      } else {
        resolve();
      }
    });
  };

  // 行を生成して書き込み
  while (currentSize < targetSize) {
    const row = generateRow(columns);
    await writeWithBackpressure(row);
    currentSize += Buffer.byteLength(row);

    // 進捗表示（10%刻み）
    const progress = Math.floor((currentSize / targetSize) * 100);
    if (progress >= lastProgress + 10) {
      lastProgress = progress;
      console.log(`  進捗: ${progress}% (${currentSize.toLocaleString()} / ${targetSize.toLocaleString()} バイト)`);
    }
  }

  writeStream.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      const actualSize = fs.statSync(outputFile).size;

      console.log(`\n✓ 生成完了！`);
      console.log(`  実際のサイズ: ${actualSize.toLocaleString()} バイト (${(actualSize / 1024 / 1024).toFixed(2)} MB)`);
      console.log(`  経過時間: ${elapsed} 秒`);
      console.log(`  ファイル: ${path.resolve(outputFile)}`);
      resolve();
    });

    writeStream.on('error', (err) => {
      console.error('エラーが発生しました:', err.message);
      reject(err);
    });
  });
}

// スクリプト実行
(async () => {
  try {
    const config = parseArgs();
    const targetSize = parseSize(config.size);
    await generateCSV(targetSize, config.output, config.columns);
  } catch (error) {
    console.error('エラー:', error.message);
    console.error('\nヘルプを表示するには: /generate-csv --help');
    process.exit(1);
  }
})();
