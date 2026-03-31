# DNS 設定手順（お名前.com）

## 概要

| 用途 | ドメイン | 接続先 |
|------|---------|--------|
| LP（Next.js） | `rakumatch-ai.com` | Vercel `rakumatch-lp` プロジェクト |
| LP（www） | `www.rakumatch-ai.com` | Vercel `rakumatch-lp` プロジェクト |
| アプリ本体 | `app.rakumatch-ai.com` | Vercel `top-sales-ai` プロジェクト |

## 設定する DNS レコード一覧

| タイプ | ホスト名 | 値 | TTL |
|--------|---------|-----|-----|
| A | `rakumatch-ai.com`（空欄） | `76.76.21.21` | 3600 |
| CNAME | `www` | `cname.vercel-dns.com` | 3600 |
| CNAME | `app` | `cname.vercel-dns.com` | 3600 |

> **補足**: ルートドメイン（`rakumatch-ai.com`）は CNAME が使えないため A レコードを使用。
> `www` と `app` はサブドメインなので CNAME で Vercel に向ける。

## お名前.com での設定手順

### 1. DNS 設定画面を開く

1. [お名前.com Navi](https://navi.onamae.com/) にログイン
2. 上部メニュー「ネームサーバーの設定」→「DNS設定/転送設定」をクリック
3. `rakumatch-ai.com` を選択して「次へ」

### 2. DNS レコードを追加

「DNS レコード設定を利用する」の「設定する」をクリック。

#### レコード 1: ルートドメイン（LP 用）
- **ホスト名**: （空欄のまま）
- **TYPE**: `A`
- **VALUE**: `76.76.21.21`
- **TTL**: `3600`

#### レコード 2: www サブドメイン（LP 用）
- **ホスト名**: `www`
- **TYPE**: `CNAME`
- **VALUE**: `cname.vercel-dns.com`
- **TTL**: `3600`

#### レコード 3: app サブドメイン（アプリ本体用）
- **ホスト名**: `app`
- **TYPE**: `CNAME`
- **VALUE**: `cname.vercel-dns.com`
- **TTL**: `3600`

3 件とも追加したら「確認画面へ進む」→「設定する」

### 3. app サブドメインを Vercel アプリプロジェクトに追加

DNS レコード設定後、アプリ本体の Vercel プロジェクトにもドメインを追加する必要がある:

```bash
cd C:/Users/yukih/楽マッチ開発フォルダ/top-sales-ai
npx vercel domains add app.rakumatch-ai.com
```

または Vercel ダッシュボード → `top-sales-ai` プロジェクト → Settings → Domains → `app.rakumatch-ai.com` を追加。

## 設定後の確認

DNS 反映には最大 24〜48 時間かかるが、通常は数分〜1 時間程度。

### コマンドで確認

```bash
# ルートドメイン（A レコード → 76.76.21.21 が返れば OK）
nslookup rakumatch-ai.com

# www サブドメイン（CNAME → cname.vercel-dns.com が返れば OK）
nslookup www.rakumatch-ai.com

# app サブドメイン（CNAME → cname.vercel-dns.com が返れば OK）
nslookup app.rakumatch-ai.com
```

### ブラウザで確認

- https://rakumatch-ai.com → LP が表示される
- https://www.rakumatch-ai.com → LP にリダイレクトされる
- https://app.rakumatch-ai.com → アプリのログイン画面が表示される

> **注意**: SSL 証明書は Vercel が自動発行する。DNS が正しく設定されていれば数分で HTTPS が有効になる。

## Vercel ドメイン追加状況

- [x] `rakumatch-ai.com` → `rakumatch-lp` プロジェクトに追加済み
- [x] `www.rakumatch-ai.com` → `rakumatch-lp` プロジェクトに追加済み
- [ ] `app.rakumatch-ai.com` → `top-sales-ai` プロジェクトに追加（DNS 設定後に実施）

## アプリ側の環境変数更新（app サブドメイン設定後）

`top-sales-ai` の Vercel 環境変数で以下を更新する必要がある場合:

- `NEXT_PUBLIC_APP_URL` や CORS 設定に `app.rakumatch-ai.com` を追加
- Supabase の Redirect URLs に `https://app.rakumatch-ai.com/**` を追加
- Stripe の Webhook URL は Supabase Edge Function 経由なので変更不要
