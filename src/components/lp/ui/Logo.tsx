import Image from 'next/image'
import { cn } from '../lib/cn'

type LogoProps = {
  className?: string
  withWordmark?: boolean
}

/** 楽マッチ AI のロゴ。マークは実アプリアイコン（紺の家＋金のきらめき）。 */
export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src="/icon-192.png"
        alt="楽マッチ AI"
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl"
      />
      {withWordmark && (
        <span className="text-lg font-bold tracking-tight text-ink-900">
          楽マッチ<span className="ml-1 text-primary-600">AI</span>
        </span>
      )}
    </span>
  )
}
