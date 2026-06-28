import Link from "next/link";
import { models } from "../data.mjs";
import { useCases, useCaseSlugs } from "../usecases";

const SITE_URL = "https://runningwatchapps.netlify.app";

export const metadata = {
  title: "ランニングウォッチの選び方 完全ガイド | 失敗しない5つの軸",
  description:
    "ランニングウォッチの選び方を、予算・GPS精度・バッテリー・トレーニング機能・普段使いの5つの軸で徹底解説。Garmin・COROS・Apple Watch の違いと価格帯別おすすめ、よくある失敗まで。初心者からサブ4ランナーまで、後悔しない1本の選び方がわかります。",
  alternates: { canonical: "/guide/" },
  openGraph: {
    title: "ランニングウォッチの選び方 完全ガイド",
    description:
      "予算・GPS・バッテリー・機能・普段使いの5軸で、後悔しない1本の選び方を解説。",
    type: "article",
    url: "/guide/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ランニングウォッチの選び方 完全ガイド",
    description: "5つの軸で、後悔しないランニングウォッチの選び方を解説。",
  },
};

// 記事の構造化データ（Article + パンくず）
function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "ランニングウォッチの選び方 完全ガイド",
        description:
          "予算・GPS精度・バッテリー・トレーニング機能・普段使いの5つの軸で、後悔しないランニングウォッチの選び方を解説。",
        inLanguage: "ja-JP",
        author: { "@type": "Organization", name: "ランニングウォッチ診断" },
        publisher: { "@type": "Organization", name: "ランニングウォッチ診断" },
        mainEntityOfPage: `${SITE_URL}/guide/`,
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
          {
            "@type": "ListItem",
            position: 2,
            name: "選び方ガイド",
          },
        ],
      },
    ],
  };
}

// 価格帯マップに使うモデル（安い順）
const priceTiers = [
  {
    range: "3〜4万円台",
    label: "コスパ・入門",
    items: [
      { key: "corosPace4", slug: "coros-pace-4" },
      { key: "garmin165", slug: "forerunner-165" },
    ],
    note: "AMOLED・必要十分な機能で、最初の1本に最適な価格帯。",
  },
  {
    range: "6〜9万円台",
    label: "本格・バランス",
    items: [
      { key: "garmin265", slug: "forerunner-265" },
      { key: "garmin570", slug: "forerunner-570" },
    ],
    note: "マルチバンドGPSと上級トレーニング指標。サブ4〜サブ3.5の定番。",
  },
  {
    range: "9万円〜",
    label: "最上位・ウルトラ対応",
    items: [{ key: "garmin965", slug: "forerunner-965" }],
    note: "地図・最長バッテリー・全機能。ウルトラ／トレイルまで対応。",
  },
];

