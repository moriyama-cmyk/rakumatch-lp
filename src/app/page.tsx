"use client";

import "./lpv3.css";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  ChevronDown,
  CircleUserRound,
  ClipboardCheck,
  FileImage,
  FileText,
  Mail,
  Phone,
  PlayCircle,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { trackCta } from "@/lib/track";

const TRY_URL = "https://app.rakumatch-ai.com/try";

const voices = [
  {
    type: "営業の声",
    role: "都内・売買仲介／30代",
    text: "顧客が20人を超えたあたりで、誰にどの物件かを頭で追えなくなりました。新着をコピペで放り込むと「この物件はこの3人に」とバッジで出るので、探す作業が確認する作業に変わった感覚です。案内済みは自動で外れるので、同じ物件を二度勧める失礼もなくなりました。",
  },
  {
    type: "お客様の声",
    role: "30代・購入検討中のお客様",
    text: "担当者から届いたリンクを、アプリ代わりに使っています。気になった物件を共有ボタンで保存するだけ。自分ではうまく言葉にできていなかった希望——距離より部屋の明るさを大事にしていた、とか——を傾向として見せてくれて、\"わかってもらえている\"感覚がありました。",
  },
  {
    type: "営業の声",
    role: "新人（入社数ヶ月）",
    text: "引き出しがなくて、電話が怖かったんです。顧客ページを開くとAIが資金や条件を踏まえて「次はこう聞くと」「この物件が潜在的に合うかも」と教えてくれる。優しい上司が隣にいる感じで、初日から一人で動けました。",
  },
  {
    type: "営業の声",
    role: "小規模店舗の店長",
    text: "できる営業のやり方は本人の頭の中にあって、辞められると履歴ごと消えるのが怖かった。通話を録音すれば要約が活動履歴に自動で残るので、担当交代の引き継ぎが一瞬です。初期費用もかからず法人契約も不要で、「まず店で入れてみるか」のハードルがほとんどありませんでした。",
  },
  {
    type: "営業の声",
    role: "ベテラン営業（PC操作は苦手）",
    text: "CRMは何度も挫折してきました——入力が続かないので。楽マッチは\"入力らしい入力\"がありません。レインズをまるごと貼るだけで、50件がカードになる。清算金の日割りも起算日を入れるだけで出るので、電卓の時間も消えました。",
  },
  {
    type: "お客様の声",
    role: "投資用物件を検討中のお客様",
    text: "複数社と同時に話を進めていますが、楽マッチを使う担当者は提案の質が違いました。保存した物件の傾向から、予算や利回りに幅を持たせた実務的な提案をしてくれる。アプリから内見のリクエストもでき、専属のコンシェルジュがついているようでした。",
  },
  {
    type: "お客様の声",
    role: "購入検討中のお客様",
    text: "いくつもの媒体で探すうちに、自分の軸が分からなくなっていました。AIが保存した物件の共通点を分析して傾向を言葉にしてくれたことで、軸が固まりました。AIの費用は営業側が持ってくれるので、探す側は無料で使えるのもありがたかったです。",
  },
  {
    type: "お客様の声",
    role: "購入検討中のお客様",
    text: "営業さんに直接は言いにくい本音——予算を少し下げたい、とか——を、AIに壁打ちして整理できました。おかげで、自信を持って担当者に伝えられました。",
  },
];

const faqs = [
  {
    q: "登録なしの画面プレビューでは、どこまで確認できますか？",
    a: "メールアドレスやカード情報を入れずに、デモデータを使った主な画面と業務の流れを切り替えて確認できます。データ保存は無料アカウント作成後、AI処理はプラン登録後に利用できます。",
  },
  {
    q: "AIがメールを勝手に送ることはありますか？",
    a: "ありません。AIは顧客情報や活動履歴をもとに文面や次の質問を下書きします。内容を確認・修正し、送信するのは利用者です。",
  },
  {
    q: "AIの提案や読み取りは必ず正しいですか？",
    a: "AIの結果は入力情報をもとにした支援情報です。物件登録時も提案時も、利用者が内容を確認し、必要に応じて修正してから利用します。",
  },
  {
    q: "売買と賃貸の両方で使えますか？",
    a: "はい。売買・賃貸のモードを切り替え、顧客条件、物件、活動履歴、提案準備をそれぞれ管理できます。",
  },
  {
    q: "1人でも利用できますか？",
    a: "はい。1名から始められます。必要になった時点で担当者を追加し、店舗・チームの運用へ広げられます。",
  },
  {
    q: "StandardとPremiumの違いは何ですか？",
    a: "利用できるAI機能とモデルは共通です。主な違いは、AI利用枠の目安とストレージ容量です。利用量に合わせて選べます。",
  },
  {
    q: "お客様側は何を使えますか？",
    a: "担当者から共有された画面で、物件の保存・比較、メモ、AIコメント、内見リクエストなどを利用できます。家族は最大3名まで共有できます。",
  },
  {
    q: "物件情報はどのように登録しますか？",
    a: "文章のコピー＆貼り付けに加え、PDFやスクリーンショットから情報を読み取り、項目へ整理できます。登録前に内容を確認・修正します。",
  },
];

