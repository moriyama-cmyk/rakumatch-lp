// LP v2（AB案）のページ組み立て。PORT_SPEC「ページ構成」の順序どおりに並べる。
// 1.ヘッダー 2.夜ヒーロー 3.転換点 4.夜明け 5.核ループ 6.機能ダイジェスト
// 7.お客様アプリ 8.詳細比較表 9.料金 10.開発者ストーリー 11.声 12.締めCTA
// 13.フッター 14.モバイル固定CTA
import { Lpv2Root } from './Lpv2Root'
// 2026-07-24 森山さん指示: ヘッダーは「今までの明るいもの（アイコン付き）」を使う。
// フッターも下層ページと共通のものに統一（Lpv2Header/Lpv2Footer はロールバック用に残置）。
import { Header } from '../lp/layout/Header'
import { Footer } from '../lp/layout/Footer'
import { NightStory } from './NightStory'
import { CoreLoopSection } from './CoreLoopSection'
import { FeatureDigestSection } from './FeatureDigestSection'
import { CustomerAppSection } from './CustomerAppSection'
import { CompareTableSection } from './CompareTableSection'
import { PricingSection } from './PricingSection'
import { DeveloperStorySection } from './DeveloperStorySection'
import { VoicesSection } from './VoicesSection'
import { FinalCtaSection } from './FinalCtaSection'
import { StickyMobileCta } from './StickyMobileCta'

export function Lpv2Page() {
  return (
    <Lpv2Root
      header={<Header solid />}
      story={<NightStory />}
      day={
        <>
          <CoreLoopSection />
          <FeatureDigestSection />
          <CustomerAppSection />
          <CompareTableSection />
          <PricingSection />
          <DeveloperStorySection />
          <VoicesSection />
          <FinalCtaSection />
        </>
      }
      footer={<Footer />}
      stickyCta={<StickyMobileCta />}
    />
  )
}
