import {
  BrainCircuit,
  BarChart3,
  Home,
  FileText,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Clock,
  TrendingUp,
  FolderOpen,
  ChevronRight,
} from "lucide-react";
import ScrollToButton from "@/components/ScrollToButton";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import Accordion from "@/components/Accordion";

const APP_URL = "https://top-sales-ai.vercel.app";

/* ---------- Data ---------- */

const plans = [
  {
    name: "Standard",
    price: 3000,
    firstMonth: 1500,
    storage: "250GB",
    featured: false,
    features: [
      "AIアシスタント搭載（Gemini 2.5）",
      "AI顧客・物件一括抽出",
      "マッチングスコア自動計算",
      "契約フェーズ・精算管理",
      "メンバー招待（人数課金）",
    ],
  },
  {
    name: "Premium",
    price: 5000,
    firstMonth: 2000,
    storage: "500GB",
    featured: true,
    features: [
      "高性能AIアシスタント搭載（Gemini 3）",
      "AI顧客・物件一括抽出",
      "マッチングスコア自動計算",
      "契約フェーズ・精算管理",
      "メンバー招待（人数課金）",
      "ストレージ 500GB",
    ],
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: "AI一括入力",
    desc: "チラシや物件資料をドラッグ&ドロップするだけ。AIが物件名・価格・間取りを自動で読み取り、データベースに登録します。",
  },
  {
    icon: BarChart3,
    title: "スマートマッチング",
    desc: "顧客の希望条件と物件情報をAIが自動スコアリング。最適な提案候補を瞬時にリストアップします。",
  },
  {
    icon: Home,
    title: "物件・顧客管理",
    desc: "担当物件と一般物件をタブで整理。顧客ごとの活動履歴・タスク・書類をひとつの画面で確認できます。",
  },
  {
    icon: FileText,
    title: "契約フェーズ管理",
    desc: "重要事項説明から決済完了まで、契約の進捗をステップごとに管理。精算計算書もワンクリックで作成。",
  },
  {
    icon: Users,
    title: "チーム連携",
    desc: "メンバーを招待して組織全体で顧客・物件情報を共有。担当者の自動アサインやフリー顧客の引き取りにも対応。",
  },
  {
    icon: Zap,
    title: "AI営業アシスト",
    desc: "メール文面・電話トーク・物件提案文をAIが下書き。経験の浅いスタッフでもベテラン水準の提案が可能に。",
  },
];

const problems = [
  {
    icon: Clock,
    title: "入力に時間がかかりすぎる",
    desc: "物件情報の手入力、顧客データの転記、活動履歴の記録。本来の営業活動に使うべき時間が事務作業に消えていませんか。",
  },
  {
    icon: TrendingUp,
    title: "提案の精度にバラつきがある",
    desc: "経験豊富な営業と新人で提案の質に差が出る。どの物件をどの顧客に提案すべきか、判断基準が属人化していませんか。",
  },
  {
    icon: FolderOpen,
    title: "情報が散在して管理できない",
    desc: "Excel、メモ帳、メール。顧客情報や物件資料がバラバラに保存され、チーム全体の状況が見えなくなっていませんか。",
  },
];

const steps = [
  {
    num: "01",
    title: "資料をドロップ",
    desc: "チラシやPDFをドラッグ&ドロップ。AIが物件・顧客情報を自動抽出します。",
  },
  {
    num: "02",
    title: "AIがマッチング",
    desc: "登録された情報をもとに、各顧客に最適な物件をスコア付きで提案。",
  },
  {
    num: "03",
    title: "提案・契約まで一気通貫",
    desc: "メール作成、電話トーク、契約管理、精算まで。すべてひとつの画面で完結します。",
  },
];

const faqs = [
  {
    q: "無料トライアル中に料金は発生しますか？",
    a: "いいえ。14日間のトライアル期間中は完全無料です。クレジットカードの登録も不要でお試しいただけます。",
  },
  {
    q: "途中でプランを変更できますか？",
    a: "はい。Standard から Premium への変更、またはその逆もいつでも可能です。変更は次の請求サイクルから適用されます。",
  },
  {
    q: "データのセキュリティは大丈夫ですか？",
    a: "全データはSupabase上で暗号化して保管。行レベルセキュリティ（RLS）により、組織外のユーザーからはアクセスできません。",
  },
  {
    q: "何人まで利用できますか？",
    a: "人数制限はありません。メンバー1名ごとの課金制なので、チームの規模に合わせて柔軟にご利用いただけます。",
  },
];

