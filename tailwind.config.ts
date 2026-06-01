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
        },
        surface: {
          50: '#FAFAF8',
          100: '#F5F3EF',
          200: '#E5E2DD',
        },
        // アクセント（上品ゴールド）: 数値強調・実績バッジ・極細ラインのみ。面塗り禁止。
        accent: {
          50: '#FBF7EE',
          500: '#C8A24A',
          600: '#A8842F',
        },
        // インク（黒に緑を一滴）: 純黒を避け本文を上品に。
        ink: {
          500: '#5E6B64',
          700: '#36433D',
          900: '#0F1A16',
        },
      },
    },
  },
  plugins: [],
};

export default config;
