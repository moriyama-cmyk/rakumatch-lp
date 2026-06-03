import type { Metadata } from "next";
import Image from "next/image";
import {
  ClipboardPaste,
  FileText,
  PencilLine,
  ListChecks,
  Calculator,
  FolderClosed,
  Sparkles,
  Smartphone,
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
  DemoVideoPoster,
  type FeaturePoint,
  type Step,
  type RequirementItem,
  type FaqItem,
  type RelatedFeature,
} from "@/app/features/_components";

const APP_URL = "https://app.rakumatch-ai.com";

/* ---------- Metadata（SEO_BRIEF §2-3 準拠。title は固有部のみ・layout の template が付与） ---------- */

export const metadata: Metadata = {
  title: "コピペ物件登録・契約管理",
  description:
    "レインズ・SUUMO・Excelのページを丸ごとコピペ、チラシ・マイソクはPDFや画像のまま投げ込むだけ。AIが価格・利回り・管理費などを項目に下書きします。顧客情報も同じ要領で取り込めます。契約フェーズ管理・固都税の日割り精算・書類管理まで、登録した物件のまま扱えます。",
  alternates: {
    canonical: "/features/property-input",
  },
  openGraph: {
    title: "コピペ物件登録・契約管理｜楽マッチ AI",
    description:
      "貼るだけで物件登録。テキストはコピペ、チラシ・マイソクはPDFや画像のまま。AIが項目に下書きし、契約フェーズ・精算・書類管理までそのまま扱えます。",
    url: "/features/property-input",
    type: "website",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "楽マッチ AI コピペ物件登録・契約管理",
      },
    ],
  },
  twitter: {
    title: "コピペ物件登録・契約管理｜楽マッチ AI",
    description:
      "貼るだけで物件登録。AIが項目に下書きし、契約フェーズ・精算・書類管理までそのまま扱えます。",
    images: ["/ogp.png"],
  },
};

/* ---------- HowTo JSON-LD（SEO_BRIEF §4。コピペ登録手順を HowTo 化） ---------- */
// 視覚的な使い方ステップ（下記 steps）と内容を一致させる。

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "物件情報をコピペで登録する手順",
  step: [
    {
      "@type": "HowToStep",
      name: "コピー／アップロード",
      text: "レインズ・SUUMO・Excelなどのページを全選択してコピー、またはチラシ・マイソクのPDF・画像をアップロードします。",
    },
    {
      "@type": "HowToStep",
      name: "AIが項目に下書き・手直し",
      text: "AIが価格・利回り・管理費・築年・構造などを項目に振り分けて下書きします。内容を確認し、必要なところを手で直します。",
    },
    {
      "@type": "HowToStep",
      name: "登録して活用",
      text: "確認のうえ登録すると、その物件のままマッチング・提案・契約管理へ進めます。",
    },
  ],
};

/* ---------- Data ---------- */

// 機能ブロック（COPY_DECK §D-2）。誇張せず、AIは下書き・手直し前提を明記。
const points: FeaturePoint[] = [
  {
    icon: ClipboardPaste,
    title: "テキスト・PDF・画像 → 項目に自動入力",
    desc: "テキストはコピペ、チラシ・マイソクはPDFや画像のまま。AIが価格・利回り・年間収入・管理費・築年・構造などを項目に振り分け、残りは見出し付きの箇条書きで備考に整理します。大量のテキストも自動で小分け処理します。",
  },
  {
    icon: PencilLine,
    title: "AIは下書き、最後は手直しできる",
    desc: "AIの読み取りは便利ですが100%ではありません。だから抽出後はいつでも手で直せるようにしています。内容を確認したら、最後はワンクリックで確定できます。",
    note: "※ AIの抽出結果はそのまま登録せず、内容をご確認のうえ手直し・確定してください。",
  },
  {
    icon: ListChecks,
    title: "売買の契約フェーズを、TODO・書類つきで管理",
    desc: "売買は 事前審査 → 契約 → 本審査 → 金消 → 決済 を、必要書類・TODOつきで管理。いまどの段階か、次に何をすべきかが一目で分かり、進捗はそのまま保存されます。",
  },
  {
    icon: Calculator,
    title: "固都税の日割り精算・書類管理",
    desc: "固定資産税・都市計画税、管理費の日割り精算に対応。関東・関西それぞれの起算日方式に沿って計算でき、書類のスクショを貼ればAIが数値を下書きします。図面・重説などのPDFは顧客ページに保存できます。",
  },
];

