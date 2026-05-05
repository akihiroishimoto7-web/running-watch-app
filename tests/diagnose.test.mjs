// 診断ロジックの単体テスト（依存ゼロ・Node 標準の node:test）
// 実行: npm run test
//
// STEP1 設問の選択肢 index 規約：
//   Q1: 0=記録を伸ばしたい(garmin)  1=健康維持(apple)
//   Q2: 0=週3以上(garmin) 1=週1〜2(中) 2=ほぼしない(apple)
//   Q3: 0=普段使い重要(apple) 1=そこそこ(中) 2=ほぼ運動用(garmin)
//   Q4: 0=データかなり好き(garmin) 1=最低限(apple軽) 2=あまり見ない(apple)
//   Q5: 0=Garmin 1=Apple Watch

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  diagnoseStep1,
  diagnoseStep2,
  getStep1Reason,
} from "../app/data.mjs";

// -------------------------------------------------------
// diagnoseStep1
// -------------------------------------------------------

test("diagnoseStep1: 全部 Garmin 寄りの選択 → garmin", () => {
  // Q1=A(garmin), Q2=A(garmin), Q3=C(garmin), Q4=A(garmin), Q5=A(garmin)
  assert.equal(diagnoseStep1([0, 0, 2, 0, 0]), "garmin");
});

test("diagnoseStep1: 全部 Apple 寄りの選択 → apple", () => {
  // Q1=B(apple), Q2=C(apple), Q3=A(apple), Q4=C(apple), Q5=B(apple)
  assert.equal(diagnoseStep1([1, 2, 0, 2, 1]), "apple");
});

test("diagnoseStep1: 例外ルール (Q1=A & Q4=A) → garmin強制", () => {
  // Q1=A & Q4=A のため、それ以外が apple 寄りでも garmin
  // Q2=C(apple+3) Q3=A(apple+2) Q5=B(apple+2) でも例外で garmin
  assert.equal(diagnoseStep1([0, 2, 0, 0, 1]), "garmin");
});

test("diagnoseStep1: スコア差が小さいケース → middle", () => {
  // Q1=A(g+2) Q2=B(g+1,a+1) Q3=B(g+1,a+1) Q4=B(a+1) Q5=B(a+2)
  // garmin=4, apple=5, |diff|=1 ≤ 2 → middle
  assert.equal(diagnoseStep1([0, 1, 1, 1, 1]), "middle");
});

test("diagnoseStep1: Q2=C で apple バイアスが効く", () => {
  // Q2=C は apple+3 で大きく振れる
  // Q1=A(g+2) Q2=C(a+3) Q3=B(中) Q4=B(a+1) Q5=B(a+2) → apple ≧ garmin
  assert.equal(diagnoseStep1([0, 2, 1, 1, 1]), "apple");
});

// -------------------------------------------------------
// getStep1Reason
// -------------------------------------------------------

test("getStep1Reason: 例外ルール発火時に Garmin の説明文を返す", () => {
  const reason = getStep1Reason([0, 2, 0, 0, 1], "garmin");
  assert.ok(reason, "reason should not be null");
  assert.match(reason, /Garmin/);
});

test("getStep1Reason: 自然な garmin 判定では null", () => {
  // Q1=A & Q4=A 以外で garmin
  const reason = getStep1Reason([0, 0, 2, 1, 0], "garmin");
  assert.equal(reason, null);
});

test("getStep1Reason: apple タイプは null", () => {
  const reason = getStep1Reason([1, 2, 0, 2, 1], "apple");
  assert.equal(reason, null);
});

test("getStep1Reason: middle タイプは null", () => {
  const reason = getStep1Reason([0, 1, 1, 1, 1], "middle");
  assert.equal(reason, null);
});

// -------------------------------------------------------
// diagnoseStep2 — 強い分岐ルール（優先順）
// -------------------------------------------------------

test("diagnoseStep2 ルール1: Q4=YES & Q3=NO → appleWatch", () => {
  assert.equal(
    diagnoseStep2(["NO", "NO", "NO", "YES", "NO"], "apple"),
    "appleWatch",
  );
});

test("diagnoseStep2 ルール2: Q1=YES & Q5=YES & Q4=NO → garmin165", () => {
  assert.equal(
    diagnoseStep2(["YES", "NO", "NO", "NO", "YES"], "garmin"),
    "garmin165",
  );
});

test("diagnoseStep2 ルール3: Q1=NO & Q3=YES & Q5=NO → garmin965", () => {
  assert.equal(
    diagnoseStep2(["NO", "YES", "YES", "NO", "NO"], "garmin"),
    "garmin965",
  );
});

test("diagnoseStep2 ルール4: Q2=YES & Q3=YES (Q1=YES で前ルール回避) → garmin265", () => {
  assert.equal(
    diagnoseStep2(["YES", "YES", "YES", "NO", "NO"], "garmin"),
    "garmin265",
  );
});

test("diagnoseStep2 ルール5: Q1=NO & Q5=YES & Q4=NO (Q3=NO で前ルール回避) → corosPace4", () => {
  assert.equal(
    diagnoseStep2(["NO", "NO", "NO", "NO", "YES"], "garmin"),
    "corosPace4",
  );
});

// -------------------------------------------------------
// 出力の妥当性（モデルキー漏れがないこと）
// -------------------------------------------------------

const VALID_MODELS = new Set([
  "garmin165",
  "garmin265",
  "garmin965",
  "corosPace4",
  "appleWatch",
]);

test("diagnoseStep2: 全てのYES/NO組み合わせで有効モデルを返す", () => {
  const types = ["garmin", "apple", "middle"];
  for (let mask = 0; mask < 32; mask++) {
    const answers = [0, 1, 2, 3, 4].map((i) =>
      mask & (1 << i) ? "YES" : "NO",
    );
    for (const t of types) {
      const result = diagnoseStep2(answers, t === "middle" ? "garmin" : t);
      assert.ok(
        VALID_MODELS.has(result),
        `mask=${mask} type=${t} → 不正なキー: ${result}`,
      );
    }
  }
});
