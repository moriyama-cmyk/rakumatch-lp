import type { BlogPost } from "./types";
import { realEstateCrmChoosing } from "./real-estate-crm-choosing";
import { soloAgentCustomerManagement } from "./solo-agent-customer-management";
import { callRecordingAiSummary } from "./call-recording-ai-summary";
import { reinsStatusRegistration } from "./reins-status-registration";

export type { BlogPost } from "./types";

// ブログ記事の一覧。新しい記事を足すときは import して、この配列の先頭に追加する
// （新しい順に並べる）。slug は URL になるので英数ハイフンのみ・重複させない。
export const BLOG_POSTS: BlogPost[] = [
  realEstateCrmChoosing,
  soloAgentCustomerManagement,
  callRecordingAiSummary,
  reinsStatusRegistration,
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const BLOG_BASE_PATH = "/blog";
