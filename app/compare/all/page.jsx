import Link from "next/link";

export const metadata = {
  title: "ランニングウォッチ 6モデル比較 | Garmin・COROS・Apple Watch",
  description:
    "Garmin Forerunner 165 / 265 / 570 / 965、COROS PACE 4、Apple Watch を価格・バッテリー・GPS・機能で横並び比較。あなたに合うモデルがひと目でわかります。",
  alternates: { canonical: "/compare/all/" },
  openGraph: {
    title: "ランニングウォッチ 6モデル比較",
    description:
      "Garmin・COROS・Apple Watch の主要6モデルを一覧比較。価格・GPS精度・バッテリー・地図機能を横並びで確認できます。",
    type: "article",
    url: "/compare/all/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "トップ", item: "https://runningwatchapps.netlify.app/" },
        { "@type": "ListItem", position: 2, name: "比較", item: "https://runningwatchapps.netlify.app/compare/all/" },
        { "@type": "ListItem", position: 3, name: "6モデル比較" },
      ],
    },
  ],
};

// 比較テーブルデータ
const models = [
  {
    name: "Forerunner 165",
    brand: "Garmin",
    slug: "forerunner-165",
    price: "約45,000円〜",
    display: "AMOLED 1.2\"",
    battery: "11日",
    gps: "シングルバンド",
    weight: "39g",
    maps: false,
    dynamics: "なし",
    music: "※Musicモデル",
    forWhom: "初心者・入門",
    accent: "bg-neutral-900",
  },
  {
    name: "Forerunner 265",
    brand: "Garmin",
    slug: "forerunner-265",
    price: "約70,000円〜",
    display: "AMOLED 1.3\"",
    battery: "13日",
    gps: "マルチバンド",
    weight: "47g",
    maps: false,
    dynamics: "外付け要",
    music: "あり",
    forWhom: "サブ4・本格派",
    accent: "bg-neutral-900",
  },
  {
    name: "Forerunner 570",
    brand: "Garmin",
    slug: "forerunner-570",
    price: "約80,000円〜",
    display: "AMOLED 1.3\"",
    battery: "20日",
    gps: "マルチバンド",
    weight: "49g",
    maps: true,
    dynamics: "手首から",
    music: "あり",
    forWhom: "サブ3.5・上級",
    accent: "bg-neutral-900",
  },
  {
    name: "Forerunner 965",
    brand: "Garmin",
    slug: "forerunner-965",
    price: "約95,000円〜",
    display: "AMOLED 1.4\"",
    battery: "23日",
    gps: "マルチバンド",
    weight: "53g",
    maps: true,
    dynamics: "手首から",
    music: "あり",
    forWhom: "ウルトラ・ガチ勢",
    accent: "bg-neutral-900",
  },
  {
    name: "COROS PACE 4",
    brand: "COROS",
    slug: "coros-pace-4",
    price: "約36,300円",
    display: "AMOLED 1.2\"",
    battery: "19日",
    gps: "マルチバンド",
    weight: "32〜40g",
    maps: false,
    dynamics: "なし",
    music: "あり",
    forWhom: "コスパ・軽量派",
    accent: "bg-neutral-700",
  },
  {
    name: "Apple Watch",
    brand: "Apple",
    slug: "apple-watch",
    price: "約34,000円〜",
    display: "Always-On",
    battery: "18時間",
    gps: "内蔵",
    weight: "—",
    maps: false,
    dynamics: "なし",
    music: "Apple Music",
    forWhom: "日常使い・iPhone派",
    accent: "bg-neutral-500",
  },
];

const rows = [
  { label: "価格", key: "price" },
  { label: "ディスプレイ", key: "display" },
  { label: "バッテリー", key: "battery" },
  { label: "GPS", key: "gps" },
  { label: "重量", key: "weight" },
  { label: "地図", key: "maps" },
  { label: "ランニング\nダイナミクス", key: "dynamics" },
  { label: "音楽保存", key: "music" },
  { label: "こんな人向け", key: "forWhom" },
];

function CellValue({ value }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="text-neutral-900 font-bold text-[15px]">✓</span>
    ) : (
      <span className="text-neutral-300 text-[15px]">—</span>
    );
  }
  return <span>{value}</span>;
}

