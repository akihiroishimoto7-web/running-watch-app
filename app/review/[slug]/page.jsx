import Link from "next/link";
import { notFound } from "next/navigation";
import { reviews, reviewSlugs } from "../../reviews";

const SITE_URL = "https://runningwatchapps.netlify.app";

export function generateStaticParams() {
  return reviewSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const r = reviews[params.slug];
  if (!r) return {};
  return {
    title: `${r.name} レビュー | ランニングウォッチ診断`,
    description: r.tagline + " " + r.hero.slice(0, 90),
    openGraph: {
      title: `${r.name} レビュー`,
      description: r.tagline,
      type: "article",
    },
  };
}

// パンくずの JSON-LD。トップ → 個別レビュー の2階層。
// 最後の要素は現在ページなので item URL は省略（Google ガイドライン許容）。
function buildBreadcrumbJsonLd(review) {
  return {
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
        name: `${review.name} レビュー`,
      },
    ],
  };
}

// レビューデータから schema.org Product の JSON-LD を組み立てる。
// useCases の rating を平均して aggregateRating を生成。
function buildProductJsonLd(review) {
  const ratings = review.useCases.map((u) => u.rating);
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  const ratingValue = Math.round(avg * 10) / 10;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: review.name,
    brand: { "@type": "Brand", name: review.brand },
    description: review.tagline,
    image: `${SITE_URL}${review.image}`,
    url: `${SITE_URL}/review/${review.slug}/`,
    review: {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "ランニングウォッチ診断",
      },
      name: `${review.name} レビュー`,
      reviewBody: review.tagline,
      reviewRating: {
        "@type": "Rating",
        ratingValue,
        bestRating: 5,
        worstRating: 1,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      bestRating: 5,
      worstRating: 1,
      ratingCount: ratings.length,
    },
  };
}

