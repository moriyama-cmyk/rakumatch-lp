import { BellRing, FolderSearch2, ListChecks } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { hl } from '../lib/headline'

type Pain = { icon: LucideIcon; title: string; body: string }

const PAINS: Pain[] = [
  {
    icon: FolderSearch2,
    title: '顧客が増えるほど、材料が散らばる。',
    body: '希望条件や会話のメモ、内見の履歴。誰に何を紹介するかを考えるための情報が、あちこちに残っていませんか。',
  },
  {
    icon: ListChecks,
    title: '物件を取り込んでも、紹介候補につながらない。',
    body: '新着物件を確認したあと、どのお客様に合いそうかを一人ずつ照らし合わせる作業が残ります。',
  },
  {
    icon: BellRing,
    title: 'お客様の動きを、提案のきっかけにしにくい。',
    body: '保存や内見希望があっても、聞くまで分からない。動くべきタイミングをつかみづらいことがあります。',
  },
]

/** 個人〜少人数の営業担当者が日々感じる、提案前の情報の分断を言語化する。 */
export function Problem() {
  return (
    <Section id="problem" labelledBy="problem-heading" spacing="md" className="border-y border-primary-100 bg-surface-150">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Badge>こんな状態になっていませんか</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="problem-heading" className="mt-5 font-bold leading-[1.28] tracking-[-0.025em] text-ink-900 [font-size:clamp(1.8rem,4.6vw,3.5rem)]">
              {hl('顧客と物件の情報が、', '提案につながっていますか。')}
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-11 grid max-w-6xl gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {PAINS.map((pain, index) => {
            const Icon = pain.icon
            return (
              <Reveal key={pain.title} delay={0.08 + index * 0.06}>
                <article className="flex h-full flex-col rounded-2xl border border-surface-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-soft sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-bold tabular-nums text-accent-700">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold leading-[1.55] text-ink-900">{pain.title}</h3>
                  <p className="mt-3 text-sm leading-[1.8] text-ink-700">{pain.body}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
