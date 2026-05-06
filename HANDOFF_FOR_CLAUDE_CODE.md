# HANDOFF_FOR_CLAUDE_CODE

この文書は、ランニングウォッチ診断アプリを Claude Code に引き継ぐための開発者向けメモです。

## まず読んでほしい順番

1. `PROJECT_OVERVIEW.md`
2. `WATCH_APP_SPEC.md`
3. `INSTRUCTIONS_FOR_AI.md`
4. `IMPROVEMENT_PLAN.md`
5. `ARCHITECTURE.md`

Claude Design にUI/UX案を依頼する場合は、別途 `HANDOFF_FOR_CLAUDE_DESIGN.md` を参照してください。

## 作業フォルダ

```text
C:\Users\akihi\Desktop\ランニングウォッチアプリ
```

※ 過去の引き継ぎメモで `Codex,ランニングウォッチアプリ` と記載されていましたが、実際の Git リポジトリと作業ファイルは上記（`Codex,` 接頭辞なし）にあります。

## 現在のブランチ

```text
codex/running-watch-app
```

## 現在の状態

- Git作業ツリーはクリーン
- Next.js 14 App Router
- JavaScript / JSX
- Tailwind CSS
- 静的書き出し: `output: "export"`
- Netlify想定
- `node_modules/` はローカルに復元済み
- `.next/` や `out/` は生成物なのでコミットしない
- `dev-*.log` もローカルログなのでコミットしない

## 起動・確認コマンド

PowerShellでは `npm` が実行ポリシーで止まる場合があるため、`npm.cmd` を使うのが安全です。

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd test
```

`npm.cmd test` は Node 標準の `node:test` で診断ロジックの単体テストを実行します（依存ゼロ）。

ローカル確認URL:

```text
http://localhost:3000/
http://localhost:3000/compare/garmin-vs-applewatch/
http://localhost:3000/review/forerunner-265/
```

## 直近でCodexが実施したこと

### 初期移行

- `ランニングウォッチアプリ` フォルダで Git リポジトリを初期化（過去のメモには `Codex,ランニングウォッチアプリ` への移行と書かれていたが、実態としてリポジトリは元フォルダ内にそのまま作成されています）
- `.gitignore` 追加
- `public/reviews/.gitkeep` 追加

### P0改善

- `/compare/garmin-vs-applewatch/` を追加
- 診断結果画面の比較リンクを仮 `#` から実ページへ変更
- `public/reviews/` に商品画像5枚を配置
- `app/sitemap.js` を追加
- `app/robots.js` を追加
- `app/icon.svg` を追加
- `app/apple-icon.png` を追加
- STEP1結果とSTEP2結果の関係を結果画面で視覚化
- 進捗 `X / 5` 表示を確認済みとして記録

### Claude Design用

- `HANDOFF_FOR_CLAUDE_DESIGN.md` を追加

## Claude（Code）による継続改善

`a0b9e2d` 以降は Claude Code が引き継ぎ、1目的1コミットで以下を実施しました。

- レビュー記事に `Product` JSON-LD schema を追加（`useCases` の rating 平均から `aggregateRating` を生成）
- 例外ロジック発火時（Q1=A & Q4=A → garmin強制）に「あなたの回答から」の1行説明を STEP1 結果画面に表示
- 診断ロジックの単体テストを追加（`tests/diagnose.test.mjs` / Node 標準の `node:test`、依存ゼロ）
  - `app/data.js` → `app/data.mjs` にリネーム（Node が ESM として直接 import するため）
  - `package.json` に `npm test` スクリプトを追加
- `/compare/garmin-vs-applewatch/` に FAQ セクション（6問）と `FAQPage` JSON-LD を追加

すべてのコミットは Author: `Claude <claude@example.local>` で識別できます。

## 主要コミット

```text
c9f49ef Initial import from Claude project
bca1f93 Add Garmin vs Apple Watch comparison page
bfa9853 Add sitemap robots and app icons
f656021 Clarify diagnosis result flow
8c07554 Mark question progress check complete
7512078 Ignore local dev logs
f063633 Add Claude Design handoff brief
a0b9e2d Add Claude Code handoff guide
7ebda9d Add JSON-LD Product schema to review pages
dd38e2b Explain Garmin verdict when exception rule fires
7670f22 Add unit tests for diagnosis logic
25a9005 Add FAQ section to Garmin vs Apple Watch page
```

## 触ってよい主なファイル

