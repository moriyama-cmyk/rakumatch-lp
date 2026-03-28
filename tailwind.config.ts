import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
};

export default config;