const steps: Step[] = [
  {
    title: "レインズ等のページを全選択してコピー、またはPDF・画像をアップロード",
    desc: "レインズ・SUUMO・Excel・手書きメモのテキストはCtrl+Aで丸ごとコピー。チラシ・マイソクはPDFや画像のまま投げ込めばOKです。顧客情報も同じように取り込めます。",
  },
  {
    title: "AIが項目に下書き。内容を確認して手直し",
    desc: "AIが価格・利回り・管理費などを項目に振り分けて下書きします。読み取りは100%ではないので、内容を確認して必要なところを直してください。",
  },
  {
    title: "登録した物件で、マッチング・提案・契約管理へ",
    desc: "登録した物件は、そのままAIマッチング・提案・契約フェーズ管理・精算・書類管理に使えます。",
  },
];

const requirements: RequirementItem[] = [
  {
    label: "用意するもの",
    desc: "物件情報のテキスト、またはチラシ・マイソクのPDF・画像。手元にあるものを貼るだけで始められます。",
  },
  {
    label: "事前準備",
    desc: "外部サービスとのAPI契約や連携設定は不要です。コンバーターのような月額ツールを別途契約しなくても、導入したその日から使えます。",
  },
  {
    label: "お客様アプリ経由の取り込み",
    desc: "お客様連動アプリでは、お客様がSUUMOなどで見つけた物件を対応サイトのURLから自動で取り込みます（営業の登録はコピペ／お客様アプリはURL取得、と経路が分かれています）。",
  },
];

const faqs: FaqItem[] = [
  {
    q: "どんな形式から登録できますか？",
    a: "テキストのコピペ、PDF、画像のどれでもOKです。レインズ・SUUMO・Excel・手書きメモなど、ページを丸ごと貼ればAIが項目に振り分けて下書きします。",
  },
  {
    q: "AIの読み取りは間違いませんか？",
    a: "100%ではありません。だから抽出後に手で直せるようにしています。最後にご確認のうえ登録してください。",
  },
  {
    q: "レインズとの連携契約は必要ですか？",
    a: "不要です。画面をコピペするだけで登録できます。連携契約や設定はいりません。月額のコンバーターを別途契約する必要もありません。",
  },
  {
    q: "賃貸の契約管理にも対応していますか？",
    a: "契約フェーズ管理は、売買の流れ（事前審査→契約→本審査→金消→決済）に沿った機能を中心に提供しています。物件登録やマッチングは売買・賃貸それぞれに対応しています。",
  },
];

const related: RelatedFeature[] = [
  {
    icon: Sparkles,
    title: "AI自動マッチング・逆引き",
    desc: "登録した物件から「これを買いそう・借りそうなお客様」を、お客様の希望から合う物件を。双方向の逆引きで提案先を抽出します。",
    href: "/features/matching",
  },
  {
    icon: Smartphone,
    title: "お客様連動アプリ",
    desc: "お客様がSUUMOなどで見つけた物件を1か所に集約。星評価・メモ・内見希望がそのまま担当者に届きます。",
    href: "/features/customer-app",
  },
];

/* ---------- Page ---------- */

