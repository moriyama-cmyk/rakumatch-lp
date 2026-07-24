import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export type MockFrameVariant = 'phone' | 'desktop' | 'plain'

interface MockFrameProps {
  /** 'phone'=スマホ実機風の額装 / 'desktop'=ブラウザ風の額装 / 'plain'=額装なし(角丸カードのみ) */
  variant?: MockFrameVariant
  children: ReactNode
  className?: string
  /** ブラウザ風ヘッダーのURL文字列（desktop のみ使用） */
  chromeUrl?: string
  /** 「※架空データによる再現イメージ」注記の表示。既定=表示。 */
  note?: boolean
  /** 注記文言を差し替えたい場合のみ指定（基本は既定文言のまま使う）。 */
  noteText?: string
}

/**
 * LP内「アプリUIのコード製再現」の共通額装。
 *
 * ここに集約している安全対策（絶対ルール）:
 * - 外側に aria-hidden="true" を1つだけ付ける。中に入れる子要素は
 *   button/a/input/textarea 等フォーカス可能要素を絶対に含めないこと
 *   （実CTAはこの MockFrame の外に置く）。
 * - 「※架空データによる再現イメージ」注記をここでのみ出す。
 *   複数の部品（PropertyCard/MatchCard/AppSidebar/AiPanel等）を1画面として
 *   組み合わせるときは、それら全部をまとめて1つの MockFrame でラップし、
 *   注記が二重に出ないようにすること。
 */
export function MockFrame({
  variant = 'plain',
  children,
  className,
  chromeUrl = 'app.rakumatch-ai.com',
  note = true,
  noteText = '※架空データによる再現イメージ',
}: MockFrameProps) {
  return (
    // min-w-0: grid/flex の子になったとき、既定の min-width:auto で中身の実寸まで
    // トラックが広がり、親コンテナ(および隣の本文カラム)ごと画面幅を超えるのを防ぐ。
    // 2026-07-19 モバイル390pxで再現UIが413pxに膨らみ本文まで切れた事故の対策。
    <div className={cn('mx-auto min-w-0', className)}>
      <div className="min-w-0" aria-hidden="true">
        {variant === 'phone' && (
          <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[2.25rem] border border-ink-900/10 bg-white shadow-soft-lg">
            {/* ノッチ風の帯（実機の雰囲気だけ。装飾） */}
            <div className="flex items-center justify-center bg-white pb-1 pt-3">
              <span className="h-1 w-20 rounded-full bg-surface-200" />
            </div>
            {children}
            {/* ホームインジケーター風の帯 */}
            <div className="flex items-center justify-center bg-white pb-2 pt-1">
              <span className="h-1 w-24 rounded-full bg-ink-300/40" />
            </div>
          </div>
        )}

        {variant === 'desktop' && (
          <div className="overflow-hidden rounded-xl border border-ink-900/8 bg-white shadow-soft-lg">
            <div className="flex items-center gap-2 border-b border-surface-200 bg-surface-100 px-4 py-2.5">
              {/* 2026-07-24 Phase5: 灰一色→低彩度の赤黄緑信号機に（本物のブラウザ額装らしさ） */}
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
              {/* 再現UI内の文字は最小14px（text-sm）。以前は 0.7rem=11.2px で読めなかった。 */}
              {/* min-w-0 が無いと flex 子の既定 min-width:auto で truncate が効かず、
                  長いURLがそのまま枠を押し広げる（モバイルで実際に起きた）。 */}
              <span className="ml-3 min-w-0 truncate rounded-md bg-white px-3 py-1 text-sm text-ink-500 ring-1 ring-surface-200">
                {chromeUrl}
              </span>
            </div>
            {children}
          </div>
        )}

        {variant === 'plain' && (
          <div className="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-soft">
            {children}
          </div>
        )}
      </div>

      {note && <p className="mt-2 text-center text-xs text-ink-500">{noteText}</p>}
    </div>
  )
}
