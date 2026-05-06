# ARCHITECTURE

## 技術スタック

| レイヤ | 採用技術 |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| 言語 | JavaScript (JSX) ※TS不採用 |
| スタイル | Tailwind CSS |
| 状態管理 | React `useState` のみ |
| 出力 | 静的書き出し (`output: "export"`) |
| ホスティング | Netlify |

依存ライブラリは最小。**新規依存は原則追加しない**。

## フォルダ構造

```
ランニングウォッチアプリ/
├── app/
│   ├── layout.jsx              # html shell + metadata + viewport
│   ├── page.jsx                # トップ（Diagnosis を呼ぶだけ）
│   ├── Diagnosis.jsx           # 診断UI本体（'use client'）
│   ├── data.js                 # 質問・モデル・診断ロジック
│   ├── reviews.js              # レビュー記事コンテンツ
│   ├── sitemap.js              # sitemap.xml
│   ├── robots.js               # robots.txt
│   ├── icon.svg                # favicon
│   ├── apple-icon.png          # apple-touch-icon
│   ├── globals.css             # Tailwind + アニメーション
│   └── review/
│       └── [slug]/
│           └── page.jsx        # レビュー記事（SSG, server component）
├── public/
│   └── reviews/                # 商品画像（reviews.js の image パスに合わせて配置）
├── out/                        # `npm run build` 出力（Netlifyにアップ）
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
└── package.json
```

## 主要コンポーネント

### `app/Diagnosis.jsx`（クライアント）

診断フロー全体のステートマシン。以下の小コンポーネントを内部に持つ：

| コンポーネント | 役割 |
| --- | --- |
| `Intro` | ファーストビュー / CTA |
| `ChoiceQuestionScreen` | STEP1 用（A/B/C 選択） |
| `YesNoQuestionScreen` | STEP2 用（YES/NO） |
| `Step1ResultScreen` | STEP1 結果（タイプ説明） |
| `FinalResultScreen` | STEP2 結果（モデル提案） |
| `BackButton` | 戻る共通 |
| `StepHeader` | ステップ名 + 進捗バー |

### `app/review/[slug]/page.jsx`（サーバー）

`reviews.js` を読み、構造化レビューをHTML化。`generateStaticParams` で全 slug を SSG。

## 状態管理

`Diagnosis.jsx` のローカル `useState` のみ。Context や外部store は使わない。

| state | 型 | 役割 |
| --- | --- | --- |
| `phase` | `"intro"\|"step1"\|"step1Result"\|"step2"\|"step2Result"` | 画面の段階 |
| `step1Answers` | `number[]` | 各設問の選択 index |
| `step2Answers` | `("YES"\|"NO")[]` | YES/NO配列 |
| `step1Type` | `"garmin"\|"apple"\|"middle"` | STEP1判定 |
| `modelId` | `string` | STEP2判定（モデルキー） |
| `currentQ` | `number` | 現在の設問 index |

## 診断ロジック構造

ロジックは `app/data.js` に集約。**UI と完全に分離**。

```js
diagnoseStep1(answerIndexes: number[]): "garmin" | "apple" | "middle"
diagnoseStep2(answers: ("YES"|"NO")[], step1Type): modelKey
```

- STEP1：選択肢ごとに `{ garmin, apple }` スコアを加算 → 例外ルール適用
- STEP2：YES/NO ごとに各モデルへ加算 → 強い分岐ルール → 残りはスコア最大値

詳細は `WATCH_APP_SPEC.md` 参照。

## ルーティング

| URL | 種類 |
| --- | --- |
| `/` | 静的（診断トップ） |
| `/review/forerunner-165/` | SSG |
| `/review/forerunner-265/` | SSG |
| `/review/forerunner-965/` | SSG |
| `/review/coros-pace-4/` | SSG |
| `/review/apple-watch/` | SSG |
| `/compare/garmin-vs-applewatch/` | 静的（Garmin / Apple Watch 比較） |
| `/sitemap.xml` | SEO（App Router metadata route） |
| `/robots.txt` | SEO（App Router metadata route） |

`trailingSlash: true` のため URL は必ず末尾スラッシュ付き。

## ビルド・デプロイ

```bash
npm run build              # → out/ に静的HTML生成
netlify deploy --dir=out --prod
```

`next.config.mjs`:

```js
{
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
}
```

`next/image` は使用不可（`<img>` または CSS `background-image` で対応）。

## デザイン規約

| 項目 | 値 |
| --- | --- |
| 背景 | 白 (`#ffffff`) |
| 文字 | 黒系 (`#0a0a0a`) |
| アクセント | 黒（`accent.DEFAULT: #0a0a0a`） |
| 角丸 | カード `rounded-2xl` / ボタン `rounded-2xl` or `rounded-full` |
| 最大幅 | 診断画面 `max-w-[440px]` / レビュー `max-w-[640px]` |
| フォント | system-ui 系（Tailwind config 参照） |
| アニメ | `fadeSlide` 0.28s（控えめ） |
