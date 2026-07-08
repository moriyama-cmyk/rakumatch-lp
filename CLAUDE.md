@AGENTS.md

## Agent Teams ルール

ユーザーが「チームで」「エージェントチームで」「並列で」「チームを組んで」などと指示した場合、
Agent Teams（TeamCreate）を編成して対応すること。
Agent Teams は実験的機能のため、環境変数 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` の有効化が必要（このリポジトリ内には現状 settings.json は無く、未設定）。

## 2台運用ルール（ノート／デスクトップ母艦）

このリポジトリは**ノートPCとデスクトップ母艦の2台**で編集する。片方でのpush忘れ→もう片方でconflict等の事故を防ぐため、以下を必ず守る。

- **作業開始前に必ず `git pull`**（origin/master を最新化）してから編集を始める。
- **作業を終えたら必ず `git commit` & `git push` してから離席**する（もう一台ですぐ続けられる状態にする）。
- **コードの実体を Google ドライブ（`G:\` 等）に置かない**。clone は `C:\dev\rakumatch` のようなローカルディスクに置く。
- **`node_modules` はコミットしない**（`.gitignore` 済みの想定）。各台で `npm install` する。
- **秘密情報（`.env.local` 等）はコミットしない**。各台でローカルに用意する（本番の値は Vercel / Supabase 側が正）。
- **2台で同時に同じ箇所を触らない**。片方で作業中はもう片方で編集しない（作業台は1台ずつ）。
