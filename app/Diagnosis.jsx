"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  step1Questions,
  step2Questions,
  step1Results,
  models,
  diagnoseStep1,
  diagnoseStep2,
  diagnoseStep2Detailed,
  getStep1Reason,
} from "./data";

export default function Diagnosis() {
  // phase: intro | step1 | step1Result | step2 | step2Result
  const [phase, setPhase] = useState("intro");
  const [step1Answers, setStep1Answers] = useState([]);
  const [step2Answers, setStep2Answers] = useState([]);
  const [step1Type, setStep1Type] = useState(null);
  const [modelId, setModelId] = useState(null);
  const [matchPercent, setMatchPercent] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);

  // ?result=modelId&type=garmin 付きURLで結果画面を直接開けるようにする。
  // ブログ記事から特定モデルの結果へ直リンクするための導線。
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resultId = params.get("result");
    const type = params.get("type");
    if (resultId && models[resultId]) {
      setModelId(resultId);
      setStep1Type(
        ["garmin", "apple", "middle"].includes(type) ? type : "garmin",
      );
      setPhase("step2Result");
    }
  }, []);

  const reset = () => {
    setPhase("intro");
    setStep1Answers([]);
    setStep2Answers([]);
    setStep1Type(null);
    setModelId(null);
    setMatchPercent(null);
    setCurrentQ(0);
    // 共有URL経由で開いた場合、リロードで結果画面に戻らないようクエリを消す
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  // 選択時の軽い触覚フィードバック（対応端末のみ）
  const vibrate = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const onStep1Answer = (optionIndex) => {
    vibrate();
    const next = [...step1Answers, optionIndex];
    if (next.length === step1Questions.length) {
      setStep1Answers(next);
      setStep1Type(diagnoseStep1(next));
      setPhase("step1Result");
      setCurrentQ(0);
    } else {
      setStep1Answers(next);
      setCurrentQ(currentQ + 1);
    }
  };

  const onStep2Answer = (yesNo) => {
    vibrate();
    const next = [...step2Answers, yesNo];
    if (next.length === step2Questions.length) {
      setStep2Answers(next);
      // 中間タイプは Garmin 寄りに丸めて STEP2 ロジックに通す
      const baseType = step1Type === "middle" ? "garmin" : step1Type;
      const { modelId: mid, matchPercent: pct } = diagnoseStep2Detailed(next, baseType);
      setModelId(mid);
      setMatchPercent(pct);
      setPhase("step2Result");
      setCurrentQ(0);
    } else {
      setStep2Answers(next);
      setCurrentQ(currentQ + 1);
    }
  };

  const onStep1Back = () => {
    if (currentQ > 0) {
      setStep1Answers(step1Answers.slice(0, -1));
      setCurrentQ(currentQ - 1);
    } else {
      setPhase("intro");
    }
  };

  const onStep2Back = () => {
    if (currentQ > 0) {
      setStep2Answers(step2Answers.slice(0, -1));
      setCurrentQ(currentQ - 1);
    } else {
      // STEP1 結果に戻す
      setStep2Answers([]);
      setPhase("step1Result");
    }
  };

  return (
    <main className="min-h-screen w-full flex justify-center bg-white">
      <div className="w-full max-w-[440px] min-h-screen px-6 pt-6 pb-8 flex flex-col">
        {phase === "intro" && <Intro onStart={() => setPhase("step1")} />}

        {phase === "step1" && (
          <ChoiceQuestionScreen
            stepLabel="STEP 1 / 2 ・ タイプ診断"
            current={currentQ}
            total={step1Questions.length}
            globalCurrent={currentQ}
            globalTotal={step1Questions.length + step2Questions.length}
            question={step1Questions[currentQ]}
            onSelect={onStep1Answer}
            onBack={onStep1Back}
          />
        )}

        {phase === "step1Result" && (
          <Step1ResultScreen
            type={step1Type}
            answers={step1Answers}
            onNext={() => setPhase("step2")}
            onReset={reset}
          />
        )}

        {phase === "step2" && (
          <YesNoQuestionScreen
            stepLabel="STEP 2 / 2 ・ モデル診断"
            current={currentQ}
            total={step2Questions.length}
            globalCurrent={step1Questions.length + currentQ}
            globalTotal={step1Questions.length + step2Questions.length}
            question={step2Questions[currentQ]}
            onSelect={onStep2Answer}
            onBack={onStep2Back}
          />
        )}

        {phase === "step2Result" && (
          <FinalResultScreen
            model={models[modelId]}
            step1Type={step1Type}
            matchPercent={matchPercent}
            onReset={reset}
          />
        )}
      </div>
    </main>
  );
}

