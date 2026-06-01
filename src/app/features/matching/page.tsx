import type { Metadata } from "next";
import {
  SlidersHorizontal,
  Repeat,
  Building2,
  TrendingUp,
  ShieldCheck,
  Users,
  Home,
  ArrowRight,
  ClipboardList,
  Mail,
} from "lucide-react";
import {
  FeaturePageShell,
  FeatureHero,
  FeatureSection,
  FeaturePointGrid,
  StepList,
  RequirementCard,
  FeatureFAQ,
  FeatureCTA,
  RelatedFeatures,
  type FeaturePoint,
  type Step,
  type RequirementItem,
  type FaqItem,
  type RelatedFeature,
} from "@/app/features/_components";

const APP_URL = "https://app.rakumatch-ai.com";

/* ---------- Metadata（SEO_BRIEF §2-3 準拠。title は固有部のみ） ---------- */

export const metadata: Metadata = {
  title: "顧客×物件マッチング",
  description:
    "お客様の条件から物件を、物件から見込み客を。双方向の逆引きで提案先を自動で抽出し、売買仲介の機会損失を減らすマッチング機能。売買・賃貸は業態モードを切り替えて採点します。",
  alternates: {
    canonical: "/features/matching",
  },
  openGraph: {
    title: "顧客×物件マッチング｜楽マッチ AI",
    description:
      "お客様の条件から物件を、物件から見込み客を。双方向の逆引きで提案先を自動で抽出するマッチング機能。",
    url: "/features/matching",
    type: "website",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "楽マッチ AI 顧客×物件マッチング",
      },
    ],
  },
  twitter: {
    title: "顧客×物件マッチング｜楽マッチ AI",
    description:
      "お客様の条件から物件を、物件から見込み客を。双方向の逆引きで提案先を自動で抽出するマッチング機能。",
    images: ["/ogp.png"],
  },
};

/* ---------- Data ---------- */

// 機能ブロック（COPY_DECK §C-2 に忠実）。成果保証は書かず、機能が何をするか＝プロセスで記述。
const points: FeaturePoint[] = [
  {
    icon: SlidersHorizontal,
    title: "ハードフィルター ＋ ソフトスコア",
    desc: "NGエリア・物件種別・予算・面積・築年数のどれかが致命的に外れていれば即除外。残りを項目ごとに採点し、100点換算でリストアップします。",
    note: "※ 条件が少ないお客様は採点の上限を下げ、点数の水増しを抑える設計です。",
  },
  {
    icon: Repeat,
    tag: "逆引き",
    title: "物件を開けば、合いそうなお客様が点数順に",
    desc: "1つの物件を開くと、合いそうなお客様を全顧客から点数順に表示。新着・価格変更の物件を誰に当てるか、一覧で確認できます。お客様起点と物件起点、どちらからも探せる仕組みです。",
  },
  {
    icon: Building2,
    title: "売買・賃貸で別ロジック",
    desc: "売買と賃貸では計算式が別です。賃貸はペット可否・駐車場・駅徒歩を重視して採点。1つのシステムで、業態モードを切り替えてどちらにも対応します。",
  },
  {
    icon: TrendingUp,
    title: "投資・買取にも対応",
    desc: "投資のお客様には利回り・築年数・構造で採点。買取業者タイプにも対応します。実住も投資も検討するお客様は、両方のモードで採点して高い方を採用します。",
  },
  {
    icon: ShieldCheck,
    title: "二重提案の防止",
    desc: "案内済みの物件はマッチング結果から自動で外れます。同じ物件を二度勧めてしまう失礼を防ぎます。",
  },
  {
    icon: Mail,
    title: "そのまま一斉紹介メールへ",
    desc: "逆引きで挙がったお客様に向けて、一斉紹介メールの下書きをまとめて作成。マッチングから提案までを途切れさせません。",
    note: "※ メール文面はAIが作成する下書きです。送信前に内容を確認・編集できます。",
  },
];

