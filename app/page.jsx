import Diagnosis from "./Diagnosis";
import Faq from "./Faq";
import SiteFooter from "./SiteFooter";

const SITE_URL = "https://runningwatchapps.netlify.app";

// サイト全体を表す schema.org WebSite。Google にサイトの基本情報を伝える。
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ランニングウォッチ診断",
  alternateName: "Garmin vs Apple Watch 診断",
  url: `${SITE_URL}/`,
  description:
    "Garmin と Apple Watch、最適なランニングウォッチを1分で診断するWebアプリ。初心者からサブ4ランナー向け。",
  inLanguage: "ja-JP",
  publisher: {
    "@type": "Organization",
    name: "ランニングウォッチ診断",
    url: `${SITE_URL}/`,
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Diagnosis />
      <Faq />
      <SiteFooter />
    </>
  );
}
