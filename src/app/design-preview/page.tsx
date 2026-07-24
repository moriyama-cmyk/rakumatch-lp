import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Database,
  FileInput,
  FolderSearch2,
  MessageSquareText,
  Repeat2,
  Smartphone,
  Sparkles,
  Users,
} from 'lucide-react'
import { SITE } from '@/components/lp/site'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'LPデザインプレビュー｜楽マッチ AI',
  description: '楽マッチ AIの比較検討用LPデザインプレビューです。',
  robots: { index: false, follow: false },
}

const pains = [
  { icon: FolderSearch2, title: '顧客が増えるほど', body: '誰に何を紹介するか、頭だけでは追えなくなる' },
  { icon: Building2, title: '新着物件を見ても', body: '誰に合いそうか、一人ずつ照らし合わせている' },
  { icon: Clock3, title: '毎日の入力や確認に', body: '時間を取られ、お客様への提案が後回しになる' },
  { icon: MessageSquareText, title: 'お客様の動きが', body: '聞くまで分からず、提案のきっかけを逃してしまう' },
] as const

const features = [
  { icon: Database, tone: 'blue', title: '顧客管理', body: '希望条件・会話・進捗を、一つの顧客ページに集約します。', image: '/shot-customer-detail.webp' },
  { icon: FileInput, tone: 'green', title: '物件一括取り込み', body: 'コピーした物件情報を貼り付け、AIが下書きを作成します。', image: '/shot-bulk-input.webp' },
  { icon: Repeat2, tone: 'violet', title: '双方向マッチング', body: '顧客から物件を、物件から顧客を。候補をすぐに見つけます。', image: '/shot-hero-matching.webp' },
  { icon: Bot, tone: 'orange', title: '専属AI', body: '顧客ごとの状況をもとに、次の一手を一緒に考えます。', image: '/shot-ai-insight.webp' },
  { icon: Smartphone, tone: 'cyan', title: 'お客様アプリ', body: '保存・評価・内見希望を受け取り、提案のタイミングにつなげます。', image: '/shot-customer-app-list.webp' },
] as const

const comparisons = [
  ['顧客・物件情報の管理', '別々になりやすい', '一つの画面に集約'],
  ['物件情報の取り込み', '手入力・転記', 'まとめて貼り付け'],
  ['顧客と物件の照合', '担当者が目視', 'AIが候補を提示'],
  ['お客様の反応把握', '電話・メールで確認', '保存や希望を受信'],
  ['次の提案づくり', '経験と記憶に依存', '専属AIと整理'],
] as const

const faqs = [
  ['1人から使えますか？', 'はい、1名からご利用いただけます。スタンダードは月額3,000円（税込）/人で、初期費用はかかりません。'],
  ['登録なしのデモでは何ができますか？', '連絡先やクレジットカードを入力せず、デモデータで実際の画面や操作感をお試しいただけます。'],
  ['お客様にもアプリのインストールが必要ですか？', '不要です。共有されたリンクを開くだけで、物件の保存、評価、メモ、内見希望の送信ができます。'],
  ['7日間トライアルはいつ課金されますか？', 'カード登録後7日間は料金がかかりません。継続した場合は8日目から月額課金が始まり、7日以内に解約すれば料金はかかりません。'],
] as const

