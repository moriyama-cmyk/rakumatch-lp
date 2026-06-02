import type { ReactNode } from "react";

export interface FeatureDemoMediaProps {
  /**
   * 差し替え予定のデモ動画ファイル名（/public 配下・例: "/demo-copypaste.mp4"）。
   * まだ用意できていない場合は fallback を表示する。差し替え時はこの値を渡し、
   * 同名の poster（任意）を置くだけでよい（後から差し替えやすい運用）。
   */
  video?: string;
  /** デモ動画のポスター画像（任意・例: "/demo-copypaste-poster.jpg"）。 */
  poster?: string;
  /** メディアの説明（コンプラ: 「デモ画面」明記）。aria-label に使う。 */
  alt?: string;
  /**
   * 動画がまだ無い間に表示する代替（既存の ScreenMockup / 内製図 / 既存画像など）。
   * video が未指定、または ready=false のときに表示する。
   */
  fallback: ReactNode;
  /**
   * デモ動画の準備が整ったか。既定 false（= fallback を表示）。
   * 差し替え担当が動画を /public に置いたら true にする（or video を渡しつつ true）。
   */
  ready?: boolean;
  /** キャプション（既定: デモ画面（イメージ）） */
  caption?: string;
}

/**
 * FeatureDemoMedia — /features/* のヒーロー／本文メディア枠。
 *
 * 「商品スクショ・デモ動画は後で差し替え前提のプレースホルダ運用」（タスク #4 ④）に対応するための
 * 差し替え用ラッパー。将来の動画ファイル名（demo-*.mp4 + poster）を受け取りつつ、
 * 用意できるまでは既存の代替メディア（fallback）をそのまま表示する。
 *
 * 差し替え手順（後日）:
 *   1. /public に demo-xxx.mp4（と任意で demo-xxx-poster.jpg）を置く
 *   2. 呼び出し側で video="/demo-xxx.mp4" poster="/demo-xxx-poster.jpg" ready を渡す
 * これだけで動画版に切り替わる。fallback はそのまま残しておけるので安全に戻せる。
 *
 * 注: VideoModal（src/components）は本タスクの編集対象外（poster 非対応）のため、
 * ここでは自前の <video>（軽い自動再生ループ・muted・playsInline）で枠だけ用意する。
 * クリック拡大が要るなら差し替え時に VideoModal 側へ poster 対応を入れて切り替える。
 *
 * コンプラ（COMPLIANCE_CHECKLIST §3/§8）: alt・caption に必ず「デモ画面」を明記する。
 */
export default function FeatureDemoMedia({
  video,
  poster,
  alt = "楽マッチ AI のデモ画面（イメージ）",
  fallback,
  ready = false,
  caption = "デモ画面（イメージ）",
}: FeatureDemoMediaProps) {
  const showVideo = ready && Boolean(video);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-md rounded-full bg-primary-50 opacity-70 blur-3xl" />
      {showVideo ? (
        <>
          <video
            src={video}
            poster={poster}
            aria-label={alt}
            autoPlay
            muted
            loop
            playsInline
            className="w-full rounded-2xl ring-1 ring-surface-200 shadow-[0_20px_60px_rgba(5,57,43,0.12)]"
          />
          <p className="mt-3 text-center text-sm text-ink-500">{caption}</p>
        </>
      ) : (
        fallback
      )}
    </div>
  );
}
