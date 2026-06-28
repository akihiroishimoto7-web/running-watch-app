import Link from "next/link";

const SITE_URL = "https://runningwatchapps.netlify.app";

export const metadata = {
  title: "ランニングウォッチ用語集 | GPS・トレーニング指標をやさしく解説",
  description:
    "マルチバンドGPS、Training Readiness、ランニングダイナミクス、HRVなど、ランニングウォッチのレビューに出てくる専門用語をやさしく解説。意味がわかれば、自分に必要な機能が見えてきます。",
  alternates: { canonical: "/glossary/" },
  openGraph: {
    title: "ランニングウォッチ用語集",
    description:
      "レビューに出てくる専門用語をやさしく解説。マルチバンドGPS・Training Readinessなど。",
    type: "article",
    url: "/glossary/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ランニングウォッチ用語集",
    description: "ランニングウォッチの専門用語をやさしく解説。",
  },
};

// カテゴリごとの用語。term=用語 / def=説明 / why=なぜ気にすべきか
const groups = [
  {
    category: "GPS・精度",
    terms: [
      {
        term: "マルチバンドGPS（デュアル周波数）",
        def: "GPS衛星からの電波を2つの周波数（L1+L5）で受信する方式。片方が乱れても補正でき、軌跡が安定します。",
        why: "ビル街・高架下・林間でのラップタイムの正確さに直結。タイムを追うなら重視したい機能です。",
      },
      {
        term: "シングルバンドGPS",
        def: "1つの周波数だけで測位する従来方式。晴天の見通しの良い場所では十分ですが、障害物が多いと誤差が出やすくなります。",
        why: "ジョグ中心なら実用十分。価格を抑えた入門機に多く採用されています。",
      },
      {
        term: "SatIQ",
        def: "Garminの機能で、環境に応じてGPSモードを自動で切り替え、精度とバッテリーのバランスを取る仕組みです。",
        why: "意識せずに「精度が要る場面だけ電力を使う」運用ができます。",
      },
    ],
  },
  {
    category: "トレーニング指標",
    terms: [
      {
        term: "Training Readiness（トレーニング準備状態）",
        def: "睡眠・HRV・直近の練習負荷などから、「今日どれくらい走れる状態か」を数値（スコア）で示すGarminの指標です。",
        why: "休むか追い込むかの判断材料になり、ケガや過training を避けながら走力を伸ばせます。",
      },
      {
        term: "ランニングダイナミクス",
        def: "ケイデンス（ピッチ）、接地時間、上下動、ストライド長など、走りの「質」を表すデータの総称です。",
        why: "フォーム改善に直結。上位機では手首だけで計測でき、効率の良い走りを目指せます。",
      },
      {
        term: "HRV（心拍変動）ステータス",
        def: "心拍の間隔のゆらぎから、自律神経の状態＝体の回復度を推定する指標です。",
        why: "日々の体調を客観的に把握でき、コンディション管理が走力向上の土台になります。",
      },
      {
        term: "VO2 Max（最大酸素摂取量）",
        def: "運動中に体が取り込める酸素量の最大値の推定値。持久力の指標として使われます。",
        why: "数値の変化で走力の成長が見えるため、トレーニングのモチベーションになります。",
      },
      {
        term: "レース予測（Race Predictor）",
        def: "直近の練習データから、5km〜フルマラソンの予想タイムを算出する機能です。",
        why: "現実的な目標設定ができ、ペース計画の精度が上がります。",
      },
    ],
  },
  {
    category: "ペース・レース機能",
    terms: [
      {
        term: "Stamina（リアルタイムスタミナ）",
        def: "走行中に「あと何分・何kmこのペースを維持できるか」をリアルタイムで予測する機能です。",
        why: "レース後半のペース配分の判断に効き、失速や潰れを防ぎやすくなります。",
      },
      {
        term: "PacePro",
        def: "コースの起伏に合わせて、区間ごとの目標ペースを自動で配分するGarminの機能です。",
        why: "アップダウンのあるレースで、無理のないペース戦略を立てられます。",
      },
      {
        term: "ClimbPro",
        def: "ルート上の登りを検知し、勾配・標高差・残り距離を走行中に表示する機能です。",
        why: "坂やトレイルでの体力配分がしやすくなります。",
      },
    ],
  },
  {
    category: "ディスプレイ・本体",
    terms: [
      {
        term: "AMOLED",
        def: "発色が鮮やかでコントラストが高い有機ELディスプレイ。スマホにも使われる方式です。",
        why: "屋外の視認性と普段使いの満足度が高く、毎日つけたくなる仕上がりになります。",
      },
      {
        term: "MIP（半透過型液晶）",
        def: "太陽光の下でくっきり見え、消費電力が少ない液晶方式。バッテリー持ちに優れます。",
        why: "電池持ち最優先・長時間レース向き。表示の華やかさはAMOLEDに譲ります。",
      },
      {
        term: "5ATM（防水性能）",
        def: "水深50m相当の圧力に耐える防水規格。雨天ランや水泳に対応します。",
        why: "汗・雨を気にせず使え、機種によってはスイム計測にも使えます。",
      },
    ],
  },
];