// ------------------------------------------------------
// 共通：戻るボタン
// ------------------------------------------------------
function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="戻る"
      className="-ml-2 mb-4 inline-flex items-center gap-1 text-[14px] font-medium text-neutral-500 hover:text-neutral-900 transition self-start py-1.5 px-2 rounded-md"
    >
      <span className="text-[18px] leading-none -mt-[1px]">‹</span>
      <span>戻る</span>
    </button>
  );
}

// ------------------------------------------------------
// 共通：ヘッダー（ステップ名 + 進捗）
// ------------------------------------------------------
function StepHeader({ stepLabel, current, total, globalCurrent, globalTotal }) {
  const pct = Math.min(100, Math.round(((current + 1) / total) * 100));
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium tracking-[0.18em] text-neutral-500 uppercase">
          {stepLabel}
        </span>
        <span className="text-[12px] font-medium tabular-nums text-neutral-700">
          {current + 1}{" "}
          <span className="text-neutral-400">/ {total}</span>
          {globalTotal != null && (
            <span className="ml-2 text-[11px] text-neutral-400">
              全体 {globalCurrent + 1} / {globalTotal}
            </span>
          )}
        </span>
      </div>
      <div className="h-[3px] bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-neutral-900 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ------------------------------------------------------
// イントロ（ファーストビュー）
// ------------------------------------------------------
function Intro({ onStart }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col justify-center pt-6 pb-6 animate-fadeSlide">
        <div className="text-[11px] font-semibold tracking-[0.22em] text-neutral-500 mb-5">
          RUNNING WATCH 診断
        </div>
        <h1 className="text-[40px] leading-[1.12] font-bold tracking-tight text-neutral-900">
          Garmin か
          <br />
          Apple Watch か。
        </h1>
        <p className="mt-5 text-[18px] leading-[1.55] text-neutral-700 font-medium">
          最適な1本を、1分で。
        </p>
        <p className="mt-3 text-[14px] leading-[1.7] text-neutral-500">
          目的に合わせて、あなたにぴったりのランニングウォッチを診断します。
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          <Chip>ランニング初心者向け</Chip>
          <Chip>Garmin / Apple Watch を比較</Chip>
          <Chip>目的別におすすめを診断</Chip>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={onStart}
          className="w-full bg-neutral-900 text-white rounded-2xl py-[18px] text-[16px] font-semibold active:scale-[0.98] hover:bg-neutral-800 transition shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          診断を始める
        </button>
        <div className="mt-4 text-center text-[12px] text-neutral-500">
          所要時間：約1分 ／ 全5問 ／ 無料診断
        </div>
      </div>
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center text-[12px] font-medium text-neutral-700 bg-neutral-100 rounded-full px-3 py-1.5">
      {children}
    </span>
  );
}

