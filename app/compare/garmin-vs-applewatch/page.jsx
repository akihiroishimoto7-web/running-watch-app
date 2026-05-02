import Link from "next/link";

export const metadata = {
  title: "Garmin と Apple Watch の違い | ランニングウォッチ診断",
  description:
    "Garmin と Apple Watch の違いを、ランニング初心者からサブ4挑戦層向けに比較。走力を伸ばしたい人、普段使いを重視したい人、それぞれに合う選び方を解説します。",
  openGraph: {
    title: "Garmin と Apple Watch の違い",
    description:
      "ランニングウォッチとして選ぶなら、Garmin と Apple Watch のどちらが合うかを比較します。",
    type: "article",
  },
};

const comparisonRows = [
  {
    label: "向いている人",
    garmin: "走力を伸ばしたい人、練習を数字で見たい人",
    apple: "ランも日常も1本でまとめたい人",
  },
  {
    label: "得意なこと",
    garmin: "ペース、心拍、回復、練習負荷の管理",
    apple: "通知、決済、音楽、iPhone連携",
  },
  {
    label: "バッテリー",
    garmin: "数日から数週間持つモデルが多い",
    apple: "毎日から1日半ごとの充電が基本",
  },
  {
    label: "ランニング分析",
    garmin: "トレーニング指標が深い",
    apple: "標準機能はシンプル。アプリ追加で補える",
  },
  {
    label: "普段使い",
    garmin: "機能的。ランナー向けの道具感が強い",
    apple: "デザイン、通知、決済まで自然に使える",
  },
];

const garminFits = [
  "月に何度も走っていて、少しずつ記録を伸ばしたい",
  "心拍、ペース、リカバリーを見ながら練習したい",
  "フルマラソンやサブ4に向けて準備したい",
  "充電回数をできるだけ減らしたい",
];

const appleFits = [
  "ランニングは健康習慣として続けたい",
  "iPhoneの通知、音楽、決済を腕で使いたい",
  "仕事や外出でも違和感なく使いたい",
  "細かい分析より、毎日つけたくなることを重視したい",
];

export default function GarminVsAppleWatchPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <article className="w-full max-w-[640px] mx-auto px-6 pt-6 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[14px] font-medium text-neutral-500 hover:text-neutral-900 transition -ml-2 py-1.5 px-2 rounded-md"
        >
          <span className="text-[18px] leading-none -mt-[1px]">‹</span>
          <span>診断トップへ戻る</span>
        </Link>

        <header className="mt-6 animate-fadeSlide">
          <div className="text-[12px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
            Garmin vs Apple Watch
          </div>
          <h1 className="mt-3 text-[30px] sm:text-[34px] font-bold tracking-tight leading-[1.25] text-neutral-900">
            ランニング用なら、
            <br />
            どちらを選ぶべき？
          </h1>
          <p className="mt-5 text-[15px] text-neutral-700 leading-[1.9]">
            結論はシンプルです。走力を伸ばすことを主役にするならGarmin。
            ランニングも日常もまとめて快適にしたいならApple Watchが合います。
          </p>
        </header>

        <Section title="まず結論">
          <div className="grid gap-3 sm:grid-cols-2">
            <SummaryBlock
              title="Garmin が合う人"
              body="ランニングを習慣にして、ペースや心拍を見ながら成長したい人。フルマラソンやサブ4を目指すなら、まず候補に入ります。"
            />
            <SummaryBlock
              title="Apple Watch が合う人"
              body="ランニングだけでなく、通知・決済・音楽・健康管理まで毎日使いたい人。続けやすさを重視する人に向いています。"
            />
          </div>
        </Section>

        <Section title="違いを比較">
          <div className="border border-neutral-200/70 rounded-2xl overflow-hidden">
            {comparisonRows.map((row, i) => (
              <div
                key={row.label}
                className={`px-5 py-4 ${
                  i !== comparisonRows.length - 1
                    ? "border-b border-neutral-200/70"
                    : ""
                }`}
              >
                <div className="text-[13px] font-semibold text-neutral-500">
                  {row.label}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <CompareCell label="Garmin" text={row.garmin} />
                  <CompareCell label="Apple Watch" text={row.apple} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Garmin を選ぶ目安">
          <Checklist items={garminFits} />
        </Section>

        <Section title="Apple Watch を選ぶ目安">
          <Checklist items={appleFits} />
        </Section>

        <Section title="迷ったときの決め方">
          <div className="space-y-4 text-[15px] text-neutral-700 leading-[1.95]">
            <p>
              週3回以上走る、レースに出る、自己ベストを狙う。このどれかに当てはまるならGarminが選びやすいです。
              走る前後のコンディションまで見えるので、練習の判断がしやすくなります。
            </p>
            <p>
              一方で、ランニングが生活の一部で、仕事中も外出中も同じ時計を使いたいならApple Watchが自然です。
              通知や決済まで含めて、毎日つける理由が多いのが強みです。
            </p>
          </div>
        </Section>

        <div className="mt-12 flex flex-col gap-2.5">
          <Link
            href="/"
            className="w-full text-center bg-neutral-900 text-white rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:bg-neutral-800 transition"
          >
            自分に合うモデルを診断する
          </Link>
          <Link
            href="/review/forerunner-265/"
            className="w-full text-center bg-white border border-neutral-200 text-neutral-900 rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:border-neutral-900 hover:bg-neutral-50 transition"
          >
            Garminの定番モデルを見る
          </Link>
          <Link
            href="/review/apple-watch/"
            className="w-full text-center bg-white border border-neutral-200 text-neutral-900 rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:border-neutral-900 hover:bg-neutral-50 transition"
          >
            Apple Watchのレビューを見る
          </Link>
        </div>
      </article>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="text-[20px] font-bold tracking-tight text-neutral-900 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SummaryBlock({ title, body }) {
  return (
    <div className="bg-neutral-50 border border-neutral-200/70 rounded-2xl p-5">
      <h2 className="text-[15px] font-semibold text-neutral-900">{title}</h2>
      <p className="mt-2 text-[14px] text-neutral-700 leading-[1.75]">
        {body}
      </p>
    </div>
  );
}

function CompareCell({ label, text }) {
  return (
    <div>
      <div className="text-[12px] font-semibold text-neutral-900">{label}</div>
      <p className="mt-1 text-[14px] text-neutral-700 leading-[1.7]">{text}</p>
    </div>
  );
}

function Checklist({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-[15px] leading-[1.7] text-neutral-700"
        >
          <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
