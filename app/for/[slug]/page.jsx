import Link from "next/link";
import { notFound } from "next/navigation";
import { useCases, useCaseSlugs } from "../../usecases";
import { models } from "../../data.mjs";

const SITE_URL = "https://runningwatchapps.netlify.app";

export function generateStaticParams() {
  return useCaseSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const a = useCases[params.slug];
  if (!a) return {};
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: `/for/${a.slug}/` },
    openGraph: {
      title: a.metaTitle,
      description: a.metaDescription,
      type: "article",
      url: `/for/${a.slug}/`,
    },
    twitter: {
      card: "summary_large_image",
      title: a.metaTitle,
      description: a.metaDescription,
    },
  };
}

function buildJsonLd(a) {
  const topModel = models[a.picks[0].modelKey];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: a.metaTitle,
        description: a.metaDescription,
        inLanguage: "ja-JP",
        author: { "@type": "Organization", name: "ランニングウォッチ診断" },
        publisher: { "@type": "Organization", name: "ランニングウォッチ診断" },
        mainEntityOfPage: `${SITE_URL}/for/${a.slug}/`,
        about: topModel ? topModel.name : undefined,
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
            item: `${SITE_URL}/guide/`,
          },
          { "@type": "ListItem", position: 3, name: a.title },
        ],
      },
    ],
  };
}

export default function UseCasePage({ params }) {
  const article = useCases[params.slug];
  if (!article) notFound();

  const others = useCaseSlugs.filter((s) => s !== article.slug);

  return (
    <main className="min-h-screen w-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(article)) }}
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
            目的別おすすめ ・ {article.intentLabel}
          </div>
          <h1 className="mt-1 text-[26px] sm:text-[30px] font-bold tracking-tight leading-[1.3] text-neutral-900">
            {article.title}
          </h1>
          <p className="mt-4 text-[15px] text-neutral-700 leading-[1.95]">
            {article.lead}
          </p>
        </div>

        {/* おすすめモデル */}
        <section className="mt-10">
          <h2 className="text-[20px] font-bold tracking-tight text-neutral-900 mb-4">
            おすすめモデル
          </h2>
          <div className="space-y-3">
            {article.picks.map((p) => {
              const m = models[p.modelKey];
              if (!m) return null;
              return (
                <div
                  key={p.modelKey}
                  className="bg-white border border-neutral-200/70 rounded-2xl p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-900 text-white text-[13px] font-bold flex items-center justify-center">
                      {p.rank}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="text-[12px] text-neutral-500">
                          {m.brand}
                        </div>
                        <div className="text-[12px] font-semibold text-neutral-700">
                          {m.price}
                        </div>
                      </div>
                      <div className="text-[17px] font-bold text-neutral-900 leading-[1.35] mt-0.5">
                        {m.name}
                      </div>
                      <div className="mt-1 inline-flex items-center text-[11px] font-semibold tracking-wide bg-neutral-100 text-neutral-700 rounded-full px-2.5 py-1">
                        {p.forWho}
                      </div>
                      <p className="mt-3 text-[14px] text-neutral-700 leading-[1.85]">
                        {p.reason}
                      </p>
                      <Link
                        href={`/review/${p.slug}/`}
                        className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-neutral-900 hover:gap-2 transition-all"
                      >
                        詳しいレビューを見る
                        <span className="text-neutral-400">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 選び方のポイント */}
        <section className="mt-10">
          <h2 className="text-[20px] font-bold tracking-tight text-neutral-900 mb-4">
            選び方のポイント
          </h2>
          <ul className="space-y-2.5">
            {article.points.map((pt, i) => (
              <li
                key={i}
                className="flex gap-3 text-[14px] leading-[1.7] text-neutral-700"
              >
                <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* まとめ */}
        <section className="mt-10">
          <h2 className="text-[20px] font-bold tracking-tight text-neutral-900 mb-4">
            まとめ
          </h2>
          <p className="text-[15px] text-neutral-700 leading-[1.95]">
            {article.conclusion}
          </p>
        </section>

        {/* CTA */}
        <div className="mt-9 flex flex-col gap-2.5">
          <Link
            href="/"
            className="w-full text-center bg-neutral-900 text-white rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:bg-neutral-800 transition"
          >
            あなたに合うモデルを診断する
          </Link>
          <Link
            href="/guide/"
            className="w-full text-center bg-white border border-neutral-200 text-neutral-900 rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:border-neutral-900 hover:bg-neutral-50 transition"
          >
            選び方の完全ガイドを読む
          </Link>
        </div>

        {/* 他の目的別記事 */}
        <section className="mt-12">
          <div className="text-[11px] font-semibold tracking-[0.18em] text-neutral-400 uppercase mb-4">
            ほかの目的から探す
          </div>
          <div className="flex flex-col gap-2">
            {others.map((s) => (
              <Link
                key={s}
                href={`/for/${s}/`}
                className="flex items-center justify-between bg-neutral-50 border border-neutral-200/70 rounded-xl px-4 py-3 text-[14px] font-medium text-neutral-800 hover:bg-neutral-100 transition"
              >
                {useCases[s].title}
                <span className="text-neutral-400">→</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-10 text-center text-[11px] text-neutral-400 leading-[1.7]">
          ※ 本記事は独自の評価に基づく内容です。仕様・価格は2024〜2025年時点の情報を参考にしており、最新情報は各公式サイトをご確認ください。
        </div>
      </div>
    </main>
  );
}
