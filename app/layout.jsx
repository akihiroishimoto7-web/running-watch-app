import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://runningwatchapps.netlify.app"),
  alternates: { canonical: "/" },
  title: "ランニングウォッチ診断 | Garmin と Apple Watch、あなたに合うのは？",
  description:
    "Garmin Apple Watch 比較診断。初心者〜サブ4ランナー向けに、最適なランニングウォッチを2ステップで診断します。Forerunner 165 / 265 / 570 / 965、COROS PACE 4、Apple Watchから最適モデルを提案。",
  keywords: [
    "ランニングウォッチ",
    "Garmin",
    "Apple Watch",
    "比較",
    "診断",
    "おすすめ",
    "Forerunner 165",
    "Forerunner 265",
    "Forerunner 570",
    "Forerunner 965",
    "COROS PACE 4",
    "サブ4",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "ランニングウォッチ診断 | Garmin vs Apple Watch",
    description:
      "Garmin と Apple Watch、あなたに合うのは？2ステップであなたにぴったりの1本を診断します。",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ランニングウォッチ診断",
  url: "https://runningwatchapps.netlify.app/",
  description: "GarminとApple Watchを10の質問で比較診断。あなたに最適なランニングウォッチが1分でわかります。",
  applicationCategory: "HealthApplication",
  inLanguage: "ja",
  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="font-sans bg-white text-neutral-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