const steps: Step[] = [
  {
    title: "お客様の希望条件を登録する",
    desc: "コピペでも手入力でも登録できます。エリア・予算・面積・築年・こだわり条件などを入れておきます。",
  },
  {
    title: "条件に合う物件が、スコア順に自動で並ぶ",
    desc: "致命的に合わない物件は除外され、残りが採点されて点数順に並びます。提案候補をひと目で確認できます。",
  },
  {
    title: "新着物件を開けば、合いそうなお客様が点数順に出る",
    desc: "物件起点の逆引き。新着・価格変更の物件を、誰に届けるべきかが分かります。",
  },
  {
    title: "そのまま提案メールの下書きまで作成",
    desc: "挙がったお客様に向けた紹介メールの下書きを、続けて作成できます。",
  },
];

const requirements: RequirementItem[] = [
  {
    label: "登録しておくもの",
    desc: "お客様の希望条件と、物件の情報。どちらもコピペ・PDF・手入力で登録できます。",
  },
  {
    label: "業態モードの選択",
    desc: "売買・賃貸・投資を、お客様や物件ごとにモードで切り替えて採点します。",
  },
];

// FAQ は COPY_DECK §C-5（トップ FAQ と重複しない設問に）。
const faqs: FaqItem[] = [
  {
    q: "スコアはどう決まりますか？",
    a: "エリア・予算・面積・築年数などを項目ごとに採点し、致命的に合わない物件は除外します。売買・賃貸・投資でロジックが分かれています。条件が少ないお客様は採点の上限を下げ、点数が不自然に高く出ないようにしています。",
  },
  {
    q: "賃貸でもマッチングできますか？",
    a: "はい。賃貸専用のロジック（ペット可否・駐車場・駅徒歩を重視）で採点します。売買とは計算式が別なので、業態モードを切り替えてお使いください。",
  },
  {
    q: "投資用の物件にも対応していますか？",
    a: "対応しています。投資のお客様には利回り・築年数・構造で採点し、買取業者タイプにも対応します。実住と投資の両方を検討するお客様は、両モードで採点して高い方を採用します。",
  },
  {
    q: "同じ物件を何度も提案してしまわないか心配です。",
    a: "案内済みの物件はマッチング結果から自動で外れます。同じ物件を重ねて勧めてしまうことを防ぎます。",
  },
];

const related: RelatedFeature[] = [
  {
    icon: Users,
    title: "お客様連動アプリ",
    desc: "お客様が見つけた物件や反応が担当者に集まる双方向の連携。集まった希望条件が、そのままマッチングの精度につながります。",
    href: "/features/customer-app",
  },
  {
    icon: ClipboardList,
    title: "コピペ物件登録・契約管理",
    desc: "物件はコピペやPDFで登録。登録した物件は、そのまま逆引きマッチングの対象になります。",
    href: "/features/property-input",
  },
];

/* ---------- 逆引きフロー図（内製SVG・ART_DIRECTION §6.3：緑1色アクセント／白カードノード／primary-400 矢印） ---------- */

