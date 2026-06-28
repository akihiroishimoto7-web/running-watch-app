// =====================================================
// Web App Manifest（Next.js 14 metadata route）
// ビルド時に /manifest.webmanifest が静的生成される。
// ホーム画面追加（PWA）時の表示を定義。
// =====================================================

export default function manifest() {
  return {
    name: "ランニングウォッチ診断",
    short_name: "ウォッチ診断",
    description:
      "GarminとApple Watchを10の質問で比較診断。あなたに最適なランニングウォッチが1分でわかります。",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    lang: "ja",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
