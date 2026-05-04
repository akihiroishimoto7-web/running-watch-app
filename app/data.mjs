// =====================================================
// ランニングウォッチ診断アプリのデータ＆ロジック
// 後から質問・モデル・配点を調整しやすいよう
// すべてオブジェクトの配列で管理しています。
// =====================================================

// -----------------------------------------------------
// STEP1：Garmin vs Apple Watch 診断（5問）
// -----------------------------------------------------
// 各選択肢に { garmin, apple } のスコアを持たせて加算します。
// 「Aが多いとGarmin、Bが多いとApple」になるように配点済み。
// 例外条件は diagnoseStep1() の中で適用しています。
export const step1Questions = [
  {
    id: "q1",
    question: "どちらに近いですか？",
    options: [
      { label: "記録を伸ばしたい", score: { garmin: 2, apple: 0 } },
      { label: "健康維持・気分転換", score: { garmin: 0, apple: 2 } },
    ],
  },
  {
    id: "q2",
    question: "ランニング頻度は？",
    options: [
      { label: "週3以上", score: { garmin: 2, apple: 0 } },
      { label: "週1〜2", score: { garmin: 1, apple: 1 } },
      // Q2=C（ほぼしない）→ Apple寄りに補正
      { label: "ほぼしない", score: { garmin: 0, apple: 3 } },
    ],
  },
  {
    id: "q3",
    question: "普段使いの重要度は？",
    options: [
      { label: "かなり重要", score: { garmin: 0, apple: 2 } },
      { label: "そこそこ", score: { garmin: 1, apple: 1 } },
      { label: "ほぼ運動用", score: { garmin: 2, apple: 0 } },
    ],
  },
  {
    id: "q4",
    question: "データを見るのは好き？",
    options: [
      { label: "かなり好き", score: { garmin: 2, apple: 0 } },
      { label: "最低限でOK", score: { garmin: 0, apple: 1 } },
      { label: "あまり見ない", score: { garmin: 0, apple: 2 } },
    ],
  },
  {
    id: "q5",
    question: "正直どっちが気になる？",
    options: [
      { label: "Garmin", score: { garmin: 2, apple: 0 } },
      { label: "Apple Watch", score: { garmin: 0, apple: 2 } },
    ],
  },
];

// STEP1：診断ロジック
// 入力: 各設問で選んだ index の配列
// 出力: "garmin" / "apple" / "middle"
export function diagnoseStep1(answerIndexes) {
  let garmin = 0;
  let apple = 0;

  step1Questions.forEach((q, i) => {
    const opt = q.options[answerIndexes[i]];
    if (!opt) return;
    garmin += opt.score.garmin;
    apple += opt.score.apple;
  });

  // 例外：Q1=A（記録を伸ばしたい）かつ Q4=A（データかなり好き）→ Garmin強制
  if (answerIndexes[0] === 0 && answerIndexes[3] === 0) {
    return "garmin";
  }

  const diff = garmin - apple;
  // スコア差が小さい場合は「中間タイプ」
  if (Math.abs(diff) <= 2) return "middle";
  return diff > 0 ? "garmin" : "apple";
}

// 例外ロジックなど「なぜその診断になったか」を1行で説明する。
// 該当するケースが無ければ null を返す。
// 入力: STEP1の回答 index 配列 / diagnoseStep1 の出力
// 出力: 説明文 string または null
export function getStep1Reason(answerIndexes, type) {
  // 例外ルール：Q1=A（記録を伸ばしたい）AND Q4=A（データかなり好き）→ Garmin強制
  if (
    type === "garmin" &&
    answerIndexes[0] === 0 &&
    answerIndexes[3] === 0
  ) {
    return "「記録を伸ばしたい」と「データかなり好き」を選んだあなたは、Garmin の強みが最も活きるタイプです。";
  }
  return null;
}

