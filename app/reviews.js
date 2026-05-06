// =====================================================
// レビュー記事データ
// 各モデルの詳細レビューを構造化して保持しています。
// 新しいレビューを追加・修正するときはこのファイルを編集してください。
// =====================================================

export const reviews = {
  "forerunner-165": {
    slug: "forerunner-165",
    modelKey: "garmin165",
    name: "Garmin Forerunner 165",
    brand: "Garmin",
    image: "/reviews/forerunner-165.jpg",
    tagline: "初めての本格ランニングウォッチに、これ以上ない選択肢。",
    hero:
      "2024年3月発売の Forerunner 165 は、Garmin の中で最も「初心者がランニングウォッチに求めるもの」を凝縮したモデル。AMOLEDの美しいディスプレイと、過剰でないトレーニング機能のバランスが、これからランを習慣にしたい人にちょうどいい。",
    forWhom: [
      "これからランニングを始める / 始めたばかりの人",
      "普段使いと運動を1本でこなしたい",
      "ペース・心拍を見ながら走りたい",
      "5万円以内で本格モデルが欲しい",
    ],
    specs: [
      { label: "ディスプレイ", value: "1.2インチ AMOLED (390×390)" },
      {
        label: "バッテリー",
        value: "スマートウォッチ最大11日 / GPS最大19時間",
      },
      { label: "GPS", value: "シングルバンド (GPS / GLONASS / GALILEO)" },
      { label: "重量", value: "約39g" },
      { label: "防水性能", value: "5ATM" },
      { label: "音楽保存", value: "Music モデルのみ対応" },
      { label: "価格", value: "約45,000円〜（Music は55,000円〜）" },
    ],
    impressions: [
      "最初に手に取って驚くのが、約39gという軽さ。腕を振っていても重さを意識せず、走りに集中できる。AMOLEDディスプレイは屋外の太陽光下でも視認性が高く、走行中に時計を見るストレスがない。GPSの捕捉は5〜15秒程度で、街中でも軌跡のブレは少なく、トレーニング用途として十分な精度。",
      "毎朝の Morning Report でその日の睡眠スコアやリカバリー状態が表示され、自然と「今日のラン」を意識する習慣ができる。Daily Suggested Workouts は走力に応じて毎日の練習メニューを提案してくれるので、何をやればいいか分からない初心者の助けになる。",
    ],
    highlights: [
      {
        title: "AMOLEDディスプレイの完成度",
        body: "普段使いでも違和感のない表示品質。屋外でも視認性が高い。",
      },
      {
        title: "39gの軽量設計",
        body: "腕への負担が少なく、長時間装着しても気にならない。",
      },
      {
        title: "Daily Suggested Workouts",
        body: "走力に合わせた練習メニューを毎日提案。「今日何を走ればいいか」が明確になる。",
      },
      {
        title: "Sleep Coach / Body Battery",
        body: "睡眠と回復が可視化され、走力向上の土台が整う。",
      },
      {
        title: "5万円以内という価格",
        body: "Garmin のエコシステムをこの価格で体験できる入り口。",
      },
    ],
    drawbacks: [
      {
        title: "シングルバンドGPS",
        body: "ビル街や高架下では精度がやや落ちる場面がある。フルマラソンの本命機材としては物足りなさを感じる人もいる。",
      },
      {
        title: "トライアスロン非対応",
        body: "スイム計測はあるが、マルチスポーツモードは搭載されていない。",
      },
      {
        title: "地図機能なし",
        body: "知らないコースを走るときのナビゲーションは頼れない。",
      },
    ],
    useCases: [
      { label: "5km / ジョグ", rating: 5, comment: "必要十分以上" },
      { label: "10km / 閾値走", rating: 4, comment: "軽量で疾走感に集中できる" },
      { label: "ハーフマラソン", rating: 4, comment: "バッテリーも余裕" },
      {
        label: "フルマラソン",
        rating: 3,
        comment: "GPS精度は問題ないが、上位機の安心感には及ばない",
      },
      {
        label: "普段使い",
        rating: 5,
        comment: "軽量・AMOLED・通知機能で日常使いも快適",
      },
    ],
    bestFor:
      "ランニングを「これから本気でやりたい」人の初めての1本。サブ5を目指す初心者から、サブ4を目指す中級者まで幅広くカバーする。",
    notFor:
      "すでにフルマラソン3時間半を切っているような上級者・地図機能やマルチバンドGPSが必須の人・トライアスロン対応が欲しい人",
    conclusion:
      "「Garmin が気になっているけど、いきなり高いのは…」という人にこそ刺さる1本。価格・機能・デザインのバランスが極めて良く、最初の本格ランニングウォッチとして買って後悔しにくい。3年は使える完成度の高さがある。",
    relatedModels: [
      { slug: "forerunner-265", reason: "次のステップに" },
      { slug: "coros-pace-4", reason: "同価格帯のコスパ機" },
    ],
  },

  "forerunner-265": {
    slug: "forerunner-265",
    modelKey: "garmin265",
    name: "Garmin Forerunner 265",
    brand: "Garmin",
    image: "/reviews/forerunner-265.png",
    tagline: "サブ4を本気で狙うランナーの定番。",
    hero:
      "2023年3月発売。Forerunner シリーズの中核モデルとして、本格的なトレーニング機能を AMOLED ディスプレイと組み合わせた一本。マルチバンドGPSの精度と Training Readiness をはじめとする上級指標により、サブ4・自己ベスト更新を狙うランナーの「ちょうどよい上位機」として支持を集めている。",
    forWhom: [
      "サブ4・自己ベスト更新を本気で目指す",
      "ラップやインターバルを使い分けたい",
      "心拍ゾーンでトレーニングを管理したい",
      "データを毎日見て成長を追いたい",
    ],
    specs: [
      {
        label: "ディスプレイ",
        value: "1.3インチ AMOLED (416×416) / 265S は1.1インチ",
      },
      {
        label: "バッテリー",
        value: "スマートウォッチ最大13日 / GPS最大20時間",
      },
      { label: "GPS", value: "マルチバンド (L1+L5) / SatIQ" },
      { label: "重量", value: "約47g (265S は約39g)" },
      { label: "防水性能", value: "5ATM" },
      { label: "音楽保存", value: "対応 (約500曲)" },
      { label: "価格", value: "約65,000〜75,000円" },
    ],
    impressions: [
      "165との差は走り出してすぐに分かる。マルチバンドGPSの精度は街中・林間・トンネル付近など、シングルバンドでブレやすい場面で明確に効果を発揮し、ラップごとのペース表示が信頼できる。1.3インチの大画面AMOLEDは視認性も最上位。走行中に閾値ペースや心拍ゾーンを瞬時に把握できる安心感は、サブ4を狙うランナーにとって心強い。",
      "Training Readiness は前夜の睡眠・HRV・直近の負荷から「今日トレーニングするべきか」を10段階で示してくれる。これに従って練習を組むことで、無理なく・しかし負荷を抜かずに走力を伸ばせる。レース予測機能も、3回のテンポ走から精度の高い予想タイムを提示するため、目標設定の迷いがなくなる。",
    ],
    highlights: [
      {
        title: "マルチバンドGPSの精度",
        body: "街中ラン・LSDの軌跡が美しいレベルで残る。ラップタイムの信頼度が段違い。",
      },
      {
        title: "Training Readiness",
        body: "「今日休むべきか走るべきか」が数値で見える。練習計画の迷いが消える。",
      },
      {
        title: "AMOLEDの大画面",
        body: "視認性と所有感の両立。走行中の情報量が多い。",
      },
      {
        title: "HRV ステータス",
        body: "自律神経の状態が日常的に追える。体調管理が走力向上につながる。",
      },
      {
        title: "ClimbPro 対応",
        body: "トレイル・峠でも勾配と残り距離が見える。坂のあるレースで効く。",
      },
    ],
    drawbacks: [
      {
        title: "地図機能なし",
        body: "ナビゲーションが必要なら965へ。",
      },
      {
        title: "重量47gの存在感",
        body: "長時間装着でわずかに気になる場面もある。265S なら軽量。",
      },
      {
        title: "165との価格差",
        body: "約2万円分の体感差は、走り込まないと出にくい。",
      },
    ],
    useCases: [
      { label: "5km / ジョグ", rating: 5, comment: "余裕の精度" },
      { label: "10km / 閾値走", rating: 5, comment: "ラップ精度が活きる" },
      {
        label: "ハーフマラソン",
        rating: 5,
        comment: "ペース管理・指標が完璧に機能する",
      },
      {
        label: "フルマラソン",
        rating: 5,
        comment: "サブ4・自己ベスト更新の本命機材",
      },
      {
        label: "ウルトラ",
        rating: 3,
        comment: "GPS最大20時間がボーダーライン",
      },
      { label: "普段使い", rating: 4, comment: "165より重量と存在感あり" },
    ],
    bestFor:
      "「データを見ながら本気で走力を伸ばしたい」中級ランナー。月100km〜200kmの走り込みをして、サブ4・サブ3.5を狙う層に最もハマる。",
    notFor:
      "始めたばかりの人 (オーバースペック)・地図ナビが必須の人 (965へ)・予算重視の人 (165や PACE 4 を)",
    conclusion:
      "165 と 965 の中間に位置する「現実解」。マルチバンドGPSと AMOLEDの組み合わせで、走力向上を真剣に目指す人にとって最も投資対効果が高い。日々のラン → ハーフ → フルの全シーンで信頼できる、定番中の定番。",
    relatedModels: [
      { slug: "forerunner-965", reason: "上位の最強モデル" },
      { slug: "coros-pace-4", reason: "同等機能を低価格で" },
    ],
  },

  "forerunner-965": {
    slug: "forerunner-965",
    modelKey: "garmin965",
    name: "Garmin Forerunner 965",
    brand: "Garmin",
    image: "/reviews/forerunner-965.png",
    tagline: "ガチ勢が辿り着く、Garmin の完成形。",
    hero:
      "2023年3月発売の最上位ランニングウォッチ。Forerunner シリーズのフル機能版で、マルチバンドGPS、カラー地図、最大31時間のGPSバッテリー、Training Readinessを含むあらゆるトレーニング指標を搭載。サブ3を狙う上級ランナーから、ウルトラ・トレイルランナーまで応える1本。",
    forWhom: [
      "フルマラソン3時間半切り・サブ3を狙う",
      "ウルトラマラソン・トレイルを走る",
      "知らない場所をナビゲーションしながら走りたい",
      "バッテリー切れの不安を完全になくしたい",
    ],
    specs: [
      { label: "ディスプレイ", value: "1.4インチ AMOLED (454×454)" },
      {
        label: "バッテリー",
        value: "スマートウォッチ最大23日 / GPS最大31時間 / マルチバンド最大19時間",
      },
      { label: "GPS", value: "マルチバンド (L1+L5) / 全衛星システム対応" },
      { label: "重量", value: "約53g" },
      { label: "防水性能", value: "5ATM" },
      { label: "音楽保存", value: "対応 / Wi-Fi同期" },
      { label: "内蔵地図", value: "TopoActive カラー地形図" },
      { label: "価格", value: "約90,000〜100,000円" },
    ],
    impressions: [
      "965で最も感動するのは、ランニング中に表示されるカラー地図の存在。知らないトレイルや旅先のラン、ウルトラのコース確認 — どこを走っても「迷わない」という安心感がある。ClimbPro は登りに入るたびに勾配・標高差・残り距離を表示し、ペース配分の判断材料を与えてくれる。",
      "純粋な走行性能においても、マルチバンドGPSの軌跡は他機を圧倒。サブ3を狙うようなレースでは1km毎のラップ精度が直接結果に効く。Stamina 機能は走行中に「あと何分このペースで走れるか」を予測してくれるため、レース後半のペース管理に強い。",
    ],
    highlights: [
      {
        title: "カラー地形図 (TopoActive)",
        body: "走りながら現在地と地形が見える。トレイル・旅ランで革命的。",
      },
      {
        title: "ClimbPro",
        body: "登りの可視化はトレイルランナーには必須機能。",
      },
      {
        title: "GPSバッテリー31時間",
        body: "100マイル (160km) ウルトラまで完走可能。",
      },
      {
        title: "Stamina 機能",
        body: "「今のペースで完走できるか」を可視化。レース後半の判断に効く。",
      },
      {
        title: "PacePro",
        body: "レースペースを区間ごとに自動配分。コースに合わせた走り方ができる。",
      },
    ],
    drawbacks: [
      {
        title: "価格",
        body: "10万円前後は気軽に出せる金額ではない。",
      },
      {
        title: "サイズ",
        body: "47mmケースは細腕には大きく感じる場合がある。",
      },
      {
        title: "機能の多さ",
        body: "初心者にはオーバースペック。265で十分というケースも多い。",
      },
    ],
    useCases: [
      {
        label: "5km〜ハーフ",
        rating: 4,
        comment: "オーバースペックだが余裕で対応",
      },
      { label: "フルマラソン", rating: 5, comment: "サブ3クラスの精度" },
      {
        label: "ウルトラ・トレイル",
        rating: 5,
        comment: "唯一無二の存在",
      },
      {
        label: "旅行先のラン",
        rating: 5,
        comment: "地図があるのでどこでも走れる",
      },
      { label: "普段使い", rating: 4, comment: "大ぶりだが完成度は高い" },
    ],
    bestFor:
      "フルマラソンを長年やってきて、トレイル・ウルトラに挑戦し始める層 / 知らない場所を走るのが好きで、地図機能に対価を払える人。",
    notFor:
      "街中の決まったコースしか走らない人 (265で十分)・予算10万円が厳しい人",
    conclusion:
      "Garmin が技術と思想を全部詰め込んだ「最終形」。長く使い込めば使い込むほど価値を実感する、ランナーの相棒として最上位の選択肢。",
    relatedModels: [
      { slug: "forerunner-265", reason: "もう少し価格を抑えるなら" },
      { slug: "coros-pace-4", reason: "軽量・コスパに振るなら" },
    ],
  },

  "coros-pace-4": {
    slug: "coros-pace-4",
    modelKey: "corosPace4",
    name: "COROS PACE 4",
    brand: "COROS",
    image: "/reviews/coros-pace-4.png",
    tagline: "AMOLED と長時間GPSを備えた、軽量コスパ機。",
    hero:
      "2025年11月発売。前モデル PACE 3 から MIP→AMOLED への画面刷新、GPS バッテリーの延長、本体音楽保存対応、内蔵マイクの追加など、見える部分も見えない部分も丁寧にアップデートされた一本。国内販売価格は36,300円（税込）前後で、Garmin Forerunner 165 / 265 と直接比較する価値がさらに上がった。",
    forWhom: [
      "AMOLEDの綺麗な画面が欲しいけど予算は4万円以下",
      "GPS精度とバッテリー持ちを両立させたい",
      "ランニング中も本体だけで音楽を聴きたい（Bluetoothイヤホン）",
      "Garmin一強の選択肢に違うブランドを試したい",
    ],
    specs: [
      {
        label: "ディスプレイ",
        value: "1.2インチ AMOLEDタッチスクリーン（PACE 3比 解像度+164%）",
      },
      {
        label: "バッテリー",
        value: "スマートウォッチ最大19日 / GPS最大41時間（モードにより短縮）",
      },
      { label: "GPS", value: "デュアル周波数対応 / 全衛星システム対応" },
      {
        label: "重量",
        value: "約40g (シリコンバンド) / 約32g (ナイロンバンド)",
      },
      { label: "厚さ", value: "11.8mm" },
      { label: "防水性能", value: "5ATM" },
      {
        label: "音楽",
        value: "本体保存対応（MP3 / 4GB）・内蔵マイク搭載",
      },
      { label: "充電端子", value: "USB Type-C" },
      { label: "価格", value: "36,300円（税込）前後" },
    ],
    impressions: [
      "PACE 3 を使ったことがある人なら、画面を点けた瞬間に AMOLED への変更を実感する。文字や数字の見やすさ、グラフのなめらかさが一段上がり、屋外の真昼でも視認性は最上位クラス。タッチスクリーンと物理リューズを併用する操作系は PACE 3 から踏襲されており、走行中に汗や雨で誤操作する心配が少ない。",
      "GPSはデュアル周波数にも対応し、街中・林間・高架下のいずれでも軌跡が安定しやすい。最大41時間のGPSバッテリーはモードや使い方で短くなるものの、フルマラソンや長めの練習には十分な余裕がある。本体に音楽を保存して Bluetooth イヤホンで再生できるようになったのも、スマホを置いて走りたい人には大きい。",
    ],
    highlights: [
      {
        title: "AMOLEDへの画面刷新",
        body: "PACE 3のMIPに比べて表示の華やかさと視認性が大きく向上。普段使いの満足度が一段上がった。",
      },
      {
        title: "GPS最大41時間バッテリー",
        body: "モードや使い方で変動するが、ロング走やフルマラソンには十分な余裕がある。",
      },
      {
        title: "音楽の本体保存に対応",
        body: "4GBのストレージで、スマホを持たずにBluetoothイヤホンで音楽を再生できる。PACE 3で唯一足りなかった機能が解消。",
      },
      {
        title: "32〜40gの軽量",
        body: "ナイロンバンドなら32g。AMOLED機としては突出して軽く、長距離でも腕への負担が小さい。",
      },
      {
        title: "36,300円という価格",
        body: "AMOLED、デュアル周波数GPS、本体音楽保存まで備えて4万円以下に収まる価格帯。",
      },
    ],
    drawbacks: [
      {
        title: "国内コミュニティがGarminより小さい",
        body: "Garmin Connect比でユーザー数・サードパーティ連携の選択肢は限られる。",
      },
      {
        title: "発売直後で在庫が薄い場面あり",
        body: "発売から間もないため、希望のバンドや色はタイミング次第になることがある。",
      },
      {
        title: "通知活用は最小限",
        body: "iPhone連携で「届く」が、決済・電話・アプリ操作はApple Watchに及ばない。",
      },
    ],
    useCases: [
      {
        label: "5km / ジョグ",
        rating: 5,
        comment: "軽量＋AMOLEDで毎日つけたくなる",
      },
      { label: "10km / 閾値走", rating: 5, comment: "GPS精度・操作性も◎" },
      {
        label: "フルマラソン",
        rating: 5,
        comment: "精度・バッテリー・視認性すべて余裕",
      },
      {
        label: "ウルトラ",
        rating: 5,
        comment: "GPSバッテリーに余裕がある",
      },
      {
        label: "普段使い",
        rating: 4,
        comment: "AMOLED化で違和感が大きく減った",
      },
    ],
    bestFor:
      "コスパ最優先のランナー / 軽量機が好み / Garmin一強に飽きた人 / セカンドウォッチを探している経験者 / 本体で音楽を聴きながら走りたい人",
    notFor:
      "国内コミュニティの大きさ・サポートを重視する人 / 通知やアプリ連携を本格的に使う人 / 発売直後の在庫リスクを避けたい人",
    conclusion:
      "PACE 3 で弱点になりやすかった AMOLED 非対応と音楽保存非対応がそろって解消され、GPS バッテリーにも余裕が出た「正常進化版」。4万円以下で AMOLED、デュアル周波数GPS、本体音楽保存まで満たす選択肢は限られるため、Garmin Forerunner 165 と真剣に比較する価値が一段と高くなった一本。",
    relatedModels: [
      { slug: "forerunner-165", reason: "Garmin の同価格帯" },
      { slug: "forerunner-265", reason: "1ランク上の本格機" },
    ],
  },

  "apple-watch": {
    slug: "apple-watch",
    modelKey: "appleWatch",
    name: "Apple Watch",
    brand: "Apple",
    image: "/reviews/apple-watch.jpg",
    tagline: "走るだけじゃない。生活全体をスマートにする1本。",
    hero:
      "ランナー向けに作られたわけではないが、iPhone との連携・通知機能・健康管理・デザイン性を含めた「総合的な使い勝手」では他の追随を許さないスマートウォッチ。Series / SE / Ultra のラインナップから選べる柔軟性も魅力で、ランニングを「ガチでやる」より「ライフスタイルの一部にする」人に向いている。",
    forWhom: [
      "iPhone と連携した通知・決済を重視したい",
      "ランニングは習慣として続けたい (タイム重視ではない)",
      "普段使いも違和感のないデザインが欲しい",
      "Apple Music・Apple Pay を腕でこなしたい",
    ],
    specs: [
      {
        label: "ディスプレイ",
        value: "Always-On Retina (Series / Ultra)",
      },
      {
        label: "バッテリー",
        value: "約18時間 (Series) / 36時間 (Ultra)",
      },
      { label: "GPS", value: "内蔵 / Ultra はマルチバンド対応" },
      { label: "防水性能", value: "50m (Series / Ultra / SE)" },
      { label: "音楽", value: "Apple Music ストリーミング対応" },
      {
        label: "価格",
        value: "約34,000円 (SE) 〜 130,000円超 (Ultra)",
      },
    ],
    impressions: [
      "ランニング機能は標準の「ワークアウト」アプリで完結する。距離・ペース・心拍が表示され、Auto-Pause も働く。最新世代のディスプレイ輝度は屋外視認性も問題なく、GPS精度は Ultra ならマルチバンド対応、Series でも街中ラン用途には十分。",
      "ただし、本気でランニングをやり込もうとすると壁に当たる。バッテリー18時間ではフルマラソンがギリギリ、トレーニング指標は Garmin / COROS と比べて簡素、ラップ・インターバル設定はサードパーティアプリ (WorkOutDoors, Runna 等) を入れて補う前提になる。",
      "逆に「走った後の生活全体」では圧勝。通知が腕で完結し、Apple Pay で買い物ができ、Apple Music が腕に同期され、ヘルスケアアプリが歩数・睡眠・心拍・血中酸素まで一元管理する。",
    ],
    highlights: [
      {
        title: "iPhone 連携の完成度",
        body: "通知・電話・決済が1本で完結する体験は他社では再現できない。",
      },
      {
        title: "デザインとケース選択肢",
        body: "バンド・ケースで自分仕様にできる。普段使いの違和感がない。",
      },
      {
        title: "ヘルスケアの統合",
        body: "心電図・血中酸素・転倒検知など、医療領域に近い機能を搭載。",
      },
      {
        title: "ストア連動アプリ",
        body: "サードパーティで本格的なランニング機能まで拡張できる。",
      },
      {
        title: "資産価値",
        body: "中古市場が活発で、買い替え時の下取り価格が高い。",
      },
    ],
    drawbacks: [
      {
        title: "バッテリー18時間",
        body: "フルマラソン以上は不安が残る。Ultra なら緩和される。",
      },
      {
        title: "専門ランニング指標は弱い",
        body: "Training Readiness 級の指標はなく、本格分析は他機が上。",
      },
      {
        title: "本格運用は Ultra 一択",
        body: "真剣に走るなら Ultra (~130,000円) が現実解で、トータル投資が高くなる。",
      },
    ],
    useCases: [
      { label: "5km / ジョグ", rating: 5, comment: "気軽に始められる" },
      {
        label: "10km / 閾値走",
        rating: 4,
        comment: "サードパーティアプリ前提",
      },
      {
        label: "フルマラソン",
        rating: 3,
        comment: "Series ではバッテリー綱渡り、Ultra で◎",
      },
      {
        label: "ウルトラ",
        rating: 2,
        comment: "Ultra でも長時間レースは厳しい",
      },
      { label: "普段使い", rating: 5, comment: "圧倒的トップ" },
    ],
    bestFor:
      "「走る人」より「健康的に生活したい人」。iPhone ユーザーで、ランは月10〜30km程度のペースで楽しみたい人にとって最良の選択肢。",
    notFor:
      "本気でサブ4以上を狙うランナー (Garmin / COROS が現実解)・Android ユーザー (連携の旨味が消える)・バッテリー持ちを最優先する人",
    conclusion:
      "「ランニングウォッチ」というカテゴリで見ると一段見劣りするが、「生活を支える1本」として見ると右に出るものがない。ランも生活も大事なら、まず Apple Watch から始めて、本格化したタイミングで Garmin を加える「二刀流」も現実的な選択。",
    relatedModels: [
      { slug: "forerunner-265", reason: "本格ラン用に追加するなら" },
      { slug: "coros-pace-4", reason: "Android ユーザーの選択肢" },
    ],
  },
};

export const reviewSlugs = Object.keys(reviews);