export default function GuidePage() {
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
          <div className="text-[12px] text-neutral-500 tracking-wide">
            選び方ガイド
          </div>
          <h1 className="mt-1 text-[28px] sm:text-[32px] font-bold tracking-tight leading-[1.3] text-neutral-900">
            ランニングウォッチの選び方
            <br />
            完全ガイド
          </h1>
          <p className="mt-4 text-[16px] text-neutral-700 font-medium leading-[1.6]">
            予算・GPS・バッテリー・機能・普段使い。たった5つの軸で、後悔しない1本が選べます。
          </p>
        </div>

        {/* 最初のCTA */}
        <div className="mt-7 bg-neutral-900 rounded-2xl p-5">
          <div className="text-[13px] text-neutral-300 leading-[1.7]">
            読むのが面倒なら、まず診断。
          </div>
          <Link
            href="/"
            className="mt-3 w-full inline-block text-center bg-white text-neutral-900 rounded-2xl py-[14px] text-[14px] font-semibold active:scale-[0.98] hover:bg-neutral-100 transition"
          >
            10問であなたに合う1本を診断する
          </Link>
        </div>

        {/* リード */}
        <p className="mt-8 text-[15px] text-neutral-700 leading-[1.95]">
          ランニングウォッチは、価格も機能も幅が広く、スペック表だけを見比べても「結局どれがいいのか」が見えにくいジャンルです。でも、選ぶときに見るべきポイントは実はそう多くありません。この記事では、後悔しないために押さえるべき
          <strong className="font-semibold text-neutral-900">5つの軸</strong>
          と、Garmin・COROS・Apple Watch
          の性格の違い、価格帯別のおすすめまでを順番に整理します。
        </p>

        {/* なぜ専用ウォッチか */}
        <Section title="そもそも、スマホではダメ？">
          <p className="text-[15px] text-neutral-700 leading-[1.95]">
            結論から言うと、ジョグを楽しむだけならスマホアプリでも十分です。専用ウォッチが効いてくるのは「記録を伸ばしたい」「習慣にしたい」と思い始めたとき。
            <strong className="font-semibold text-neutral-900">
              手元でリアルタイムにペース・心拍が見える
            </strong>
            、スマホを持たずに走れる、睡眠やリカバリーまで一元管理できる——この3点が、走力を伸ばす土台になります。逆に「タイムにこだわらず、健康のために続けたい」だけなら、通知や決済までこなせる
            <Link
              href="/review/apple-watch/"
              className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-900"
            >
              Apple Watch
            </Link>
            のような汎用スマートウォッチも有力です。
          </p>
        </Section>

        {/* 5つの軸 */}
        <Section title="選び方の5つの軸">
          <p className="text-[15px] text-neutral-700 leading-[1.95] mb-6">
            どのモデルを選ぶかは、次の5つの優先順位を自分の中で決めるだけで、ほぼ絞り込めます。
          </p>

          <Axis
            n={1}
            title="予算"
            lead="3万円台から10万円超まで。まず上限を決める。"
          >
            価格はそのまま「GPS精度」と「トレーニング機能の深さ」に比例します。3〜4万円台でも今は
            AMOLED 画面と十分な精度が手に入るので、
            <strong className="font-semibold text-neutral-900">
              初めての1本なら4万円前後を基準
            </strong>
            に、機能が欲しくなったら6万円以上を検討する——という考え方が失敗しにくいです。
          </Axis>

          <Axis
            n={2}
            title="GPS精度"
            lead="シングルバンドか、マルチバンド（デュアル周波数）か。"
          >
            ビル街・高架下・林間など、電波が乱れやすい場所での
            <strong className="font-semibold text-neutral-900">
              ラップタイムの信頼度
            </strong>
            が変わります。タイムを本気で追うなら、マルチバンド（L1+L5）／デュアル周波数対応を選ぶと、1km毎のペース表示が安定します。ジョグ中心ならシングルバンドでも実用十分です。
          </Axis>

          <Axis
            n={3}
            title="バッテリー持ち"
            lead="充電頻度と、レースの長さで決まる。"
          >
            GPS
            連続使用時間が、走れるレースの長さを決めます。フルマラソンなら多くのモデルで足りますが、
            <strong className="font-semibold text-neutral-900">
              ウルトラ・100km超を走るなら長時間GPS
            </strong>
            が必須。日常面では、Garmin・COROS
            は週1回程度の充電で済む一方、Apple Watch
            は基本ほぼ毎日充電になります。
          </Axis>

          <Axis
            n={4}
            title="トレーニング機能"
            lead="データを「見る」か、「見ない」か。"
          >
            Training Readiness（今日走るべきか）、レース予測、ランニングダイナミクス（フォーム計測）など、
            <strong className="font-semibold text-neutral-900">
              数字で成長を追える機能
            </strong>
            は上位機ほど充実します。データを毎日見て改善したい人は中位以上、「最低限でいい」人は入門機で十分です。
          </Axis>

          <Axis
            n={5}
            title="普段使い・通知"
            lead="運動専用か、生活の中心か。"
          >
            通知・決済・音楽・デザインまで含めて生活全体を1本にまとめたいなら
            Apple Watch
            が頭ひとつ抜けます。ランニング専用に近い使い方なら、軽量で電池持ちのよい
            Garmin・COROS が快適です。
          </Axis>
        </Section>

        {/* ブランド別の性格 */}
        <Section title="ブランド別の性格">
          <div className="space-y-3">
            <BrandCard
              name="Garmin"
              tone="王道・データの深さ"
              body="トレーニング指標の豊富さ、地図、エコシステムの完成度で群を抜く定番。国内ユーザーも多く情報が探しやすい。入門の165から最上位965まで階段がきれい。"
            />
            <BrandCard
              name="COROS"
              tone="軽量・コスパ・電池持ち"
              body="同価格帯のGarminより軽く、バッテリーが長い高コスパ機。PACE 4 は4万円以下でAMOLED・デュアル周波数GPSまで備える。通知・連携の幅はやや控えめ。"
            />
            <BrandCard
              name="Apple Watch"
              tone="生活全体をスマートに"
              body="iPhone連携・通知・決済・デザインで唯一無二。ランの専門指標とバッテリーは専用機に譲るが、「走る人」より「健康に暮らしたい人」には最適。"
            />
          </div>
        </Section>

        {/* 価格帯別おすすめ */}
        <Section title="価格帯別おすすめ早見表">
          <div className="space-y-4">
            {priceTiers.map((tier) => (
              <div
                key={tier.range}
                className="bg-neutral-50 border border-neutral-200/70 rounded-2xl p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-[16px] font-bold text-neutral-900">
                    {tier.range}
                  </div>
                  <div className="text-[11px] font-semibold tracking-wide bg-neutral-900 text-white rounded-full px-2.5 py-1">
                    {tier.label}
                  </div>
                </div>
                <p className="mt-2 text-[13px] text-neutral-600 leading-[1.7]">
                  {tier.note}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {tier.items.map(({ key, slug }) => {
                    const m = models[key];
                    if (!m) return null;
                    return (
                      <Link
                        key={key}
                        href={`/review/${slug}/`}
                        className="flex items-center justify-between gap-3 bg-white border border-neutral-200/70 rounded-xl px-4 py-3 hover:border-neutral-900 transition"
                      >
                        <span>
                          <span className="text-[14px] font-semibold text-neutral-900">
                            {m.name}
                          </span>
                          <span className="block text-[12px] text-neutral-500 mt-0.5">
                            {m.price}・{m.badge}
                          </span>
                        </span>
                        <span className="text-neutral-300">→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* よくある失敗 */}
        <Section title="よくある失敗・後悔ポイント">
          <ul className="space-y-3">
            <Pitfall title="スペックだけで上位機を買い、機能を使いこなせない">
              トレーニング指標は「見て改善する人」にしか価値が出ません。走り始めなら入門機で十分なことが多いです。
            </Pitfall>
            <Pitfall title="安さだけで選び、GPS精度に不満が残る">
              タイムを追うなら、シングルバンドのブレが気になる場面が出ます。1〜2万円の差で精度が大きく変わる帯があります。
            </Pitfall>
            <Pitfall title="Apple Watch でフルマラソンに挑み、電池が不安に">
              通常モデルのGPSは最大18時間。長距離は省電力設定や充電管理が前提になります。
            </Pitfall>
            <Pitfall title="重さを確認せず、長距離で腕が気になる">
              数グラムの差でも、長時間ランでは体感が変わります。軽量重視なら30g台のモデルを。
            </Pitfall>
          </ul>
        </Section>

        {/* 目的別から探す */}
        <Section title="目的別に選ぶ">
          <p className="text-[15px] text-neutral-700 leading-[1.9] mb-4">
            自分の状況に近い記事から、おすすめモデルをまとめて確認できます。
          </p>
          <div className="flex flex-col gap-2.5">
            {useCaseSlugs.map((s) => (
              <Link
                key={s}
                href={`/for/${s}/`}
                className="flex items-center justify-between bg-neutral-50 border border-neutral-200/70 rounded-2xl px-5 py-4 hover:border-neutral-900 transition"
              >
                <span>
                  <span className="text-[11px] font-semibold tracking-wide text-neutral-500">
                    {useCases[s].intentLabel}
                  </span>
                  <span className="block text-[14px] font-semibold text-neutral-900 mt-0.5">
                    {useCases[s].title}
                  </span>
                </span>
                <span className="text-neutral-300 flex-shrink-0">→</span>
              </Link>
            ))}
          </div>
        </Section>

        {/* もっと比べる */}
        <Section title="もっと詳しく比べる">
          <div className="flex flex-col gap-2.5">
            <Link
              href="/compare/garmin-vs-applewatch/"
              className="flex items-center justify-between bg-white border border-neutral-200 rounded-2xl px-5 py-4 hover:border-neutral-900 transition"
            >
              <span className="text-[14px] font-semibold text-neutral-900">
                Garmin と Apple Watch の違い
              </span>
              <span className="text-neutral-300">→</span>
            </Link>
            <Link
              href="/compare/all/"
              className="flex items-center justify-between bg-white border border-neutral-200 rounded-2xl px-5 py-4 hover:border-neutral-900 transition"
            >
              <span className="text-[14px] font-semibold text-neutral-900">
                ランニングウォッチ 6モデル比較
              </span>
              <span className="text-neutral-300">→</span>
            </Link>
          </div>
        </Section>

        {/* まとめCTA */}
        <Section title="まとめ：迷ったら、診断へ">
          <p className="text-[15px] text-neutral-700 leading-[1.95]">
            5つの軸のうち、自分が一番大事にしたいものはどれか——そこが決まれば、選ぶべき1本はかなり絞れます。それでも迷うなら、10問に答えるだけで方向性と具体モデルまで提案する診断を使ってみてください。
          </p>
          <Link
            href="/"
            className="mt-6 w-full inline-block text-center bg-neutral-900 text-white rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:bg-neutral-800 transition"
          >
            あなたに合うモデルを診断する
          </Link>
        </Section>

        <div className="mt-10 text-center text-[11px] text-neutral-400 leading-[1.7]">
          ※ 本記事は独自の評価に基づく内容です。仕様・価格は2024〜2025年時点の情報を参考にしており、最新情報は各公式サイトをご確認ください。
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-12">
      <h2 className="text-[20px] font-bold tracking-tight text-neutral-900 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Axis({ n, title, lead, children }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-900 text-white text-[13px] font-semibold flex items-center justify-center">
          {n}
        </span>
        <div>
          <div className="text-[16px] font-bold text-neutral-900 leading-[1.4]">
            {title}
          </div>
          <div className="text-[13px] text-neutral-500 mt-0.5">{lead}</div>
        </div>
      </div>
      <p className="mt-3 ml-10 text-[14px] text-neutral-700 leading-[1.9]">
        {children}
      </p>
    </div>
  );
}

function BrandCard({ name, tone, body }) {
  return (
    <div className="bg-white border border-neutral-200/70 rounded-2xl p-5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[16px] font-bold text-neutral-900">{name}</div>
        <div className="text-[12px] text-neutral-500 font-medium">{tone}</div>
      </div>
      <p className="mt-2 text-[14px] text-neutral-600 leading-[1.85]">{body}</p>
    </div>
  );
}

function Pitfall({ title, children }) {
  return (
    <li className="bg-neutral-50 border border-neutral-200/70 rounded-2xl p-5">
      <div className="flex gap-3">
        <span className="flex-shrink-0 text-neutral-400 text-[15px] leading-[1.5]">
          ✕
        </span>
        <div>
          <div className="text-[14px] font-semibold text-neutral-900 leading-[1.5]">
            {title}
          </div>
          <p className="mt-1.5 text-[13px] text-neutral-600 leading-[1.8]">
            {children}
          </p>
        </div>
      </div>
    </li>
  );
}