export default function PropertyInputPage() {
  return (
    <FeaturePageShell>
      {/* HowTo JSON-LD（FeatureHero/FeatureFAQ が出す BreadcrumbList/FAQPage とは別に追加） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <FeatureHero
        eyebrow="コピペ物件登録・契約管理"
        title={
          <>
            貼るだけ。物件登録から
            <br className="hidden sm:block" />
            契約管理まで。
          </>
        }
        lead="レインズ・SUUMO・Excelのページを丸ごとコピペ、チラシ・マイソクはPDFや画像のまま投げ込むだけ。AIが価格・利回り・管理費などを項目に振り分けて下書きします。登録した物件は、契約フェーズ・精算・書類管理までそのまま扱えます。"
        sub="読み取りは100%ではないので、抽出後はいつでも手で直せるUIにしています。"
        breadcrumb={[
          { name: "ホーム", href: "/" },
          { name: "コピペ物件登録・契約管理", href: "/features/property-input" },
        ]}
        media={
          // 差し替え予定: /public に demo-copypaste.mp4（+poster）を置き、video/ready を渡せば動画版に。
          // それまでは既存の reins-bulk.mp4 を「ポスター＋クリック再生」で表示する。
          // DESIGN_SYSTEM §8 準拠で自動再生はせず、14MB級の動画はクリックまでロードしない（preload="none"）。
          <FeatureDemoMedia
            video="/demo-copypaste.mp4"
            poster="/demo-copypaste-poster.jpg"
            alt="コピペ物件登録のデモ画面（イメージ）"
            ready={false}
            fallback={
              <DemoVideoPoster
                src="/reins-bulk.mp4"
                poster="/demo-copypaste-poster.jpg"
                alt="コピペ物件登録のデモ画面（イメージ）"
              />
            }
          />
        }
      />

      {/* 価値（なぜラクか）— 入力の手間をAIが肩代わりする */}
      <FeatureSection
        background="surface-50"
        eyebrow="WHY"
        title="物件登録の入力を、AIに肩代わりさせる。"
        lead="物件1件を項目ごとに手入力するのは、地味に重い作業です。楽マッチなら、レインズやSUUMOのページ、チラシ・マイソク、Excelや手書きメモまで、媒体を問わず丸ごと投げ込むだけ。AIが価格・利回り・管理費などを項目に振り分けて下書きし、残りは見出し付きの備考に整理します。"
      >
        <p className="max-w-2xl text-base leading-relaxed text-ink-700">
          自社で使ってきた中では、1件あたりの入力時間を大きく短縮できています。コピペとPDF投げ込みで下書きまで終わるので、あなたは内容の確認と手直しに集中できます。
          <span className="mt-2 block text-sm text-ink-500">
            ※「入力時間90%削減」は自社利用に基づく試算です。効果には個人差があります。
          </span>
        </p>
      </FeatureSection>

      {/* 特徴グリッド（COPY_DECK §D-2 の4ブロック） */}
      <FeatureSection
        background="white"
        eyebrow="FEATURES"
        title="登録から、契約・精算・書類まで。"
        lead="貼って下書き、手直しして確定。登録したあとは、契約フェーズ・精算・書類管理までひとつながりで扱えます。"
      >
        <FeaturePointGrid points={points} columns={2} />
      </FeatureSection>

      {/* 顧客情報も丸ごと取り込み（穴3：会社の顧客管理システムをコピペ／スクショ→顧客ページ自動生成） */}
      <FeatureSection
        background="surface-50"
        eyebrow="CUSTOMER IMPORT"
        title="顧客情報も、丸ごと貼るだけ。"
        lead="物件だけではありません。会社の顧客管理システムの画面をコピペ、または名刺・問い合わせメールのスクショを投げ込むだけ。AIが名前・連絡先・希望条件などを項目に振り分け、お客様ごとのページを下書きします。"
      >
        <p className="max-w-2xl text-base leading-relaxed text-ink-700">
          バラバラの顧客情報を一件ずつ入力し直す手間を、AIが肩代わり。取り込んだ顧客は、そのまま逆引きマッチングの対象になります。
          <span className="mt-2 block text-sm text-ink-500">
            ※ AIの抽出結果は下書きです。内容をご確認のうえ手直し・確定してください。
          </span>
        </p>
      </FeatureSection>

      {/* 契約・精算・書類のデモ画面（feature-contract.png・売買フェーズ管理を主役に） */}
      <FeatureSection
        background="surface-50"
        eyebrow="CONTRACT & SETTLEMENT"
        title="売買の契約フェーズ・精算・書類を、ひとつの画面で。"
        lead="登録した物件は、契約の進捗・固都税の日割り精算・図面や重説の保存まで、そのまま扱えます。いまどの段階で、次に何が必要かを取りこぼしません。"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <ListChecks className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink-900">
                  契約フェーズ管理（売買）
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-700">
                  事前審査 → 契約 → 本審査 → 金消 → 決済を、必要書類・TODOつきで管理。進捗は保存され、案件の段階が一目で分かります。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Calculator className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink-900">
                  固都税・管理費の日割り精算
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-700">
                  関東・関西それぞれの起算日方式に沿って計算。書類のスクショを貼ればAIが数値を下書きするので、精算計算の入力もラクになります。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <FolderClosed className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink-900">
                  図面・重説などの書類保存
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-700">
                  図面・重要事項説明などのPDFは顧客ページに保存。案件に紐づくので、必要なときにすぐ取り出せます。
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-primary-50 opacity-60 blur-3xl" />
            <Image
              src="/feature-contract.png"
              alt="契約フェーズ・精算・書類管理のデモ画面（イメージ）"
              width={1376}
              height={768}
              sizes="(max-width: 1024px) 100vw, 600px"
              className="w-full rounded-2xl ring-1 ring-surface-200 shadow-[0_20px_60px_rgba(5,57,43,0.12)]"
            />
            <p className="mt-3 text-center text-sm text-ink-500">
              デモ画面（イメージ）
            </p>
          </div>
        </div>
      </FeatureSection>

      {/* 導入の軽さ（契約も設定も不要＝今日から。経路を分けて記述） */}
      <FeatureSection
        background="white"
        eyebrow="EASY TO START"
        title="契約も設定もいらない。だから今日から。"
        lead="物件情報を貼り付ける営業の登録は、外部サービスとのAPI契約も連携設定も不要です。月額のコンバーターを別途契約しなくても、低単価で導入したその日から使い始められます。"
      >
        <div className="flex items-start gap-4 rounded-2xl border border-surface-200 bg-surface-50 p-6 lg:p-8">
          <FileText
            className="mt-0.5 h-6 w-6 shrink-0 text-primary-600"
            aria-hidden="true"
          />
          <p className="text-base leading-relaxed text-ink-700">
            なお、お客様連動アプリでは、お客様がSUUMOなどで見つけた物件を対応サイトのURLから自動で取り込みます。営業の物件登録（コピペ・PDF）と、お客様アプリのURL取得は別の経路です。用途に合わせて使い分けられます。
          </p>
        </div>
      </FeatureSection>

      {/* 使い方ステップ（HowTo と一致） */}
      <FeatureSection
        background="surface-50"
        eyebrow="HOW IT WORKS"
        title="貼る → 手直し → 登録。3ステップ。"
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
        lead="手元の物件情報を貼るだけ。特別な準備や追加契約はいりません。"
      >
        <div className="max-w-3xl">
          <RequirementCard
            items={requirements}
            note="※ AIの抽出結果は下書きです。そのまま登録せず、内容をご確認のうえ手直し・確定してください。"
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

      {/* 関連機能（customer-app と matching へ相互リンク） */}
      <FeatureSection background="white" eyebrow="RELATED" title="あわせて使いたい機能">
        <RelatedFeatures items={related} />
      </FeatureSection>

      {/* 末尾CTA（濃色フィナーレ・1ページ1回） */}
      <FeatureCTA
        ctaLabel="コピペ登録を、まず無料で試す"
        ctaHref={`${APP_URL}/try`}
      />
    </FeaturePageShell>
  );
}
