# INSTRUCTIONS_FOR_AI

このプロジェクトを改修する AI（Codex 等）への指示書。

## 4つの大原則

1. **構造を壊さない**
2. **段階的に改善する**
3. **スマホUXを最優先**
4. **初心者でも直感で分かるUI**

## 1. 構造を壊さない

### 触ってよい
- `app/Diagnosis.jsx` の表示・スタイル
- `app/data.js` の質問文・コピー・配点（**キー名は変えない**）
- `app/reviews.js` のテキスト内容
- `app/review/[slug]/page.jsx` のレイアウト
- `app/globals.css`
- `tailwind.config.js`

### 触る前に必ず相談
- `next.config.mjs`（`output: "export"` を外すとデプロイが壊れる）
- `app/layout.jsx` の metadata 構造
- 診断ロジック関数の **シグネチャ**（`diagnoseStep1` / `diagnoseStep2`）
- モデルキー名（`garmin165` / `garmin265` / `garmin965` / `corosPace3` / `appleWatch`）
- レビュー slug（URL に直結）

### やってはいけない変更
- ❌ 新規ライブラリの追加（特に状態管理・UIキット系）
- ❌ TypeScript への一括移行（必要なら相談）
- ❌ Pages Router への移行
- ❌ `next/image` の利用（静的書き出しと相性悪・利用しない方針）
- ❌ `'use client'` を `app/review/[slug]/page.jsx` に追加（SSGが壊れる）
- ❌ 設問数の変更（STEP1=5, STEP2=5 を維持）

## 2. 段階的に改善

### 1コミット = 1目的
- 「画像配置 + ロジック変更」のような複合PRはNG
- レビュー文章の修正と UI 変更は分けて出す

### 改善の優先順位は `IMPROVEMENT_PLAN.md` に従う
P0 → P1 → P2 の順。P0 を飛ばして P2 に着手しない。

### ビルド確認は毎回
```bash
npm run build
```
`out/` が生成されエラー無しで終わることを確認してから次に進む。

## 3. スマホUX最優先

### 必ず守る
- 最大幅は診断画面 `max-w-[440px]` / レビュー `max-w-[640px]`
- ボタンは最低 `py-[16px]` 以上（親指でタップしやすい）
- フォントサイズ最小 `text-[12px]`、本文は `text-[15px]` を基本
- iOS Safari でフォーム要素が拡大しないよう本文 16px は維持
- `letter-spacing: 0.01em` は globals.css で設定済み（崩さない）

### スマホでの動作確認
- iPhone Safari で実機 or Chrome DevTools のモバイルモードで確認
- 横向き・縦向き両方で破綻しないか
- セーフエリア（ノッチ・ホームバー）と CTA が干渉しないか

## 4. 初心者でも直感で分かるUI

### コピーライティング
- 専門用語は使わない or 直後に説明（"サブ4＝フルマラソンを4時間以内"）
- 1画面1メッセージ
- 動詞を主語にしたCTA（×「次のステップへ」、◯「次の質問」「診断を始める」）
- ネガティブ表現を避ける（×「失敗しない」、◯「自分に合う」）

### インタラクション
- タップで即座に次へ進む（確認ボタン不要）
- 戻るボタンは必ず左上
- 進捗は `1 / 5` のように分数表記
- アニメーションは 0.3 秒以内、`fadeSlide` のみ使用

### 信頼感
- 怪しい広告感を出さない
- 医療的・断定的表現禁止（"必ず痩せる" "絶対サブ4" など）
- アフィリエイト導線は明示的（`rel="sponsored"`）

## 改修フローのテンプレ

```
1. PROJECT_OVERVIEW.md / WATCH_APP_SPEC.md を読む
2. IMPROVEMENT_PLAN.md から着手項目を選ぶ
3. 該当ファイルを編集
4. npm run build でエラーが無いことを確認
5. スマホサイズ（375×812）で目視確認
6. PR or 差分提案
```

## 受け入れチェックリスト

改修PR/差分を出す前に：

- [ ] `npm run build` が成功する
- [ ] iPhone サイズで崩れていない
- [ ] 設問数を変えていない
- [ ] モデルキー / slug を変えていない
- [ ] 新規ライブラリを追加していない
- [ ] `app/review/[slug]/page.jsx` に `'use client'` を入れていない
- [ ] 「GarminかApple Watchか。最適な1本を、1分で。」のコピーを残している

## 困ったら

- 仕様の根拠：`WATCH_APP_SPEC.md`
- 構造の根拠：`ARCHITECTURE.md`
- 何をすべきか：`IMPROVEMENT_PLAN.md`
- それでも判断つかなければ、変更前に質問する
