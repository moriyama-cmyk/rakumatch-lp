import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: "楽マッチ AI の特定商取引法に基づく表記です。事業者情報をご確認ください。",
  openGraph: {
    title: "特定商取引法に基づく表記 | 楽マッチ AI",
    description: "楽マッチ AI の特定商取引法に基づく表記です。事業者情報をご確認ください。",
    url: "https://rakumatch-ai.com/tokusho",
  },
  alternates: {
    canonical: "https://rakumatch-ai.com/tokusho",
  },
};

export default function TokushoPage() {
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

          <h1 className="text-2xl font-bold mt-6 mb-8">特定商取引法に基づく表記</h1>

          <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-surface-200">
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">事業者名</th>
                  <td className="px-6 py-4">森山 幸弘</td>
                </tr>
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">所在地</th>
                  <td className="px-6 py-4">神奈川県川崎市高津区二子1-19-2</td>
                </tr>
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">電話番号</th>
                  <td className="px-6 py-4">080-3956-7935</td>
                </tr>
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">メールアドレス</th>
                  <td className="px-6 py-4">moriyama@fm-y.com</td>
                </tr>
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">運営統括責任者</th>
                  <td className="px-6 py-4">代表 森山 幸弘</td>
                </tr>
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">販売価格</th>
                  <td className="px-6 py-4">
                    <ul className="space-y-1">
                      <li>Standard プラン: 月額 3,000円（税別）/ 人</li>
                      <li>Premium プラン: 月額 5,000円（税別）/ 人</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">販売価格以外の必要料金</th>
                  <td className="px-6 py-4">消費税、インターネット接続に必要な通信料等はお客様のご負担となります。</td>
                </tr>
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">支払方法</th>
                  <td className="px-6 py-4">クレジットカード（Stripe経由）</td>
                </tr>
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">支払時期</th>
                  <td className="px-6 py-4">月額課金（毎月自動決済）。初回は無料トライアル期間終了後に課金されます。</td>
                </tr>
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">役務の提供時期</th>
                  <td className="px-6 py-4">決済完了後、即時ご利用いただけます。</td>
                </tr>
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">返品・キャンセル</th>
                  <td className="px-6 py-4">
                    <p>デジタルサービスの性質上、お支払い後の返金はいたしかねます。</p>
                    <p className="mt-1">無料トライアル期間（1週間）内に解約された場合、料金は一切発生しません。</p>
                    <p className="mt-1">有料期間中の解約は、次回更新日まで引き続きサービスをご利用いただけます。</p>
                  </td>
                </tr>
                <tr>
                  <th className="text-left font-semibold bg-surface-50 px-6 py-4 w-1/3 align-top">動作環境</th>
                  <td className="px-6 py-4">最新版のGoogle Chrome、Safari、Microsoft Edge、Firefox。インターネット接続が必要です。</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
