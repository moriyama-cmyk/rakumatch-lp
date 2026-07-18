import type { Metadata } from "next";
import {
  FileText,
  Layers,
  ListChecks,
  Sparkles,
  Users,
  Phone,
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
  FeatureShot,
  type FeaturePoint,
  type Step,
  type RequirementItem,
  type FaqItem,
  type RelatedFeature,
} from "@/app/features/_components";

const APP_URL = "https://app.rakumatch-ai.com";

/* ---------- Metadata（SEO_BRIEF §2-3 準拠。title は固有部のみ＝layout が「| 楽マッチ AI」付与） ---------- */

export const metadata: Metadata = {
  title: "通話録音×要約AI",
  description:
    "お客様との通話を録音し、AIが文字起こし・要約して活動履歴に自動で記録。聞き漏らしも「言った言わない」も防ぎ、不動産営業の記録を資産に変える機能です。",
  alternates: {
    canonical: "/features/call-recording",
  },
  openGraph: {
    title: "通話録音×要約AI｜楽マッチ AI",
    description:
      "通話を録音し、AIが文字起こし・要約して活動履歴に自動記録。聞き漏らしと「言った言わない」を防ぎます。",
    url: "/features/call-recording",
    type: "website",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "楽マッチ AI 通話録音・要約・記録",
      },
    ],
  },
  twitter: {
    title: "通話録音×要約AI｜楽マッチ AI",
    description:
      "通話を録音し、AIが文字起こし・要約して活動履歴に自動記録。聞き漏らしを防ぐ機能。",
    images: ["/ogp.png"],
  },
};

/* ---------- Data ---------- */

// 機能ブロック（COPY_DECK §B-2 / §8-1）。録音→文字起こし→要約→記録の自動化が軸。
const featurePoints: FeaturePoint[] = [
  {
    icon: Phone,
    title: "携帯・固定電話・対面、どの通話でも",
    desc: "携帯でも固定電話でも、対面の商談でも。マイクで拾えればAIが文字起こし・要約します。専用の電話システムや高額な機器は不要です。",
    note: "※ 録音はお客様の同意を得たうえでご利用ください。",
  },
  {
    icon: FileText,
    title: "録音 → 文字起こし → 要約を自動化",
    desc: "録音した通話をAIが文字起こしし、要点を要約。活動履歴のタイトルも自動で付けるので、メモを取りながら話す必要がありません。",
  },
  {
    icon: Layers,
    title: "長い通話も安定して処理",
    desc: "長時間の通話は自動で小分けに処理。無音の部分はスキップして、必要なところだけを残します。",
  },
  {
    icon: ListChecks,
    title: "AI質問テンプレを画面に常設",
    desc: "「このお客様に何を聞くべきか」のAI質問テンプレを画面に常設。ヒアリングの抜けを減らし、何を聞くべきかも支援します。",
  },
];

const steps: Step[] = [
  {
    title: "顧客ページで録音を開始する",
    desc: "通話を始めるタイミングで録音開始。長い通話は5分ごとに自動で区切られ、無音はスキップされます。",
  },
  {
    title: "通話が終わったら録音を停止",
    desc: "停止すると、録音した音声がそのままAIの処理に回ります。手動でファイルを移す手間はありません。",
  },
  {
    title: "AIが文字起こし・要約し、活動履歴に保存",
    desc: "文字起こしから要点の要約、タイトル付けまでAIが行い、その顧客の活動履歴に自動で記録されます。",
  },
  {
    title: "要約をもとに、次の追客アクションを決める",
    desc: "残った要約を見れば、何を話したか・次に何をすべきかが一目で分かります。聞き漏らしも「言った言わない」も防げます。",
  },
];

// 必要なもの（COPY_DECK §B-4・法務#9）。推奨機材として案内し、特定機種で「動かない」と断定しない。
const requirements: RequirementItem[] = [
  {
    label: "マイク（PC内蔵でも可）",
    desc: "PCのマイク、または通話を録音できるマイクがあれば始められます。まずは手元の環境でお試しいただけます。",
  },
  {
    label: "推奨マイク: ECM-TL3 ＋ UGREEN 30724",
    desc: "通話相手の声もしっかり録るなら、イヤホン型マイク「ECM-TL3」と変換アダプタ「UGREEN 30724」の組み合わせが安定します。型番で検索すると入手できます。",
  },
  {
    label: "PC側のマイク入力設定",
    desc: "PCの音声設定で、入力に使うマイクを、お使いのマイクに合わせて選んでおいてください。",
  },
];

