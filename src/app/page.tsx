import {
  BrainCircuit,
  BarChart3,
  Home,
  FileText,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ScrollToPlanButton from "@/components/ScrollToPlanButton";

const APP_URL = "https://top-sales-ai.vercel.app";

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
    desc: "チラシや物件情報をそのまま貼り付けるだけで、AIが顧客・物件データを自動入力。入力作業を大幅に削減。",
  },
  {
    icon: BarChart3,
    title: "スマートマッチング",
    desc: "顧客の希望条件と物件情報をAIがスコアリング。最適な物件を瞬時に絞り込み、提案の質を高めます。",
  },
  {
    icon: Home,
    title: "物件・顧客管理",
    desc: "担当物件・一般物件をわかりやすく整理。顧客の活動履歴・タスク・書類を一元管理。",
  },
  {
    icon: FileText,
    title: "契約フェーズ管理",
    desc: "重要事項説明から決済まで、契約の進捗をステップごとに管理。精算計算書も自動作成。",
  },
  {
    icon: Users,
    title: "チーム対応",
    desc: "全プランでメンバーを招待可能。組織全体の顧客・物件情報を共有できます。",
  },
  {
    icon: Zap,
    title: "AI営業アシスト",
    desc: "メール文・電話トーク・提案文をAIが自動生成。経験の浅いスタッフでもトップ営業と同水準の提案が可能に。",
  },
];

const painPoints = [
  {
    emoji: "\u{1F629}",
    text: "物件入力や顧客管理に毎日何時間もかかっている",
  },
  {
    emoji: "\u{1F613}",
    text: "どの物件をどのお客様に提案すべきか迷ってしまう",
  },
  {
    emoji: "\u{1F630}",
    text: "メール文や電話トークの作成に自信がない",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-7 w-7 text-blue-400" />
            <span className="text-lg font-bold tracking-tight">
              楽マッチ AI
            </span>
          </div>
          <a
            href={`${APP_URL}/login`}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            ログイン
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-900 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            不動産営業に特化したAI CRM
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            営業の手間を、
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              AIで一気に解消。
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            顧客・物件の入力から提案・契約まで、
            <br className="hidden sm:block" />
            不動産営業のすべてをAIがサポートします。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${APP_URL}/login`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition-colors shadow-lg shadow-blue-600/25"
            >
              無料で試す
              <ArrowRight className="h-4 w-4" />
            </a>
            <ScrollToPlanButton className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-base transition-colors border border-slate-700">
              プランを見て始める
            </ScrollToPlanButton>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            こんな方に
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {painPoints.map((p, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 text-center"
              >
                <div className="text-4xl mb-4">{p.emoji}</div>
                <p className="text-slate-200 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            機能一覧
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            営業プロセスのあらゆる場面をカバーする機能を搭載
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            料金プラン
          </h2>
          <p className="text-slate-400 text-center mb-12">
            14日間の無料トライアル付き。いつでもキャンセル可能。
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border ${
                  plan.featured
                    ? "bg-slate-800 border-blue-500 ring-2 ring-blue-500/30"
                    : "bg-slate-800/60 border-slate-700/50"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-xs font-semibold">
                    おすすめ
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">
                  ストレージ {plan.storage}
                </p>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold">
                    &yen;{plan.price.toLocaleString()}
                  </span>
                  <span className="text-slate-400 text-sm ml-1">
                    /月（税別）
                  </span>
                </div>
                <p className="text-blue-400 text-sm mb-6">
                  初月 &yen;{plan.firstMonth.toLocaleString()}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href={`${APP_URL}/login`}
                  className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                    plan.featured
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                  }`}
                >
                  無料で始める
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <BrainCircuit className="h-5 w-5" />
            <span className="text-sm font-medium">楽マッチ AI</span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; 2026 楽マッチ AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
