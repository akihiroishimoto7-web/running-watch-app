# WATCH_APP_SPEC

## 全体構成

2ステップ診断（合計10問・所要約1分）。

```
[INTRO] → [STEP1: 5問] → [STEP1結果] → [STEP2: 5問] → [STEP2結果（モデル提案）]
```

## STEP1：タイプ診断（5問・選択式）

`app/data.js` の `step1Questions`。各選択肢に `{ garmin, apple }` スコア。

| # | 設問 | 選択肢 | スコア |
| --- | --- | --- | --- |
| Q1 | どちらに近いですか？ | 記録を伸ばしたい | garmin:2 |
| | | 健康維持・気分転換 | apple:2 |
| Q2 | ランニング頻度は？ | 週3以上 | garmin:2 |
| | | 週1〜2 | g:1 / a:1 |
| | | ほぼしない | apple:3 |
| Q3 | 普段使いの重要度は？ | かなり重要 | apple:2 |
| | | そこそこ | g:1 / a:1 |
| | | ほぼ運動用 | garmin:2 |
| Q4 | データを見るのは好き？ | かなり好き | garmin:2 |
| | | 最低限でOK | apple:1 |
| | | あまり見ない | apple:2 |
| Q5 | 正直どっちが気になる？ | Garmin | garmin:2 |
| | | Apple Watch | apple:2 |

### 判定ロジック

```js
diagnoseStep1(answerIndexes) → "garmin" | "apple" | "middle"
```

1. 選択肢のスコアを合計（garmin / apple）
2. 例外ルール：
   - **Q1=A（記録）かつ Q4=A（データ好き） → 強制 `"garmin"`**
3. 差の絶対値が小さい場合（実装は `data.js` を参照）→ `"middle"`
4. それ以外は大きい方

## STEP2：モデル診断（5問・YES/NO）

`step2Questions`。

| # | 設問 |
| --- | --- |
| Q1 | 初めてランニングウォッチを買いますか？ |
| Q2 | サブ4・自己ベストを狙っていますか？ |
| Q3 | ランニングデータの分析を重視しますか？ |
| Q4 | 普段使い・通知の使い勝手も重視しますか？ |
| Q5 | 価格はできるだけ抑えたいですか？ |

### 判定ロジック

```js
diagnoseStep2(answers, step1Type) → modelKey
```

#### スコア配点（YES/NO で各モデルに加算）

| 設問 | YES の加算 | NO の加算 |
| --- | --- | --- |
| Q1 初心者 | g165:+2, coros:+1, apple:+1 | g265:+1, g965:+2 |
| Q2 サブ4 | g265:+2, g965:+2, coros:+1 | g165:+1, apple:+2 |
| Q3 分析 | g265:+2, g965:+3, coros:+1 | g165:+1, apple:+2 |
| Q4 普段使い | apple:+3, g165:+1 | g265:+1, g965:+1, coros:+1 |
| Q5 価格抑 | g165:+2, coros:+2 | g965:+2, g265:+1, apple:+1 |

#### STEP1 バイアス

- `step1Type === "garmin"` → 全 Garmin 系 +1, COROS +1
- `step1Type === "apple"` → apple +2
- `step1Type === "middle"` → STEP2 ロジック内で `"garmin"` に丸めて処理

#### 強い分岐ルール（優先順）

1. **Q4=YES かつ Q3=NO** → `appleWatch`
2. **Q1=YES かつ Q5=YES かつ Q4=NO** → `garmin165`
3. **Q1=NO かつ Q3=YES かつ Q5=NO** → `garmin965`
4. **Q2=YES かつ Q3=YES** → `garmin265`
5. **Q1=NO かつ Q5=YES かつ Q4=NO** → `corosPace4`
6. それ以外 → スコア最大のモデル

## 診断タイプ

### 大分類（STEP1の出力）

| タイプ | 内部キー | 結果見出し |
| --- | --- | --- |
| Garmin タイプ | `garmin` | あなたは"積み上げるランナー"です |
| Apple Watch タイプ | `apple` | あなたは"続けることが勝ちのランナー"です |
| 中間タイプ | `middle` | 中間タイプ |

### モデル分類（STEP2の出力）

| カテゴリ | モデル | 価格帯 | 主な顧客 |
| --- | --- | --- | --- |
| Garmin エントリー | Forerunner 165 | 〜5万 | 初心者、初めての本格機 |
| Garmin 本格 | Forerunner 265 | 6.5〜7.5万 | サブ4本気層 |
| Garmin 最上位 | Forerunner 965 | 9〜10万 | サブ3 / ウルトラ / トレイル |
| コスパ | COROS PACE 4 | 約3.6万 | コスパ重視 / 軽量好み / AMOLED + 音楽保存 |
| Apple | Apple Watch | 3.4〜13万 | 普段使い重視 |

### 各モデルの特徴と理由（要約）

| モデル | 強み | 向く理由 |
| --- | --- | --- |
| Forerunner 165 | AMOLED + 39g + 5万円 | 初心者が後悔しない最小構成 |
| Forerunner 265 | マルチバンドGPS + Training Readiness | データを見て走力を伸ばす中級向け |
| Forerunner 965 | カラー地図 + 31時間GPS | ウルトラ・トレイル・知らない場所で走る人 |
| COROS PACE 4 | AMOLED + デュアル周波数 + 41時間 + 音楽保存 | Garminより安く軽量、機能は本格 |
| Apple Watch | iPhone連携 + デザイン + ヘルスケア | ランより生活全体を重視する人 |

## エラー / 異常系

- 質問途中でブラウザ更新 → 状態リセット（`useState` のため）
- 無効な slug `/review/foo/` → 404（`generateStaticParams` で固定）
- `links.review === "#"` → ボタン無効化（"準備中"表示）

## 改善時の不変条件

以下は変更時に**仕様破壊**となるため要相談：

- 設問数（STEP1=5問 / STEP2=5問）
- ファーストビューのコピー「GarminかApple Watchか。最適な1本を、1分で。」
- モデルキー名（`garmin165` / `garmin265` / `garmin965` / `corosPace4` / `appleWatch`）
- レビュー slug（URL に直結）
