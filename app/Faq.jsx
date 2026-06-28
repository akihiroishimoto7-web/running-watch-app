// =====================================================
// よくある質問（FAQ）
// サーバーコンポーネントとして静的HTMLに焼き込み、
// FAQPage の構造化データも同時に出力する。
// Google検索のFAQリッチリザルト獲得とコンテンツ深化が目的。
// =====================================================

const faqs = [
  {
    q: "ランニングには Garmin と Apple Watch、どちらがいいですか？",
    a: "記録の成長・トレーニング分析・バッテリー持ちを重視するなら Garmin、iPhoneとの連携や通知・決済・普段使いを重視するなら Apple Watch が向いています。週3回以上走る・レースに出るなら Garmin、健康習慣として続けたいなら Apple Watch が目安です。本サイトの診断で10問に答えると、あなたに合う1本がわかります。",
  },
  {
    q: "ランニング初心者におすすめのモデルは？",
    a: "初めての1本なら Garmin Forerunner 165（約44,000円）か COROS PACE 4（約36,000円）がおすすめです。どちらもAMOLEDディスプレイ・軽量・必要十分なトレーニング機能を備え、5万円以内で本格的なランニングウォッチを始められます。",
  },
  {
    q: "スマホのアプリではなく、専用のランニングウォッチが必要ですか？",
    a: "心拍・ピッチ・トレーニング負荷をリアルタイムで手元に表示でき、スマホを持たずに走れる点が専用ウォッチの強みです。睡眠やリカバリーまで一元管理でき、走力の変化を可視化しやすくなります。記録を伸ばしたい・習慣化したい人ほど効果を感じやすいです。",
  },
  {
    q: "サブ4（フルマラソン4時間切り）を狙うならどのモデル？",
    a: "トレーニング指標が一通り揃う Garmin Forerunner 265 が定番です。さらに手首でのランニングダイナミクス計測や地図機能が欲しい場合は Forerunner 570、ウルトラや長距離・ナビまで求めるなら Forerunner 965 が候補になります。",
  },
  {
    q: "COROS は Garmin と比べてどうですか？",
    a: "COROS PACE 4 は約36,000円ながらデュアル周波数GPSとAMOLEDを搭載し、バッテリー持ちと軽さに優れた高コスパ機です。一方で通知・決済・アプリ連携の幅は Garmin / Apple Watch のほうが充実しています。価格と走行性能を最優先するなら COROS が有力です。",
  },
  {
    q: "Apple Watch でフルマラソンは走れますか？",
    a: "走れますが、GPS使用時のバッテリーが最大18時間（通常モデル）のため、長時間レースでは省電力設定や充電管理が必要です。サブ4以上を本格的に狙う・充電頻度を抑えたい場合は、バッテリー持ちに優れた Garmin 系のほうが安心です。",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="w-full bg-white border-t border-neutral-100"
    >
      <div className="max-w-[440px] mx-auto px-6 py-12">
        <div className="text-[11px] font-semibold tracking-[0.22em] text-neutral-500 mb-4 uppercase">
          よくある質問
        </div>
        <h2
          id="faq-heading"
          className="text-[22px] font-bold tracking-tight text-neutral-900 leading-[1.4] mb-6"
        >
          ランニングウォッチ選びのQ&A
        </h2>

        <div className="flex flex-col gap-2.5">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group bg-neutral-50 border border-neutral-200/70 rounded-2xl px-5 py-4"
            >
              <summary className="flex items-start justify-between gap-3 cursor-pointer list-none text-[15px] font-semibold text-neutral-900 leading-[1.5]">
                <span>{f.q}</span>
                <span className="text-neutral-400 text-[18px] leading-none mt-0.5 group-open:rotate-180 transition flex-shrink-0">
                  ⌄
                </span>
              </summary>
              <p className="mt-3 text-[14px] text-neutral-600 leading-[1.85]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
