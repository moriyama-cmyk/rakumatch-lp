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
  Shield,
  ChevronRight,
} from "lucide-react";
import ScrollToButton from "@/components/ScrollToPlanButton";

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
    desc: "物件情報の手入力、顧客データの転記、活動履歴の記録...。本来の営業活動に使うべき時間が事務作業に消えていませんか。",
  },
  {
    icon: TrendingUp,
    title: "提案の精度にバラつきがある",
    desc: "経験豊富な営業と新人で提案の質に差が出る。どの物件をどの顧客に提案すべきか、判断基準が属人化していませんか。",
  },
  {
    icon: Shield,
    title: "情報が散在して管理できない",
    desc: "Excel、メモ帳、メール...。顧客情報や物件資料がバラバラに保存され、チーム全体の状況が見えなくなっていませんか。",
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

const stats = [
  { value: "70%", label: "入力作業の削減" },
  { value: "2x", label: "提案スピードの向上" },
  { value: "5分", label: "で初期セットアップ完了" },
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* ───────── 1. Header ───────── */}
      <header className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <BrainCircuit className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-base font-semibold tracking-tight">
              楽マッチ AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`${APP_URL}/login`}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              ログイン
            </a>
            <a
              href={`${APP_URL}/login`}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium text-white transition-colors"
            >
              無料で試す
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ───────── 2. Hero ───────── */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/6 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
          <p className="inline-block px-3 py-1 mb-6 rounded-full text-xs font-medium tracking-wide uppercase text-blue-400 bg-blue-500/10 border border-blue-500/15">
            不動産営業に特化した AI CRM
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
            入力・提案・契約を
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400">
              ひとつの画面で。
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            物件チラシをドロップするだけで自動入力。
            <br className="hidden sm:block" />
            AIマッチングで最適な提案を、すべての営業に。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`${APP_URL}/login`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-lg shadow-blue-600/20"
            >
              14日間無料で始める
              <ArrowRight className="h-4 w-4" />
            </a>
            <ScrollToButton
              targetId="features"
              className="inline-flex items-center gap-1.5 px-7 py-3 rounded-lg text-slate-300 hover:text-white font-medium transition-colors"
            >
              機能を見る
              <ChevronRight className="h-4 w-4" />
            </ScrollToButton>
          </div>

          {/* Social proof numbers */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. Problem / Pain Points ───────── */}
      <section className="py-20 sm:py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-medium text-blue-400 mb-3 text-center tracking-wide uppercase">
            課題
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            こんなお悩みはありませんか？
          </h2>
          <p className="text-slate-500 text-center mb-14 max-w-lg mx-auto">
            多くの不動産営業チームが、同じ課題を抱えています。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-slate-900/80 border border-white/5 p-7"
              >
                <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center mb-5">
                  <p.icon className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="font-semibold text-base mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 4. Solution / How it works ───────── */}
      <section className="py-20 sm:py-24 bg-slate-900/40 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-medium text-blue-400 mb-3 text-center tracking-wide uppercase">
            使い方
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            3ステップで業務が変わる
          </h2>
          <p className="text-slate-500 text-center mb-14 max-w-lg mx-auto">
            複雑な初期設定は不要。すぐに使い始められます。
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] border-t border-dashed border-slate-700/60" />
                )}
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-600/10 border border-blue-500/15 mb-5">
                  <span className="text-xl font-bold text-blue-400">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. Features ───────── */}
      <section
        id="features"
        className="py-20 sm:py-24 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-medium text-blue-400 mb-3 text-center tracking-wide uppercase">
            機能
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            営業プロセスを、まるごとカバー
          </h2>
          <p className="text-slate-500 text-center mb-14 max-w-lg mx-auto">
            入力から提案、契約管理まで。必要な機能がすべて揃っています。
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl bg-slate-900/60 border border-white/5 p-6 hover:border-blue-500/20 transition-colors"
              >
                <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4 group-hover:bg-blue-600/15 transition-colors">
                  <f.icon className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-[15px] mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 6. Pricing ───────── */}
      <section
        id="plans"
        className="py-20 sm:py-24 bg-slate-900/40 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-medium text-blue-400 mb-3 text-center tracking-wide uppercase">
            料金
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            シンプルな料金体系
          </h2>
          <p className="text-slate-500 text-center mb-14">
            14日間の無料トライアル付き。いつでもキャンセル可能。
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-7 border transition-colors ${
                  plan.featured
                    ? "bg-slate-900 border-blue-500/40 ring-1 ring-blue-500/20"
                    : "bg-slate-900/60 border-white/5"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-[11px] font-semibold tracking-wide uppercase">
                    おすすめ
                  </div>
                )}
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-xs mb-5">
                  ストレージ {plan.storage}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold tracking-tight">
                    &yen;{plan.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-500">/月（税別）</span>
                </div>
                <p className="text-blue-400 text-xs mb-6">
                  初月 &yen;{plan.firstMonth.toLocaleString()}
                </p>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href={`${APP_URL}/login`}
                  className={`block text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    plan.featured
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-white/5 hover:bg-white/10 text-slate-300"
                  }`}
                >
                  無料で始める
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 7. FAQ ───────── */}
      <section className="py-20 sm:py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-medium text-blue-400 mb-3 text-center tracking-wide uppercase">
            よくある質問
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-14">
            FAQ
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl bg-slate-900/60 border border-white/5 p-6"
              >
                <h3 className="font-semibold text-[15px] mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 8. CTA ───────── */}
      <section className="py-20 sm:py-24 bg-slate-900/40 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            まずは14日間、無料で体験してください
          </h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            クレジットカード不要。5分で初期設定が完了します。
          </p>
          <a
            href={`${APP_URL}/login`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-lg shadow-blue-600/20"
          >
            無料トライアルを始める
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ───────── 9. Footer ───────── */}
      <footer className="py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-slate-500">
            <div className="h-6 w-6 rounded bg-slate-800 flex items-center justify-center">
              <BrainCircuit className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-medium">楽マッチ AI</span>
          </div>
          <p className="text-xs text-slate-600">
            &copy; 2026 楽マッチ AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
