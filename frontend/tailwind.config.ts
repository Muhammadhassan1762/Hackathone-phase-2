import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        'primary-bg': '#FAFAFA',
        'secondary-bg': '#FFFFFF',
        'tertiary-bg': '#F5F5F5',

        'primary-text': '#1A1A1A',
        'secondary-text': '#666666',
        'tertiary-text': '#999999',

        'accent-primary': '#3B82F6',
        'accent-secondary': '#10B981',
        'accent-tertiary': '#F59E0B',
        'accent-danger': '#EF4444',

        'border': '#E5E5E5',
        'border-focus': '#3B82F6',
        'border-hover': '#D4D4D4',

        // Dark Mode Colors
        'primary-bg-dark': '#0A0A0A',
        'secondary-bg-dark': '#1A1A1A',
        'tertiary-bg-dark': '#262626',

        'primary-text-dark': '#FAFAFA',
        'secondary-text-dark': '#A3A3A3',
        'tertiary-text-dark': '#737373',

        'accent-primary-dark': '#60A5FA',
        'accent-secondary-dark': '#34D399',
        'accent-tertiary-dark': '#FBBF24',
        'accent-danger-dark': '#F87171',

        'border-dark': '#262626',
        'border-focus-dark': '#60A5FA',
        'border-hover-dark': '#404040',
      },
      spacing: {
        // 8pt Grid System
        '2xs': '4px',    // 0.25rem
        'xs': '8px',     // 0.5rem
        'sm': '12px',    // 0.75rem
        'md': '16px',    // 1rem
        'lg': '24px',    // 1.5rem
        'xl': '32px',    // 2rem
        '2xl': '48px',   // 3rem
        '3xl': '64px',   // 4rem
        '4xl': '96px',   // 6rem
      },
      borderRadius: {
        'sm': '4px',   // 0.25rem
        'md': '8px',   // 0.5rem
        'lg': '12px',  // 0.75rem
        'xl': '16px',  // 1rem
        '2xl': '24px', // 1.5rem
        'full': '9999px', // Circular
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.06)',
        'medium': '0 4px 12px rgba(0,0,0,0.08)',
        'strong': '0 8px 24px rgba(0,0,0,0.12)',
        'subtle-dark': '0 1px 3px rgba(0,0,0,0.4)',
        'medium-dark': '0 4px 12px rgba(0,0,0,0.5)',
        'strong-dark': '0 8px 24px rgba(0,0,0,0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-check': 'bounceCheck 0.5s ease-out',
        'pulse-border': 'pulseBorder 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceCheck: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseBorder: {
          '0%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
        },
      },
      fontSize: {
        'hero': ['56px', { lineHeight: '1.1' }],
        'h1': ['40px', { lineHeight: '1.2' }],
        'h2': ['32px', { lineHeight: '1.25' }],
        'h3': ['24px', { lineHeight: '1.3' }],
        'body-large': ['18px', { lineHeight: '1.4' }],
        'body': ['16px', { lineHeight: '1.5' }],
        'body-small': ['14px', { lineHeight: '1.4' }],
        'caption': ['12px', { lineHeight: '1.3' }],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;