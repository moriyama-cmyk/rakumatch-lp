import type { Metadata } from "next";
import ScreenMockup from "@/components/ScreenMockup";
import {
  ClipboardList,
  Search,
  Shield,
  CheckSquare,
  Sparkles,
  MessageSquare,
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
  FeatureDemoMedia,
  type FeaturePoint,
  type Step,
  type RequirementItem,
  type FaqItem,
  type RelatedFeature,
} from "@/app/features/_components";

const APP_URL = "https://app.rakumatch-ai.com";

/* ---------- Metadata（SEO_BRIEF §2-3 準拠。title は固有部のみ） ---------- */

export const metadata: Metadata = {
  title: "お客様連動アプリ",
  description:
    "お客様がSUUMOなどで見つけた物件を1か所に集約。星評価・メモ・内見希望がそのまま担当者に届く双方向の連携で、お客様の物件探しも、担当者のヒアリングもラクになります。",
  alternates: {
    canonical: "/features/customer-app",
  },
  openGraph: {
    title: "お客様連動アプリ｜楽マッチ AI",
    description:
      "お客様が見つけた物件が担当者に集まる。お客様の物件探しがラクになるほど、担当者にニーズが集まる双方向の連携機能。",
    url: "/features/customer-app",
    type: "website",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "楽マッチ AI お客様連動アプリ",
      },
    ],
  },
  twitter: {
    title: "お客様連動アプリ｜楽マッチ AI",
    description:
      "お客様が見つけた物件が担当者に集まる。双方向の連携で物件探しと追客をラクにする機能。",
    images: ["/ogp.png"],
  },
};

/* ---------- Data ---------- */

// 二面価値（COPY_DECK §A-2 / §7-1）。お客様の得を先に立て、その帰結として担当者の得を見せる。
const customerPoints: FeaturePoint[] = [
  {
    icon: ClipboardList,
    tag: "お客様の得",
    title: "複数サイトの物件を、1か所に集約",
    desc: "SUUMO・アットホームなど複数サイトで見つけた物件を、共有ボタンから保存。サイトごとにバラバラになりがちなお気に入りを、一元化できます。",
  },
  {
    icon: Search,
    tag: "お客様の得",
    title: "「自分はどんな物件を探しているか」が見える",
    desc: "集めた物件から、AIが「このお客様はこういう傾向」とまとめて提示。自分でも気づいていなかった希望の輪郭が見えてきます。",
  },
  {
    icon: Shield,
    tag: "お客様の得",
    title: "気づきにくい検討ポイントをAIがお知らせ",
    desc: "保存した物件にAIがコメントを添えたり、掲載が終了していないかを確認して表示。自分では気づきにくい注意点に先回りできます。",
    note: "※ AIコメントはご利用プランにより動作します。掲載終了の表示は対応サイトのページ状態に基づく自動チェックです。",
  },
  {
    icon: CheckSquare,
    tag: "担当者の得",
    title: "お客様のニーズが、担当者にはっきり見える",
    desc: "お客様の保存・星評価・メモ・内見希望が担当者のCRMに集約され、お客様が何を求めているかがはっきり見えます。ヒアリングの属人化を解消します。",
  },
  {
    icon: MessageSquare,
    tag: "担当者の得",
    title: "お客様の相談窓口が、自然と自分に",
    desc: "お客様が見つけた物件・反応・内見希望が自分のもとへ集まり、やり取りを重ねるほど「相談するならこの人」という関係に。ほかの営業にお客様を奪われにくくなります。",
  },
];

const steps: Step[] = [
  {
    title: "担当者が、お客様ごとの共有リンクを発行して送る",
    desc: "追加の契約や連携設定はいりません。担当者がリンクを送るところから始まります。",
  },
  {
    title: "お客様がリンクを開き、スマホのホームに追加",
    desc: "ログインやアカウント登録は不要。ホームに追加すれば、アプリのように起動できます。",
  },
  {
    title: "お客様がSUUMOなどで見つけた物件を、共有ボタンから保存",
    desc: "対応サイトのURLから物件情報を自動で取り込み、1か所にストックします。",
  },
  {
    title: "保存・星評価・内見希望が、担当者の画面に集まる",
    desc: "お客様の反応がそのまま担当者のCRMに届き、次の提案の手がかりになります。",
  },
];

const requirements: RequirementItem[] = [
  {
    label: "担当者",
    desc: "お客様に共有リンクを送るだけ。追加の契約・連携設定は不要です。",
  },
  {
    label: "お客様（iPhone）",
    desc: "リンクから「Siriショートカット」を一度だけ追加すると、共有メニューから物件を保存できるようになります。",
  },
  {
    label: "お客様（Android）",
    desc: "リンクをホーム画面に追加（PWA）すると、共有メニューから物件を保存できます。",
  },
];

