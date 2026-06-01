import Image from "next/image";
import Link from "next/link";
import VideoModal from "@/components/VideoModal";
import {
  ArrowRight,
  ClipboardList,
  Search,
  UserPlus,
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
  Smartphone,
  Star,
  Eye,
  Bell,
  Phone,
  FileText,
  ScrollText,
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
    text: "同じ物件を、SUUMO・レインズ・Excelに何度も手入力している",
    cost: "1物件を何媒体にも転記。その時間が毎日積み上がる",
  },
  {
    icon: Search,
    text: "どの顧客にどの物件を提案すべきか迷う",
    cost: "提案遅れで月2〜3件の機会損失 ※自社利用に基づく試算",
  },
  {
    icon: UserPlus,
    text: "メール・電話の準備で営業時間が削られる",
    cost: "1日1時間 = 年間250時間のムダ ※自社利用に基づく試算",
  },
];

/* お客様連動アプリ（堀）の要点 */
const customerAppPoints = [
  {
    icon: Smartphone,
    text: "SUUMO・HOME'Sなどで見つけた物件を、共有ボタンから1タップで保存",
  },
  {
    icon: Star,
    text: "星評価・メモ・「内見したい」がそのまま担当者に届く",
  },
  {
    icon: Eye,
    text: "3件以上たまると、お客様の傾向をAIがまとめて提示",
  },
  {
    icon: Bell,
    text: "保存した物件が掲載終了していないかも自動でチェック",
  },
];

/* 通話録音の要点 */
const callRecordingPoints = [
  "録音 → AIが文字起こし → 自動で要約・タイトル付け",
  "長い通話も自動で小分け処理。無音はスキップ",
  "「お客様に何を聞くべきか」のAI質問テンプレを画面に常設",
];

const zigzagFeatures = [
  {
    icon: Upload,
    title: "コピペも、PDFも、画像も。貼るだけで物件登録。",
    desc: "レインズの詳細画面をCtrl+Aで全コピー、貼り付けるだけでAIが項目に自動入力。チラシ・マイソクはPDFや画像のまま投げ込めばOK。Excelでもどんな媒体でも、ページ丸ごと貼ればAIが下書きします。最後はワンクリックで手直しできます。",
    badge: "入力時間90%削減 ※自社利用に基づく試算",
    videoSrc: "/reins-bulk.mp4",
    detailHref: "/features/property-input",
    detailLabel: "コピペ物件登録・契約管理を詳しく",
  },
  {
    icon: GitCompare,
    title: "物件からも、顧客からも。逆引きマッチング。",
    desc: "お客様の希望を登録すれば合う物件をスコア順に。逆に物件を開けば「これを買いそうな/借りそうなお客様」が点数順にズラッと。新着物件を誰に当てるか、一瞬で分かります。売買・賃貸でそれぞれ専用のロジック、投資・買取にも対応。",
    badge: "提案の遅れによる取りこぼしを防ぐ",
    imageSrc: "/feature-matching.png",
    detailHref: "/features/matching",
    detailLabel: "AIマッチング・逆引きを詳しく",
  },
  {
    icon: MessageSquare,
    title: "顧客1人1人に、専属AIがつく。",
    desc: "顧客ごとにAIが条件・履歴を分析し、「次に何をすべきか」「どうヒアリングすべきか」「この物件のどこがこのお客様に刺さるか」を提示。メール文も電話の要点も自動で下書き。ヒアリングの抜けは「なぜ聞くのか・プロはどう聞くか」付きで教えてくれるので、新人教育も兼ねます。",
    badge: "メール作成5秒 ※自社利用に基づく試算",
    imageSrc: "/feature-ai-assistant.png",
    detailHref: null,
    detailLabel: null,
  },
  {
    icon: CheckSquare,
    title: "契約フェーズも、精算も、書類も。全部ここに。",
    desc: "売買の契約フェーズ（事前審査→契約→本審査→金消→決済）をTODO・必要書類つきで管理。固都税・管理費の日割り精算も、書類のスクショを貼ればAIが自動入力。図面・重説PDFは顧客ページに保存できて、漏れがありません。",
    badge: "精算計算書も自動作成",
    imageSrc: "/feature-contract.png",
    detailHref: "/features/property-input",
    detailLabel: "物件登録・契約管理を詳しく",
  },
];