type ComparisonRow = {
  label: string;
  excel: string;
  a: string;
  b: string;
  c: string;
  raku: string;
};

// 法務確認済みの比較文言は、旧LPの正本から変更せずに使用する。
const comparisonRows: ComparisonRow[] = [
  {
    label: "月額",
    excel: "0円（ただし人件費で払っている）",
    a: "要問い合わせが中心。公開例では月数万円／社〜",
    b: "月20,000円〜／法人が目安",
    c: "月1,000〜1,800円／人＋業務化の作り込み費用",
    raku: "3,000円／人（税込・価格公開）",
  },
  {
    label: "初期費用",
    excel: "0円",
    a: "無料〜数十万円（公開例では7万円／社〜）",
    b: "20万円前後の例が多い",
    c: "汎用は無料だが業務化に開発費",
    raku: "0円",
  },
  {
    label: "最低利用",
    excel: "—",
    a: "法人・社／店舗単位が中心",
    b: "法人単位・年間契約が多い",
    c: "最低10名からの例も",
    raku: "1名から・期間縛りなし",
  },
  {
    label: "媒体連携費",
    excel: "—",
    a: "別費用のことが多い",
    b: "有料の媒体連動が前提",
    c: "—",
    raku: "0円（そもそも不要）",
  },
  {
    label: "レインズ一覧の取り込み",
    excel: "1件ずつ手入力",
    a: "手入力（規約上、自動連携はどの製品も不可）",
    b: "手入力（同じ）",
    c: "手入力（同じ）",
    raku: "貼るだけでAIが解析・登録",
  },
  {
    label: "図面PDF・スクショからの登録",
    excel: "手入力",
    a: "オプション対応の製品も",
    b: "媒体経由が前提のことが多い",
    c: "添付保存まで（中身は読まない）",
    raku: "投げ込むだけ（標準機能）",
  },
  {
    label: "反響メールからの顧客登録",
    excel: "コピペで転記",
    a: "媒体連携の設定が前提のことが多い",
    b: "反響取り込みは得意分野",
    c: "手入力",
    raku: "メール文を貼るだけ",
  },
  {
    label: "この物件を誰に紹介するか",
    excel: "表からは分からない",
    a: "提案支援はあるが双方向は弱い",
    b: "反響管理が主で、物件起点は弱い",
    c: "自分で考える",
    raku: "全物件に「マッチ○名」が自動表示",
  },
  {
    label: "案内済み物件の管理",
    excel: "記憶とメモ",
    a: "手動更新",
    b: "手動更新",
    c: "手動更新",
    raku: "候補から自動で外れる",
  },
  {
    label: "提案メール・電話トーク",
    excel: "ゼロから作成",
    a: "定型文まで",
    b: "定型文まで",
    c: "なし（自分で書く）",
    raku: "顧客と物件を把握したAIが下書き",
  },
  {
    label: "お客様からの物件共有（逆方向）",
    excel: "不可",
    a: "買主マイページ（営業→お客様の一方向が中心）",
    b: "ポータル経由の反響のみ",
    c: "なし",
    raku: "お客様アプリで自動で届く",
  },
  {
    label: "追客アラート",
    excel: "気づいた人だけ",
    a: "設定すれば可",
    b: "設定すれば可",
    c: "なし",
    raku: "連絡が途絶えると自動警告",
  },
  {
    label: "導入までの設定",
    excel: "—",
    a: "初期設定・研修が前提のことが多い",
    b: "媒体連携の設定が前提",
    c: "業務に合わせる作り込みが必要",
    raku: "貼れば今日から",
  },
  {
    label: "試し方",
    excel: "—",
    a: "資料請求→商談→デモが中心",
    b: "資料請求→商談が中心",
    c: "無料版あり（業務化は別）",
    raku: "登録なしで今すぐ実物を触れる",
  },
];

const comparisonColumns: { key: "excel" | "a" | "b" | "c"; head: string; sub: string }[] = [
  { key: "excel", head: "Excel・紙の台帳", sub: "現場の多数派" },
  { key: "a", head: "A社", sub: "不動産特化CRM" },
  { key: "b", head: "B社", sub: "ポータル連動型" },
  { key: "c", head: "C社", sub: "汎用CRM" },
];

