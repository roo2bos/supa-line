import forms from '@tailwindcss/forms';

import type { Config } from 'tailwindcss';

export const px0_2000 = Object.fromEntries(
  Array.from({ length: 2001 }, (_, i) => [`${i}`, `${i}px`])
);

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      tablet: '768px',
      laptop: '1024px',
      desktop: '1280px',
      'desktop-lg': '1440px',
      'desktop-xl': '1921px',
      'micro-only': { max: '320px' },
      'mobile-only': { max: '767px' },
      'tablet-only': { min: '768px', max: '1279px' },
      'mobile-tablet': { max: '1279px' },
    },
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      white: '#fff',
      black: '#000',
      error: '#fa2e43',
      primary: {
        light: '#ecf3ff',
        DEFAULT: '#2563eb',
      },
      dark: {
        light: '#26282f',
        DEFAULT: '#13151b',
      },
      slate: {
        100: '#f7f8fa',
        200: '#f2f3f5',
      },
      gray: {
        100: '#fafafa',
        200: '#f4f4f4',
        300: '#ebebeb',
        400: '#e0e0e0',
        500: '#c8c8c8',
        600: '#888',
        700: '#555',
        800: '#20222d',
      },
      blue: {
        light: '#f2f2ff',
        DEFAULT: '#6060e9',
      },
    },
    fontSize: {
      inherit: 'inherit',
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '40px',
      '5xl': '48px',
      '6xl': '64px',
    },
    fontFamily: {
      sans: 'var(--font-pretendard)',
      // sans: 'var(--font-noto-sans)',
      // sans: ['"Noto Sans"', 'sans-serif'],
      jomhuria: 'var(--font-jomhuria)',
      smooch: 'var(--font-smooch)',
      oleoScript: 'var(--font-oleo-script)',
      ptSerif: 'var(--font-pt-serif)',
      nanumMyeongjo: 'var(--font-nanum-myeongjo)',
      courgette: 'var(--font-courgette-regular)',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    letterSpacing: {
      tight: '-0.2px',
      normal: '0',
    },
    borderRadius: {
      none: '0',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '20px',
      full: '9999px',
    },
    boxShadow: {
      none: 'none',
      sm: '0 2px 4px 0 rgba(0, 0, 0, 0.04)',
      md: '0 5px 7px 0 rgba(0, 0, 0, 0.08)',
      'reverse-md': '0 -5px 7px 0 rgba(0, 0, 0, 0.08)',
      lg: '0 16px 32px 0 rgba(0, 0, 0, 0.2)',
      modal: '0 20px 40px 0 rgba(0, 0, 0, 0.2)',
      'sm-inset': '0 0 7px 0 rgba(0, 0, 0, 0.04) inset',
      'md-inset': '0 0 12px 5px rgba(0, 0, 0, 0.08) inset',
      'lg-inset': '0 0 32px 5px rgba(0, 0, 0, 0.2) inset',
    },
    dropShadow: {
      none: 'none',
      sm: '0 2px 4px rgba(0, 0, 0, 0.2)',
      md: '0 5px 7px rgba(0, 0, 0, 0.4)',
      'reverse-md': '0 -5px 7px rgba(0, 0, 0, 0.08)',
      lg: '0 16px 32px rgba(0, 0, 0, 0.6)',
      modal: '0 20px 40px rgba(0, 0, 0, 0.4)',
    },
    blur: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '40px',
      '5xl': '48px',
      '6xl': '64px',
    },
    extend: {
      minWidth: px0_2000,
      maxWidth: px0_2000,
      minHeight: px0_2000,
      borderWidth: px0_2000,
      width: {
        sm: '16px',
        md: '24px',
        lg: '40px',
      },
      spacing: {
        ...px0_2000,
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '40px',
      },
      aspectRatio: {
        article: '4 / 3',
        book: '16 / 22.5',
      },
      zIndex: {
        toast: '1010',
        modal: '1000',
        'modal-under': '990',
        'top-bar': '910',
        header: '900',
        'channel-talk': '810',
        'navigation-bar': '800',
      },
    },
  },
  plugins: [
    forms({
      strategy: 'class', // only generate global styles
    }),
  ],
  safelist: [
    {
      pattern: /^w-(\d+|sm|md|lg)$/, // 모든 w-XX 형식의 클래스 포함
    },
  ],
  // purge: {
  //   content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  //   options: {
  //     safelist: {
  //       standard: [/^w-(\d+|sm|md|lg)$/], // w-로 시작하고 뒤에 숫자가 있는 클래스
  //     },
  //   },
  // },
  corePlugins: {
    container: false,
  },
};
export default config;