export default function CompareAllPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        <div className="w-full max-w-[440px] mx-auto px-6 pt-8 pb-16">

          {/* パンくず */}
          <nav className="text-[11px] text-neutral-400 mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-neutral-700 transition">トップ</Link>
            <span>›</span>
            <span className="text-neutral-600">6モデル比較</span>
          </nav>

          {/* ヘッダー */}
          <div className="text-[11px] font-semibold tracking-[0.22em] text-neutral-500 mb-3 uppercase">
            Model Comparison
          </div>
          <h1 className="text-[26px] font-bold leading-[1.3] tracking-tight text-neutral-900">
            ランニングウォッチ<br />6モデル比較
          </h1>
          <p className="mt-3 text-[14px] leading-[1.7] text-neutral-600">
            Garmin・COROS・Apple Watch の主要モデルを一覧で比較。価格・GPS・バッテリーをまとめて確認できます。
          </p>

          {/* 横スクロール比較表 */}
          <div className="mt-8 -mx-6 overflow-x-auto">
            <div className="px-6" style={{ minWidth: "680px" }}>

              {/* モデルヘッダー行 */}
              <div className="grid mb-1" style={{ gridTemplateColumns: "90px repeat(6, 1fr)" }}>
                <div />
                {models.map((m) => (
                  <div key={m.slug} className="text-center px-1">
                    <div className="text-[9px] font-semibold text-neutral-400 tracking-wide uppercase mb-0.5">
                      {m.brand}
                    </div>
                    <Link
                      href={`/review/${m.slug}/`}
                      className="text-[11px] font-bold text-neutral-900 leading-tight hover:underline block"
                    >
                      {m.name.replace("Forerunner ", "FR ")}
                    </Link>
                  </div>
                ))}
              </div>

              {/* 区切り線 */}
              <div className="h-[1px] bg-neutral-200 mb-1" />

              {/* データ行 */}
              {rows.map((row, ri) => (
                <div
                  key={row.key}
                  className={`grid items-start py-2.5 ${ri < rows.length - 1 ? "border-b border-neutral-100" : ""}`}
                  style={{ gridTemplateColumns: "90px repeat(6, 1fr)" }}
                >
                  <div className="text-[11px] font-semibold text-neutral-500 whitespace-pre-line pr-2 pt-0.5">
                    {row.label}
                  </div>
                  {models.map((m) => (
                    <div
                      key={m.slug}
                      className="text-center text-[11px] text-neutral-700 leading-[1.4] px-0.5"
                    >
                      <CellValue value={m[row.key]} />
                    </div>
                  ))}
                </div>
              ))}

              {/* レビューリンク行 */}
              <div className="h-[1px] bg-neutral-200 mt-1 mb-3" />
              <div className="grid" style={{ gridTemplateColumns: "90px repeat(6, 1fr)" }}>
                <div />
                {models.map((m) => (
                  <div key={m.slug} className="text-center px-0.5">
                    <Link
                      href={`/review/${m.slug}/`}
                      className="inline-block text-[10px] font-semibold text-neutral-900 underline underline-offset-2 hover:text-neutral-600 transition"
                    >
                      詳細
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* 注釈 */}
          <p className="mt-3 text-[11px] text-neutral-400 leading-[1.7]">
            ※ 価格は参考値（税込）。バッテリーはスマートウォッチモード時の目安。GPS使用時は短くなります。
          </p>

          {/* モデル別カード */}
          <div className="mt-10">
            <h2 className="text-[16px] font-bold text-neutral-900 mb-4">
              モデル別 — こんな人向け
            </h2>
            <div className="flex flex-col gap-3">
              {models.map((m) => (
                <Link
                  key={m.slug}
                  href={`/review/${m.slug}/`}
                  className="group flex items-center justify-between bg-white border border-neutral-200 rounded-2xl px-5 py-4 hover:border-neutral-900 hover:bg-neutral-50 active:scale-[0.99] transition"
                >
                  <div>
                    <div className="text-[10px] font-semibold text-neutral-400 tracking-wide uppercase mb-0.5">
                      {m.brand}
                    </div>
                    <div className="text-[15px] font-bold text-neutral-900 leading-snug">
                      {m.name}
                    </div>
                    <div className="text-[12px] text-neutral-500 mt-0.5">{m.forWhom}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-semibold text-neutral-900">{m.price}</div>
                    <span className="text-neutral-300 group-hover:text-neutral-900 transition text-[16px]">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 診断CTA */}
          <div className="mt-10 bg-neutral-50 border border-neutral-200 rounded-2xl p-6 text-center">
            <div className="text-[12px] font-semibold text-neutral-500 tracking-wide mb-2">
              どれが自分に合う？
            </div>
            <p className="text-[14px] text-neutral-700 leading-[1.7] mb-4">
              10問の診断で、あなたにぴったりの1本を提案します。
            </p>
            <Link
              href="/"
              className="inline-block w-full bg-neutral-900 text-white rounded-2xl py-[14px] text-[15px] font-semibold hover:bg-neutral-800 active:scale-[0.98] transition"
            >
              無料診断を始める
            </Link>
          </div>

          {/* 関連リンク */}
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <div className="text-[12px] font-semibold text-neutral-500 mb-3">関連ページ</div>
            <div className="flex flex-col gap-2">
              <Link
                href="/compare/garmin-vs-applewatch/"
                className="text-[13px] text-neutral-700 hover:text-neutral-900 transition flex items-center gap-1.5"
              >
                <span className="text-neutral-300">›</span>
                Garmin と Apple Watch の詳しい比較
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