const comparisonCardLabels: { key: "excel" | "a" | "b" | "c"; label: string }[] = [
  { key: "excel", label: "Excel・紙" },
  { key: "a", label: "A社 特化CRM" },
  { key: "b", label: "B社 ポータル" },
  { key: "c", label: "C社 汎用CRM" },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "楽マッチAI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "売買・賃貸仲介に特化したAI営業CRM。顧客・物件の双方向マッチングと営業提案の準備を支援します。",
  offers: [
    { "@type": "Offer", name: "Standard", price: "3000", priceCurrency: "JPY" },
    { "@type": "Offer", name: "Premium", price: "5000", priceCurrency: "JPY" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`reveal ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  number,
  label = "楽マッチAIの強み",
  children,
  sub,
}: {
  number: string;
  label?: string;
  children: ReactNode;
  sub: string;
}) {
  return (
    <Reveal className="sectionHeading">
      <div className="sectionPill">
        <span>{label}</span>
        <b>{number}</b>
      </div>
      <h2>{children}</h2>
      <p>{sub}</p>
    </Reveal>
  );
}

function CtaButton({ className = "", compact = false, source = "unknown" }: { className?: string; compact?: boolean; source?: string }) {
  return (
    <a
      className={`primaryCta ${compact ? "compact" : ""} ${className}`}
      href={TRY_URL}
      data-cta="try-demo"
      data-cta-source={source}
      onClick={() => trackCta(source)}
    >
      <PlayCircle aria-hidden="true" />
      <span>登録なしで実画面を見る</span>
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

function Laptop({
  src,
  alt,
  position = "center",
  mask,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  position?: string;
  mask?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`laptop ${className}`}>
      <div className="laptopScreen">
        <img src={src} alt={alt} style={{ objectPosition: position }} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
        {mask ? <span className="screenPrivacyMask">{mask}</span> : null}
      </div>
      <div className="laptopBase" aria-hidden="true" />
    </div>
  );
}

function PhoneFrame({ src, alt, mask, className = "", priority = false }: { src: string; alt: string; mask?: string; className?: string; priority?: boolean }) {
  return (
    <div className={`phoneFrame ${className}`}>
      <span className="phoneSpeaker" aria-hidden="true" />
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
      {mask ? <span className="phonePrivacyMask">{mask}</span> : null}
    </div>
  );
}

function BenefitBand({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="benefitBand">
      <span><Check aria-hidden="true" />{left}</span>
      <i aria-hidden="true" />
      <span><Check aria-hidden="true" />{right}</span>
    </div>
  );
}

function DemoScreen({ src, alt, position = "center", className = "", privacyLabel }: { src: string; alt: string; position?: string; className?: string; privacyLabel?: string }) {
  return (
    <div className={`demoScreen ${className}`}>
      <img src={src} alt={alt} style={{ objectPosition: position }} loading="lazy" />
      {privacyLabel ? <span className="demoPrivacyMask">{privacyLabel}</span> : null}
    </div>
  );
}

function CompareSection() {
  return (
    <section className="featureSection white compareSection" id="compare">
      <div className="pageShell">
        <SectionHeading
          number="9"
          label="比較"
          sub="実在の1社ではなく、現場でよく検討される製品タイプごとに、公開情報に基づく目安で比べています。"
        >
          Excelでも、CRMでもない<span>選択。</span>
        </SectionHeading>

        {/* PCは一覧表、スマホは同じ内容を行カードで表示する。 */}
        <Reveal className="compareTableViewport">
          <table className="compareTable">
            <thead>
              <tr>
                <th scope="col">項目</th>
                {comparisonColumns.map((column) => (
                  <th scope="col" key={column.key}>
                    {column.head}
                    <span>{column.sub}</span>
                  </th>
                ))}
                <th scope="col" className="compareTable__winHead">
                  楽マッチ
                  <span>不動産売買特化</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {comparisonColumns.map((column) => (
                    <td key={column.key}>{row[column.key]}</td>
                  ))}
                  <td className="compareTable__win">{row.raku}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <div className="compareCards">
          {comparisonRows.map((row, index) => (
            <Reveal className="compareCard" delay={(index % 2) * 0.04} key={row.label}>
              <h3>{row.label}</h3>
              <div className="compareCard__rows">
                {comparisonCardLabels.map((column) => (
                  <div className="compareCard__row" key={column.key}>
                    <span>{column.label}</span>
                    <p>{row[column.key]}</p>
                  </div>
                ))}
                <div className="compareCard__row compareCard__row--win">
                  <span>楽マッチ</span>
                  <p>{row.raku}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="compareFooter">
          <p className="compareNote">
            ※ A社（不動産特化CRM）・B社（ポータル連動型）・C社（汎用CRM）は実在の特定の1社ではなく、各タイプの代表的な公開情報に基づく目安です（2026年7月時点・当社調べ）。金額・条件はプランや導入形態により異なります。
          </p>
          <CtaButton compact source="compare" />
        </Reveal>
      </div>
    </section>
  );
}

function DeveloperStorySection() {
  return (
    <section className="featureSection white storySection" id="founder">
      <div className="pageShell">
        <SectionHeading
          number="11"
          label="開発者について"
          sub="机上で作ったツールではありません。現場の不便を1つずつ潰して作った、現場のための道具です。"
        >
          現役の不動産営業マンが、<span>自分のために作りました。</span>
        </SectionHeading>

        <div className="storyLayout">
          <Reveal className="storyProfileCard">
            <picture>
              <source srcSet="/founder.webp" type="image/webp" />
              <img src="/founder.png" alt="楽マッチAI 開発者 森山 幸弘" loading="lazy" decoding="async" />
            </picture>
            <p className="storyName">森山 幸弘</p>
            <p className="storyRole">現役不動産営業 ／ 楽マッチAI 開発者</p>
          </Reveal>

          <Reveal className="storyQuoteCard" delay={0.1}>
            <p>東京で不動産売買をやっている、現役の営業マンです。</p>
            <p>「もっと楽に、もっとわかりやすく、誰がやってもできるツール」を追い求めて作りました。</p>
            <p>説明は不要です。使えば直感的にわかります。必要最低限を、ぎゅっと詰め込みました。</p>
            <p className="storyAccent">AIが進化するたびに、このアプリも進化します。あなたの営業トークも、提案も、一緒に進化し続けます。</p>
          </Reveal>
        </div>

        <Reveal className="storyPrinciples">
          <div>
            <Check aria-hidden="true" />
            <p>これは投資家やエンジニアが机上で作ったツールではありません。現場の不便を1つずつ潰して作った、現場のための道具です。</p>
          </div>
          <div>
            <Check aria-hidden="true" />
            <p>私はエンジニアではありません。難しい操作は、私が一番嫌いです。だからこのアプリの操作は&ldquo;貼るだけ&rdquo;にしました。</p>
          </div>
        </Reveal>

        <Reveal className="sectionCtaRow">
          <CtaButton compact source="story" />
        </Reveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [showAllVoices, setShowAllVoices] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const [finalVisible, setFinalVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const finalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const options = { threshold: 0.12 };
    const heroObserver = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), options);
    const finalObserver = new IntersectionObserver(([entry]) => setFinalVisible(entry.isIntersecting), options);
    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (finalRef.current) finalObserver.observe(finalRef.current);
    return () => {
      heroObserver.disconnect();
      finalObserver.disconnect();
    };
  }, []);

  // ページ単位で読み込むグローバル CSS が遷移後も残るため、LP全体をスコープで囲む。
  return (
    <div className="lpv3">
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="heroSection" ref={heroRef}>
        <div className="pageShell heroShell">
          <div className="brandStrip">
            <div className="brandLockup">
              <img src="/media/rakumatch-icon.png" alt="楽マッチAI" fetchPriority="high" />
              <span className="brandName">楽マッチ<em>AI</em></span>
              <span className="brandDescriptor">売買・賃貸仲介に特化した<br />AI営業CRM</span>
            </div>
            <div className="proofMetrics" aria-label="サービス概要">
              <div><small>導入しやすい</small><strong><em>月額</em>3,000円<em>〜</em></strong></div>
              <div><small>初期費用</small><strong>0<em>円</em></strong></div>
              <div><small>不動産仲介の</small><strong>業務に特化</strong></div>
            </div>
          </div>

          <div className="heroMain">
            <Reveal className="heroCopy">
              <p className="heroKicker">新人の初日から、</p>
              <h1 aria-label="次に誰へ、何を提案するかが画面で見える。">
                <span className="heroLine heroBlue">次に誰へ、</span>
                <span className="heroLine desktopLine"><span className="heroBlue">何を提案するか</span>が</span>
                <span className="heroLine desktopLine">画面で見える。</span>
                <span className="heroLine mobileLine heroBlue">何を提案するか</span>
                <span className="heroLine mobileLine">が画面で見える。</span>
              </h1>
              <span className="heroRule" aria-hidden="true" />
              <p className="heroLead">物件を貼ると、合うお客様が理由つきで並ぶ。<br /><b>次の一手までAIが下書き</b>する不動産営業CRM。</p>
              <div className="heroActions">
                <CtaButton source="hero" />
                <a className="secondaryCta" href="#how-it-works">3つの流れを見る <ArrowRight aria-hidden="true" /></a>
              </div>
              <p className="ctaNote">メール・カード不要／デモデータの実画面を確認／保存は無料登録後・AI処理はプラン登録後</p>
            </Reveal>

            <Reveal className="heroDevices" delay={0.12}>
              <Laptop src="/media/property-ai-match.webp" alt="物件から合うお客様を探すAIマッチング画面" position="62% center" mask="デモ物件の紹介候補" priority />
              <PhoneFrame src="/media/customer-app-home.webp" alt="お客様向け物件リスト画面" mask="デモ顧客さまの物件リスト" className="heroPhone" priority />
              <span className="floatingTag tagMatch"><Sparkles aria-hidden="true" />合う理由まで表示</span>
            </Reveal>
          </div>

          <Reveal className="valueStrip">
            <div className="valueGrid">
              <div className="valueItem"><span><CircleUserRound aria-hidden="true" /></span><div><h3>顧客情報を一画面へ</h3><p>希望・資金・履歴を整理。</p></div></div>
              <div className="valueItem"><span><Building2 aria-hidden="true" /></span><div><h3>物件資料を項目へ整理</h3><p>登録前の確認画面へ。</p></div></div>
              <div className="valueItem"><span><UsersRound aria-hidden="true" /></span><div><h3>合う理由まで表示</h3><p>顧客と物件を双方向マッチ。</p></div></div>
              <div className="valueItem"><span><Sparkles aria-hidden="true" /></span><div><h3>次の提案を下書き</h3><p>メール・電話・案内準備まで。</p></div></div>
            </div>
            <p className="valueSummary"><Sparkles aria-hidden="true" />入力した情報が、次の提案にそのままつながります。</p>
          </Reveal>
        </div>
      </section>

      <section className="featureSection white" id="how-it-works">
        <div className="pageShell">
          <SectionHeading number="1" sub="文章・PDF・画像を用意して貼ると、AIが項目へ整理。登録前に利用者が確認・修正します。">
            <span>物件登録</span>は、<span className="headingPhraseNeutral">コピー＆貼り付けだけ。</span>
          </SectionHeading>
          <div className="processGrid">
            <Reveal className="processCard">
              <div className="processHeader"><b>1</b><span>物件資料を用意</span></div>
              <div className="processBody">
                <p>文章・PDF・画像など、<br />手元の物件情報を用意します。</p>
                <div className="documentStack" aria-label="物件資料のイメージ">
                  <div><FileText aria-hidden="true" /><strong>文章</strong><small>コピー</small></div>
                  <div><FileText aria-hidden="true" /><strong>PDF</strong><small>ドロップ</small></div>
                  <div><FileImage aria-hidden="true" /><strong>スクショ</strong><small>ドロップ</small></div>
                  <span>資料を<br />コピー</span>
                </div>
              </div>
              <span className="flowArrow" aria-hidden="true" />
            </Reveal>
            <Reveal className="processCard focus" delay={0.08}>
              <div className="processHeader"><b>2</b><span>貼り付ける</span></div>
              <div className="processBody">
                <p>コピーした文章を貼るか、<br />PDF・画像をドロップ。</p>
                <Laptop src="/media/ai-input.webp" alt="AI一括入力画面" position="center" className="miniLaptop" />
                <strong className="processResult">貼り付けるだけでOK！</strong>
              </div>
              <span className="flowArrow" aria-hidden="true" />
            </Reveal>
            <Reveal className="processCard" delay={0.16}>
              <div className="processHeader"><b>3</b><span>AIが項目へ整理</span></div>
              <div className="processBody">
                <p>内容を確認・修正して、<br />物件カードとして登録します。</p>
                <Laptop src="/media/property-match-list.webp" alt="登録された物件カードの一覧" position="center" className="miniLaptop" />
                <strong className="processResult">確認して登録！</strong>
              </div>
            </Reveal>
          </div>
          <BenefitBand left="PDFやスクリーンショットにも対応" right="転記を減らし、紹介先探しへ進めます" />
        </div>
      </section>

      <section className="featureSection pale" id="matching">
        <div className="pageShell">
          <SectionHeading number="2" sub="物件から紹介先を。顧客から候補物件を。スコアと合う理由まで画面で確認できます。">
            顧客と物件を、<span>双方向にマッチング。</span>
          </SectionHeading>
          <div className="dualMatch">
            <Reveal className="screenCard">
              <h3><span>人</span>顧客から、合う物件を探す</h3>
              <DemoScreen src="/media/customer-ai-match.webp" alt="顧客から物件を探すAIマッチング画面" position="77% center" privacyLabel="デモ顧客／希望条件" />
              <i className="callout calloutTop">候補物件を表示</i>
              <i className="callout calloutBottom">合う理由を確認</i>
            </Reveal>
            <div className="aiOrbit" aria-hidden="true"><Bot />AI<br />双方向</div>
            <Reveal className="screenCard focus" delay={0.1}>
              <h3><span>家</span>物件から、紹介先を探す</h3>
              <DemoScreen src="/media/property-ai-match.webp" alt="物件から顧客を探すAIマッチング画面" position="82% center" />
              <i className="callout calloutTop">マッチ顧客</i>
              <i className="callout calloutBottom">スコア順</i>
            </Reveal>
          </div>
          <BenefitBand left="案内済み物件は候補から外す" right="探す仕事を、確認する仕事へ" />
        </div>
      </section>

      <section className="featureSection white" id="assistant">
        <div className="pageShell">
          <SectionHeading number="3" sub="顧客情報・活動履歴・マッチ物件を見ながら、次に聞くことと提案内容を準備できます。">
            メール・電話・案内準備まで、<span>AIが下書き。</span>
          </SectionHeading>
          <div className="assistantLayout">
            <Reveal className="screenCard focus assistantScreen">
              <h3><span>AI</span>顧客を理解したAIアシスタント</h3>
              <DemoScreen src="/media/customer-ai-match.webp" alt="顧客専属AIの提案画面" position="64% center" privacyLabel="デモ顧客／活動履歴" />
              <span className="assistantBadge"><Sparkles aria-hidden="true" />顧客・物件・履歴を参照</span>
            </Reveal>
            <Reveal className="assistPoints" delay={0.1}>
              <div><Mail aria-hidden="true" /><span><b>メール文</b><small>顧客と物件に合わせた文面を下書き。</small></span></div>
              <div><Phone aria-hidden="true" /><span><b>電話トーク</b><small>次に聞くことと提案の進め方を整理。</small></span></div>
              <div><ClipboardCheck aria-hidden="true" /><span><b>案内準備</b><small>物件と顧客情報から確認事項をまとめる。</small></span></div>
              <div className="humanCheck"><CircleUserRound aria-hidden="true" /><span><b>最後は担当者が確認</b><small>内容を直してから、利用者が送信します。</small></span></div>
            </Reveal>
          </div>
          <BenefitBand left="AIが自動送信する機能ではありません" right="確認・修正して、利用者が送信します" />
        </div>
      </section>

      <section className="midCtaBand" aria-label="デモ画面へのご案内">
        <div>
          <span><Sparkles aria-hidden="true" />ここまでの3つを、実画面プレビューで確認</span>
          <strong>貼る → 合うお客様が並ぶ → 次の一手が出る</strong>
        </div>
        <CtaButton compact source="mid-feature" />
      </section>

      <section className="featureSection pale" id="customer-app">
        <div className="pageShell">
          <SectionHeading number="4" sub="保存・比較・AIコメント・家族共有。お客様の「気になる」が次の提案につながります。">
            お客様も、スマホで<span>一緒に物件選び。</span>
          </SectionHeading>
          <Reveal className="phoneShowcase">
            <PhoneFrame src="/media/customer-app-comment.webp" alt="お客様向けAIコメント画面" className="sidePhone" />
            <PhoneFrame src="/media/customer-app-home.webp" alt="お客様向け物件リスト画面" mask="デモ顧客さまの物件リスト" className="mainPhone" />
            <PhoneFrame src="/media/customer-app-family.webp" alt="家族共有画面" className="sidePhone" />
          </Reveal>
          <div className="appValueGrid">
            <Reveal><span>1</span><b>あとで比較できる</b><small>気になる物件を保存</small></Reveal>
            <Reveal delay={0.05}><span>2</span><b>希望を伝えやすい</b><small>メモ・評価・AIコメント</small></Reveal>
            <Reveal delay={0.1}><span>3</span><b>家族最大3名で共有</b><small>検討を同じ画面で</small></Reveal>
            <Reveal delay={0.15}><span>4</span><b>担当者側にも反映</b><small>次の提案につながる</small></Reveal>
          </div>
        </div>
      </section>

      <section className="featureSection white" id="operations">
        <div className="pageShell">
          <SectionHeading number="5" sub="タスク・契約進行・追客アラートを一画面へ。情報を担当者の頭だけに残しません。">
            今日動く相手が、<span>ひと目でわかる。</span>
          </SectionHeading>
          <div className="dashboardLayout">
            <Reveal className="dashboardLaptop">
              <Laptop src="/media/dashboard.webp" alt="今日のタスクと活動状況が見えるダッシュボード" position="center" />
            </Reveal>
            <Reveal className="operationPoints" delay={0.08}>
              <div><b>今日のタスク</b><p>期限と次に動く相手を確認。</p></div>
              <div><b>契約進行中</b><p>案件の現在地を一覧で把握。</p></div>
              <div><b>追客アラート</b><p>連絡が必要な顧客を見逃さない。</p></div>
            </Reveal>
          </div>
          <BenefitBand left="顧客・物件・活動履歴を一か所へ" right="担当交代でも状況を引き継げます" />
        </div>
      </section>

      <section className="featureSection pale" id="call-recording">
        <div className="pageShell">
          <SectionHeading number="6" sub="通話を録音すると、文字起こし・要約・活動履歴への保存まで支援します。">
            通話録音・AI要約で、<span>商談の振り返りを軽く。</span>
          </SectionHeading>
          <div className="recordingLayout">
            <Reveal className="recordingSteps">
              <div><span><Phone /></span><b>録音</b><small>PCやマイクから開始</small></div>
              <i><ArrowRight /></i>
              <div><span><FileText /></span><b>文字起こし</b><small>会話を確認できる形へ</small></div>
              <i><ArrowRight /></i>
              <div><span><Sparkles /></span><b>AI要約</b><small>要点と次の行動を整理</small></div>
              <i><ArrowRight /></i>
              <div><span><ClipboardCheck /></span><b>履歴保存</b><small>顧客ページへ残す</small></div>
            </Reveal>
            <Reveal className="recordingVisual" delay={0.1}>
              <DemoScreen src="/media/customer-ai-match.webp" alt="AI要約を含む顧客活動画面" position="58% center" />
              <span className="waveform" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></span>
            </Reveal>
          </div>
          <BenefitBand left="振り返り時間を減らす" right="会話の要点を活動履歴へ残す" />
        </div>
      </section>

      <section className="featureSection white" id="contract">
        <div className="pageShell">
          <SectionHeading number="7" sub="営業支援のその後も、契約6フェーズと固都税・管理費等の精算で支えます。">
            売買の契約・精算まで、<span>同じ営業CRMで。</span>
          </SectionHeading>
          <div className="contractGrid">
            <Reveal className="screenCard focus">
              <h3><span>6</span>契約フェーズを確認</h3>
              <DemoScreen src="/media/contract-flow.webp" alt="売買契約の6フェーズ管理画面" />
            </Reveal>
            <Reveal className="screenCard" delay={0.1}>
              <h3><span>¥</span>日割り精算を保存</h3>
              <DemoScreen src="/media/settlement.webp" alt="固都税と管理費の精算画面" className="containScreen" />
            </Reveal>
          </div>
          <BenefitBand left="事前審査から決済までチェック" right="別の表計算へ移す手間を減らす" />
        </div>
      </section>

      <section className="featureSection pale onboardingSection" id="start">
        <div className="pageShell">
          <SectionHeading number="8" label="導入のしやすさ" sub="まず実画面を確認し、無料アカウントで保存して続け、プラン登録後に7日間試せます。">
            <span>1名から</span>、必要なときだけチームへ。
          </SectionHeading>
          <div className="onboardingLayout">
            <Reveal className="editorialCard">
              <img src="/media/editorial-agent.webp" alt="楽マッチAIを試す不動産営業担当者の利用イメージ" loading="lazy" />
              <span>利用イメージ</span>
              <p>ブラウザですぐ試せて、<br />合えばそのまま運用へ。</p>
            </Reveal>
            <div className="onboardingSteps">
              <Reveal><b>1</b><span><small>STEP 1</small><strong>画面プレビュー</strong><em>登録なし</em><p>メール・カード不要で、主な画面と業務の流れを確認。</p></span></Reveal>
              <Reveal delay={0.06}><b>2</b><span><small>STEP 2</small><strong>無料アカウント</strong><em>保存して続ける</em><p>Googleまたはメールで、デモ環境を引き継いで保存。</p></span></Reveal>
              <Reveal delay={0.12}><b>3</b><span><small>STEP 3</small><strong>プラン登録</strong><em>7日間</em><p>カード登録後7日間、選んだプランを試せます。</p></span></Reveal>
            </div>
          </div>
          <BenefitBand left="1名から始められます" right="必要になった時点でチームへ拡張" />
        </div>
      </section>

      <CompareSection />

      <section className="featureSection pale pricingSection" id="pricing">
        <div className="pageShell">
          <SectionHeading number="10" label="料金プラン" sub="個人・標準利用向けのStandardと、AI・書類を多く使うPremium。">
            AI機能・モデルは同じ。<span>利用量で選べます。</span>
          </SectionHeading>
          <div className="pricingGrid">
            <Reveal className="priceCard">
              <p className="planName">STANDARD</p>
              <div className="price"><strong>3,000</strong><span>円／人・月<small>（税込）</small></span></div>
              <p className="planFor">個人・標準利用に</p>
              <ul>
                <li><span>AI利用枠の目安</span><b>メール約700通／月</b></li>
                <li><span>書類換算の目安</span><b>約450枚／月</b></li>
                <li><span>ストレージ</span><b>250GB</b></li>
                <li><span>AI機能・モデル</span><b>すべて利用可</b></li>
              </ul>
              <CtaButton compact source="pricing-standard" />
            </Reveal>
            <Reveal className="priceCard premium" delay={0.1}>
              <span className="recommend">利用量が多い方へ</span>
              <p className="planName">PREMIUM</p>
              <div className="price"><strong>5,000</strong><span>円／人・月<small>（税込）</small></span></div>
              <p className="planFor">AI・書類を多く使う方に</p>
              <ul>
                <li><span>AI利用枠の目安</span><b>メール約2,200通／月</b></li>
                <li><span>書類換算の目安</span><b>約1,450枚／月</b></li>
                <li><span>ストレージ</span><b>500GB</b></li>
                <li><span>AI機能・モデル</span><b>すべて利用可</b></li>
              </ul>
              <CtaButton compact source="pricing-premium" />
            </Reveal>
          </div>
          <p className="pricingNote">AI利用枠の換算値は、使う機能や内容により前後する目安です。プラン選択と申込条件は登録画面で確認できます。</p>
          <BenefitBand left="両プランで同じAI機能・同じモデル" right="違うのは利用枠と保存容量です" />
        </div>
      </section>

      <DeveloperStorySection />

      <section className="featureSection pale voicesSection" id="voices">
        <div className="pageShell">
          <SectionHeading number="12" label="現場の声" sub="営業担当者と、物件を探すお客様。それぞれの体験から届いた声です。">
            探す仕事が、<span>確認する仕事へ。</span>
          </SectionHeading>
          <div className="voiceGrid">
            {voices.slice(0, showAllVoices ? voices.length : 4).map((voice, index) => (
              <Reveal className="voiceCard" delay={(index % 2) * 0.06} key={`${voice.role}-${index}`}>
                <span className={voice.type === "お客様の声" ? "customerVoice" : ""}>{voice.type}</span>
                <p>{voice.text}</p>
                <cite>{voice.role}</cite>
              </Reveal>
            ))}
          </div>
          <button className="moreVoices" type="button" onClick={() => setShowAllVoices((value) => !value)} aria-expanded={showAllVoices}>
            {showAllVoices ? "4件に戻す" : "ほかの声も見る"}<ChevronDown className={showAllVoices ? "rotate" : ""} aria-hidden="true" />
          </button>
          <p className="voiceNote">掲載している声は、実際にご利用いただいている方から伺ったものです。個人が特定されないよう属性は粗く匿名化しています。捏造した声や口コミは一切掲載していません。体験談内の申込条件は利用時点のものです。現在の条件は登録画面でご確認ください。</p>
        </div>
      </section>

      <section className="faqSection" id="faq">
        <div className="faqShell">
          <Reveal className="faqLead">
            <span className="smallPill">FAQ</span>
            <h2>よくある質問</h2>
            <p>試す前に気になることを、先に整理しました。</p>
          </Reveal>
          <div className="faqList">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className={`faqItem ${isOpen ? "open" : ""}`} key={faq.q}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`}>
                    <span><b>Q</b>{faq.q}</span><ChevronDown aria-hidden="true" />
                  </button>
                  <div className="faqAnswer" id={`faq-answer-${index}`} hidden={!isOpen}><b>A</b><p>{faq.a}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="finalSection" ref={finalRef}>
        <div className="finalGlow" aria-hidden="true" />
        <div className="finalShell">
          <div className="finalBrand"><img src="/media/rakumatch-icon.png" alt="" loading="lazy" /><span>楽マッチ<em>AI</em></span></div>
          <p>営業の記録を増やすCRMではなく、<br /><strong>次に動くための画面</strong>を。</p>
          <h2>登録なしで、まず実際の画面を<br className="mobileOnlyBreak" />見てください。</h2>
          <CtaButton className="finalCta" source="final" />
          <small>メール・カード不要／デモデータの画面を確認できます</small>
        </div>
      </section>

      <footer>
        <div>
          <span>© 楽マッチAI</span>
          <nav className="footerLinks" aria-label="フッターリンク">
            <a href="#faq">よくある質問</a>
            <a href="#pricing">料金</a>
            <a href="/tokusho">特定商取引法に基づく表記</a>
            <a href="/privacy">プライバシーポリシー</a>
            <a href="/terms">利用規約</a>
            <a href="/contact">お問い合わせ</a>
          </nav>
        </div>
      </footer>

      <div className={`mobileStickyCta ${heroVisible || finalVisible ? "hidden" : ""}`}>
        <CtaButton compact source="mobile-sticky" />
      </div>
    </main>
    </div>
  );
}