const faqs: FaqItem[] = [
  {
    q: "お客様にアプリのインストールは必要ですか？",
    a: "不要です。送られたリンクを開くだけで使えます。スマホのホームに追加すれば、アプリのように起動できます。",
  },
  {
    q: "お客様のログインやアカウント登録は要りますか？",
    a: "要りません。リンク（専用トークン）だけでアクセスできます。",
  },
  {
    q: "どのサイトの物件を保存できますか？",
    a: "SUUMO・HOME'S・健美家など対応サイトのURLから情報を取り込みます。対応状況は順次拡大していきます。",
  },
  {
    q: "保存した物件は担当者にどう見えますか？",
    a: "担当者のCRMに自動で集約され、お客様の星評価・メモ・内見希望と一緒に確認できます。",
  },
];

const related: RelatedFeature[] = [
  {
    icon: Sparkles,
    title: "AI自動マッチング・逆引き",
    desc: "お客様の希望から物件を、物件から見込み客を。双方向の逆引きで提案先を自動で抽出します。",
    href: "/features/matching",
  },
  {
    icon: MessageSquare,
    title: "通話録音・要約・記録",
    desc: "お客様との通話を録音し、AIが文字起こし・要約。聞き漏らしと「言った言わない」を防ぎます。",
    href: "/features/call-recording",
  },
];

/* ---------- Page ---------- */

export default function CustomerAppPage() {
  return (
    <FeaturePageShell>
      <FeatureHero
        eyebrow="お客様連動アプリ"
        title={
          <>
            お客様が見つけた物件が、
            <br className="hidden sm:block" />
            担当者に集まる。
          </>
        }
        lead="担当者がお客様にリンクを送るだけ。お客様はSUUMOなどで見つけた物件を1タップで保存でき、星評価・メモ・内見希望がそのまま担当者に届きます。お客様の検索行動や好みが、担当者側に自然と貯まっていく仕組みです。"
        sub="お客様が見つけた物件が担当者に集まる“逆方向”の仕組みは、他にあまり見られません。"
        breadcrumb={[
          { name: "ホーム", href: "/" },
          { name: "お客様連動アプリ", href: "/features/customer-app" },
        ]}
        media={
          // 差し替え予定: 縦型 demo-customer-app.mp4（+poster）を /public に置き video/ready を渡せば動画版に。
          // それまでは ScreenMockup のプレースホルダを中央寄せ・幅を取りすぎない形で表示する。
          <FeatureDemoMedia
            video="/demo-customer-app.mp4"
            poster="/demo-customer-app-poster.jpg"
            alt="お客様連動アプリのデモ画面（イメージ）"
            ready={false}
            fallback={
              <div className="relative">
                <div className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-sm rounded-full bg-primary-50 opacity-70 blur-3xl" />
                <div className="mx-auto max-w-sm">
                  <ScreenMockup
                    alt="楽マッチ AI お客様連動アプリのデモ画面"
                    label="デモ画面（イメージ）"
                  />
                </div>
              </div>
            }
          />
        }
      />

      {/* 価値（なぜ重要か）— 二面価値の両得構図 */}
      <FeatureSection
        background="surface-50"
        eyebrow="WHY"
        title="お客様の物件探しがラクになるほど、担当者にニーズが集まる。"
        lead="お客様はSUUMOやアットホームで物件を探すと、お気に入りがサイトごとにバラバラになりがち。楽マッチのお客様連動アプリなら、見つけた物件を1か所にまとめられて、お客様自身の物件探しがラクになります。お客様が使うほど、その好みや検討状況が担当者のもとに自然と集まる——お客様にも担当者にも得がある仕組みです。"
      >
        <p className="max-w-2xl text-base leading-relaxed text-ink-700">
          担当者がお客様にリンクを送るだけ。お客様はログイン不要で、スマホのホームに追加すればアプリのように使えます。お客様を「監視する」ツールではなく、お客様の物件探しがそのままラクになるツールです。
        </p>
      </FeatureSection>

      {/* 特徴グリッド（二面価値で並べる） */}
      <FeatureSection
        background="white"
        eyebrow="FEATURES"
        title="お客様にも、担当者にも得がある。"
        lead="お客様自身の物件探しがラクになる価値を先に。その自然な帰結として、担当者にニーズが逆流します。"
      >
        <FeaturePointGrid points={customerPoints} columns={2} />
      </FeatureSection>

      {/* 使い方ステップ */}
      <FeatureSection
        background="surface-50"
        eyebrow="HOW IT WORKS"
        title="リンクを送るだけ。お客様はログイン不要。"
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
        lead="お客様はリンクだけでOK。共有メニューから保存するための一度きりの設定だけ案内します。"
      >
        <div className="max-w-3xl">
          <RequirementCard
            items={requirements}
            note="※ iPhoneのSiriショートカットは、リンクから一度追加するだけで共有メニューから保存できるようになります。"
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
        ctaLabel="お客様連動アプリを、まず無料で試す"
        ctaHref={`${APP_URL}/try`}
      />
    </FeaturePageShell>
  );
}