// STEP1の結果説明
export const step1Results = {
  garmin: {
    title: "あなたは Garmin 向きです。",
    lead:
      "走力の成長、トレーニング管理、バッテリー持ちを重視するならGarminが合っています。\n走ることを習慣にし、少しずつ自分の変化を見たい人に向いています。",
    fits: [
      "ランニングを継続したい",
      "ペースや心拍を見たい",
      "フルマラソンやサブ4を目指したい",
      "充電頻度を減らしたい",
    ],
  },
  apple: {
    title: "あなたは Apple Watch 向きです。",
    lead:
      "日常の使いやすさ、通知、健康管理、デザイン性を重視するならApple Watchが合っています。\nランニングだけでなく、毎日の生活全体をスマートにしたい人に向いています。",
    fits: [
      "iPhoneとの連携を重視したい",
      "普段使いも大事",
      "デザイン性を重視したい",
      "運動習慣をゆるく始めたい",
    ],
  },
  middle: {
    title: "あなたは Garmin と Apple Watch の中間タイプです。",
    lead:
      "あなたの回答は Garmin 寄りと Apple Watch 寄りで拮抗しています。\nどちらを選んでも大きく外すことはありませんが、走る量や生活スタイルでベストな1本は変わります。\n次の5問で具体モデルまで絞り込めるので、迷ったらそのまま進んでください。",
    fits: null,
    tieBreakers: [
      "週3回以上走る・レースに出る・自己ベストを狙う → Garmin",
      "iPhone と通知・決済・音楽を腕で使いたい → Apple Watch",
      "フルマラソン以上の距離・トレイルを走る → Garmin",
      "デザインや普段使いの違和感のなさを重視する → Apple Watch",
      "充電は週1回くらいに抑えたい → Garmin",
    ],
  },
};

// -----------------------------------------------------
// STEP2：おすすめモデル診断（5問・YES / NO）
// -----------------------------------------------------
export const step2Questions = [
  { id: "q1", question: "初めてランニングウォッチを買いますか？" },
  { id: "q2", question: "サブ4・自己ベストを狙っていますか？" },
  { id: "q3", question: "ランニングデータの分析を重視しますか？" },
  { id: "q4", question: "普段使い・通知の使い勝手も重視しますか？" },
  { id: "q5", question: "価格はできるだけ抑えたいですか？" },
];

// 各モデルの紹介データ
export const models = {
  garmin165: {
    id: "garmin165",
    name: "Garmin Forerunner 165",
    brand: "Garmin",
    catch: "初めての本格ランニングウォッチに、ちょうどいい1本。",
    reasons: [
      "必要な機能を厳選した、初心者にやさしい設計",
      "AMOLEDディスプレイで普段使いも見やすい",
      "5万円前後と、Garminの中では手の届きやすい価格",
    ],
    notFor: "サブ3を本気で狙う上級者・地図やナビが必要な人",
    links: {
      review: "/review/forerunner-165/",
    },
  },
  garmin265: {
    id: "garmin265",
    name: "Garmin Forerunner 265",
    brand: "Garmin",
    catch: "サブ4・自己ベストを狙うランナーの定番。",
    reasons: [
      "トレーニング指標が一通り揃い、本格的な分析ができる",
      "デュアル周波数GPSで街中でも距離が正確",
      "AMOLED＋軽量ボディで毎日のラン〜レースまで万能",
    ],
    notFor: "健康維持メインの人・通知中心の使い方をしたい人",
    links: {
      review: "/review/forerunner-265/",
    },
  },
  garmin965: {
    id: "garmin965",
    name: "Garmin Forerunner 965",
    brand: "Garmin",
    catch: "ガチ勢の最終形。長距離・分析・地図、全部のせ。",
    reasons: [
      "フルマラソン〜ウルトラまで耐えるバッテリー持ち",
      "カラー地図・ナビで未知のコースやトレイルも安心",
      "最上位クラスのトレーニング指標とリカバリー分析",
    ],
    notFor: "ライトに走りたい人・予算を抑えたい人",
    links: {
      review: "/review/forerunner-965/",
    },
  },
  corosPace3: {
    id: "corosPace3",
    name: "COROS PACE 3",
    brand: "COROS",
    catch: "軽くて、安くて、長く走れる。コスパの正解。",
    reasons: [
      "わずか39gの超軽量で腕への負担が少ない",
      "5万円以下ながらデュアル周波数GPS搭載",
      "バッテリー最大24日と圧倒的な持ち",
    ],
    notFor: "通知やアプリ連携をフル活用したい人",
    links: {
      review: "/review/coros-pace-3/",
    },
  },
  appleWatch: {
    id: "appleWatch",
    name: "Apple Watch",
    brand: "Apple",
    catch: "走るし、鳴るし、決済もできる。続けるための1本。",
    reasons: [
      "iPhoneと完全連携で、通知・決済・音楽が一台で完結",
      "ワークアウトアプリで気軽にランニング記録",
      "ケース・バンドが豊富で普段使いから運動まで違和感なし",
    ],
    notFor: "本気でサブ4以上を狙う人・長時間バッテリーが欲しい人",
    links: {
      review: "/review/apple-watch/",
    },
  },
};

