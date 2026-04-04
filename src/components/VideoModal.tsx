"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  src: string;
  className?: string;
}

export default function VideoModal({ src, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* サムネイル動画（クリックで拡大） */}
      <div
        className="relative cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        <video
          src={src}
          className={className}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 group-hover:bg-black/20 transition-colors duration-200">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-full px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-lg">
            クリックで拡大
          </div>
        </div>
      </div>

      {/* モーダル */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-7 w-7" />
            </button>
            <video
              src={src}
              className="w-full rounded-xl shadow-2xl"
              autoPlay
              controls
              playsInline
            />
          </div>
        </div>
      )}
    </>
  );
}
