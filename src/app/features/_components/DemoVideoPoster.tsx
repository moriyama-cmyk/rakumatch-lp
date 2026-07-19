"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export interface DemoVideoPosterProps {
  /** 動画ファイル（/public 配下・例: "/reins-bulk.mp4"） */
  src: string;
  /** ポスター画像（必須・例: "/demo-copypaste-poster.jpg"） */
  poster: string;
  /** ポスターの alt（コンプラ: 「デモ画面」明記） */
  alt: string;
  /** 下のキャプション（既定: デモ画面（イメージ）。クリックで再生できます。） */
  caption?: string;
}

/**
 * DemoVideoPoster — ポスター画像＋再生ボタンのデモ動画枠。
 *
 * DESIGN_SYSTEM §8「自動再生は避け、ポスター画像＋再生ボタンに」に準拠。
 * 初期表示は静止画（next/image）のみで動画はロードしない（preload="none" 相当の通信節約）。
 * クリックして初めて <video preload="none"> を差し込み、その場で再生する。
 * 14MB級の動画を常時自動再生していた従来挙動を置き換える。
 *
 * コンプラ（COMPLIANCE_CHECKLIST §3/§8）: alt・caption に「デモ画面」を明記する。
 */
export default function DemoVideoPoster({
  src,
  poster,
  alt,
  caption = "デモ画面（イメージ）。クリックで再生できます。",
}: DemoVideoPosterProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-md rounded-full bg-primary-50 opacity-70 blur-3xl" />

      {playing ? (
        <video
          src={src}
          poster={poster}
          preload="none"
          controls
          autoPlay
          playsInline
          aria-label={alt}
          className="aspect-[16/10] w-full rounded-xl object-cover ring-1 ring-surface-200 shadow-soft-lg"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${alt}を再生`}
          className="group relative block w-full overflow-hidden rounded-xl ring-1 ring-surface-200 shadow-soft-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <Image
            src={poster}
            alt={alt}
            width={1376}
            height={860}
            sizes="(max-width: 1024px) 100vw, 600px"
            priority
            className="aspect-[16/10] w-full object-cover"
          />
          {/* 再生ボタン（中央・クリック誘導） */}
          <span className="absolute inset-0 flex items-center justify-center bg-ink-900/0 transition-colors group-hover:bg-ink-900/10">
            <span className="flex size-16 items-center justify-center rounded-full bg-white/90 text-primary-700 shadow-lg transition group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
              <Play className="ml-0.5 h-7 w-7 fill-current" aria-hidden="true" />
            </span>
          </span>
        </button>
      )}

      <p className="mt-3 text-center text-sm text-ink-500">{caption}</p>
    </div>
  );
}
