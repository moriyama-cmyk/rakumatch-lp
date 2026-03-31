import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 楽マッチ AI",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-50 text-neutral-900 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/"
            className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            &larr; トップページへ戻る
          </Link>

          <h1 className="text-2xl font-bold mt-6 mb-8">プライバシーポリシー</h1>

          <p className="text-sm text-neutral-500 mb-8">最終更新日: 2026年3月31日</p>

          <div className="space-y-8 text-neutral-700 leading-relaxed text-sm">
            <section>
              <p>
                楽マッチ AI（以下「本サービス」といいます）は、ユーザーの個人情報の保護を重要な責務と認識し、以下のとおりプライバシーポリシーを定め、個人情報の適切な管理・保護に努めます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">1. 取得する個人情報</h2>
              <p className="mb-2">本サービスでは、以下の個人情報を取得することがあります。</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>メールアドレス</li>
                <li>氏名（会社名・担当者名）</li>
                <li>クレジットカード情報（Stripeが管理。本サービスでは保持しません）</li>
                <li>本サービスの利用履歴・操作ログ</li>
                <li>ユーザーが本サービスに登録した顧客情報・物件情報等の業務データ</li>
                <li>IPアドレス、ブラウザ情報、Cookie情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">2. 個人情報の利用目的</h2>
              <p className="mb-2">取得した個人情報は、以下の目的で利用いたします。</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>本サービスの提供・運営・改善</li>
                <li>ユーザー認証およびアカウント管理</li>
                <li>利用料金の請求・決済処理</li>
                <li>お問い合わせへの対応</li>
                <li>サービスに関する通知・お知らせの送信</li>
                <li>利用状況の分析・統計処理（個人を特定しない形式）</li>
                <li>不正利用の防止・セキュリティの確保</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">3. 第三者提供</h2>
              <p className="mb-2">
                運営者は、以下の場合を除き、あらかじめユーザーの同意を得ることなく、個人情報を第三者に提供することはありません。
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>法令に基づく場合</li>
                <li>人の生命・身体または財産の保護のために必要がある場合で、ユーザーの同意を得ることが困難である場合</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">4. 第三者サービスの利用</h2>
              <p className="mb-2">本サービスでは、以下の第三者サービスを利用しています。各サービスにおける個人情報の取り扱いについては、各社のプライバシーポリシーをご確認ください。</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Supabase</strong> — 認証・データベース・ストレージの提供
                </li>
                <li>
                  <strong>Stripe</strong> — 決済処理（クレジットカード情報はStripeが管理し、本サービスのサーバーでは保持しません）
                </li>
                <li>
                  <strong>Google Gemini API</strong> — AI機能の提供
                </li>
                <li>
                  <strong>Vercel</strong> — ホスティング・配信
                </li>
                <li>
                  <strong>Google Analytics</strong> — アクセス解析（将来導入の可能性があります）。Cookieを使用してユーザーの利用状況を匿名で収集します。Google Analyticsのデータ取り扱いについては、Googleのプライバシーポリシーをご確認ください。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">5. Cookieについて</h2>
              <p>
                本サービスでは、ユーザーの認証状態の管理やサービスの改善のためにCookieを使用しています。ユーザーはブラウザの設定によりCookieの受け入れを拒否することができますが、その場合、本サービスの一部機能が利用できなくなる場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">6. 個人情報の安全管理</h2>
              <p>
                運営者は、個人情報の漏洩、滅失またはき損の防止その他の個人情報の安全管理のために、適切なセキュリティ対策を講じます。データベースへのアクセスは行レベルセキュリティ（RLS）により制御され、通信は全てSSL/TLSにより暗号化されています。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">7. 開示・訂正・削除の請求</h2>
              <p className="mb-2">
                ユーザーは、運営者に対し、自己の個人情報の開示、訂正、追加、削除、利用停止を請求することができます。請求を行う場合は、以下のお問い合わせ先までご連絡ください。本人確認の上、合理的な期間内に対応いたします。
              </p>
              <p>
                お問い合わせ先: <Link href="/contact" className="text-primary-600 hover:underline">お問い合わせページ</Link>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">8. データの保管と削除</h2>
              <p>
                ユーザーが退会した場合、ユーザーの個人情報および業務データは、退会後30日以内に削除されます。ただし、法令により保存が義務づけられている情報については、当該法令の定める期間保存するものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">9. プライバシーポリシーの変更</h2>
              <p>
                運営者は、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、本サービス上に掲載した時点から効力を生じるものとします。重要な変更がある場合は、本サービス上またはメールにて通知いたします。
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
