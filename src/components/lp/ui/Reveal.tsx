import { createElement, type ReactNode } from 'react'
import { cn } from '../lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  /** 既存呼び出しとの互換用。静的表示では視認性を優先し、遅延は適用しない。 */
  delay?: number
  as?: 'div' | 'li' | 'span'
}

/**
 * コンテンツを常に可視で描画する軽量ラッパー。
 *
 * 旧実装は各要素に IntersectionObserver と state を持たせていたため、React 19.2 の
 * ref安全性ルールに抵触し、画面外要素が一時的に空白になる余地もあった。LPでは
 * 読めることと初期表示速度を優先し、装飾的な出現演出を外してServer Component化する。
 */
export function Reveal({ children, className, as = 'div' }: RevealProps) {
  return createElement(as, { className: cn('min-w-0', className) }, children)
}
