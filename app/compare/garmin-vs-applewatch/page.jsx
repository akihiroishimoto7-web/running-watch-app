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

const faqs = [
  {
    question: "ランニング初心者が最初に買うならどっち？",
    answer:
      "ランニングを「これから本気でやりたい」ならGarmin、健康習慣として「ゆるく続けたい」ならApple Watchが合います。続ける動機の作り方が両者で違うので、自分のスタンスで決めると失敗しません。",
    links: [
      { href: "/review/forerunner-165/", label: "Forerunner 165" },
      { href: "/review/apple-watch/", label: "Apple Watch" },
    ],
  },
  {
    question: "Garmin と Apple Watch、価格はどれくらい違う？",
    answer:
      "Garminはエントリーの Forerunner 165 が約45,000円から、本格モデルの 265 が約65,000〜75,000円。Apple Watchは SE が約34,000円から、ランナー向けの Ultra は約130,000円超まで幅があります。同じ「本格レンジ」で見比べると価格差は意外と小さく、機能の方向性で選ぶのが実用的です。",
    links: [
      { href: "/review/forerunner-165/", label: "Forerunner 165" },
      { href: "/review/forerunner-265/", label: "Forerunner 265" },
      { href: "/review/apple-watch/", label: "Apple Watch" },
    ],
  },
  {
    question: "iPhone を持っていなくても Garmin は使える？",
    answer:
      "使えます。Garmin は iPhone でも Android でも Garmin Connect アプリと連携できます。一方 Apple Watch は iPhone がないと初期設定もできません。Android ユーザーの選択肢は実質 Garmin か COROS PACE 4 の二択になります。",
    links: [
      { href: "/review/coros-pace-4/", label: "COROS PACE 4" },
      { href: "/review/forerunner-165/", label: "Forerunner 165" },
    ],
  },
  {
    question: "Apple Watch でフルマラソンを走れる？",
    answer:
      "Series モデルは約18時間、Ultra は約36時間のバッテリーです。Series で4時間台のフルマラソンは余裕がありますが、サブ3クラスの練習とレースを毎日装着で運用すると充電タイミングが気になります。Ultra なら不安は大きく減ります。",
    links: [{ href: "/review/apple-watch/", label: "Apple Watch" }],
  },
  {
    question: "Garmin と Apple Watch、両方持ちはアリ？",
    answer:
      "アリです。Apple Watch を普段使いの主役にしつつ、ランのときだけ Garmin に切り替えるスタイルは、本格的に走るランナーに多く見られます。トータル投資は増えますが、それぞれの強みが活きるため快適に運用できます。",
  },
  {
    question: "GPS精度は本当に違う？",
    answer:
      "マルチバンドGPS搭載モデル（Garmin 265 / 965、COROS PACE 4、Apple Watch Ultra など）は街中のビル街や林間でも軌跡が安定します。シングルバンド機は1〜2%程度の距離誤差が出る場面があり、レース後のラップ分析の信頼度に差が出ます。",
    links: [
      { href: "/review/forerunner-265/", label: "Forerunner 265" },
      { href: "/review/coros-pace-4/", label: "COROS PACE 4" },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

const SITE_URL = "https://runningwatchapps.netlify.app";

// パンくずの JSON-LD。トップ → 当ページの2階層。
// 最後の要素は現在ページなので item URL は省略。
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "ランニングウォッチ診断",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Garmin と Apple Watch の違い",
    },
  ],
};

export default function GarminVsAppleWatchPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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

        <Section title="よくある質問">
          <div className="space-y-2">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-neutral-50 border border-neutral-200/70 rounded-2xl"
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex justify-between items-start gap-3">
                  <span className="text-[15px] font-semibold text-neutral-900 leading-[1.5]">
                    {faq.question}
                  </span>
                  <span className="text-neutral-400 text-[18px] leading-none mt-[2px] group-open:rotate-180 inline-block transition flex-shrink-0">
                    ⌄
                  </span>
                </summary>
                <p className="px-5 pb-4 -mt-1 text-[14px] text-neutral-700 leading-[1.85]">
                  {faq.answer}
                </p>
                {faq.links && (
                  <div className="px-5 pb-4 -mt-1 flex flex-wrap gap-x-3 gap-y-1.5 items-center">
                    <span className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
                      関連レビュー
                    </span>
                    {faq.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-[13px] font-medium text-neutral-900 hover:text-neutral-600 transition underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900"
                      >
                        {link.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </details>
            ))}
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
          <Link
            href="/compare/all/"
            className="w-full text-center bg-white border border-neutral-200 text-neutral-900 rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:border-neutral-900 hover:bg-neutral-50 transition"
          >
            6モデルまとめて比較する
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
