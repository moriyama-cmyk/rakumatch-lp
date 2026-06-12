import { Mic, MessageSquareX, EarOff, Sparkles, Phone, FileText, ArrowRight } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { FeatureSplit } from '../ui/FeatureSplit'
import { hlText } from '../lib/headline'

/** 録音→文字起こし→要約 の流れを示す軽量ビジュアル（ライト・作り込みすぎない）。 */
function RecordingVisual() {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-soft-lg sm:p-7">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <Phone className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <p className="text-sm font-bold text-ink-900">通話・対面の会話</p>
      </div>

      {/* 波形 */}
      <div className="mt-4 flex h-12 items-center gap-1 rounded-xl bg-surface-100 px-4">
        {Array.from({ length: 36 }).map((_, i) => (
          <span
            key={i}
            className="w-1 rounded-full bg-primary-300"
            style={{ height: `${22 + Math.abs(Math.sin(i * 1.2)) * 60}%` }}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-ink-500">
        <Mic className="h-3.5 w-3.5 text-primary-600" /> 録音
        <ArrowRight className="h-3.5 w-3.5" /> 文字起こし
        <ArrowRight className="h-3.5 w-3.5" /> 要約
      </div>

      {/* 要約カード */}
      <div className="mt-4 rounded-xl border border-surface-200 bg-surface-50 p-4">
        <p className="flex items-center gap-1.5 text-xs font-bold text-primary-700">
          <FileText className="h-3.5 w-3.5" /> 自動要約
        </p>
        <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink-700">
          引越し時期は来春。予算は上振れ可。学区を重視。次回、南向き物件を提案。
        </p>
      </div>
      <p className="mt-3 text-[0.7rem] text-ink-500">→ お客様ごとの活動履歴に自動で記録</p>
    </div>
  )
}

/** ④ 通話録音・文字起こし・要約。ビジュアルは左。 */
export function Recording() {
  return (
    <Section id="recording" className="bg-white" spacing="lg">
      <Container>
        <FeatureSplit
          reverse
          icon={Mic}
          eyebrow="会話を、資産に"
          title={
            <>
              {hlText('電話も対面も、録って・起こして・要約。')}
              <br className="hidden sm:block" />
              {hlText('導入費なし。')}
            </>
          }
          visual={<RecordingVisual />}
          points={[
            { icon: MessageSquareX, text: '「言った・言わない」を解消' },
            { icon: EarOff, text: '会話の中の潜在ニーズを取りこぼさない' },
            { icon: Sparkles, text: '整理の手間ゼロ（自動で顧客ごとに記録）' },
          ]}
          note="※ 録音はお相手の同意のうえでご利用ください。"
        >
          選んだマイクに入る音を録る方式だから、携帯のスピーカーでも、固定電話でも、対面でも録音できます。高額な電話システムは不要（マイクだけ）。録音はそのまま文字起こし・要約され、顧客ごとの活動履歴に自動で残ります。
        </FeatureSplit>
      </Container>
    </Section>
  )
}
