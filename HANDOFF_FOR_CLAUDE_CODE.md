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
C:\Users\akihi\Desktop\Codex,ランニングウォッチアプリ
```

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
```

ローカル確認URL:

```text
http://localhost:3000/
http://localhost:3000/compare/garmin-vs-applewatch/
http://localhost:3000/review/forerunner-265/
```

## 直近でCodexが実施したこと

### 初期移行

- `Claude、ランニングウォッチアプリ` から `Codex,ランニングウォッチアプリ` に移行
- Gitリポジトリ初期化
- `.gitignore` 追加
- `public/reviews/.gitkeep` 追加

### P0改善

- `/compare/garmin-vs-applewatch/` を追加
- 診断結果画面の比較リンクを仮 `#` から実ページへ変更
- `app/sitemap.js` を追加
- `app/robots.js` を追加
- `app/icon.svg` を追加
- `app/apple-icon.png` を追加
- STEP1結果とSTEP2結果の関係を結果画面で視覚化
- 進捗 `X / 5` 表示を確認済みとして記録

### Claude Design用

- `HANDOFF_FOR_CLAUDE_DESIGN.md` を追加

## 主要コミット

```text
c9f49ef Initial import from Claude project
bca1f93 Add Garmin vs Apple Watch comparison page
bfa9853 Add sitemap robots and app icons
f656021 Clarify diagnosis result flow
8c07554 Mark question progress check complete
7512078 Ignore local dev logs
f063633 Add Claude Design handoff brief
```

## 触ってよい主なファイル

- `app/Diagnosis.jsx`
- `app/data.js`
- `app/reviews.js`
- `app/review/[slug]/page.jsx`
- `app/compare/garmin-vs-applewatch/page.jsx`
- `app/globals.css`
- `tailwind.config.js`
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
  - `corosPace3`
  - `appleWatch`
- レビューslug
  - `forerunner-165`
  - `forerunner-265`
  - `forerunner-965`
  - `coros-pace-3`
  - `apple-watch`
- `output: "export"`
- Pages Routerへの移行
- `next/image` の利用
- 新規UIライブラリや状態管理ライブラリの追加

## 残っているP0

### 商品画像

`public/reviews/{slug}.jpg` に5枚を配置する必要があります。

必要なファイル名:

```text
public/reviews/forerunner-165.jpg
public/reviews/forerunner-265.jpg
public/reviews/forerunner-965.jpg
public/reviews/coros-pace-3.jpg
public/reviews/apple-watch.jpg
```

画像素材がない場合は、ユーザーに確認してください。勝手に公式画像をダウンロードして同梱しないでください。

### アフィリエイトリンク

`app/data.js` の `models[*].links` に、将来的に以下を追加する想定です。

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

1. 中間タイプの説明を充実させる
2. 例外ロジックに近いケースで「なぜGarmin向きか」を結果に1行出す
3. レビュー記事にJSON-LD `Product` schemaを追加する
4. 診断ロジックの単体テストを最小構成で追加する
5. Next.js 14.2.5 の脆弱性警告について、アップデート方針を調査する

外部素材があるなら、優先は以下です。

1. 商品画像5枚を配置
2. アフィリエイトリンクを追加
3. レビュー記事内のCTA配置を調整

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

作業前に git status を確認し、変更後は npm.cmd run build を通してください。

まずは IMPROVEMENT_PLAN.md のP0/P1から、素材や外部アカウントが不要な改善を1つ選んで、1目的1コミットで進めてください。
```
