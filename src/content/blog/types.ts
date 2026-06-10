// ブログ記事の型定義。記事本文・metadata・JSON-LD をすべてこの1モデルから導出する
// （表示と構造化データを必ず一致させるため）。SEO_BRIEF §4 の方針に沿う。

/** 段落（複数行は配列で渡す） */
export type ParagraphBlock = {
  type: "p";
  text: string;
};

/** 箇条書き（順序なし） */
export type ListBlock = {
  type: "ul";
  items: string[];
};

/** 番号付きリスト（手順など） */
export type OrderedListBlock = {
  type: "ol";
  items: string[];
};

/** 小見出し（h3 相当・本文中の節） */
export type SubheadingBlock = {
  type: "h3";
  text: string;
};

/** 補足・注記カード（背景付き・景表法注記などに使う） */
export type NoteBlock = {
  type: "note";
  text: string;
};

/** チェックリスト（観点の一覧。各行に見出しと説明） */
export type ChecklistBlock = {
  type: "checklist";
  items: { label: string; desc: string }[];
};

/**
 * 比較表（GEO 対策＝生成AIが観点×タイプを抽出しやすい形）。
 * 法務: 特定社名で勝ち負けを書かない。列は「タイプ比較」に留める
 *（例: 表計算ソフト／一般的なCRM／不動産営業特化）。
 */
export type TableBlock = {
  type: "table";
  /** 表のキャプション（任意） */
  caption?: string;
  /** 先頭列のヘッダー名（観点の列見出し。例: 観点） */
  rowHeader: string;
  /** データ列の見出し（タイプ名。社名は入れない） */
  columns: string[];
  /** 各行: axis=観点、cells=各列のセル。cells.length は columns.length と一致させる */
  rows: { axis: string; cells: string[] }[];
};

/** 定義の明示（GEO 対策＝AIが定義を抜き出しやすい平文の用語＋説明） */
export type DefinitionBlock = {
  type: "definition";
  term: string;
  description: string;
};

export type ContentBlock =
  | ParagraphBlock
  | ListBlock
  | OrderedListBlock
  | SubheadingBlock
  | NoteBlock
  | ChecklistBlock
  | TableBlock
  | DefinitionBlock;

/** 大見出し（h2）で区切られる記事のセクション */
export type ArticleSection = {
  /** h2 見出し。目次にも使う */
  heading: string;
  /** 目次・本文アンカー用 id（英数ハイフン） */
  id: string;
  blocks: ContentBlock[];
};

export type FaqItem = {
  q: string;
  a: string;
};

export type BlogPost = {
  slug: string;
  /** ページ title（layout が「| 楽マッチ AI」を付与するので固有部のみ） */
  title: string;
  /** 一覧カード・リード文・meta description 兼用の要約 */
  description: string;
  /** カテゴリ表示（一覧のラベル） */
  category: string;
  /** 検索意図メモ（社内向け・表示しない） */
  searchIntent: string;
  /** ISO 8601 (YYYY-MM-DD) */
  datePublished: string;
  dateModified: string;
  /** 想定読了時間（分） */
  readingMinutes: number;
  /** 情報の基準時点（GEO 対策＝鮮度の明示。例: 2026年6月時点） */
  asOf: string;
  /** 導入文（リード。記事冒頭に大きめに表示） */
  lead: string;
  /**
   * 結論・要点の先出し（GEO 対策＝生成AIが冒頭から抜き出せる平文の要約）。
   * 質問→即答の構造で、各記事の検索意図に対する答えを2〜4行で。
   */
  keyTakeaways: string[];
  sections: ArticleSection[];
  faq: FaqItem[];
};