// ------------------------------------------------------
// 選択肢タイプ（STEP1）
// ------------------------------------------------------
function ChoiceQuestionScreen({
  stepLabel,
  current,
  total,
  globalCurrent,
  globalTotal,
  question,
  onSelect,
  onBack,
}) {
  return (
    <div className="flex-1 flex flex-col">
      <BackButton onClick={onBack} />
      <StepHeader
        stepLabel={stepLabel}
        current={current}
        total={total}
        globalCurrent={globalCurrent}
        globalTotal={globalTotal}
      />

      <div
        key={question.id}
        className="mt-12 flex-1 flex flex-col animate-fadeSlide"
      >
        <h2 className="text-[24px] font-bold leading-[1.4] tracking-tight text-neutral-900">
          {question.question}
        </h2>

        <div className="mt-8 flex flex-col gap-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className="group w-full text-left bg-white border border-neutral-200 rounded-2xl px-5 py-[18px] text-[16px] font-medium text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 active:scale-[0.99] transition"
            >
              <span className="flex items-center justify-between gap-3">
                <span>{opt.label}</span>
                <span className="text-neutral-300 group-hover:text-neutral-900 transition">
                  →
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------
// YES/NOタイプ（STEP2）
// ------------------------------------------------------
function YesNoQuestionScreen({
  stepLabel,
  current,
  total,
  globalCurrent,
  globalTotal,
  question,
  onSelect,
  onBack,
}) {
  return (
    <div className="flex-1 flex flex-col">
      <BackButton onClick={onBack} />
      <StepHeader
        stepLabel={stepLabel}
        current={current}
        total={total}
        globalCurrent={globalCurrent}
        globalTotal={globalTotal}
      />

      <div
        key={question.id}
        className="mt-12 flex-1 flex flex-col animate-fadeSlide"
      >
        <h2 className="text-[24px] font-bold leading-[1.4] tracking-tight text-neutral-900">
          {question.question}
        </h2>

        {question.help && (
          <p className="mt-3 text-[13px] leading-[1.7] text-neutral-500">
            {question.help}
          </p>
        )}

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={() => onSelect("YES")}
            className="bg-neutral-900 text-white rounded-2xl py-6 text-[17px] font-semibold active:scale-[0.98] hover:bg-neutral-800 transition"
          >
            はい
          </button>
          <button
            onClick={() => onSelect("NO")}
            className="bg-white border border-neutral-200 text-neutral-900 rounded-2xl py-6 text-[17px] font-semibold active:scale-[0.98] hover:border-neutral-900 hover:bg-neutral-50 transition"
          >
            いいえ
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------
// STEP1 結果
// ------------------------------------------------------
function Step1ResultScreen({ type, answers, onNext, onReset }) {
  const r = step1Results[type];
  const reason = answers ? getStep1Reason(answers, type) : null;
  return (
    <div className="flex-1 flex flex-col animate-fadeSlide">
      <div className="text-[11px] font-semibold tracking-[0.22em] text-neutral-500 mb-4 uppercase">
        診断結果
      </div>

      <h2 className="text-[26px] font-bold leading-[1.35] tracking-tight text-neutral-900">
        {r.title}
      </h2>

      <p className="mt-5 text-[15px] text-neutral-700 leading-[1.85] whitespace-pre-line">
        {r.lead}
      </p>

      {reason && (
        <div className="mt-5 bg-neutral-50 border-l-2 border-neutral-900 rounded-r-lg px-4 py-3">
          <div className="text-[11px] font-semibold tracking-wider text-neutral-500 mb-1">
            あなたの回答から
          </div>
          <p className="text-[13px] text-neutral-800 leading-[1.7]">
            {reason}
          </p>
        </div>
      )}

      <div className="mt-6 bg-white border border-neutral-200 rounded-2xl p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <ResultStep label="STEP1" title="方向性" active />
          <span className="text-neutral-300 text-[18px]" aria-hidden="true">
            →
          </span>
          <ResultStep label="STEP2" title="具体モデル" />
        </div>
        <p className="mt-4 text-[13px] text-neutral-600 leading-[1.7]">
          STEP1では大きな方向性を確認しました。次の5問で、あなたに合う具体モデルを絞ります。
        </p>
      </div>

      {r.fits && (
        <div className="mt-7 bg-neutral-50 border border-neutral-200/70 rounded-2xl p-5">
          <div className="text-[13px] font-semibold text-neutral-900 mb-3">
            こんな人に向いています
          </div>
          <ul className="space-y-2.5">
            {r.fits.map((f, i) => (
              <li
                key={i}
                className="flex gap-3 text-[14px] leading-[1.6] text-neutral-700"
              >
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {r.tieBreakers && (
        <div className="mt-7 bg-neutral-50 border border-neutral-200/70 rounded-2xl p-5">
          <div className="text-[13px] font-semibold text-neutral-900 mb-3">
            迷ったときの判断軸
          </div>
          <ul className="space-y-2.5">
            {r.tieBreakers.map((t, i) => (
              <li
                key={i}
                className="flex gap-3 text-[14px] leading-[1.6] text-neutral-700"
              >
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="sticky bottom-0 -mx-6 px-6 pt-4 pb-safe bg-white border-t border-neutral-100 mt-8">
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onNext}
            className="w-full bg-neutral-900 text-white rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:bg-neutral-800 transition"
          >
            おすすめモデルを見る
          </button>
          <Link
            href="/compare/garmin-vs-applewatch/"
            className="w-full text-center bg-white border border-neutral-200 text-neutral-900 rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:border-neutral-900 hover:bg-neutral-50 transition"
          >
            GarminとApple Watchの詳しい比較を読む
          </Link>
          <button
            onClick={onReset}
            className="w-full text-neutral-500 py-3 text-[14px] hover:text-neutral-900 transition"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------
// 最終結果（STEP2 後・モデル提案）
// ------------------------------------------------------
function FinalResultScreen({ model, step1Type, matchPercent, onReset }) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = `${window.location.origin}/?result=${model.id}&type=${step1Type || "garmin"}`;
    const text = `ランニングウォッチ診断の結果は「${model.name}」でした`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "ランニングウォッチ診断", text, url });
      } catch {
        // キャンセル時は何もしない
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボード不可環境では黙って何もしない
    }
  };
  return (
    <div className="flex-1 flex flex-col animate-fadeSlide">
      <div className="text-[11px] font-semibold tracking-[0.22em] text-neutral-500 mb-4 uppercase">
        あなたへのおすすめ
      </div>
      {model.badge && (
        <span className="self-start mb-3 inline-flex items-center text-[11px] font-semibold tracking-wide bg-neutral-900 text-white rounded-full px-3 py-1">
          {model.badge}
        </span>
      )}
      <div className="text-[12px] text-neutral-500 mb-1.5">{model.brand}</div>
      <h2 className="text-[28px] font-bold tracking-tight leading-[1.25] text-neutral-900">
        {model.name}
      </h2>
      <p className="mt-4 text-[15px] text-neutral-700 leading-[1.8]">
        {model.catch}
      </p>
      {matchPercent && (
        <div className="mt-5 bg-neutral-50 border border-neutral-200/70 rounded-2xl px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-semibold text-neutral-700">あなたへのマッチ度</span>
            <span className="text-[18px] font-bold tabular-nums text-neutral-900">{matchPercent}%</span>
          </div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-neutral-900 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${matchPercent}%` }}
            />
          </div>
        </div>
      )}
      {(model.price || model.battery || model.weight) && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {model.price && (
            <div className="bg-white border border-neutral-200/70 rounded-xl px-3 py-3 text-center">
              <div className="text-[10px] text-neutral-500 mb-1">参考価格</div>
              <div className="text-[12px] font-semibold text-neutral-900 leading-tight">{model.price}</div>
            </div>
          )}
          {model.battery && (
            <div className="bg-white border border-neutral-200/70 rounded-xl px-3 py-3 text-center">
              <div className="text-[10px] text-neutral-500 mb-1">バッテリー</div>
              <div className="text-[12px] font-semibold text-neutral-900 leading-tight">{model.battery}</div>
            </div>
          )}
          {model.weight && (
            <div className="bg-white border border-neutral-200/70 rounded-xl px-3 py-3 text-center">
              <div className="text-[10px] text-neutral-500 mb-1">重さ</div>
              <div className="text-[12px] font-semibold text-neutral-900 leading-tight">{model.weight}</div>
            </div>
          )}
        </div>
      )}

      <div className="mt-5 bg-white border border-neutral-200 rounded-2xl p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <ResultStep label="STEP1" title="方向性" />
          <span className="text-neutral-300 text-[18px]" aria-hidden="true">
            →
          </span>
          <ResultStep label="STEP2" title="具体モデル" active />
        </div>
        <p className="mt-4 text-[13px] text-neutral-600 leading-[1.7]">
          STEP1の方向性を土台に、STEP2の回答からこのモデルを選びました。
        </p>
      </div>

      <div className="mt-7 bg-neutral-50 border border-neutral-200/70 rounded-2xl p-5">
        <div className="text-[13px] font-semibold text-neutral-900 mb-3">
          このモデルが向いている理由
        </div>
        <ul className="space-y-2.5">
          {model.reasons.map((r, i) => (
            <li
              key={i}
              className="flex gap-3 text-[14px] leading-[1.6] text-neutral-700"
            >
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 bg-white border border-neutral-200/70 rounded-2xl p-5">
        <div className="text-[13px] font-semibold text-neutral-900 mb-2">
          こんな人には向きません
        </div>
        <p className="text-[14px] text-neutral-600 leading-[1.7]">
          {model.notFor}
        </p>
      </div>

      <div className="mt-6 text-center text-[11px] text-neutral-400 tracking-wide">
        STEP 1：
        {step1Type === "garmin"
          ? "Garmin タイプ"
          : step1Type === "apple"
            ? "Apple Watch タイプ"
            : "中間タイプ"}{" "}
        ／ STEP 2：{model.name}
      </div>

      <div className="sticky bottom-0 -mx-6 px-6 pt-4 pb-safe bg-white border-t border-neutral-100 mt-8">
        <div className="flex flex-col gap-2.5">
          {model.links.review && model.links.review !== "#" ? (
            <Link
              href={model.links.review}
              className="w-full text-center bg-neutral-900 text-white rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:bg-neutral-800 transition"
            >
              詳しいレビューを見る
            </Link>
          ) : (
            <div
              aria-disabled="true"
              className="w-full text-center bg-neutral-100 text-neutral-400 rounded-2xl py-[16px] text-[15px] font-semibold cursor-not-allowed select-none"
            >
              詳しいレビューを見る（準備中）
            </div>
          )}
          <button
            onClick={onShare}
            className="w-full text-center bg-white border border-neutral-200 text-neutral-900 rounded-2xl py-[14px] text-[14px] font-semibold active:scale-[0.98] hover:border-neutral-900 hover:bg-neutral-50 transition"
          >
            {copied ? "リンクをコピーしました ✓" : "この結果をシェアする"}
          </button>
          <button
            onClick={onReset}
            className="w-full text-neutral-500 py-3 text-[14px] hover:text-neutral-900 transition"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultStep({ label, title, active = false }) {
  return (
    <div
      className={`rounded-xl px-3 py-3 text-center ${
        active ? "bg-neutral-900 text-white" : "bg-neutral-50 text-neutral-500"
      }`}
    >
      <div className="text-[10px] font-semibold tracking-[0.16em] uppercase">
        {label}
      </div>
      <div className="mt-1 text-[13px] font-semibold">{title}</div>
    </div>
  );
}