function MatchingFlowDiagram() {
  return (
    <div className="relative">
      {/* 背後の淡い primary-50 ぼかし円（白地に浮かせる・彩度は最小） */}
      <div className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-md rounded-full bg-primary-50 opacity-70 blur-3xl" />

      <div className="mx-auto max-w-md rounded-2xl border border-surface-200 bg-white p-6 shadow-[0_20px_60px_rgba(5,57,43,0.10)] ring-1 ring-surface-200 sm:p-8">
        <p className="text-center text-xs font-semibold tracking-wider text-primary-600">
          双方向マッチング
        </p>

        {/* 上段: お客様 → 物件（順方向） */}
        <div className="mt-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Users className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">お客様の希望条件</p>
              <p className="text-xs text-ink-500">エリア・予算・面積・築年・こだわり</p>
            </div>
          </div>
          <div className="my-2 ml-5 flex items-center gap-2 text-primary-400">
            <ArrowRight className="h-4 w-4 rotate-90" aria-hidden="true" />
            <span className="text-xs font-medium text-ink-500">合う物件をスコア順に</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Home className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">物件リスト</p>
              <p className="text-xs text-ink-500">点数順に並ぶ提案候補</p>
            </div>
          </div>
        </div>

        {/* 区切り */}
        <div className="my-5 border-t border-dashed border-surface-200" />

        {/* 下段: 物件 → 全顧客（逆引き・逆方向を強調） */}
        <div>
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            <Repeat className="h-3.5 w-3.5" aria-hidden="true" />
            逆引き
          </p>
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Home className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">新着・価格変更の物件</p>
              <p className="text-xs text-ink-500">この物件を誰に当てる？</p>
            </div>
          </div>
          <div className="my-2 ml-5 flex items-center gap-2 text-primary-400">
            <ArrowRight className="h-4 w-4 rotate-90" aria-hidden="true" />
            <span className="text-xs font-medium text-ink-500">買いそうなお客様を点数順に</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Users className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">全顧客のスコアリング</p>
              <p className="text-xs text-ink-500">案内済みは自動で除外</p>
            </div>
          </div>
        </div>

        <p className="mt-6 border-t border-surface-200 pt-4 text-center text-[11px] leading-relaxed text-ink-500">
          イメージ図（実際の画面とは異なります）
        </p>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function MatchingPage() {
  return (
    <FeaturePageShell>
      <FeatureHero
        eyebrow="AI自動マッチング・逆引き"
        title={
          <>
            物件からも、顧客からも。
            <br className="hidden sm:block" />
            逆引きでマッチング。
          </>
        }
        lead="お客様の希望条件を登録すれば、合う物件をスコア順に自動でリストアップ。逆に物件を開けば「これを買いそうな・借りそうなお客様」が点数順に出ます。「あの物件はあの客に」という担当者の記憶を、全顧客のスコアリングで支えます。"
        sub="物件を起点にお客様を探す“逆方向”の仕組みは、他にあまり見られません。"
        breadcrumb={[
          { name: "ホーム", href: "/" },
          { name: "AI自動マッチング・逆引き", href: "/features/matching" },
        ]}
        media={<MatchingFlowDiagram />}
      />

      {/* 価値（なぜ重要か）— 属人化の解消 */}
      <FeatureSection
        background="surface-50"
        eyebrow="WHY"
        title="“あの物件はあの客に”を、記憶ではなく全件スコアリングで。"
        lead="経験のある担当者ほど「この物件はあのお客様に合いそう」と当てられます。でもそれは記憶頼みで、担当者ごとにバラつき、見落としも起きます。楽マッチは全顧客を項目ごとに採点して、合いそうな相手を点数順に並べます。属人的な勘を、誰でも使える仕組みに置き換えます。"
      >
        <p className="max-w-2xl text-base leading-relaxed text-ink-700">
          お客様起点（条件→物件）だけでなく、物件起点（物件→全顧客）の逆引きにも対応。新着物件や価格変更を、誰に届けるべきかが一覧で分かるので、提案の機会を取りこぼしにくくなります。
        </p>
      </FeatureSection>

      {/* 特徴グリッド */}
      <FeatureSection
        background="white"
        eyebrow="FEATURES"
        title="採点の仕組みも、業態への対応も。"
        lead="致命的に外れる物件は除外し、残りを項目ごとに採点。売買・賃貸・投資それぞれのロジックで、合う相手を点数順に並べます。"
      >
        <FeaturePointGrid points={points} columns={3} />
      </FeatureSection>

      {/* 使い方ステップ */}
      <FeatureSection
        background="surface-50"
        eyebrow="HOW IT WORKS"
        title="条件を登録すれば、あとはスコア順に並ぶだけ。"
      >
        <div className="max-w-3xl">
          <StepList steps={steps} />
        </div>
      </FeatureSection>

      {/* 必要なもの */}
      <FeatureSection
        background="white"
        eyebrow="REQUIREMENTS"
        title="必要なもの"
        lead="お客様と物件の情報を登録しておくだけ。特別な準備や外部連携は要りません。"
      >
        <div className="max-w-3xl">
          <RequirementCard
            items={requirements}
            note="※ AIによる採点は提案候補の抽出を補助するものです。最終的な提案の判断は担当者が行います。"
          />
        </div>
      </FeatureSection>

      {/* FAQ */}
      <FeatureSection
        background="surface-50"
        eyebrow="FAQ"
        title="よくある質問"
        center
      >
        <FeatureFAQ items={faqs} />
      </FeatureSection>

      {/* 関連機能 */}
      <FeatureSection background="white" eyebrow="RELATED" title="あわせて使いたい機能">
        <RelatedFeatures items={related} />
      </FeatureSection>

      {/* 末尾CTA（濃色フィナーレ・1ページ1回） */}
      <FeatureCTA
        ctaLabel="AIマッチングを、まず無料で試す"
        ctaHref={`${APP_URL}/signup`}
      />
    </FeaturePageShell>
  );
}