export default function ReviewPage({ params }) {
  const review = reviews[params.slug];
  if (!review) notFound();

  const productJsonLd = buildProductJsonLd(review);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(review);

  return (
    <main className="min-h-screen w-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
            {review.brand}
          </div>
          <h1 className="mt-1 text-[28px] sm:text-[32px] font-bold tracking-tight leading-[1.25] text-neutral-900">
            {review.name}
          </h1>
          <p className="mt-3 text-[16px] text-neutral-700 font-medium leading-[1.6]">
            {review.tagline}
          </p>
        </div>

        {/* 商品画像（画像が無い場合はグラデーション背景がフォールバック） */}
        <div
          role="img"
          aria-label={review.name}
          className="mt-7 aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${review.image})` }}
        />
        <div className="mt-2 text-center text-[11px] text-neutral-400">
          {review.brand} 公式画像
        </div>

        {/* リード */}
        <p className="mt-7 text-[15px] text-neutral-700 leading-[1.9]">
          {review.hero}
        </p>

        {/* こんな人におすすめ */}
        <Section title="こんな人におすすめ">
          <ul className="space-y-2.5">
            {review.forWhom.map((f, i) => (
              <li
                key={i}
                className="flex gap-3 text-[15px] leading-[1.6] text-neutral-700"
              >
                <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* スペック表 */}
        <Section title="スペック">
          <div className="bg-neutral-50 border border-neutral-200/70 rounded-2xl overflow-hidden">
            <dl>
              {review.specs.map((s, i) => (
                <div
                  key={i}
                  className={`flex gap-4 px-5 py-3.5 text-[14px] ${
                    i !== review.specs.length - 1
                      ? "border-b border-neutral-200/70"
                      : ""
                  }`}
                >
                  <dt className="w-[110px] flex-shrink-0 text-neutral-500 font-medium">
                    {s.label}
                  </dt>
                  <dd className="text-neutral-800 leading-[1.55]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        {/* 走った印象 */}
        <Section title="走った印象">
          <div className="space-y-4">
            {review.impressions.map((p, i) => (
              <p
                key={i}
                className="text-[15px] text-neutral-700 leading-[1.95]"
              >
                {p}
              </p>
            ))}
          </div>
        </Section>

        {/* 推せるポイント */}
        <Section title="推せるポイント">
          <ol className="space-y-4 counter-reset">
            {review.highlights.map((h, i) => (
              <li
                key={i}
                className="bg-white border border-neutral-200/70 rounded-2xl p-5"
              >
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-900 text-white text-[12px] font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-[15px] font-semibold text-neutral-900 leading-[1.45]">
                      {h.title}
                    </div>
                    <p className="mt-1.5 text-[14px] text-neutral-600 leading-[1.75]">
                      {h.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* 気になる点 */}
        <Section title="気になる点">
          <ul className="space-y-3">
            {review.drawbacks.map((d, i) => (
              <li
                key={i}
                className="bg-neutral-50 border border-neutral-200/70 rounded-2xl p-5"
              >
                <div className="text-[14px] font-semibold text-neutral-900">
                  {d.title}
                </div>
                <p className="mt-1.5 text-[14px] text-neutral-600 leading-[1.75]">
                  {d.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* 走り方別の評価 */}
        <Section title="走り方別の評価">
          <div className="bg-neutral-50 border border-neutral-200/70 rounded-2xl overflow-hidden">
            {review.useCases.map((u, i) => (
              <div
                key={i}
                className={`px-5 py-3.5 flex items-center gap-4 ${
                  i !== review.useCases.length - 1
                    ? "border-b border-neutral-200/70"
                    : ""
                }`}
              >
                <div className="flex-1 text-[14px] font-medium text-neutral-800">
                  {u.label}
                </div>
                <Stars rating={u.rating} />
                <div className="hidden sm:block w-[210px] text-[12px] text-neutral-500 leading-[1.4]">
                  {u.comment}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 sm:hidden space-y-1.5 text-[12px] text-neutral-500">
            {review.useCases.map((u, i) => (
              <div key={i} className="leading-[1.5]">
                <span className="text-neutral-700 font-medium">
                  {u.label}：
                </span>
                {u.comment}
              </div>
            ))}
          </div>
        </Section>

        {/* こんな人に / 向かない人 */}
        <Section title="向いている人 / 向かない人">
          <div className="space-y-3">
            <div className="bg-white border border-neutral-200/70 rounded-2xl p-5">
              <div className="text-[13px] font-semibold text-neutral-900 mb-2">
                ○ 向いている人
              </div>
              <p className="text-[14px] text-neutral-700 leading-[1.8]">
                {review.bestFor}
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200/70 rounded-2xl p-5">
              <div className="text-[13px] font-semibold text-neutral-900 mb-2">
                × 向かない人
              </div>
              <p className="text-[14px] text-neutral-600 leading-[1.8]">
                {review.notFor}
              </p>
            </div>
          </div>
        </Section>

        {/* まとめ */}
        <Section title="まとめ">
          <p className="text-[15px] text-neutral-700 leading-[1.95]">
            {review.conclusion}
          </p>
        </Section>

        {/* 次に検討するモデル（curated） */}
        {review.relatedModels && review.relatedModels.length > 0 && (
          <Section title="次に検討するモデル">
            <div className="space-y-2.5">
              {review.relatedModels.map((rel) => {
                const target = reviews[rel.slug];
                if (!target) return null;
                return (
                  <Link
                    key={rel.slug}
                    href={`/review/${rel.slug}/`}
                    className="block bg-white border border-neutral-200/70 rounded-2xl px-5 py-4 hover:border-neutral-900 hover:bg-neutral-50 transition"
                  >
                    <div className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
                      {rel.reason}
                    </div>
                    <div className="mt-1 flex justify-between items-center gap-3">
                      <div>
                        <div className="text-[12px] text-neutral-500">
                          {target.brand}
                        </div>
                        <div className="text-[16px] font-semibold text-neutral-900 leading-[1.4]">
                          {target.name}
                        </div>
                      </div>
                      <span className="text-neutral-400 text-[18px] flex-shrink-0">
                        →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Section>
        )}

        {/* CTA */}
        <div className="mt-12 flex flex-col gap-2.5">
          <Link
            href="/"
            className="w-full text-center bg-neutral-900 text-white rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:bg-neutral-800 transition"
          >
            あなたに合うモデルを診断する
          </Link>
          <OtherReviewsLink currentSlug={review.slug} />
        </div>

        <div className="mt-10 text-center text-[11px] text-neutral-400">
          ※ 本記事は独自の評価に基づく内容です。仕様・価格は2024〜2025年時点の情報を参考にしており、最新情報は公式サイトをご確認ください。
        </div>
      </div>
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

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5 text-[14px] tabular-nums">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={n <= rating ? "text-neutral-900" : "text-neutral-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function OtherReviewsLink({ currentSlug }) {
  const others = reviewSlugs.filter((s) => s !== currentSlug);
  return (
    <details className="group">
      <summary className="w-full text-center bg-white border border-neutral-200 text-neutral-900 rounded-2xl py-[16px] text-[15px] font-semibold active:scale-[0.98] hover:border-neutral-900 hover:bg-neutral-50 transition cursor-pointer list-none">
        他のモデルのレビューを見る
        <span className="ml-1 text-neutral-400 group-open:rotate-180 inline-block transition">
          ⌄
        </span>
      </summary>
      <div className="mt-2 flex flex-col gap-2">
        {others.map((slug) => (
          <Link
            key={slug}
            href={`/review/${slug}/`}
            className="block bg-neutral-50 border border-neutral-200/70 rounded-xl px-4 py-3 text-[14px] font-medium text-neutral-800 hover:bg-neutral-100 transition"
          >
            {reviews[slug].name}
            <span className="float-right text-neutral-400">→</span>
          </Link>
        ))}
      </div>
    </details>
  );
}
