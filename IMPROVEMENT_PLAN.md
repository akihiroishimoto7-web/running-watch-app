# IMPROVEMENT_PLAN

優先度：**P0（必須） > P1（推奨） > P2（任意）**

## 1. UI改善

### P0
- [x] 商品画像を `public/reviews/` に配置（5枚）
- [x] 結果画面の Step1 表示順序：タイプ説明 → モデル提案 の流れを視覚的に強化

### P1
- [ ] 進捗バーを STEP1+STEP2 通しでも表示できるよう「全体 X / 10」表示を追加検討
- [ ] スマホで親指届きやすい下部CTA（sticky bottom）を結果画面に
- [ ] iPhoneのセーフエリア対応（`env(safe-area-inset-bottom)`）

### P2
- [ ] ダークモード対応（system 連動）
- [ ] OG 画像の生成（`/opengraph-image` を追加）

## 2. 診断の分かりやすさ

### P0
- [x] STEP1 結果と STEP2 結果の関係を1行で説明（"STEP1で大枠 → STEP2で具体モデル"）
- [x] 質問途中で「あと何問」が常に見えるか確認（STEP1/STEP2 とも X / 5 表示済）

### P1
- [ ] 例外ロジック（Q1=A & Q4=A → garmin強制）に近いケースで、なぜそうなったかを結果に1行添える
- [ ] 中間タイプのときの結果説明を充実（現状やや薄い）
- [ ] 「サブ4って何？」のような用語ヘルプをツールチップで

### P2
- [ ] 質問選択時の触覚フィードバック（`navigator.vibrate(10)`）

## 3. 収益導線

### P0
- [ ] 各レビューに**もしもアフィリエイト** or **楽天/Amazonアソシエイト**のリンクを追加
  - `data.js` の `models[*].links` に `amazon` / `rakuten` / `moshimo` フィールドを追加
  - `FinalResultScreen` と `ReviewPage` 末尾にCTAボタン3つ並べる
  - リンクには `rel="sponsored noopener"` を付与
- [x] 比較記事 `/compare/garmin-vs-applewatch/` を作成（診断結果からリンク済み）

### P1
- [ ] 比較表ページ：5モデルを横並びで比較できる `/compare/all/`
- [ ] ヒーローに「無料診断」明示ラベルを継続強調
- [ ] 各レビュー記事にメルマガ / アメブロ誘導リンク（既存ブログとの導線）

### P2
- [ ] `data.js` に `recommendedAccessories`（バンド・チェストストラップ等）を追加し横展開

## 4. コード整理

### P0
- [ ] `Diagnosis.jsx` が肥大化したら以下に分割：
  ```
  app/components/
    Intro.jsx
    ChoiceQuestionScreen.jsx
    YesNoQuestionScreen.jsx
    Step1ResultScreen.jsx
    FinalResultScreen.jsx
    StepHeader.jsx
    BackButton.jsx
  ```
  ※現状1ファイルで運用可能なら無理に分けない

### P1
- [ ] `data.js` を以下に分割（仕様変更時の差分が明確になる）：
  ```
  app/data/
    step1.js     # 質問 + 判定
    step2.js     # 質問 + 判定
    models.js    # モデル情報
    results.js   # STEP1結果テキスト
  ```
- [ ] レビューを Markdown / MDX 化して `app/reviews/{slug}.mdx` に移行（コンテンツ運用が楽になる）

### P2
- [ ] TypeScript 化（質問・モデル・診断ロジックの型安全）
- [ ] ESLint / Prettier 設定の最小限導入

## 5. SEO / アナリティクス

### P0
- [ ] Google Search Console 登録
- [x] sitemap.xml 自動生成（App Router の `app/sitemap.js` で対応）
- [x] favicon / apple-touch-icon の追加（`app/icon.svg` / `app/apple-icon.png`）

### P1
- [ ] 各レビューに JSON-LD `Product` schema
- [ ] トップページに `WebSite` + `BreadcrumbList` schema
- [ ] アクセス解析（Plausible / GA4）

### P2
- [ ] PWA化（`manifest.json` + service worker）

## 6. テスト・品質

### P1
- [ ] 診断ロジック（`diagnoseStep1` / `diagnoseStep2`）の単体テスト
- [ ] Lighthouse スコア 90+ 維持の継続確認
- [ ] iOS Safari / Chrome での表示確認

## 着手順の推奨

1. **アフィリエイトリンク（P0）** — 収益化の最初の一歩
2. **Google Search Console 登録（P0）** — インデックス状況の確認
3. P1 以降は実利用ログを見てから判断

完了済み: 画像配置 / 比較ページ / sitemap / favicon