/* ---------- Page ---------- */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-50 text-neutral-900">
      {/* ───────── 1. Header ───────── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <BrainCircuit className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-neutral-900">
              楽マッチ AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`${APP_URL}/login`}
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              ログイン
            </a>
            <a
              href={`${APP_URL}/login`}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-sm font-medium text-white transition-colors"
            >
              無料で試す
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ───────── 2. Hero ───────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-20 sm:pt-28 sm:pb-28 text-center">
          <p className="inline-block px-3.5 py-1 mb-6 rounded-full text-xs font-semibold tracking-wide text-primary-700 bg-primary-50 border border-primary-100">
            不動産売買に特化した AI 営業支援ツール
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-neutral-900">
            新人が、即戦力に変わる。
          </h1>
          <p className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
              不動産売買専用の反則級AI。
            </span>
          </p>
          <p className="mt-6 text-lg text-neutral-500 max-w-xl mx-auto leading-relaxed">
            コピペだけで物件登録。AIが自動マッチング。
            <br className="hidden sm:block" />
            提案もヒアリングもAIがサポート。月3,000円から。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`${APP_URL}/login`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors shadow-lg shadow-primary-500/20"
            >
              14日間無料で始める
              <ArrowRight className="h-4 w-4" />
            </a>
            <ScrollToButton
              targetId="features"
              className="inline-flex items-center gap-1.5 px-7 py-3 rounded-lg text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
            >
              機能を見る
              <ChevronRight className="h-4 w-4" />
            </ScrollToButton>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-neutral-900">
                <CountUp end={70} suffix="%" />
              </p>
              <p className="mt-1 text-xs text-neutral-400">入力作業の削減</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-neutral-900">
                <CountUp end={2} suffix="x" />
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                提案スピード向上
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-neutral-900">
                <CountUp end={5} suffix="分" />
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                で初期セットアップ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 3. Problem / Pain Points ───────── */}
      <section className="py-20 sm:py-24 bg-surface-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold text-primary-600 mb-3 text-center tracking-wide">
              課題
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-neutral-900">
              こんなお悩みはありませんか？
            </h2>
            <p className="text-neutral-500 text-center mb-14 max-w-lg mx-auto">
              多くの不動産営業チームが、同じ課題を抱えています。
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((p) => (
              <FadeIn key={p.title}>
                <div className="rounded-2xl bg-white border border-surface-200 p-7 h-full">
                  <div className="h-10 w-10 rounded-xl bg-surface-100 flex items-center justify-center mb-5">
                    <p.icon className="h-5 w-5 text-neutral-500" />
                  </div>
                  <h3 className="font-semibold text-base mb-2 text-neutral-900">
                    {p.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 4. Solution / How it works ───────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold text-primary-600 mb-3 text-center tracking-wide">
              使い方
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-neutral-900">
              3ステップで業務が変わる
            </h2>
            <p className="text-neutral-500 text-center mb-14 max-w-lg mx-auto">
              複雑な初期設定は不要。すぐに使い始められます。
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <FadeIn key={s.num}>
                <div className="relative text-center">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] border-t border-dashed border-surface-200" />
                  )}
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-50 border border-primary-100 mb-5">
                    <span className="text-xl font-bold text-primary-600">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base mb-2 text-neutral-900">
                    {s.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed max-w-xs mx-auto">
                    {s.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. Features ───────── */}
      <section id="features" className="py-20 sm:py-24 bg-surface-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold text-primary-600 mb-3 text-center tracking-wide">
              機能
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-neutral-900">
              営業プロセスを、まるごとカバー
            </h2>
            <p className="text-neutral-500 text-center mb-14 max-w-lg mx-auto">
              入力から提案、契約管理まで。必要な機能がすべて揃っています。
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <FadeIn key={f.title}>
                <div className="group rounded-2xl bg-white border border-surface-200 p-6 hover:border-primary-200 hover:shadow-sm transition-all h-full">
                  <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                    <f.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-[15px] mb-2 text-neutral-900">
                    {f.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 6. Pricing ───────── */}
      <section id="plans" className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold text-primary-600 mb-3 text-center tracking-wide">
              料金
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-neutral-900">
              シンプルな料金体系
            </h2>
            <p className="text-neutral-500 text-center mb-14">
              14日間の無料トライアル付き。いつでもキャンセル可能。
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {plans.map((plan) => (
              <FadeIn key={plan.name}>
                <div
                  className={`relative rounded-2xl p-7 border transition-all h-full ${
                    plan.featured
                      ? "bg-white border-primary-300 ring-2 ring-primary-100 shadow-md"
                      : "bg-white border-surface-200"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary-500 text-[11px] font-semibold tracking-wide text-white">
                      おすすめ
                    </div>
                  )}
                  <h3 className="text-lg font-bold mb-1 text-neutral-900">
                    {plan.name}
                  </h3>
                  <p className="text-neutral-400 text-xs mb-5">
                    ストレージ {plan.storage}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold tracking-tight text-neutral-900">
                      &yen;{plan.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-neutral-400">
                      /月（税別）
                    </span>
                  </div>
                  <p className="text-primary-600 text-xs font-medium mb-6">
                    初月 &yen;{plan.firstMonth.toLocaleString()}
                  </p>
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
                    className={`block text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      plan.featured
                        ? "bg-primary-500 hover:bg-primary-600 text-white"
                        : "bg-surface-100 hover:bg-surface-200 text-neutral-700"
                    }`}
                  >
                    無料で始める
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 7. FAQ ───────── */}
      <section className="py-20 sm:py-24 bg-surface-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold text-primary-600 mb-3 text-center tracking-wide">
              よくある質問
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-14 text-neutral-900">
              FAQ
            </h2>
          </FadeIn>
          <FadeIn>
            <Accordion items={faqs} />
          </FadeIn>
        </div>
      </section>

      {/* ───────── 8. CTA ───────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-neutral-900">
              まずは14日間、無料で体験してください
            </h2>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
              クレジットカード不要。5分で初期設定が完了します。
            </p>
            <a
              href={`${APP_URL}/login`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors shadow-lg shadow-primary-500/20"
            >
              無料トライアルを始める
              <ArrowRight className="h-4 w-4" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ───────── 9. Footer ───────── */}
      <footer className="py-10 border-t border-surface-200 bg-surface-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-neutral-400">
            <div className="h-6 w-6 rounded bg-surface-200 flex items-center justify-center">
              <BrainCircuit className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-medium">楽マッチ AI</span>
          </div>
          <p className="text-xs text-neutral-400">
            &copy; 2026 楽マッチ AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
