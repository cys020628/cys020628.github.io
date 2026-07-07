/** @type {import('tailwindcss').Config} */
const rem = (px) => `${px / 16}rem`;

module.exports = {
  content: [
    './index.html',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          0: '#ffffff',
          50: '#f9fafb',
          100: '#f2f4f6',
          200: '#e5e8eb',
          300: '#d1d6db',
          400: '#b0b8c1',
          500: '#8b95a1',
          600: '#6b7684',
          700: '#4e5968',
          800: '#333d4b',
          900: '#191f28',
        },
        accent: {
          DEFAULT: '#3182f6',
          pressed: '#1b64da',
          soft: '#e8f3ff',
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'Pretendard', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: [rem(56), { lineHeight: '1.08', letterSpacing: '0', fontWeight: '800' }],
        headline: [rem(40), { lineHeight: '1.16', letterSpacing: '0', fontWeight: '800' }],
        title: [rem(24), { lineHeight: '1.34', letterSpacing: '0', fontWeight: '700' }],
        body: [rem(17), { lineHeight: '1.7', letterSpacing: '0', fontWeight: '500' }],
        caption: [rem(14), { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],
      },
      spacing: {
        18: rem(72),
        22: rem(88),
        26: rem(104),
        30: rem(120),
      },
      borderRadius: {
        toss: rem(24),
      },
      boxShadow: {
        card: '0 12px 32px rgba(25, 31, 40, 0.08)',
        'card-hover': '0 18px 48px rgba(25, 31, 40, 0.14)',
        cta: '0 10px 24px rgba(49, 130, 246, 0.26)',
      },
      transitionTimingFunction: {
        toss: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
};