- `app/Diagnosis.jsx`
- `app/data.mjs`（旧 `app/data.js`、ESM の Node テスト互換のためリネーム済み）
- `app/reviews.js`
- `app/review/[slug]/page.jsx`
- `app/compare/garmin-vs-applewatch/page.jsx`
- `app/globals.css`
- `tailwind.config.js`
- `tests/diagnose.test.mjs`
- `IMPROVEMENT_PLAN.md`
- `PROJECT_OVERVIEW.md`

## 触る前に確認してほしいファイル

- `next.config.mjs`
- `app/layout.jsx`
- 診断ロジック関数のシグネチャ
  - `diagnoseStep1(answerIndexes)`
  - `diagnoseStep2(answers, step1Type)`

## 変更してはいけないもの

- 設問数
  - STEP1 = 5問
  - STEP2 = 5問
- ファーストビューの主要コピー
  - `GarminかApple Watchか。最適な1本を、1分で。`
- モデルキー
  - `garmin165`
  - `garmin265`
  - `garmin965`
  - `corosPace4`
  - `appleWatch`
- レビューslug
  - `forerunner-165`
  - `forerunner-265`
  - `forerunner-965`
  - `coros-pace-4`
  - `apple-watch`
- `output: "export"`
- Pages Routerへの移行
- `next/image` の利用
- 新規UIライブラリや状態管理ライブラリの追加

## 残っているP0

### アフィリエイトリンク

`app/data.mjs` の `models[*].links` に、将来的に以下を追加する想定です。

```js
links: {
  review: "/review/...",
  amazon: "...",
  rakuten: "...",
  moshimo: "...",
}
```

リンクが提供されたら、以下にCTAを追加してください。

- `FinalResultScreen`
- `ReviewPage`

リンク属性:

```html
rel="sponsored noopener"
target="_blank"
```

### Google Search Console

アカウント操作が必要なので、ユーザー対応待ちです。

## 次におすすめの作業

素材なしで進めるなら、次はP1寄りですが以下が安全です。

1. 中間タイプ（`step1Results.middle`）の結果説明を充実させる
2. レビュー記事に `BreadcrumbList` JSON-LD を追加する（既存 `Product` schema の続編）
3. トップページに `WebSite` JSON-LD を追加する（IMPROVEMENT_PLAN.md P1 SEO項目）
4. 比較ページの FAQ 各回答からレビュー記事への内部リンクを追加する
5. Next.js 14.2.5 の脆弱性警告について、アップデート方針を調査する

外部素材があるなら、優先は以下です。

1. アフィリエイトリンクを追加
2. レビュー記事内のCTA配置を調整

### すでに完了

- ✅ 例外ロジック発火時に「なぜGarmin向きか」を結果に1行出す（`dd38e2b`）
- ✅ レビュー記事に JSON-LD `Product` schema を追加（`7ebda9d`）
- ✅ 診断ロジックの単体テスト最小構成（`7670f22` / `npm.cmd test` で実行可）
- ✅ 比較ページに FAQ + `FAQPage` JSON-LD を追加（`25a9005`）
- ✅ 商品画像5枚を配置（`4d08a08`）

## 注意点

`npm install` 時に Next.js 14.2.5 のセキュリティ警告が出ています。

ただし、現在は静的書き出し前提で安定しているため、アップデートは別タスクとして扱ってください。更新する場合は、Next.js公式の移行情報を確認し、`npm.cmd run build` が通ることを必ず確認してください。

## Claude Code に渡す依頼文

Claude Code にそのまま貼る場合は、以下を使ってください。

```text
このプロジェクトを引き継いで改善してください。

作業フォルダ:
C:\Users\akihi\Desktop\Codex,ランニングウォッチアプリ

まず HANDOFF_FOR_CLAUDE_CODE.md、PROJECT_OVERVIEW.md、WATCH_APP_SPEC.md、INSTRUCTIONS_FOR_AI.md、IMPROVEMENT_PLAN.md を読んでください。

Next.js App Router / JavaScript / Tailwind CSS / 静的書き出し output: "export" の構成です。

診断ロジック、設問数、モデルキー、review slug、next.config.mjs は勝手に変更しないでください。

作業前に git status を確認し、変更後は npm.cmd run build と npm.cmd test を通してください。

まずは IMPROVEMENT_PLAN.md のP0/P1から、素材や外部アカウントが不要な改善を1つ選んで、1目的1コミットで進めてください。
```
