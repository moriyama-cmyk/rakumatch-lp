import { ArrowRight, Mic, ClipboardCheck, Calculator } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { hlText } from '../lib/headline'

type DigestItem = { icon: LucideIcon; title: string; body: string; href?: string }

// Recording / Workflow / Settlement（メイン本体から除去）の内容を3枚のカードに集約。
// 詳細はリンク先の機能ページで。property-input には契約フェーズのスクショがあるため②はそちらへ。
const ITEMS: DigestItem[] = [
  {
    icon: Mic,
    title: '通話録音・AI要約',
    body: '電話も対面も、録音するだけでAIが文字起こし・要約し、活動履歴に自動で残します。',
    href: '/features/call-recording',
  },
  {
    icon: ClipboardCheck,
    title: '契約フェーズ管理',
    body: '本審査・契約・決済までの進捗を1画面で。超過している案件は色で気づけます。',
    href: '/features/property-input',
  },
  {
    icon: Calculator,
    title: '固都税・清算金の自動計算',
    body: '起算日を入れるだけで日割りを自動計算。手作業の計算ミスを防ぎます。',
  },
]

/**
 * 機能ダイジェスト（除去したRecording/Workflow/Settlementのダイジェスト版）。
 * id="hub" は Hero の「機能を見る」ボタン（href="#hub"）の着地点を、
 * 撤去した FeatureHub から引き継ぐ。
 */
export function FeatureDigest() {
  return (
    <Section id="hub" className="bg-white" spacing="md">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>ALL-IN-ONE</Badge>
            <h2 className="mt-4 text-display-lg text-ink-900">{hlText('提案の前も、契約の後も。')}</h2>
            <p className="mt-5 text-lg font-bold text-ink-900 sm:mt-6">
              {hlText('営業を止める“雑務”まで、ひとつに。')}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 divide-y divide-surface-200 border-y border-surface-200 sm:mt-16 md:grid-cols-3 md:divide-x md:divide-y-0 md:border">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex h-full flex-col p-6">
                <item.icon className="h-5 w-5 text-primary-600" strokeWidth={2} aria-hidden />
                <h3 className="mt-4 text-lg font-bold text-ink-900">{hlText(item.title)}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-700">{item.body}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-4 inline-flex min-h-[44px] items-center gap-1 text-sm font-bold text-primary-700 transition-colors hover:text-primary-800"
                  >
                    詳しく見る
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