const faqs: FaqItem[] = [
  {
    q: "どんなマイクが必要ですか？",
    a: "PC内蔵マイクでも使えますが、通話相手の声もしっかり録るには、イヤホン型マイク「ECM-TL3」と変換アダプタ「UGREEN 30724」の組み合わせが安定します。",
  },
  {
    q: "録音が無音になります。",
    a: "まずPCのマイク入力設定で、使用するマイクが正しく選ばれているかをご確認ください。",
  },
  {
    q: "長い通話でも大丈夫ですか？",
    a: "長時間の通話は自動で小分けに処理し、無音部分はスキップするので、長い通話にも対応します。",
  },
  {
    q: "録音した内容はどこに残りますか？",
    a: "文字起こしと要約が、その顧客の活動履歴に自動で記録されます。あとから要約を見返して、次の追客アクションを決められます。",
  },
];

const related: RelatedFeature[] = [
  {
    icon: Users,
    title: "お客様連動アプリ",
    desc: "お客様が見つけた物件が担当者に集まる双方向の連携。星評価・メモ・内見希望がそのまま届きます。",
    href: "/features/customer-app",
  },
  {
    icon: Sparkles,
    title: "AI自動マッチング・逆引き",
    desc: "お客様の希望から物件を、物件から見込み客を。双方向の逆引きで提案先を自動で抽出します。",
    href: "/features/matching",
  },
];

/* ---------- Page ---------- */

export default function CallRecordingPage() {
  return (
    <FeaturePageShell>
      <FeatureHero
        eyebrow="通話録音・要約・記録"
        title={
          <>
            電話の内容を、
            <br className="hidden sm:block" />
            AIが文字起こし・要約。
          </>
        }
        lead="お客様との通話をその場で録音。AIが文字起こしして要点を要約し、活動履歴に自動で残します。携帯でも固定電話でも、対面の商談でも、マイクで拾えればOK。専用の電話システムは不要です。聞き漏らしも「言った言わない」も防げます。"
        sub="メモ取りに気を取られず、お客様との会話に集中できます。"
        breadcrumb={[
          { name: "ホーム", href: "/" },
          { name: "通話録音・要約・記録", href: "/features/call-recording" },
        ]}
        media={
          // 通話録音の専用スクショは無いため、顧客詳細画面（電話する/録音開始が同じ行にある）を実画面として使用。
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-md rounded-full bg-primary-50 opacity-70 blur-3xl" />
            <div className="mx-auto max-w-md">
              <FeatureShot
                base="/shot-customer-detail"
                alt="顧客詳細ページ。電話する・録音開始ボタンが同じ行にある楽マッチ AI の実画面"
                width={1920}
                height={1080}
                priority
                caption="顧客詳細ページの実画面（録音は「録音開始」から開始します）"
              />
            </div>
          </div>
        }
      />

      {/* 価値（なぜ重要か） */}
      <FeatureSection
        background="surface-50"
        eyebrow="WHY"
        title="メモ取りから解放され、会話に集中できる。"
        lead="通話中にメモを取ろうとすると、肝心の会話がおろそかになりがち。録音とAI要約に任せれば、お客様の話を聞くことに集中でき、内容は後から要約で確認できます。"
      >
        <p className="max-w-2xl text-base leading-relaxed text-ink-700">
          録音した通話はAIが文字起こし・要約して、その顧客の活動履歴に自動で記録。誰がいつ何を話したかが残るので、聞き漏らしや「言った言わない」を防ぎ、次の追客にそのまま使えます。
        </p>
      </FeatureSection>

      {/* 特徴グリッド */}
      <FeatureSection
        background="white"
        eyebrow="FEATURES"
        title="録音から要約・記録まで、ひとつなぎ。"
        lead="録音を止めるだけで、文字起こし・要約・タイトル付け・履歴保存までAIが受け持ちます。"
      >
        <FeaturePointGrid points={featurePoints} columns={3} />
      </FeatureSection>

      {/* 使い方ステップ */}
      <FeatureSection
        background="surface-50"
        eyebrow="HOW IT WORKS"
        title="録音を止めれば、あとはAIにおまかせ。"
      >
        <div className="max-w-3xl">
          <StepList steps={steps} />
        </div>
      </FeatureSection>

      {/* 必要なもの（このページの肝・推奨機材として案内） */}
      <FeatureSection
        background="white"
        eyebrow="REQUIREMENTS"
        title="必要なもの・推奨機材"
        lead="大がかりな機材は要りません。PC内蔵マイクでも始められ、通話相手の声までしっかり録るなら、Amazonで買える小さなマイクを1つ足すだけです。"
      >
        <div className="max-w-3xl">
          <RequirementCard
            items={requirements}
            note="※ 録音はお客様の同意を得たうえでご利用ください。推奨機材はあくまで案内で、特定の機種で「使えない」と断定するものではありません。録音がうまくいかない場合は、まずマイク入力の設定からお試しください。"
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
      <FeatureSection
        background="white"
        eyebrow="RELATED"
        title="あわせて使いたい機能"
      >
        <RelatedFeatures items={related} />
      </FeatureSection>

      {/* 末尾CTA（濃色フィナーレ・1ページ1回） */}
      <FeatureCTA
        ctaLabel="通話録音・要約をまず無料で試す"
        ctaHref={`${APP_URL}/try`}
      />
    </FeaturePageShell>
  );
}
