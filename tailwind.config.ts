import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: '#6347ff',
          dark: '#080033',
          medium: '#4b2fe4',
          light: '#f2f0ff',
        },
        neutral: {
          dark: '#1a1a1a',
          matterhorn: '#4d5357',
          grey: '#737c82',
          'fortress-grey': '#b2b9bd',
          whisper: '#e4e6e7',
          'white-smoke': '#eef0f1',
          azure: '#f7f7f8',
          'black-pearl': '#101317',
        },
        accent: {
          info: '#0e1096',
          'info-dark': '#04052f',
          'info-medium': '#0a0c70',
          'info-light': '#f1f1fe',
          success: '#008562',
          'success-dark': '#003326',
          'success-medium': '#00664b',
          'success-light': '#e7f8f4',
          danger: '#dd2132',
          'danger-dark': '#2c070a',
          'danger-medium': '#c31d2c',
          'danger-light': '#fce9eb',
          warning: '#f6a728',
          'warning-dark': '#311f02',
          'warning-medium': '#eb950a',
          'warning-light': '#fcf4e6',
        },
      },
    },
  },
  plugins: [],
};
export default config;