const trustPoints = [
  { icon: Brain, title: "Google AI（Gemini）搭載", desc: "世界最先端のAIエンジン" },
  { icon: Database, title: "Amazon Web Services", desc: "世界最大級のクラウド基盤" },
  { icon: CreditCard, title: "Stripe決済", desc: "世界135カ国以上で利用される決済インフラ" },
  { icon: Shield, title: "通信・データは暗号化", desc: "決済情報を弊社サーバーで保持しません" },
];

const plans = [
  {
    name: "スタンダード",
    price: 3000,
    firstMonth: 1500,
    storage: "250GB",
    featured: false,
    features: [
      "AIアシスタント（提案・メール・電話・マッチング・抽出）",
      "AI一括抽出（コピペ・PDF・画像）",
      "逆引きマッチング",
      "契約・精算・書類管理",
      "お客様連動アプリ",
      "メンバー招待（人数分課金）",
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
      "スタンダードの全機能（AIの種類・性能は同じ）",
      "AI利用枠が大きい（AIをたくさん使う事務所向け）",
      "500GBストレージ",
    ],
  },
];

const faqs = [
  {
    q: "無料トライアル中に解約できますか？",
    a: "はい、1週間以内に解約すれば料金はかかりません。",
  },
  {
    q: "他のCRMからデータ移行できますか？",
    a: "Excelやどんな媒体でも、コピペするだけでAIが下書きを作り、ワンクリックで登録できます。",
  },
  {
    q: "1人でも使えますか？",
    a: "はい。個人の営業の方も同じ料金（¥3,000/人・税込）で、自分の顧客・物件・追客をまるごと管理できます。会社で使う場合は、オーナーが全体を見ながら、担当者ごとに情報を分けて運用できます。",
  },
  {
    q: "賃貸でも使えますか？",
    a: "楽マッチAIは売買仲介に全振りして設計しているので、売買の業務フローに合わせた作りです。賃貸にも対応（業態モードの切替）しており、売買・賃貸を兼業されている事務所でもお使いいただけます。賃貸メインでのご利用はまずご相談ください。",
  },
  {
    q: "セキュリティは大丈夫ですか？",
    a: "自社で大手と同等のセキュリティを構築するのはほぼ不可能です。楽マッチAIは、AWS・Google Cloud・Stripeなど、世界中の大企業や銀行が採用するインフラ上で稼働しています。お客様のデータや決済情報を弊社サーバーで保持することはありません。",
  },
  {
    q: "SUUMOやレインズとAPI契約が必要ですか？",
    a: "いいえ。物件情報はページをコピペするか、PDF・画像を投げ込むだけで登録できます。外部サービスとの連携契約や設定は不要で、導入したその日から使えます。",
  },
  {
    q: "スマホでも使えますか？",
    a: "はい。ブラウザで動くので、スマホ・タブレット・PCのどれでも使えます。お客様連動アプリはスマホのホームに追加すればアプリのように使えます（iPhone・Android対応）。",
  },
  {
    q: "メンバーが増減したら料金はどうなりますか？",
    a: "人数分の課金です。メンバーを招待すると枠が1つ増え、削除すると1つ減るよう自動で連動します。使わない分を払い続けることはありません。",
  },
  {
    q: "お客様連動アプリは何ができますか？",
    a: "お客様がSUUMOなどで見つけた物件を1タップで保存でき、星評価・メモ・内見希望がそのまま担当者に届きます。お客様の傾向もAIがまとめます。詳しくは「お客様連動アプリ」のページをご覧ください。",
  },
  {
    q: "スタンダードとプレミアムの違いは？",
    a: "使えるAI機能・AIの性能は同じです。違いは1ヶ月のAI利用枠の大きさと保存容量（250GB/500GB）です。AIをたくさん使う事務所はプレミアムが向いています。",
  },
  {
    q: "個人でも会社（チーム）でも使えますか？",
    a: "はい。一人の営業の方は自分の顧客を自分で管理でき、会社なら全体を見ながら担当者ごとに分けて運用できます。オーナーは全顧客を、担当者は自分の担当のお客様を確認できます（会社間・担当者間のデータは分離されます）。料金は個人でも企業でも¥3,000/人（税込）です。",
  },
];