// 用語集の構造化データ（DefinedTermSet）
function buildJsonLd() {
  const allTerms = groups.flatMap((g) => g.terms);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        name: "ランニングウォッチ用語集",
        url: `${SITE_URL}/glossary/`,
        hasDefinedTerm: allTerms.map((t) => ({
          "@type": "DefinedTerm",
          name: t.term,
          description: t.def,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ランニングウォッチ診断",
            item: `${SITE_URL}/`,
          },
          { "@type": "ListItem", position: 2, name: "用語集" },
        ],
      },
    ],
  };
}

export default function GlossaryPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />
      <div className="w-full max-w-[640px] mx-auto px-6 pt-6 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[14px] font-medium text-neutral-500 hover:text-neutral-900 transition -ml-2 py-1.5 px-2 rounded-md"
        >
          <span className="text-[18px] leading-none -mt-[1px]">‹</span>
          <span>診断トップへ戻る</span>
        </Link>

        {/* ヒーロー */}
        <div className="mt-6">
          <div className="text-[12px] text-neutral-500 tracking-wide">用語集</div>
          <h1 className="mt-1 text-[28px] sm:text-[32px] font-bold tracking-tight leading-[1.3] text-neutral-900">
            ランニングウォッチ用語集
          </h1>
          <p className="mt-4 text-[15px] text-neutral-700 leading-[1.95]">
            レビューやスペック表に出てくる専門用語を、やさしく解説します。意味がわかれば、自分に本当に必要な機能が見えてきます。
          </p>
        </div>

        {/* 用語グループ */}
        {groups.map((g) => (
          <section key={g.category} className="mt-10">
            <h2 className="text-[20px] font-bold tracking-tight text-neutral-900 mb-4">
              {g.category}
            </h2>
            <div className="space-y-3">
              {g.terms.map((t) => (
                <div
                  key={t.term}
                  className="bg-neutral-50 border border-neutral-200/70 rounded-2xl p-5"
                >
                  <div className="text-[15px] font-bold text-neutral-900 leading-[1.45]">
                    {t.term}
                  </div>
                  <p className="mt-2 text-[14px] text-neutral-700 leading-[1.85]">
                    {t.def}
                  </p>
                  <div className="mt-3 flex gap-2 text-[13px] leading-[1.8]">
                    <span className="flex-shrink-0 text-[11px] font-semibold tracking-wide text-neutral-500 bg-white border border-neutral-200/70 rounded-full px-2.5 py-0.5 h-fit mt-0.5">
                      なぜ重要？
                    </span>
                    <span className="text-neutral-600">{t.why}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="mt-12 flex flex-col gap-2.5">
          <Link
            href="/"
            className="w-full text-center bg-neutral-900 text-white rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:bg-neutral-800 transition"
          >
            用語がわかったら、診断してみる
          </Link>
          <Link
            href="/guide/"
            className="w-full text-center bg-white border border-neutral-200 text-neutral-900 rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:border-neutral-900 hover:bg-neutral-50 transition"
          >
            選び方の完全ガイドを読む
          </Link>
        </div>

        <div className="mt-10 text-center text-[11px] text-neutral-400 leading-[1.7]">
          ※ 用語の解説は一般的な説明であり、機能の有無・名称はモデルやメーカーにより異なります。
        </div>
      </div>
    </main>
  );
}
