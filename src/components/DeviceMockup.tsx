/**
 * DeviceMockup — MacBook Air + iPhone 15 style CSS mockup
 * Realistic thin bezels, notch (MacBook), Dynamic Island (iPhone).
 */

import Image from "next/image";

interface Props {
  desktopSrc?: string;
  mobileSrc?: string;
  desktopAlt?: string;
  mobileAlt?: string;
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="text-xl sm:text-2xl font-bold tracking-tight text-primary-600 mb-1">
        楽マッチ AI
      </div>
      <div className="text-[10px] sm:text-xs text-gray-400">{label}</div>
    </div>
  );
}

export default function DeviceMockup({
  desktopSrc,
  mobileSrc,
  desktopAlt = "楽マッチ AI デスクトップ画面",
  mobileAlt = "楽マッチ AI モバイル画面",
}: Props) {
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* ════════ MacBook Air ════════ */}
      <div className="relative">
        {/* Screen lid */}
        <div
          className="relative mx-auto w-[88%] rounded-[16px] bg-[#1d1d1f] p-[6px]"
          style={{
            boxShadow:
              "0 -1px 0 0 rgba(255,255,255,0.08) inset, 0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {/* Notch (MacBook style) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[14%] h-[10px] bg-[#1d1d1f] rounded-b-[8px]" />
          {/* Camera dot inside notch */}
          <div className="absolute top-[2px] left-1/2 -translate-x-1/2 z-20 h-[4px] w-[4px] rounded-full bg-[#3a3a3c]">
            <div className="absolute top-[0.5px] left-[0.5px] h-[3px] w-[3px] rounded-full bg-[#1a3a5c]/30" />
          </div>

          {/* Screen */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[13px] bg-white">
            {desktopSrc ? (
              <Image
                src={desktopSrc}
                alt={desktopAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 700px"
                priority
              />
            ) : (
              <Placeholder label="デスクトップ画面" />
            )}
          </div>
        </div>

        {/* Hinge — aluminum strip, wider than screen */}
        <div
          className="relative mx-auto w-[100%] h-[10px]"
          style={{
            background:
              "linear-gradient(to bottom, #a8a8aa 0%, #c8c8ca 20%, #d6d6d8 50%, #c0c0c2 80%, #b0b0b2 100%)",
            borderRadius: "0 0 2px 2px",
          }}
        >
          {/* Center opening notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[16%] h-[4px] rounded-b-[5px] bg-[#8e8e90]" />
        </div>

        {/* Base — bottom wedge */}
        <div
          className="relative mx-auto h-[7px]"
          style={{
            width: "98%",
            background:
              "linear-gradient(to bottom, #c4c4c6, #d8d8da)",
            borderRadius: "0 0 16px 16px",
          }}
        />
        {/* Bottom edge shadow */}
        <div
          className="mx-auto h-[2px] rounded-b-full opacity-15"
          style={{
            width: "100%",
            background: "linear-gradient(to right, transparent 3%, rgba(0,0,0,0.3) 50%, transparent 97%)",
          }}
        />
      </div>

      {/* ════════ iPhone 15 (Dynamic Island) ════════ */}
      <div className="absolute -bottom-6 right-[2%] sm:right-[5%] w-[20%] min-w-[85px] max-w-[150px] z-10">
        <div
          className="relative rounded-[24px] bg-[#1d1d1f] p-[3px]"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05) inset",
          }}
        >
          {/* Side button — right */}
          <div className="absolute -right-[2px] top-[22%] h-[12%] w-[2px] rounded-r-sm bg-[#2a2a2c]" />
          {/* Side buttons — left (volume + silent) */}
          <div className="absolute -left-[2px] top-[18%] h-[5%] w-[2px] rounded-l-sm bg-[#2a2a2c]" />
          <div className="absolute -left-[2px] top-[26%] h-[9%] w-[2px] rounded-l-sm bg-[#2a2a2c]" />
          <div className="absolute -left-[2px] top-[37%] h-[9%] w-[2px] rounded-l-sm bg-[#2a2a2c]" />

          {/* Screen area */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[21px] bg-white">
            {/* Dynamic Island */}
            <div className="absolute top-[3%] left-1/2 -translate-x-1/2 z-10 w-[28%] h-[3.2%] bg-[#1d1d1f] rounded-full" />

            {mobileSrc ? (
              <Image
                src={mobileSrc}
                alt={mobileAlt}
                fill
                className="object-cover object-top"
                sizes="150px"
                priority
              />
            ) : (
              <Placeholder label="モバイル画面" />
            )}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[30%] h-[2px] rounded-full bg-[#555]" />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-8" />
    </div>
  );
}
