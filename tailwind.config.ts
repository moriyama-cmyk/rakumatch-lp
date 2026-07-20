import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // next/font が定義する --font-sans（Noto Sans JP）を Tailwind の font-sans でも使う。
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      // 本文の行間。Tailwind 既定の relaxed(1.625) は日本語の長文だと詰まって読みにくい。
      // この LP では leading-relaxed は本文（読み物）にのみ使っているため、ここを 1.85 に
      // 引き上げることで、文章ブロックを横断的に読みやすくする（見出し・ボタンには無影響）。
      lineHeight: {
        relaxed: '1.85',
      },
      colors: {
        primary: {
          50: '#E6F5F0',
          100: '#CCEBE1',
          200: '#99D7C3',
          300: '#66C3A5',
          400: '#33AF87',
          500: '#0D9B76',
          600: '#0D7C66',
          700: '#0A6652',
          800: '#084F3F',
          900: '#05392B',
          DEFAULT: '#0D9B76',
        },
        surface: {
          0: '#FFFFFF', // 明示用（bg-white と等価。章区切りコードの可読性のため）
          50: '#FAFAF8',
          100: '#F5F3EF',
          150: '#EFECE6', // 背景の3段目。痛み章・人の章に使う
          200: '#E5E2DD', // 罫線
          900: '#0F1A16', // FinalCta のダーク面のみ
        },
        // アクセント（上品ゴールド）: 数値強調・実績バッジ・極細ラインのみ。面塗り禁止。
        accent: {
          50: '#FBF7EE',
          500: '#C8A24A',
          600: '#A8842F', // 24px以上のboldのみ（3:1をクリア）
          700: '#7A5F1F', // 24px未満のテキストは必ずこちら（白地6.03:1 / accent-50地5.64:1）
        },
        // インク（黒に緑を一滴）: 純黒を避け本文を上品に。
        ink: {
          300: '#9BA5A0', // 装飾専用（矢印/罫）。テキスト禁止
          400: '#7C8880', // 装飾専用（白地3.69:1）。テキスト禁止
          500: '#5E6B64', // 注記（5.46:1）
          600: '#4A5751', // テキスト可（7.57:1）
          700: '#36433D', // 本文
          800: '#22302A', // テキスト可
          900: '#0F1A16', // 見出し
        },
      },
      letterSpacing: {
        jp: '0.02em',
      },
      // 以下、トップページ新デザイン（lp-bold 版）で用いるトークン。
      // 既存トークンは変更せず追記のみ（DESIGN_MODERN_LIGHT 準拠・Vite版と同値）。
      fontSize: {
        // LPの受入条件: 注記・ラベルを含め、可読文字は14px未満にしない。
        xs: ['0.875rem', { lineHeight: '1.55' }],
        // clamp ベースの大きな見出し（型は大胆・質感はクリーン）
        'display-2xl': ['clamp(2.125rem, 6.4vw, 4rem)', { lineHeight: '1.16', letterSpacing: '-0.005em', fontWeight: '700' }],
        'display-xl': ['clamp(1.75rem, 4.4vw, 3rem)', { lineHeight: '1.24', letterSpacing: '-0.005em', fontWeight: '700' }],
        'display-lg': ['clamp(1.5rem, 3.6vw, 2.5rem)', { lineHeight: '1.32', letterSpacing: '-0.005em', fontWeight: '600' }],
        'display-md': ['clamp(1.25rem, 2.6vw, 1.625rem)', { lineHeight: '1.45', letterSpacing: '0', fontWeight: '600' }],
      },
      maxWidth: {
        container: '1180px',
        'container-narrow': '860px',
      },
      boxShadow: {
        // 柔らかく低不透明（Stripe/Notion風）
        soft: '0 1px 2px rgba(15,26,22,0.04), 0 4px 16px -4px rgba(15,26,22,0.08)',
        'soft-md': '0 2px 4px rgba(15,26,22,0.04), 0 12px 32px -8px rgba(15,26,22,0.12)',
        'soft-lg': '0 8px 40px -12px rgba(15,26,22,0.16)',
        cta: '0 4px 14px -4px rgba(13,124,102,0.4)',
      },
      backgroundImage: {
        // 極薄グラデのみ
        'fade-surface': 'linear-gradient(180deg, #FFFFFF 0%, #FAFAF8 100%)',
        'fade-primary': 'linear-gradient(180deg, #E6F5F0 0%, #FAFAF8 100%)',
      },
      keyframes: {
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'rise-in': 'rise-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
