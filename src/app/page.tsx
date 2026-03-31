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
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import Accordion from "@/components/Accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const APP_URL = "https://top-sales-ai.vercel.app";

/* ---------- Data ---------- */

const stats = [
  { end: 90, suffix: "%", label: "入力時間削減" },
  { end: 3, suffix: "分", label: "1物件の登録時間" },
  { end: 1, suffix: "分", label: "追客メール作成" },
];

const painPoints = [
  {
    icon: ClipboardList,
    text: "物件情報の手入力に毎日1〜2時間かかる",
  },
  {
    icon: Search,
    text: "どの顧客にどの物件を提案すべきか迷う",
  },
  {
    icon: Mail,
    text: "メール・電話の準備で営業時間が削られる",
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
    desc: "足りない情報のヒアリング方法、お客様へのベネフィット提案、メール文、電話トークをAIが自動生成。新人でもトップ営業マンレベルの提案ができる。",
    badge: "メール作成1分",
  },
  {
    icon: CheckSquare,
    title: "契約フェーズも、精算も、書類も。全部ここに。",
    desc: "契約フェーズごとのTODO管理、顧客ごとのTODOリスト、精算金ツール（自動入力対応）、図面・書類の顧客ページ保存。漏れがない。",
    badge: "精算計算書も自動作成",
  },
];

const trustPoints = [
  { icon: Brain, title: "Google AI（Gemini）搭載" },
  { icon: Database, title: "Amazon Web Servicesのデータベース" },
  { icon: CreditCard, title: "世界シェアNo.1のStripe決済" },
  {
    icon: Shield,
    title: "お客様のデータ・支払い情報は弊社では管理しません",
  },
];

const plans = [
  {
    name: "Standard",
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
    name: "Premium",
    price: 5000,
    firstMonth: 2000,
    storage: "500GB",
    featured: true,
    features: [
      "高性能AI（Gemini 3）",
      "全Standard機能",
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
    a: "Google AI・Amazon DB・Stripe決済を採用。銀行レベルのセキュリティです。お客様のデータは弊社では管理しません。",
  },
  {
    q: "賃貸でも使えますか？",
    a: "楽マッチAIは不動産売買に特化して設計されています。売買仲介の業務フローに最適化されています。",
  },
];

/* ---------- Screenshot placeholder ---------- */
function ScreenshotPlaceholder() {
  return (
    <div className="bg-surface-100 rounded-2xl shadow-lg aspect-video flex items-center justify-center text-neutral-400 text-sm">
      スクリーンショット準備中
    </div>
  );
}

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
              個人でも企業でも、月3,000円で導入可能。コピペだけで物件登録、AIが自動マッチング、提案もヒアリングもAIがサポート。
            </p>
            <p className="mt-4 inline-block text-sm font-medium text-primary-700 bg-primary-50/60 rounded-lg px-4 py-1.5">
              導入費0円 ／ 個人でも企業でも月3,000円
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`${APP_URL}/login`}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 hover:scale-105 text-white font-bold transition-all duration-200 shadow-lg shadow-primary-500/20"
              >
                1週間無料で試してみる
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`${APP_URL}/login`}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-surface-200 text-neutral-700 font-semibold hover:border-primary-200 hover:text-primary-700 transition-all duration-200"
              >
                資料ダウンロード
              </a>
            </div>
            <p className="mt-3 text-xs text-neutral-400">
              クレジットカード不要・30秒で登録完了
            </p>
          </div>

          {/* Product screenshot placeholder */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="bg-surface-100 rounded-2xl shadow-xl aspect-video flex items-center justify-center text-neutral-400 text-sm">
              スクリーンショット準備中
            </div>
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
                  低学歴で覚えが悪い自分が、もっと楽に、もっとわかりやすく、誰がやってもできるツールを追い求めて作りました。
                </p>
                <p className="mt-4 text-neutral-700 leading-relaxed">
                  説明は不要です。使えば直感的にわかります。必要最低限を、ぎゅっと詰め込みました。
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
              こんなお悩み、ありませんか？
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
              楽マッチ AI でできること
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
                    {/* Screenshot placeholder */}
                    <div className="flex-1 min-w-0 w-full">
                      <ScreenshotPlaceholder />
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-14">
              エンタープライズレベルのセキュリティ
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((t) => (
              <FadeIn key={t.title}>
                <div className="bg-white rounded-2xl border border-surface-200 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="h-12 w-12 rounded-xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
                    <t.icon className="h-6 w-6 text-neutral-600" />
                  </div>
                  <p className="text-sm font-medium text-neutral-700 leading-relaxed">
                    {t.title}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 7. Pricing ───────── */}
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
                        /人/月（税別）
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
                    href={`${APP_URL}/login`}
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

      {/* ───────── 8. FAQ ───────── */}
      <section className="py-20 sm:py-24 bg-surface-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-14">
              よくある質問
            </h2>
          </FadeIn>
          <FadeIn>
            <Accordion items={faqs} />
          </FadeIn>
        </div>
      </section>

      {/* ───────── 9. Final CTA ───────── */}
      <section className="py-20 sm:py-24 bg-primary-600">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              まず触ってみてください。
              <br />
              説明は不要です。
            </h2>
            <a
              href={`${APP_URL}/login`}
              className="inline-flex items-center gap-2 bg-white text-primary-700 rounded-xl px-8 py-4 font-bold text-base hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              1週間無料で試してみる
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-4 text-sm text-primary-100">
              1週間無料・クレジットカード不要
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
