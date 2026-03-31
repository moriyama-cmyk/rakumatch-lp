import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  description: "楽マッチ AI の利用規約です。サービスのご利用条件をご確認ください。",
  openGraph: {
    title: "利用規約 | 楽マッチ AI",
    description: "楽マッチ AI の利用規約です。サービスのご利用条件をご確認ください。",
    url: "https://rakumatch-ai.com/terms",
  },
  alternates: {
    canonical: "https://rakumatch-ai.com/terms",
  },
};

export default function TermsPage() {
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

          <h1 className="text-2xl font-bold mt-6 mb-8">利用規約</h1>

          <p className="text-sm text-neutral-500 mb-8">最終更新日: 2026年3月31日</p>

          <div className="space-y-8 text-neutral-700 leading-relaxed text-sm">
            <section>
              <h2 className="text-lg font-bold mb-3">第1条（適用）</h2>
              <p>
                本規約は、楽マッチ AI（以下「本サービス」といいます）の利用に関する条件を定めるものであり、本サービスを利用する全てのユーザー（以下「ユーザー」といいます）に適用されます。ユーザーは、本規約に同意の上、本サービスを利用するものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第2条（定義）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>「本サービス」とは、運営者が提供する不動産売買向けAI営業支援SaaSサービス「楽マッチ AI」をいいます。</li>
                <li>「ユーザー」とは、本規約に同意の上、本サービスの利用登録を行った個人または法人をいいます。</li>
                <li>「コンテンツ」とは、ユーザーが本サービスを通じて登録・送信・保存したデータ、テキスト、画像等の情報をいいます。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第3条（利用登録）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>利用希望者は、運営者が定める方法により利用登録を申請するものとします。</li>
                <li>運営者は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>虚偽の事項を届け出た場合</li>
                    <li>本規約に違反したことがある者からの申請である場合</li>
                    <li>その他、運営者が利用登録を相当でないと判断した場合</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第4条（料金および支払方法）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>ユーザーは、本サービスの有料部分の対価として、運営者が別途定める利用料金を支払うものとします。</li>
                <li>支払いはクレジットカード（Stripe経由）により行うものとします。</li>
                <li>ユーザーが利用料金の支払いを遅滞した場合、運営者はサービスの提供を停止することができるものとします。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第5条（禁止事項）</h2>
              <p className="mb-2">ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>本サービスのサーバーまたはネットワークの機能を破壊、妨害する行為</li>
                <li>本サービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集、蓄積する行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>他のユーザーに成りすます行為</li>
                <li>本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li>本サービスのリバースエンジニアリング、逆コンパイル、逆アセンブルを行う行為</li>
                <li>本サービスを再販売、サブライセンスする行為</li>
                <li>その他、運営者が不適切と判断する行為</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第6条（本サービスの提供の停止等）</h2>
              <p className="mb-2">運営者は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>本サービスにかかるシステムの保守点検または更新を行う場合</li>
                <li>地震、落雷、火災、停電、天災等の不可抗力により、本サービスの提供が困難となった場合</li>
                <li>その他、運営者が本サービスの提供が困難と判断した場合</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第7条（退会）</h2>
              <p>ユーザーは、運営者の定める手続きにより、いつでも本サービスから退会できるものとします。退会した場合、ユーザーのデータは運営者の定める期間経過後に削除されます。</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第8条（保証の否認および免責事項）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>運営者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティに関する欠陥、エラー・バグ、権利侵害等を含みます）がないことを明示的にも黙示的にも保証しておりません。</li>
                <li>運営者は、本サービスに起因してユーザーに生じたあらゆる損害について、運営者の故意または重過失による場合を除き、一切の責任を負いません。</li>
                <li>本サービスが提供するAIによる提案・分析結果は参考情報であり、最終的な判断はユーザーの責任で行うものとします。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第9条（知的財産権）</h2>
              <p>本サービスに関する知的財産権は全て運営者または運営者にライセンスを許諾している者に帰属します。ユーザーが本サービスに登録したコンテンツの知的財産権はユーザーに帰属しますが、運営者はサービスの提供・改善のために当該コンテンツを利用できるものとします。</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第10条（利用規約の変更）</h2>
              <p>運営者は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、本サービス上に掲載した時点から効力を生じるものとします。</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第11条（個人情報の取扱い）</h2>
              <p>
                本サービスの利用によって取得する個人情報については、
                <Link href="/privacy" className="text-primary-600 hover:underline">プライバシーポリシー</Link>
                に従い適切に取り扱うものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第12条（準拠法・管轄裁判所）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
                <li>本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">第13条（解約後のデータ取り扱い）</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>サブスクリプション解約後、30日間はお客様のデータ（顧客情報、物件情報、活動履歴等）を保持します。この期間内に再契約いただいた場合、データは復元されます。</li>
                <li>解約後30日を経過した時点で、お客様の全データを完全かつ不可逆的に削除します。削除されたデータの復元はできません。</li>
                <li>解約前にデータの保存を希望される場合は、アプリ内の設定ページからCSV形式でエクスポートが可能です。解約後のデータエクスポートのご依頼には対応いたしかねます。</li>
              </ol>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
