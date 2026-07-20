import { Header } from "@/components/lp/layout/Header";
import { Footer } from "@/components/lp/layout/Footer";
import { StickyCta } from "@/components/lp/layout/StickyCta";
import { Hero } from "@/components/lp/sections/Hero";
import { Problem } from "@/components/lp/sections/Problem";
import { CapabilitySuite } from "@/components/lp/sections/CapabilitySuite";
import { SignalFlow } from "@/components/lp/sections/SignalFlow";
import { Story } from "@/components/lp/sections/Story";
import { Why } from "@/components/lp/sections/Why";
import { Voices } from "@/components/lp/sections/Voices";
import { Security } from "@/components/lp/sections/Security";
import { Pricing } from "@/components/lp/sections/Pricing";
import { Faq } from "@/components/lp/sections/Faq";
import { FinalCta } from "@/components/lp/sections/FinalCta";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-surface-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:min-h-11 focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-3 focus:text-sm focus:text-white"
      >
        本文へスキップ
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <Problem />
        <SignalFlow />
        <CapabilitySuite />
        <Story />
        <Pricing />
        <Why />
        <Voices />
        <Security />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
      <StickyCta />
    </div>
  );
}