export default function DesignPreviewPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#main">本文へスキップ</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#top" aria-label="楽マッチ AI トップ">
            <Image src="/icon-192.png" alt="" width={40} height={40} />
            <span>楽マッチ<span>AI</span></span>
          </a>
          <nav className={styles.nav} aria-label="主要ナビゲーション">
            <a href="#features">機能紹介</a>
            <a href="#demo">実際の画面</a>
            <a href="#pricing">料金</a>
            <a href="#faq">よくある質問</a>
          </nav>
          <div className={styles.headerActions}>
            <a className={styles.login} href={`${SITE.appUrl}/login`}>ログイン</a>
            <a className={styles.ctaSmall} href={SITE.ctaTryUrl}>無料で試してみる</a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.heroGlow} />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}><Sparkles size={16} /> 不動産売買仲介の営業担当者へ</p>
              <h1><span className={styles.heroFirstLine}><em>月額3,000円/人</em>から。</span><br />顧客管理も、<br />「次に出す物件」も。</h1>
              <p className={styles.heroLead}>顧客と物件の情報をつなげて、提案のきっかけを一つの画面へ。1名から始められる、不動産売買仲介の営業支援サービスです。</p>
              <div className={styles.factGrid} aria-label="料金と利用条件">
                <div><span>初期費用</span><strong>0<small>円</small></strong></div>
                <div><span>月額</span><strong>3,000<small>円/人〜</small></strong></div>
                <div><span>ご利用人数</span><strong>1<small>名から</small></strong></div>
              </div>
              <div className={styles.heroActions}>
                <a className={`${styles.ctaPrimary} ${styles.ctaHero}`} href={SITE.ctaTryUrl}>登録なしで画面を試す <ArrowRight size={19} /></a>
                <a className={styles.textLink} href="#features">5つの機能を見る <ChevronRight size={17} /></a>
              </div>
              <p className={styles.microcopy}><CircleCheck size={15} /> ログイン・連絡先・クレジットカード不要</p>
            </div>

            <div className={styles.heroVisual} aria-label="楽マッチ AIの製品画面">
              <div className={styles.browserFrame}>
                <div className={styles.browserBar}><i /><i /><i /><span>app.rakumatch-ai.com</span></div>
                <div className={styles.desktopShot}>
                  <Image src="/shot-top-hero.webp" alt="顧客管理とAI提案を表示した楽マッチ AIの画面" fill priority sizes="(max-width: 900px) 94vw, 710px" />
                </div>
              </div>
              <div className={styles.phoneFrame}>
                <span />
                <Image src="/shot-customer-app-list.webp" alt="お客様向け物件リスト画面" fill priority sizes="190px" />
              </div>
              <div className={styles.aiBubble}><Sparkles size={17} /><span>この物件は<br /><strong>3名</strong>にマッチ</span></div>
            </div>
          </div>
        </section>

        <section className={styles.problemSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p>こんなお悩みありませんか？</p>
              <h2>提案の前に、時間を使いすぎている。</h2>
            </div>
            <div className={styles.painGrid}>
              {pains.map(({ icon: Icon, title, body }) => (
                <article key={title}>
                  <div><Icon size={25} /></div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className={styles.solutionBridge}><span><Sparkles size={22} /></span><strong>その悩み、楽マッチ AIが一つにつなげます。</strong></div>
          </div>
        </section>

        <section className={styles.featuresSection} id="features">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p>楽マッチ AIでできること</p>
              <h2>入力から次の提案まで、営業の流れを一つに。</h2>
              <span>日々の顧客対応を5つの機能で支えます。</span>
            </div>
            <div className={styles.featureGrid}>
              {features.map(({ icon: Icon, tone, title, body, image }, index) => (
                <article className={`${styles.featureCard} ${index < 2 ? styles.featureLarge : ''}`} key={title}>
                  <div className={`${styles.featureIcon} ${styles[tone]}`}><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <div className={styles.featureImage}>
                    <Image src={image} alt={`${title}の実画面`} fill sizes={index < 2 ? '(max-width: 720px) 90vw, 540px' : '(max-width: 720px) 90vw, 340px'} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.compareSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}><p>これまでとの違い</p><h2>「探す・転記する」から、「確認して提案する」へ。</h2></div>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>営業の流れ</th><th>表計算・従来の管理</th><th>楽マッチ AI</th></tr></thead>
                <tbody>{comparisons.map(([label, before, after]) => <tr key={label}><th>{label}</th><td>{before}</td><td><Check size={17} /> {after}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.demoSection} id="demo">
          <div className={styles.demoInner}>
            <div className={styles.demoCopy}>
              <p>ACTUAL PRODUCT SCREEN</p>
              <h2>実際の画面で見る<br />楽マッチ AI</h2>
              <span>顧客情報、AIの提案、マッチする物件を、一つの画面で確認できます。</span>
              <a className={styles.ctaDark} href={SITE.ctaTryUrl}>登録なしで操作してみる <ArrowRight size={18} /></a>
            </div>
            <div className={styles.demoVisual}>
              <Image src="/shot-hero-matching.webp" alt="顧客情報、AI、マッチング結果を並べた楽マッチ AIの実画面" fill sizes="(max-width: 800px) 92vw, 740px" />
              <span className={styles.play}><ArrowRight size={28} /></span>
            </div>
          </div>
          <ol className={styles.demoSteps}>
            <li><b>1</b>情報を取り込む</li><li><b>2</b>AIが条件を整理</li><li><b>3</b>候補を自動照合</li><li><b>4</b>提案へ進む</li>
          </ol>
        </section>

        <section className={styles.proofSection}>
          <div className={styles.sectionInner}>
            <div className={styles.proofGrid}>
              <article><Users size={26} /><p>小さく始められる</p><strong><em>1</em>名から</strong></article>
              <article><Sparkles size={26} /><p>導入時の負担を抑える</p><strong>初期費用 <em>0</em>円</strong></article>
              <article><Smartphone size={26} /><p>お客様側も手軽</p><strong>アプリDL <em>不要</em></strong></article>
            </div>
            <div className={styles.voiceHeading}><p>実際に伺った声</p><h2>営業にも、お客様にも、わかりやすく。</h2></div>
            <div className={styles.voiceGrid}>
              <figure><div><span>営業の声</span><small>都内・売買仲介／30代</small></div><blockquote>「新着を取り込むと『この物件はこの3人に』と出るので、探す作業が確認する作業に変わった感覚です。」</blockquote></figure>
              <figure><div><span>お客様の声</span><small>30代・購入検討中</small></div><blockquote>「保存した物件の傾向から、自分では言葉にできていなかった希望を見せてくれて、わかってもらえている感覚がありました。」</blockquote></figure>
            </div>
          </div>
        </section>

        <section className={styles.pricingSection} id="pricing">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}><p>料金</p><h2>1名から、必要な分だけ。</h2><span>初期費用0円。まずは実際の画面を登録なしでお試しください。</span></div>
            <div className={styles.priceCard}>
              <div><p>STANDARD</p><h3>スタンダード</h3><span>一人ひとりの営業に</span></div>
              <div className={styles.price}><small>月額</small><strong>3,000</strong><span>円 / 人<br />（税込）</span></div>
              <ul><li><Check size={17} />5つの主機能</li><li><Check size={17} />1名から利用可能</li><li><Check size={17} />初期費用なし</li></ul>
              <a className={styles.ctaPrimary} href={SITE.ctaTrialUrl}>7日間トライアルを始める <ArrowRight size={19} /></a>
            </div>
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}><p>よくある質問</p><h2>始める前の確認事項</h2></div>
            <div className={styles.faqGrid}>{faqs.map(([q, a]) => <details key={q}><summary><b>Q</b><span>{q}</span><i>＋</i></summary><p>{a}</p></details>)}</div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalInner}>
            <p>AI営業を、今日から。</p>
            <h2>まずは、実際の画面を触ってみませんか。</h2>
            <span>ログイン・連絡先・クレジットカードは必要ありません。</span>
            <div><a className={styles.ctaPrimary} href={SITE.ctaTryUrl}>登録なしで画面を試す <ArrowRight size={19} /></a><a className={styles.finalSecondary} href="#features">5つの機能を見る</a></div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><a className={styles.brand} href="#top"><Image src="/icon-192.png" alt="" width={36} height={36} /><span>楽マッチ<span>AI</span></span></a><p>不動産売買仲介のための AI 営業相棒</p></div>
        <nav><a href="/privacy">プライバシーポリシー</a><a href="/terms">利用規約</a><a href="/tokusho">特定商取引法に基づく表記</a></nav>
        <small>© 2026 楽マッチ AI</small>
      </footer>
      <div className={styles.previewBadge}>DESIGN PREVIEW</div>
    </div>
  )
}
