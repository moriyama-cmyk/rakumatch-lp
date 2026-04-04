import {
  BrainCircuit,
  ArrowRight,
  ClipboardList,
  Search,
  Mail,
  Upload,
  GitCompare,
  MessageSquare,
  CheckSquare,
  Brain,
  Database,
  CreditCard,
  Shield,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import Accordion from "@/components/Accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DeviceMockup from "@/components/DeviceMockup";

const APP_URL = "https://app.rakumatch-ai.com";

/* ---------- Data ---------- */

const stats = [
  { end: 90, suffix: "%", label: "入力時間削減" },
  { end: 1, suffix: "秒", label: "1物件の登録時間" },
  { end: 5, suffix: "秒", label: "追客メール作成" },
];

const painPoints = [
  {
    icon: ClipboardList,
    text: "物件情報の手入力に毎日1〜2時間かかる",
    cost: "月30時間 = 約15万円の人件費ロス",
  },
  {
    icon: Search,
    text: "どの顧客にどの物件を提案すべきか迷う",
    cost: "提案遅れで月2〜3件の機会損失",
  },
  {
    icon: Mail,
    text: "メール・電話の準備で営業時間が削られる",
    cost: "1日1時間 = 年間250時間のムダ",
  },
];

const zigzagFeatures = [
  {
    icon: Upload,
    title: "コピペだけ。レインズもSUUMOもExcelも。",
    desc: "レインズの詳細画面をCtrl+Aで全コピー、貼り付けるだけでAIが自動振り分け・物件登録。顧客情報もExcelでもどんな媒体でも、ページ丸ごとコピペすればAIが適切な項目へ自動入力。",
    badge: "入力時間90%削減",
  },
  {
    icon: GitCompare,
    title: "物件からも、顧客からも。双方向マッチング。",
    desc: "実務的な幅を持たせたマッチングロジックで、物件側からも顧客側からも最適な組み合わせをスコアリング。提案すべき物件がすぐにわかる。",
    badge: "マッチング精度スコア自動計算",
  },
  {
    icon: MessageSquare,
    title: "顧客1人1人に、専属AIがつく。",
    desc: "顧客ごとにAIが条件・履歴を分析し、「次に何をすべきか」「どうヒアリングすべきか」「この物件のどこがこのお客様に刺さるか」を具体的に提案。メール文も電話トークも自動生成。新人でもトップ営業マンレベルの提案ができます。",
    badge: "メール作成5秒",
  },
  {
    icon: CheckSquare,
    title: "契約フェーズも、精算も、書類も。全部ここに。",
    desc: "契約フェーズごとのTODO管理、顧客ごとのTODOリスト、精算金ツール（自動入力対応）、図面・書類の顧客ページ保存。漏れがない。",
    badge: "精算計算書も自動作成",
  },
];

const trustPoints = [
  { icon: Brain, title: "Google AI（Gemini）搭載", desc: "世界最先端のAIエンジン" },
  { icon: Database, title: "Amazon Web Services", desc: "世界シェアNo.1のクラウド基盤" },
  { icon: CreditCard, title: "Stripe決済", desc: "世界135カ国以上で利用される決済インフラ" },
  { icon: Shield, title: "データは全て暗号化", desc: "弊社サーバーでは一切管理しません" },
];

const plans = [
  {
    name: "スタンダード",
    price: 3000,
    firstMonth: 1500,
    storage: "250GB",
    featured: false,
    features: [
      "AIアシスタント（Gemini 2.5）",
      "AI一括抽出",
      "マッチング",
      "契約管理",
      "メンバー招待",
      "250GBストレージ",
    ],
  },
  {
    name: "プレミアム",
    price: 5000,
    firstMonth: 2000,
    storage: "500GB",
    featured: true,
    features: [
      "高性能AI（Gemini 3）",
      "全スタンダード機能",
      "500GBストレージ",
    ],
  },
];

const faqs = [
  {
    q: "無料トライアル中に解約できますか？",
    a: "はい、1週間以内に解約すれば一切料金はかかりません。",
  },
  {
    q: "他のCRMからデータ移行できますか？",
    a: "Excelやどんな媒体でも、コピペするだけでAIが自動登録します。",
  },
  {
    q: "1人でも使えますか？",
    a: "はい、個人の営業マンの方も同じ料金でご利用いただけます。",
  },
  {
    q: "セキュリティは大丈夫ですか？",
    a: "自社で大手と同等のセキュリティを構築するのはほぼ不可能です。楽マッチAIは、Amazon Web Services（AWS）・Google Cloud・Stripeなど、世界中の大企業や銀行が採用するインフラ上で稼働しています。お客様のデータや決済情報を弊社サーバーで保持することはありません。",
  },
  {
    q: "賃貸でも使えますか？",
    a: "楽マッチAIは不動産売買に特化して設計されています。売買仲介の業務フローに最適化されています。",
  },
];

/* ---------- Page ---------- */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-50 text-neutral-900">
      <Header />

      {/* ───────── 1. Hero ───────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 mb-6 border border-primary-100">
              不動産売買専用の反則級AI
            </span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              新人が、即戦力に変わる。
            </h1>
            <p className="mt-5 text-lg text-neutral-500 max-w-xl mx-auto leading-relaxed">
              個人でも企業でも、月3,000円/人で導入可能。コピペだけで物件登録、AIが自動マッチング、提案もヒアリングもAIがサポート。
            </p>
            <p className="mt-4 inline-block text-sm font-medium text-primary-700 bg-primary-50/60 rounded-lg px-4 py-1.5">
              導入費0円 ／ 個人でも企業でも月3,000円/人（税込）
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`${APP_URL}/signup`}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 hover:scale-105 text-white font-bold transition-all duration-200 shadow-lg shadow-primary-500/20"
              >
                1週間無料で試してみる
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`${APP_URL}/login`}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-surface-200 text-neutral-700 font-semibold hover:border-primary-200 hover:text-primary-700 transition-all duration-200"
              >
                ログインはこちら
              </a>
            </div>
            <p className="mt-3 text-xs text-neutral-400">
              30秒で登録完了・1週間無料トライアル
            </p>
          </div>

          {/* Product device mockup */}
          <div className="mt-14 max-w-4xl mx-auto">
            <DeviceMockup
              desktopSrc="/lp-desktop.png"
              mobileSrc="/lp-mobile.jpg"
            />
          </div>
        </div>
      </section>

      {/* ───────── 2. Stats bar ───────── */}
      <section className="py-14 bg-surface-50 border-y border-surface-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((s) => (
              <FadeIn key={s.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary-600 tracking-tight">
                  <CountUp end={s.end} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-neutral-500">{s.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. Developer story ───────── */}
      <section className="py-20 sm:py-24 bg-surface-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10">
              現役の不動産営業マンが、
              <br className="hidden sm:block" />
              自分のために作りました。
            </h2>
            <div className="bg-white rounded-2xl border border-surface-200 p-8 md:p-10">
              <div className="border-l-4 border-primary-400 pl-6">
                <p className="text-neutral-700 leading-relaxed">
                  東京で不動産売買をやっている、現役の営業マンです。
                </p>
                <p className="mt-4 text-neutral-700 leading-relaxed">
                  「もっと楽に、もっとわかりやすく、誰がやってもできるツール」を追い求めて作りました。
                </p>
                <p className="mt-4 text-neutral-700 leading-relaxed">
                  説明は不要です。使えば直感的にわかります。必要最低限を、ぎゅっと詰め込みました。
                </p>
                <p className="mt-4 text-primary-700 font-semibold leading-relaxed">
                  AIが進化するたびに、このアプリも進化します。あなたの営業トークも、提案も、一緒に進化し続けます。
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────── 4. Pain points ───────── */}
      <section className="py-20 sm:py-24 bg-surface-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-14">
              不動産営業、こんなお悩みありませんか？
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((p) => (
              <FadeIn key={p.text}>
                <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                    <p.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <p className="text-neutral-700 leading-relaxed font-medium">
                    {p.text}
                  </p>
                  <p className="mt-2 text-sm text-red-500 font-medium">{p.cost}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. Features (zig-zag) ───────── */}
      <section id="features" className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">
              不動産AI営業支援CRM「楽マッチ AI」の機能
            </h2>
          </FadeIn>

          <div className="space-y-20 md:space-y-28">
            {zigzagFeatures.map((f, i) => {
              const isEven = i % 2 === 0;
              return (
                <FadeIn key={f.title}>
                  <div
                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-10 md:gap-14 items-center`}
                  >
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="h-11 w-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                        <f.icon className="h-5.5 w-5.5 text-primary-600" />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight mb-3">
                        {f.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed mb-4">
                        {f.desc}
                      </p>
                      <span className="inline-block text-xs font-semibold text-primary-700 bg-primary-50 rounded-full px-3 py-1 border border-primary-100">
                        {f.badge}
                      </span>
                    </div>
                    {/* Screenshot */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="bg-surface-100 rounded-2xl shadow-lg aspect-video flex items-center justify-center text-neutral-400 text-sm border border-surface-200">
                        スクリーンショット準備中
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── 6. Trust / Security ───────── */}
      <section className="py-20 sm:py-24 bg-surface-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              大手テック企業のインフラで守る。
            </h2>
            <p className="text-neutral-500 text-center mb-14 max-w-2xl mx-auto leading-relaxed">
              自社で大手企業レベルのセキュリティを実現することは、ほぼ不可能です。楽マッチAIは、Google・Amazon・Stripeという世界最大級のインフラ上で稼働。お客様のデータや決済情報を弊社サーバーで管理することはありません。世界中の銀行・大企業が信頼する基盤を、そのままあなたの営業に。
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((t) => (
              <FadeIn key={t.title}>
                <div className="bg-white rounded-2xl border border-surface-200 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="h-12 w-12 rounded-xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
                    <t.icon className="h-6 w-6 text-neutral-600" />
                  </div>
                  <p className="text-sm font-bold text-neutral-700">
                    {t.title}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {t.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 6.5 AI Evolution ───────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-7 w-7 text-primary-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              AIが進化するたびに、
              <br className="hidden sm:block" />
              あなたの営業力も進化する。
            </h2>
            <p className="text-neutral-500 leading-relaxed max-w-xl mx-auto">
              楽マッチAIは、常に最新のAIモデルを搭載しています。AIが進化すれば、提案の質が上がり、ヒアリングの精度が上がり、マッチングの的中率が上がります。あなたは何もしなくても、使い続けるだけで営業力が進化し続けます。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────── 7. Comparison ───────── */}
      <section id="comparison" className="py-20 sm:py-24 bg-surface-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              他社と比べてください。
            </h2>
            <p className="text-neutral-500 text-center mb-14 max-w-lg mx-auto">
              不動産CRM市場の主要サービスとの比較
            </p>
          </FadeIn>
          <FadeIn>
            <div className="overflow-x-auto rounded-2xl border border-surface-200 shadow-sm bg-white">
              <table className="w-full text-sm text-left min-w-[600px]">
                <thead>
                  <tr className="border-b border-surface-200 bg-surface-50">
                    <th className="px-6 py-4 font-semibold text-neutral-700">サービス</th>
                    <th className="px-6 py-4 font-semibold text-neutral-700">月額</th>
                    <th className="px-6 py-4 font-semibold text-neutral-700">AI機能</th>
                    <th className="px-6 py-4 font-semibold text-neutral-700">導入方法</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-surface-200">
                    <td className="px-6 py-4 text-neutral-700">KASIKA</td>
                    <td className="px-6 py-4 text-neutral-600">60,000円〜</td>
                    <td className="px-6 py-4 text-neutral-600">一部あり</td>
                    <td className="px-6 py-4 text-neutral-600">要問い合わせ</td>
                  </tr>
                  <tr className="border-b border-surface-200">
                    <td className="px-6 py-4 text-neutral-700">いえらぶCLOUD</td>
                    <td className="px-6 py-4 text-neutral-600">50,000円〜</td>
                    <td className="px-6 py-4 text-neutral-600">一部あり</td>
                    <td className="px-6 py-4 text-neutral-600">要問い合わせ</td>
                  </tr>
                  <tr className="border-b border-surface-200">
                    <td className="px-6 py-4 text-neutral-700">Digima</td>
                    <td className="px-6 py-4 text-neutral-600">10,000円〜</td>
                    <td className="px-6 py-4 text-neutral-600">要確認</td>
                    <td className="px-6 py-4 text-neutral-600">要問い合わせ</td>
                  </tr>
                  <tr className="border-b border-surface-200">
                    <td className="px-6 py-4 text-neutral-700">PropoCloud</td>
                    <td className="px-6 py-4 text-neutral-600">要問い合わせ</td>
                    <td className="px-6 py-4 text-neutral-600">一部あり</td>
                    <td className="px-6 py-4 text-neutral-600">要問い合わせ</td>
                  </tr>
                  <tr className="bg-primary-50">
                    <td className="px-6 py-4 text-primary-600 font-bold">楽マッチ AI</td>
                    <td className="px-6 py-4 text-primary-600 font-bold">3,000円/人</td>
                    <td className="px-6 py-4 text-primary-600 font-bold">7つのAI搭載</td>
                    <td className="px-6 py-4 text-primary-600 font-bold">即日・セルフ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-neutral-400 mt-4 text-center">
              ※ 各社公式サイトの公開情報に基づく（2026年3月時点）。最新情報は各社公式サイトをご確認ください。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────── 8. Pricing ───────── */}
      <section id="plans" className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              シンプルな料金。隠れたコストなし。
            </h2>
            <p className="text-neutral-500 text-center mb-14 max-w-lg mx-auto">
              1週間の無料トライアル付き。いつでも解約可能。
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {plans.map((plan) => (
              <FadeIn key={plan.name}>
                <div
                  className={`relative rounded-2xl p-7 border transition-all h-full hover:shadow-lg hover:-translate-y-1 duration-300 ${
                    plan.featured
                      ? "bg-white border-2 border-primary-600 shadow-md"
                      : "bg-white border border-surface-200 shadow-sm"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-[11px] font-bold tracking-wide text-white">
                      人気
                    </div>
                  )}
                  <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                  <p className="text-neutral-400 text-xs mb-4">
                    ストレージ {plan.storage}
                  </p>

                  {/* Pricing tiers */}
                  <div className="space-y-1 mb-5">
                    <p className="text-sm text-primary-600 font-semibold">
                      1週間無料
                    </p>
                    <p className="text-sm text-neutral-500">
                      2週目〜1ヶ月目:{" "}
                      <span className="font-semibold text-neutral-700">
                        &yen;{plan.firstMonth.toLocaleString()}
                      </span>
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold tracking-tight">
                        &yen;{plan.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-neutral-400">
                        /人/月（税込）
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm text-neutral-600"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary-500 mt-0.5 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${APP_URL}/signup`}
                    className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                      plan.featured
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-surface-100 hover:bg-surface-200 text-neutral-700"
                    }`}
                  >
                    1週間無料で始める
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>

          <p className="text-center text-sm text-neutral-400 mt-8">
            導入費0円・個人でも企業でも同一料金・いつでも解約可能
          </p>
        </div>
      </section>

      {/* ───────── 9. FAQ ───────── */}
      <section id="faq" className="py-20 sm:py-24 bg-surface-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-14">
              不動産AI営業支援CRMについてよくある質問
            </h2>
          </FadeIn>
          <FadeIn>
            <Accordion items={faqs} />
          </FadeIn>
        </div>
      </section>

      {/* ───────── 10. Final CTA ───────── */}
      <section className="py-20 sm:py-24 bg-primary-600">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              まず触ってみてください。
              <br />
              説明は不要です。
            </h2>
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center gap-2 bg-white text-primary-700 rounded-xl px-8 py-4 font-bold text-base hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              1週間無料で試してみる
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-4 text-sm text-primary-100">
              1週間無料トライアル・いつでも解約可能
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