/* ---------- Page ---------- */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-50 text-ink-900">
      <Header />

      {/* ───────── 1. Hero（E案） ───────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 text-sm font-medium px-3 py-1 border border-primary-100">
                不動産売買特化のAI営業CRM
              </span>
              <span className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 text-sm font-medium px-3 py-1 border border-primary-100">
                コピペ &amp; PDFで登録／契約も連携設定も不要
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-ink-900 break-keep">
              入社初日の新人が、
              <br className="hidden sm:block" />
              トップ営業の&ldquo;動き&rdquo;をする。
            </h1>
            <p className="mt-3 text-sm font-semibold tracking-wider text-primary-600">
              トップセールスには、仕組みがある。
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink-700 max-w-2xl mx-auto">
              物件はコピペ・PDFで登録。AIが顧客と逆引きマッチングし、提案も追客もヒアリングも用意。お客様専用アプリまで連動。個人でも企業でも月3,000円/人。
            </p>
            <p className="mt-4 inline-block text-sm font-medium text-primary-700 bg-primary-50/60 rounded-lg px-4 py-1.5">
              導入費0円 ／ 個人でも企業でも月3,000円/人（税込）
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-500 max-w-xl mx-auto">
              <span className="font-semibold text-ink-700">個人でも会社でも、1本で。</span>
              個人なら自分の顧客を自分で管理。会社なら全体を見ながら、担当者ごとに分けて運用できます。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`${APP_URL}/try`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-primary-600 hover:shadow-md hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 motion-reduce:transition-none motion-reduce:hover:scale-100 break-keep"
              >
                1週間無料で試してみる
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`${APP_URL}/login`}
                className="inline-flex items-center gap-2 rounded-xl border border-surface-200 bg-white px-6 py-3.5 text-base font-semibold text-ink-900 transition hover:border-primary-300 hover:text-primary-600 break-keep"
              >
                ログインはこちら
              </a>
            </div>
            <p className="mt-3 text-sm text-ink-500">
              30秒で登録完了・1週間無料トライアル・いつでも解約可能
            </p>
          </div>

          {/* H1直下のベネフィット3点 */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              {
                icon: Upload,
                title: "コピペ & PDFで多重入力ゼロ",
                desc: "同じ物件を3媒体に手入力するムダをなくす",
              },
              {
                icon: GitCompare,
                title: "逆引きマッチングで属人化を解消",
                desc: "物件を開けば「買いそうなお客様」が点数順に",
              },
              {
                icon: Brain,
                title: "専属AIで新人を即戦力化",
                desc: "ヒアリング・提案・追客の“動き”をAIが用意",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-surface-200 bg-white/70 p-5 text-left"
              >
                <div className="size-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                  <b.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-ink-900 leading-snug">
                  {b.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Product device mockup */}
          <div className="mt-14 max-w-4xl mx-auto">
            <DeviceMockup
              desktopSrc="/lp-desktop.jpg"
              mobileSrc="/lp-mobile.jpg"
            />
            <p className="mt-4 text-center text-sm text-ink-500">
              ※ 画面はデモ画面です。
            </p>
          </div>
        </div>
      </section>

      {/* ───────── 2. Stats bar（※自社試算 注記） ───────── */}
      <section className="py-20 sm:py-28 bg-surface-50 border-y border-surface-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-3 gap-8 divide-x divide-surface-200">
            {stats.map((s) => (
              <FadeIn key={s.label} className="text-center px-2">
                <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-600 tracking-tight tabular-nums">
                  <CountUp end={s.end} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-ink-700">{s.label}</p>
              </FadeIn>
            ))}
          </div>
          <p className="mt-8 text-center text-sm leading-relaxed text-ink-500">
            ※ いずれも自社利用に基づく試算です。
          </p>
        </div>
      </section>

      {/* ───────── 3. 社会的証明（開発者ストーリー内包） ───────── */}
      <section className="py-20 sm:py-28 lg:py-32 bg-surface-100">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <p className="text-sm font-semibold tracking-wider text-primary-600 text-center">
              WHO WE ARE
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900 break-keep text-center">
              現役の不動産営業マンが、
              <br className="hidden sm:block" />
              自分のために作りました。
            </h2>
            <div className="mt-12 lg:mt-16 bg-white rounded-2xl border border-surface-200 p-8 lg:p-10">
              <div className="border-l-4 border-primary-400 pl-6">
                <p className="text-base leading-relaxed text-ink-700">
                  東京で不動産売買をやっている、現役の営業マンです。
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-700">
                  「もっと楽に、もっとわかりやすく、誰がやってもできるツール」を追い求めて作りました。
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-700">
                  説明は不要です。使えば直感的にわかります。必要最低限を、ぎゅっと詰め込みました。
                </p>
                <p className="mt-4 text-base font-semibold leading-relaxed text-primary-700">
                  AIが進化するたびに、このアプリも進化します。あなたの営業トークも、提案も、一緒に進化し続けます。
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ink-500 text-center">
              これは投資家やエンジニアが机上で作ったツールではありません。現場の不便を1つずつ潰して作った、現場のための道具です。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────── 4. 課題（Pain） ───────── */}
      <section className="py-20 sm:py-28 lg:py-32 bg-surface-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-wider text-primary-600">
                PROBLEM
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900 break-keep">
                不動産営業、こんなお悩みありませんか？
              </h2>
            </div>
          </FadeIn>
          <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {painPoints.map((p) => (
              <FadeIn key={p.text}>
                <div className="group rounded-2xl border border-surface-200 bg-white p-6 lg:p-8 transition hover:border-primary-200 hover:shadow-[0_8px_30px_rgba(13,124,102,0.06)] h-full">
                  <div className="size-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <p className="text-base leading-relaxed font-semibold text-ink-900">
                    {p.text}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-red-500 font-medium">
                    {p.cost}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. 堀＝お客様連動アプリ（最優先） ───────── */}
      <section id="customer-app" className="py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
            {/* Text */}
            <FadeIn>
              <p className="text-sm font-semibold tracking-wider text-primary-600">
                お客様連動アプリ
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900 break-keep">
                お客様が見つけた物件が、
                <br className="hidden sm:block" />
                担当者に集まる。
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-700 max-w-2xl">
                ふつうのCRMは「担当者→お客様」へ物件を送る一方向。楽マッチは逆。お客様が自分で見つけた物件が、担当者のもとに自動で集まります。お客様の好みや検討状況が、こちら側に貯まっていく仕組みです。
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-700 max-w-2xl">
                担当者がお客様にリンクを送るだけ。お客様はログイン不要で、スマホのホームに追加すればアプリのように使えます。
              </p>

              <ul className="mt-8 space-y-3">
                {customerAppPoints.map((pt) => (
                  <li key={pt.text} className="flex items-start gap-3">
                    <span className="mt-0.5 size-7 shrink-0 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                      <pt.icon className="h-4 w-4" />
                    </span>
                    <span className="text-base leading-relaxed text-ink-700">
                      {pt.text}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm leading-relaxed text-ink-500">
                お客様が見つけた物件が担当者に集まる&ldquo;逆方向&rdquo;の仕組みは、他にあまり見られません。
              </p>

              <Link
                href="/features/customer-app"
                className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary-600 transition hover:text-primary-700"
              >
                お客様連動アプリを詳しく見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeIn>

            {/* 逆方向フロー図（SVG内製） */}
            <FadeIn>
              <div className="relative">
                <div className="absolute inset-0 bg-primary-50 rounded-full blur-3xl opacity-50" />
                <div className="relative rounded-2xl border border-surface-200 bg-white p-4 sm:p-8 shadow-[0_8px_30px_rgba(13,124,102,0.06)]">
                  <div className="flex items-center justify-between gap-1.5 sm:gap-4">
                    {/* お客様スマホ */}
                    <div className="flex flex-col items-center text-center w-16 sm:w-28">
                      <div className="size-11 sm:size-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 sm:h-7 sm:w-7" />
                      </div>
                      <p className="mt-3 text-xs sm:text-sm font-semibold text-ink-900">
                        お客様のスマホ
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-500">
                        物件を保存・星・メモ・内見希望
                      </p>
                    </div>

                    {/* 逆方向の矢印 */}
                    <div className="flex-1 min-w-0 flex flex-col items-center">
                      <svg
                        viewBox="0 0 120 40"
                        className="w-full h-10"
                        aria-hidden="true"
                      >
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="8"
                            markerHeight="8"
                            refX="6"
                            refY="3"
                            orient="auto"
                          >
                            <path d="M0,0 L6,3 L0,6 Z" fill="#33AF87" />
                          </marker>
                        </defs>
                        <line
                          x1="6"
                          y1="20"
                          x2="108"
                          y2="20"
                          stroke="#33AF87"
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                        />
                      </svg>
                      <p className="mt-1 text-xs font-medium text-primary-600">
                        反応が逆流
                      </p>
                    </div>

                    {/* 担当者 */}
                    <div className="flex flex-col items-center text-center w-16 sm:w-28">
                      <div className="size-11 sm:size-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
                        <Database className="h-5 w-5 sm:h-7 sm:w-7" />
                      </div>
                      <p className="mt-3 text-xs sm:text-sm font-semibold text-ink-900">
                        担当者のCRM
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-500">
                        顧客ニーズが明確にわかる
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 rounded-xl bg-surface-50 border border-surface-200 p-4">
                    <p className="text-sm leading-relaxed text-ink-700">
                      <span className="font-semibold text-ink-900">
                        集めた物件から傾向が見える
                      </span>
                      。自分でも気づかない検討ポイントや注意点を、AIが教えます。
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───────── 6. 主要機能（zig-zag） ───────── */}
      <section id="features" className="py-20 sm:py-28 lg:py-32 bg-surface-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-wider text-primary-600">
                FEATURES
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900 break-keep">
                不動産AI営業CRM「楽マッチ AI」の機能
              </h2>
            </div>
          </FadeIn>

          <div className="mt-12 lg:mt-16 space-y-20 lg:space-y-28">
            {zigzagFeatures.map((f, i) => {
              const isEven = i % 2 === 0;
              return (
                <FadeIn key={f.title}>
                  <div
                    className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-center`}
                  >
                    {/* Text */}
                    <div className="flex-1 min-w-0 max-w-xl">
                      <div className="size-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
                        <f.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold leading-snug text-ink-900 break-keep mb-3">
                        {f.title}
                      </h3>
                      <p className="text-base leading-relaxed text-ink-700 mb-4">
                        {f.desc}
                      </p>
                      <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                        {f.badge}
                      </span>
                      {f.detailHref && (
                        <div className="mt-5">
                          <Link
                            href={f.detailHref}
                            className="inline-flex items-center gap-2 text-base font-semibold text-primary-600 transition hover:text-primary-700"
                          >
                            {f.detailLabel}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                    {/* Screenshot / Video */}
                    <div className="flex-1 min-w-0 w-full">
                      {f.videoSrc ? (
                        <VideoModal
                          src={f.videoSrc}
                          className="w-full rounded-2xl ring-1 ring-surface-200 shadow-[0_20px_60px_rgba(5,57,43,0.12)]"
                        />
                      ) : f.imageSrc ? (
                        <Image
                          src={f.imageSrc}
                          alt={`${f.title}（デモ画面）`}
                          width={700}
                          height={440}
                          sizes="(max-width: 1024px) 100vw, 600px"
                          className="w-full rounded-2xl ring-1 ring-surface-200 shadow-[0_20px_60px_rgba(5,57,43,0.12)]"
                        />
                      ) : null}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── 7. 通話録音・要約・記録（新設） ───────── */}
      <section id="call-recording" className="py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
            <FadeIn>
              <p className="text-sm font-semibold tracking-wider text-primary-600">
                通話録音・要約・記録
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900 break-keep">
                電話の内容を、AIが文字起こし・要約。
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-700 max-w-2xl">
                お客様との通話をその場で録音。AIが文字起こしして要点を要約し、活動履歴に残します。「言った言わない」も、聞き漏らしも防げます。
              </p>

              <ul className="mt-8 space-y-3">
                {callRecordingPoints.map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
                    <span className="text-base leading-relaxed text-ink-700">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/features/call-recording"
                className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary-600 transition hover:text-primary-700"
              >
                通話録音・要約を詳しく見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeIn>

            {/* 録音→要約フロー（カード） */}
            <FadeIn>
              <div className="rounded-2xl border border-surface-200 bg-surface-50 p-8">
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "通話を録音", sub: "顧客ページでワンタップ" },
                    { icon: FileText, label: "AIが文字起こし", sub: "長い通話も自動で小分け処理" },
                    { icon: ScrollText, label: "要約して履歴に記録", sub: "タイトルも自動で付く" },
                  ].map((step, idx) => (
                    <div key={step.label}>
                      <div className="flex items-center gap-4 rounded-xl border border-surface-200 bg-white p-4">
                        <span className="size-11 shrink-0 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                          <step.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink-900">
                            {step.label}
                          </p>
                          <p className="text-sm text-ink-500">{step.sub}</p>
                        </div>
                      </div>
                      {idx < 2 && (
                        <div className="flex justify-center py-1">
                          <ArrowRight className="h-4 w-4 rotate-90 text-primary-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───────── 8. Comparison（比較表） ───────── */}
      <section id="comparison" className="py-20 sm:py-28 lg:py-32 bg-surface-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-wider text-primary-600">
                COMPARISON
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900 break-keep">
                他社と比べてください。
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-700">
                不動産CRM市場の主要サービスとの比較
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            {/* TODO: 森山さん確認 — 競合価格の断定は景表法リスクのため安全側で実装。
                KASIKA のみ社名＋具体額で対比（出典 cocolive.co.jp・2026-05-30）。
                いえらぶ/Facilo/ノマド/Digima/PropoCloud 等は価格非公開 or 未裏取りのため断定せず
                「一般的な不動産CRM」の一般化列でまとめる（社名・価格の断定は出典裏取り後に差し替え）。 */}
            <div className="mt-12 lg:mt-16 overflow-x-auto rounded-2xl border border-surface-200 shadow-sm bg-white">
              <table className="w-full text-sm text-left min-w-[720px]">
                <thead>
                  <tr className="border-b border-surface-200 bg-surface-50">
                    <th className="px-5 py-4 font-semibold text-ink-700">比較項目</th>
                    <th className="px-5 py-4 font-semibold text-ink-700">
                      KASIKA
                    </th>
                    <th className="px-5 py-4 font-semibold text-ink-700">
                      一般的な不動産CRM
                    </th>
                    <th className="px-5 py-4 font-semibold text-ink-700">
                      Excel・手作業
                    </th>
                    <th className="px-5 py-4 font-semibold text-primary-700">
                      楽マッチ AI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "初期費用",
                      kasika: "70,000円〜",
                      crm: "数万〜数十万円のことも",
                      excel: "0円",
                      raku: "0円",
                    },
                    {
                      label: "月額",
                      kasika: "60,000円〜",
                      crm: "要問い合わせが多い",
                      excel: "—",
                      raku: "3,000円/人（税込）",
                    },
                    {
                      label: "個人・1人での利用",
                      kasika: "要問い合わせ",
                      crm: "最低人数の縛りがあることも",
                      excel: "可（手作業）",
                      raku: "可（1人から同一料金）",
                    },
                    {
                      label: "お客様連動アプリ",
                      kasika: "—",
                      crm: "限定的",
                      excel: "なし",
                      raku: "あり",
                    },
                    {
                      label: "逆引きマッチング",
                      kasika: "—",
                      crm: "限定的",
                      excel: "なし",
                      raku: "あり（売買・賃貸で別ロジック）",
                    },
                    {
                      label: "通話録音・要約AI",
                      kasika: "—",
                      crm: "サービスにより異なる",
                      excel: "なし",
                      raku: "あり",
                    },
                    {
                      label: "コピペ・PDF登録",
                      kasika: "サービスにより異なる",
                      crm: "サービスにより異なる",
                      excel: "手入力",
                      raku: "あり",
                    },
                    {
                      label: "導入",
                      kasika: "要問い合わせ",
                      crm: "要問い合わせが多い",
                      excel: "—",
                      raku: "即日・セルフ",
                    },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-surface-200">
                      <td className="px-5 py-4 font-medium text-ink-900">
                        {row.label}
                      </td>
                      <td className="px-5 py-4 text-ink-700">{row.kasika}</td>
                      <td className="px-5 py-4 text-ink-700">{row.crm}</td>
                      <td className="px-5 py-4 text-ink-700">{row.excel}</td>
                      <td className="px-5 py-4 font-semibold text-primary-600 bg-primary-50">
                        {row.raku}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-sm leading-relaxed text-ink-500">
              ※ KASIKA の価格は公開情報（cocolive.co.jp・2026年5月時点／不動産売買仲介向け）に基づく一例です。「一般的な不動産CRM」は各社公開情報に基づく一般化で、価格・仕様は各社・プランにより異なります。最新情報は各社公式サイトをご確認ください。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────── 9. 信頼補強（信頼/セキュリティ＋AI進化） ───────── */}
      <section className="py-20 sm:py-28 lg:py-32 bg-surface-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-wider text-primary-600">
                TRUST &amp; SECURITY
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900 break-keep">
                大手テック企業のインフラで守る。
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-700">
                自社で大手企業レベルのセキュリティを実現するのは、ほぼ不可能です。楽マッチAIは、Google・Amazon・Stripeという世界最大級のインフラ上で稼働。お客様のデータや決済情報を弊社サーバーで保持することはありません。
              </p>
            </div>
          </FadeIn>
          <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((t) => (
              <FadeIn key={t.title}>
                <div className="rounded-2xl border border-surface-200 bg-white p-6 text-center h-full">
                  <div className="size-12 rounded-xl bg-surface-100 text-ink-700 flex items-center justify-center mx-auto mb-4">
                    <t.icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-ink-900">{t.title}</p>
                  <p className="text-sm text-ink-500 mt-1">{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* AI進化（ミニ band） */}
          <FadeIn>
            <div className="mt-12 lg:mt-16 max-w-3xl mx-auto flex items-start gap-4 rounded-2xl border border-surface-200 bg-white p-6 lg:p-8">
              <div className="size-12 shrink-0 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold leading-snug text-ink-900 break-keep">
                  AIが進化するたびに、あなたの営業力も進化する。
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-700">
                  楽マッチAIは、最新世代のAIモデルを採用しています。使い続けるだけで、提案・ヒアリング・マッチングの&ldquo;動き&rdquo;が新しいAIに合わせて更新されていきます。
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────── 9.5 利用形態（個人 / 会社＋担当者分離） ───────── */}
      <section id="usage" className="py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-wider text-primary-600">
                USAGE
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900 break-keep">
                個人でも、会社でも。あなたの使い方で。
              </h2>
            </div>
          </FadeIn>

          <div className="mt-12 lg:mt-16 grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* 個人 */}
            <FadeIn>
              <div className="rounded-2xl border border-surface-200 bg-surface-50 p-6 lg:p-8 h-full">
                <div className="size-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
                  <UserPlus className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold leading-snug text-ink-900 break-keep">
                  個人で、自分の顧客を管理
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-700">
                  一人でも、自分の顧客・物件・追客をまるごと管理。チームに見せたくない案件も、自分の手元で。
                </p>
              </div>
            </FadeIn>

            {/* 会社 */}
            <FadeIn>
              <div className="rounded-2xl border border-surface-200 bg-surface-50 p-6 lg:p-8 h-full">
                <div className="size-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold leading-snug text-ink-900 break-keep">
                  会社で、全体を管理（＋担当者ごとに分離）
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-700">
                  オーナーは全顧客を俯瞰、各担当者は自分の担当だけを管理。情報は担当者ごとに分離されて混ざりません。
                </p>
              </div>
            </FadeIn>
          </div>

          {/* 両立メッセージ */}
          <FadeIn>
            <p className="mt-8 text-center text-base leading-relaxed text-ink-700 max-w-2xl mx-auto">
              <span className="font-semibold text-ink-900">
                個人での管理も、会社での全体管理も、1本で。
              </span>
              {" "}1人でも会社でも同額 ¥3,000/人（税込）。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────── 10. Pricing（料金） ───────── */}
      <section id="plans" className="py-20 sm:py-28 lg:py-32 bg-surface-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-wider text-primary-600">
                PRICING
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900 break-keep">
                シンプルな料金。隠れたコストなし。
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-700">
                1週間の無料トライアル付き。いつでも解約可能。
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 lg:mt-16 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {plans.map((plan) => (
              <FadeIn key={plan.name}>
                <div
                  className={`relative rounded-2xl p-7 transition h-full ${
                    plan.featured
                      ? "bg-white border-2 border-primary-600 shadow-md"
                      : "bg-white border border-surface-200 shadow-sm"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-accent-500 text-[11px] font-bold tracking-wide text-white">
                      人気
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-ink-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-ink-500 text-xs mb-4">
                    ストレージ {plan.storage}
                  </p>

                  {/* Pricing tiers */}
                  <div className="space-y-1 mb-5">
                    <p className="text-sm text-primary-600 font-semibold">
                      1週間無料
                    </p>
                    <p className="text-sm text-ink-500">
                      2週目〜1ヶ月目:{" "}
                      <span className="font-semibold text-ink-700">
                        &yen;{plan.firstMonth.toLocaleString()}
                      </span>
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold tracking-tight text-ink-900 tabular-nums">
                        &yen;{plan.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-ink-500">
                        /人/月（税込）
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm leading-relaxed text-ink-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary-500 mt-0.5 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${APP_URL}/signup`}
                    className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition hover:scale-[1.02] motion-reduce:hover:scale-100 break-keep ${
                      plan.featured
                        ? "bg-primary-500 hover:bg-primary-600 text-white"
                        : "bg-surface-100 hover:bg-surface-200 text-ink-900"
                    }`}
                  >
                    1週間無料で始める
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>

          <p className="mt-8 text-center text-sm leading-relaxed text-ink-500 max-w-2xl mx-auto">
            ※ スタンダードとプレミアムで、使えるAI機能・AIの性能は同じです。違いは「1ヶ月にAIをどれだけ使えるか（利用枠）」と「保存できる容量」です。AIをヘビーに使う事務所はプレミアムが向いています。
          </p>
          <p className="mt-4 text-center text-sm text-ink-500">
            導入費0円・個人でも企業でも同一料金・いつでも解約可能
          </p>
        </div>
      </section>

      {/* ───────── 11. FAQ ───────── */}
      <section id="faq" className="py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-wider text-primary-600">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900 break-keep">
                よくある質問
              </h2>
            </div>
          </FadeIn>
          <div className="mt-12 lg:mt-16">
            <FadeIn>
              <Accordion items={faqs} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───────── 12. Final CTA（濃色フィナーレ） ───────── */}
      <section className="py-20 sm:py-28 lg:py-32 bg-surface-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <div className="rounded-3xl bg-primary-900 text-white px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-white break-keep">
                まず触ってみてください。
                <br />
                説明は不要です。
              </h2>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`${APP_URL}/try`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-primary-700 shadow-sm transition hover:bg-surface-50 hover:scale-[1.02] motion-reduce:hover:scale-100 break-keep"
                >
                  1週間無料で試してみる
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/features/customer-app"
                  className="inline-flex items-center gap-2 text-base font-semibold text-white/90 transition hover:text-white"
                >
                  まず機能を詳しく見る
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-4 text-sm text-primary-100">
                1週間無料トライアル・いつでも解約可能
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
