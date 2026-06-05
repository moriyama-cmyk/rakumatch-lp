// 軽量 className 連結ヘルパー（clsx 相当の最小実装。依存を増やさない）
export type ClassValue = string | number | null | false | undefined | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = []
  for (const i of inputs) {
    if (!i) continue
    if (Array.isArray(i)) {
      const inner = cn(...i)
      if (inner) out.push(inner)
    } else {
      out.push(String(i))
    }
  }
  return out.join(' ')
}
