// =====================================================
// 目的別おすすめ記事データ
// 検索意図（初心者 / サブ4 / コスパ / 乗り換え）ごとに
// おすすめモデルと選び方を構造化して保持する。
// /for/[slug]/ で静的生成される。
// =====================================================

export const useCases = {
  beginner: {
    slug: "beginner",
    title: "初心者向けランニングウォッチ おすすめ",
    metaTitle:
      "ランニング初心者におすすめのウォッチ3選 | 最初の1本の選び方",
    metaDescription:
      "これからランを始める人・始めたばかりの人に向けた、初めてのランニングウォッチの選び方。Garmin Forerunner 165 / COROS PACE 4 を中心に、4万円前後で後悔しない最初の1本を解説します。",
    intentLabel: "初めての1本",
    lead: "これからランニングを始める、または始めたばかりの人にとって、最初のウォッチは「高機能すぎず、でも続けたくなる」ものが理想です。価格は4万円前後を基準に、軽さ・画面の見やすさ・続けるための機能を満たす2本を中心に紹介します。",
    picks: [
      {
        rank: 1,
        modelKey: "garmin165",
        slug: "forerunner-165",
        forWho: "Garminの王道を入門価格で",
        reason:
          "必要な機能を厳選した初心者向け設計で、毎朝のリカバリー表示や練習メニュー提案が「今日走る理由」をつくってくれる。AMOLEDで普段使いも違和感がなく、5万円以内でGarminのエコシステムに入れる入り口として最適。",
      },
      {
        rank: 2,
        modelKey: "corosPace4",
        slug: "coros-pace-4",
        forWho: "軽さとコスパ最優先なら",
        reason:
          "4万円以下でAMOLED・デュアル周波数GPS・本体音楽保存まで備えた高コスパ機。30g台の軽さで腕への負担が少なく、長く続けやすい。Garmin一強の選択肢に別ブランドを試したい人にも。",
      },
      {
        rank: 3,
        modelKey: "appleWatch",
        slug: "apple-watch",
        forWho: "iPhoneユーザーで生活も大事なら",
        reason:
          "タイムを追うよりも「健康習慣として続けたい」人向け。通知・決済・音楽まで腕で完結し、毎日つけたくなる。ランの専門指標は控えめだが、続けやすさは随一。",
      },
    ],
    points: [
      "最初から上位機を狙わない。走り始めは入門機で十分なことが多い",
      "AMOLED画面のモデルは普段使いの満足度が高く、装着習慣がつきやすい",
      "軽さ（30〜40g台）は長く続けるほど効いてくる",
    ],
    conclusion:
      "最初の1本は「続けられること」が最優先。Garmin Forerunner 165 か COROS PACE 4 を基準に選べば、走力が伸びても2〜3年は使い続けられます。それでも迷うなら、10問の診断で方向性を確かめてみてください。",
  },

  sub4: {
    slug: "sub4",
    title: "サブ4を狙う人向けランニングウォッチ",
    metaTitle:
      "サブ4を狙うランニングウォッチ おすすめ | データで走力を伸ばす",
    metaDescription:
      "フルマラソン4時間切り（サブ4）・自己ベスト更新を狙うランナー向けのウォッチ選び。Garmin Forerunner 265 を軸に、マルチバンドGPSとトレーニング指標で走力を伸ばす1本を解説します。",
    intentLabel: "サブ4・自己ベスト",
    lead: "サブ4（フルマラソン4時間切り）や自己ベスト更新を狙うなら、走力を「数字で伸ばせる」モデルが必要です。マルチバンドGPSの精度と、Training Readinessなどのトレーニング指標を備えた中位以上が現実解になります。",
    picks: [
      {
        rank: 1,
        modelKey: "garmin265",
        slug: "forerunner-265",
        forWho: "サブ4ランナーの定番",
        reason:
          "マルチバンドGPSでラップ精度が安定し、Training Readinessが「今日走るべきか」を数値で示す。日々のラン→ハーフ→フルの全シーンで信頼でき、投資対効果が最も高い中核モデル。",
      },
      {
        rank: 2,
        modelKey: "garmin570",
        slug: "forerunner-570",
        forWho: "フォーム改善と地図も欲しいなら",
        reason:
          "265の精度に加え、手首だけでランニングダイナミクス（フォーム計測）が取れ、地図も内蔵。サブ3.5〜サブ3を本気で狙う中級〜上級者の相棒に。",
      },
      {
        rank: 3,
        modelKey: "corosPace4",
        slug: "coros-pace-4",
        forWho: "コスパ重視でサブ4を狙うなら",
        reason:
          "4万円以下でデュアル周波数GPSと長時間バッテリーを備え、サブ4練習に必要な精度は十分。予算を抑えつつ本格的に取り組みたい人の有力な選択肢。",
      },
    ],
    points: [
      "ラップ精度に直結するマルチバンド／デュアル周波数GPSは外せない",
      "Training Readinessやレース予測で、練習の質と計画が安定する",
      "ウルトラまで視野に入るなら、バッテリー時間も確認しておく",
    ],
    conclusion:
      "サブ4を本気で狙うなら、Garmin Forerunner 265 が王道。フォーム計測や地図まで欲しければ 570、コスパ重視なら COROS PACE 4 が候補です。自分の優先順位は診断で整理できます。",
  },

  budget: {
    slug: "budget",
    title: "コスパ重視・安いランニングウォッチ",
    metaTitle:
      "コスパ最強の安いランニングウォッチ | 4万円以下の本格モデル",
    metaDescription:
      "予算を抑えつつ本格的に走りたい人向けの、コスパ最強ランニングウォッチ。4万円以下でAMOLED・デュアル周波数GPS・本体音楽保存まで備えた COROS PACE 4 を中心に解説します。",
    intentLabel: "コスパ・予算重視",
    lead: "「できるだけ安く、でも妥協はしたくない」——今は4万円以下でもAMOLED画面と高精度GPSが手に入ります。価格を抑えながら本格的な走りに対応できる2本を中心に紹介します。",
    picks: [
      {
        rank: 1,
        modelKey: "corosPace4",
        slug: "coros-pace-4",
        forWho: "コスパNo.1",
        reason:
          "36,300円前後でAMOLED・デュアル周波数GPS・本体音楽保存・30g台の軽さまで揃う。フルマラソン〜ウルトラに耐えるバッテリーもあり、価格に対する満足度が突出している。",
      },
      {
        rank: 2,
        modelKey: "garmin165",
        slug: "forerunner-165",
        forWho: "Garminの安心感を入門価格で",
        reason:
          "5万円以内でGarminのトレーニング機能とエコシステムに入れる1本。国内ユーザーが多く情報も探しやすいので、サポート面の安心を取るならこちら。",
      },
    ],
    points: [
      "4万円以下でもAMOLED・高精度GPSは十分手に入る時代",
      "価格差は主に「上級トレーニング指標」と「地図機能」に出る",
      "コミュニティ・サポートの大きさを取るならGarminも検討",
    ],
    conclusion:
      "コスパを最優先するなら COROS PACE 4 が現状の最適解。Garminの情報量・安心感を取るなら Forerunner 165。どちらも「安かろう悪かろう」ではない本格機です。",
  },

  "apple-to-garmin": {
    slug: "apple-to-garmin",
    title: "Apple Watch から Garmin へ乗り換え",
    metaTitle:
      "Apple WatchからGarminに乗り換えるべき？ | 判断基準とおすすめ",
    metaDescription:
      "Apple Watchでランを続けてきた人が、Garminへ乗り換えるべきか迷ったときの判断基準。バッテリー・トレーニング指標・GPS精度の違いと、乗り換え先のおすすめモデルを解説します。",
    intentLabel: "乗り換え検討",
    lead: "Apple Watchでランを続けてきて、「もっと走力を伸ばしたい」「フルマラソンで電池が不安」と感じ始めたら、Garminへの乗り換えを検討するタイミングです。何が変わるのか、どのモデルが合うのかを整理します。",
    picks: [
      {
        rank: 1,
        modelKey: "garmin265",
        slug: "forerunner-265",
        forWho: "乗り換えの第一候補",
        reason:
          "Apple Watchで物足りなかったトレーニング指標・GPS精度・バッテリー持ちを一気に解決。Training Readinessやレース予測で、走力を数字で伸ばせるようになる。乗り換え後の満足度が最も高い王道機。",
      },
      {
        rank: 2,
        modelKey: "garmin165",
        slug: "forerunner-165",
        forWho: "まずは入門価格で試すなら",
        reason:
          "「いきなり高いのは不安」という人向け。5万円以内でGarminの体験ができ、Apple Watchとの二刀流（普段はApple、ランはGarmin）もしやすい。",
      },
    ],
    points: [
      "乗り換えの主な動機は『バッテリー』『トレーニング指標』『GPS精度』",
      "Apple Watchは普段使いに残し、ラン用にGarminを足す二刀流も現実的",
      "通知・決済を腕で完結させたい比重が高いなら、無理に乗り換えなくてよい",
    ],
    conclusion:
      "走力を本気で伸ばしたい・長距離で電池の不安をなくしたいなら、Garmin Forerunner 265 が乗り換え先の王道。普段使いはApple Watchに残す二刀流も賢い選択です。迷ったら診断で向き不向きを確認してみてください。",
  },
};

export const useCaseSlugs = Object.keys(useCases);
