/**
 * ScreenMockup — Single MacBook Air style mockup for feature sections.
 */

import Image from "next/image";

interface Props {
  src?: string;
  alt?: string;
  label?: string;
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="text-lg font-bold tracking-tight text-primary-600 mb-1">
        楽マッチ AI
      </div>
      <div className="text-[10px] text-gray-400">{label}</div>
    </div>
  );
}

export default function ScreenMockup({
  src,
  alt = "楽マッチ AI 画面",
  label = "スクリーンショット準備中",
}: Props) {
  return (
    <div className="w-full">
      {/* Screen lid */}
      <div
        className="relative mx-auto rounded-t-[12px] bg-[#1d1d1f] p-[5px] pb-0"
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[14%] h-[8px] bg-[#1d1d1f] rounded-b-[6px]" />
        <div className="absolute top-[1.5px] left-1/2 -translate-x-1/2 z-20 h-[3px] w-[3px] rounded-full bg-[#3a3a3c]" />

        {/* Screen */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[10px] bg-white">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 90vw, 500px"
            />
          ) : (
            <Placeholder label={label} />
          )}
        </div>
      </div>

      {/* Hinge */}
      <div
        className="relative mx-auto w-full h-[8px]"
        style={{
          background:
            "linear-gradient(to bottom, #a8a8aa 0%, #c8c8ca 20%, #d6d6d8 50%, #c0c0c2 80%, #b0b0b2 100%)",
          borderRadius: "0 0 2px 2px",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[16%] h-[3px] rounded-b-[4px] bg-[#8e8e90]" />
      </div>

      {/* Base wedge — wider */}
      <div
        className="relative mx-auto h-[4px]"
        style={{
          width: "108%",
          maxWidth: "100%",
          background: "linear-gradient(to bottom, #c4c4c6, #d8d8da)",
          borderRadius: "0 0 8px 8px",
          clipPath: "polygon(1.5% 0%, 98.5% 0%, 100% 100%, 0% 100%)",
        }}
      />
    </div>
  );
}
