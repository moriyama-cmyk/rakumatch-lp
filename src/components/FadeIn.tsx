"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

export default function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // 前庭障害ユーザ配慮: アニメ抑制設定のときは出現演出をせず即表示する。
    // matchMedia の matches を見て即 visible にする。globals.css の
    // prefers-reduced-motion ルールで transition も実質無効化されるため、
    // フェード/スライドは起きず初期状態のまま即座に最終表示になる。
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(([e]) => {
      if (reduce || e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}>
      {children}
    </div>
  );
}
