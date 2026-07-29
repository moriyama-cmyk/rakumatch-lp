"use client";

import "../lpv3.css";
import { ArrowLeft, ArrowRight, Check, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const screens = [
  {
    id: "input",
    label: "物件を取り込む",
    title: "文章・PDF・画像から、物件情報を整理",
    description: "貼り付けやドロップで情報を用意し、内容を確認してから登録します。",
    src: "/media/ai-input.webp",
  },
  {
    id: "match",
    label: "紹介先を探す",
    title: "物件から、合うお客様を確認",
    description: "候補のお客様、スコア、合う理由を同じ画面で確認できます。",
    src: "/media/property-ai-match.webp",
  },
  {
    id: "dashboard",
    label: "今日の動きを見る",
    title: "タスクと営業状況を一画面へ",
    description: "今日動く相手、契約進行、活動状況をダッシュボードで確認します。",
    src: "/media/dashboard.webp",
  },
  {
    id: "contract",
    label: "契約を進める",
    title: "契約の現在地をフェーズで管理",
    description: "売買契約の進行を6つのフェーズで確認し、次の作業へ進めます。",
    src: "/media/contract-flow.webp",
  },
];

export default function TryPage() {
  const [active, setActive] = useState(0);
  const screen = screens[active];

  const move = (direction: number) => {
    setActive((current) => (current + direction + screens.length) % screens.length);
  };

  // LP v3 の基礎スタイルをこのプレビュー内だけに適用する。
  return (
    <div className="lpv3">
    <main className="tryPage">
      <header className="tryHeader">
        <Link href="/" className="tryBrand" aria-label="楽マッチAI LPへ戻る">
          <img src="/media/rakumatch-icon.png" alt="" />
          <span>楽マッチ<em>AI</em></span>
        </Link>
        <Link href="/" className="tryBack"><ArrowLeft aria-hidden="true" />LPへ戻る</Link>
      </header>

      <section className="tryIntro">
        <span className="tryPill"><PlayCircle aria-hidden="true" />実画面プレビュー</span>
        <h1>「次に動く」が見える画面を、<br />順番に確かめてください。</h1>
        <p>この制作版では、デモデータを使った主要画面の流れを確認できます。AI処理やデータ保存は本番環境で利用します。</p>
      </section>

      <section className="tryDemo" aria-label="楽マッチAI 実画面プレビュー">
        <div className="tryTabs" role="tablist" aria-label="画面を選ぶ">
          {screens.map((item, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={active === index}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
              key={item.id}
            >
              <b>{index + 1}</b>{item.label}
            </button>
          ))}
        </div>

        <div className="tryStage" role="tabpanel">
          <div className="tryStageCopy">
            <small>STEP {active + 1}</small>
            <h2>{screen.title}</h2>
            <p>{screen.description}</p>
            <ul>
              <li><Check aria-hidden="true" />デモデータで表示</li>
              <li><Check aria-hidden="true" />個人情報は使用していません</li>
            </ul>
          </div>
          <div className="tryDevice">
            <div className="tryScreen">
              <img src={screen.src} alt={`${screen.title}の実画面`} />
              <span>デモデータ</span>
            </div>
            <i aria-hidden="true" />
          </div>
        </div>

        <div className="tryControls">
          <button type="button" onClick={() => move(-1)}><ArrowLeft aria-hidden="true" />前の画面</button>
          <span>{active + 1} / {screens.length}</span>
          <button type="button" onClick={() => move(1)}>次の画面<ArrowRight aria-hidden="true" /></button>
        </div>
      </section>

      <section className="tryFooterCta">
        <p>4つの画面を見終えたら、機能と料金をもう一度確認できます。</p>
        <Link href="/#pricing">料金を見る<ArrowRight aria-hidden="true" /></Link>
      </section>
    </main>
    </div>
  );
}
