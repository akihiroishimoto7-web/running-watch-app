import Link from "next/link";
import { reviews } from "./reviews";

// サーバーコンポーネントとして静的HTMLに内部リンクを焼き込む。
// 診断UIはクライアント側でしか描画されないため、クローラー向けの
// 導線はこのフッターが唯一の入り口になる。
export default function SiteFooter() {
  const reviewEntries = Object.values(reviews);

  return (
    <footer className="w-full bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-[440px] mx-auto px-6 py-10">
        <div className="text-[11px] font-semibold tracking-[0.18em] text-neutral-400 uppercase mb-4">
          モデル別レビュー
        </div>
        <ul className="flex flex-col gap-2.5">
          {reviewEntries.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/review/${r.slug}/`}
                className="text-[13px] text-neutral-600 hover:text-neutral-900 transition flex items-baseline gap-2"
              >
                <span className="text-neutral-300">›</span>
                <span>
                  {r.name}
                  <span className="text-neutral-400 ml-1.5 text-[11px]">
                    {r.tagline.length > 22
                      ? `${r.tagline.slice(0, 22)}…`
                      : r.tagline}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-[11px] font-semibold tracking-[0.18em] text-neutral-400 uppercase mt-8 mb-4">
          比較記事
        </div>
        <ul className="flex flex-col gap-2.5">
          <li>
            <Link
              href="/compare/garmin-vs-applewatch/"
              className="text-[13px] text-neutral-600 hover:text-neutral-900 transition flex items-baseline gap-2"
            >
              <span className="text-neutral-300">›</span>
              Garmin と Apple Watch の違い
            </Link>
          </li>
          <li>
            <Link
              href="/compare/all/"
              className="text-[13px] text-neutral-600 hover:text-neutral-900 transition flex items-baseline gap-2"
            >
              <span className="text-neutral-300">›</span>
              ランニングウォッチ 6モデル比較
            </Link>
          </li>
        </ul>

        <div className="mt-8 pt-6 border-t border-neutral-200/70 text-[11px] text-neutral-400 leading-[1.8]">
          ランニングウォッチ診断 — Garmin・COROS・Apple Watch
          から、あなたに合う1本を無料で診断します。
        </div>
      </div>
    </footer>
  );
}
