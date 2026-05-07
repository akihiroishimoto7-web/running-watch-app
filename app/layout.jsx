import "./globals.css";

export const metadata = {
  title: "ランニングウォッチ診断 | Garmin と Apple Watch、あなたに合うのは？",
  description:
    "Garmin Apple Watch 比較診断。初心者〜サブ4ランナー向けに、最適なランニングウォッチを2ステップで診断します。Forerunner 165 / 265 / 965、COROS PACE 4、Apple Watchから最適モデルを提案。",
  keywords: [
    "ランニングウォッチ",
    "Garmin",
    "Apple Watch",
    "比較",
    "診断",
    "Forerunner 165",
    "Forerunner 265",
    "Forerunner 965",
    "COROS PACE 4",
    "サブ4",
  ],
  openGraph: {
    title: "ランニングウォッチ診断 | Garmin vs Apple Watch",
    description:
      "Garmin と Apple Watch、あなたに合うのは？2ステップであなたにぴったりの1本を診断します。",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="font-sans bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