// STEP2：診断ロジック
// 入力: ["YES" | "NO", ... ] 5件 / step1Type ("garmin" | "apple")
// 出力: モデルID
export function diagnoseStep2(answers, step1Type) {
  const [q1, q2, q3, q4, q5] = answers;

  const score = {
    garmin165: 0,
    garmin265: 0,
    garmin965: 0,
    corosPace3: 0,
    appleWatch: 0,
  };

  // Q1：初めてのランニングウォッチか
  if (q1 === "YES") {
    score.garmin165 += 2;
    score.corosPace3 += 1;
    score.appleWatch += 1;
  } else {
    score.garmin265 += 1;
    score.garmin965 += 2;
  }

  // Q2：サブ4・自己ベスト
  if (q2 === "YES") {
    score.garmin265 += 2;
    score.garmin965 += 2;
    score.corosPace3 += 1;
  } else {
    score.garmin165 += 1;
    score.appleWatch += 2;
  }

  // Q3：データ分析
  if (q3 === "YES") {
    score.garmin265 += 2;
    score.garmin965 += 3;
    score.corosPace3 += 1;
  } else {
    score.garmin165 += 1;
    score.appleWatch += 2;
  }

  // Q4：普段使い・通知
  if (q4 === "YES") {
    score.appleWatch += 3;
    score.garmin165 += 1;
  } else {
    score.garmin265 += 1;
    score.garmin965 += 1;
    score.corosPace3 += 1;
  }

  // Q5：価格抑えたい
  if (q5 === "YES") {
    score.garmin165 += 2;
    score.corosPace3 += 2;
  } else {
    score.garmin965 += 2;
    score.garmin265 += 1;
    score.appleWatch += 1;
  }

  // STEP1の結果でバイアスをかける（同点時の方向性）
  if (step1Type === "garmin") {
    score.garmin165 += 1;
    score.garmin265 += 1;
    score.garmin965 += 1;
    score.corosPace3 += 1;
  } else if (step1Type === "apple") {
    score.appleWatch += 2;
  }

  // 強い分岐ルール（優先順）
  // 1. 普段使い重視 × 分析しない → Apple Watch
  if (q4 === "YES" && q3 === "NO") return "appleWatch";
  // 2. 初心者 × 価格抑えたい × 普段使いそこまで → Garmin 165
  if (q1 === "YES" && q5 === "YES" && q4 === "NO") return "garmin165";
  // 3. ガチ勢（経験者×分析×価格こだわらない）→ Garmin 965
  if (q1 === "NO" && q3 === "YES" && q5 === "NO") return "garmin965";
  // 4. サブ4×分析 → Garmin 265
  if (q2 === "YES" && q3 === "YES") return "garmin265";
  // 5. 軽さ×コスパ（価格抑えたい×経験者）→ COROS PACE 3
  if (q1 === "NO" && q5 === "YES" && q4 === "NO") return "corosPace3";

  // それ以外はスコア最大値で決定
  let bestId = "garmin165";
  let bestScore = -Infinity;
  for (const [id, s] of Object.entries(score)) {
    if (s > bestScore) {
      bestId = id;
      bestScore = s;
    }
  }
  return bestId;
}
