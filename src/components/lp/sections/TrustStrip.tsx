import { Banknote, Building2, KeyRound, ArrowLeftRight, JapaneseYen } from 'lucide-react'
import Image from 'next/image'
import { Container } from '../ui/Container'

const ITEMS = [
  { icon: Building2, text: '不動産営業専門' },
  { icon: JapaneseYen, text: '月3,000円/人（税込）〜' },
  { icon: ArrowLeftRight, text: '双方向マッチング' },
  { icon: Banknote, text: '媒体連携 0円' },
  { icon: KeyRound, text: 'ログイン不要で体験' },
]

/** Hero下の静かな信頼バー（流れない・上品）。Gemini 搭載を明示。 */
export function TrustStrip() {
  return (
    <div className="border-y border-surface-200 bg-white py-5 sm:py-6">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700">
            <Image
              src="/logos/google-gemini.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 opacity-90 grayscale-[0.15]"
              aria-hidden
            />
            Gemini AI 搭載
          </span>
          {ITEMS.map((it) => (
            <span
              key={it.text}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700"
            >
              <it.icon className="h-4 w-4 text-primary-600" strokeWidth={2.2} />
              {it.text}
            </span>
          ))}
        </div>
      </Container>
    </div>
  )
}
