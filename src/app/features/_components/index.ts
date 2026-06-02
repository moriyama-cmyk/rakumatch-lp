/**
 * /features/* 共通基盤コンポーネントのバレル。
 * C/D/E（call-recording / matching / property-input）はここから import する。
 *
 *   import {
 *     FeaturePageShell, FeatureHero, FeatureSection,
 *     FeaturePointGrid, StepList, RequirementCard,
 *     FeatureFAQ, FeatureCTA, RelatedFeatures,
 *   } from "@/app/features/_components";
 */
export { default as FeaturePageShell } from "./FeaturePageShell";
export { default as FeatureHero } from "./FeatureHero";
export { default as FeatureSection } from "./FeatureSection";
export { default as FeaturePointGrid } from "./FeaturePointGrid";
export { default as StepList } from "./StepList";
export { default as RequirementCard } from "./RequirementCard";
export { default as FeatureFAQ } from "./FeatureFAQ";
export { default as FeatureCTA } from "./FeatureCTA";
export { default as FeatureBreadcrumb } from "./FeatureBreadcrumb";
export { default as RelatedFeatures } from "./RelatedFeatures";
export { default as FeatureDemoMedia } from "./FeatureDemoMedia";
export { default as DemoVideoPoster } from "./DemoVideoPoster";

export type { FeatureHeroProps } from "./FeatureHero";
export type { FeatureSectionProps } from "./FeatureSection";
export type { FeaturePoint } from "./FeaturePointGrid";
export type { Step } from "./StepList";
export type { RequirementItem } from "./RequirementCard";
export type { FaqItem } from "./FeatureFAQ";
export type { FeatureCTAProps } from "./FeatureCTA";
export type { Crumb } from "./FeatureBreadcrumb";
export type { RelatedFeature } from "./RelatedFeatures";
export type { FeatureDemoMediaProps } from "./FeatureDemoMedia";
export type { DemoVideoPosterProps } from "./DemoVideoPoster";
