/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* elevated-surface */
        input: 'var(--color-input)', /* elevated-surface */
        ring: 'var(--color-ring)', /* electric-blue */
        background: 'var(--color-background)', /* deep-space-blue */
        foreground: 'var(--color-foreground)', /* white */
        primary: {
          DEFAULT: 'var(--color-primary)', /* electric-blue */
          foreground: 'var(--color-primary-foreground)', /* deep-space-blue */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* deep-violet */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* clinical-red */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* deep-space-blue */
          foreground: 'var(--color-muted-foreground)', /* soft-gray */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* bright-teal */
          foreground: 'var(--color-accent-foreground)', /* deep-space-blue */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* elevated-surface */
          foreground: 'var(--color-popover-foreground)', /* white */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* elevated-surface */
          foreground: 'var(--color-card-foreground)', /* white */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* neon-green */
          foreground: 'var(--color-success-foreground)', /* deep-space-blue */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* medical-orange */
          foreground: 'var(--color-warning-foreground)', /* deep-space-blue */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* clinical-red */
          foreground: 'var(--color-error-foreground)', /* white */
        },
      },
      fontFamily: {
        'heading': ['Orbitron', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Rajdhani', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backdropBlur: {
        '20': '20px',
      },
      boxShadow: {
        'glow-primary': '0 0 10px rgba(0, 212, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.2)',
        'glow-accent': '0 0 10px rgba(0, 255, 161, 0.3), 0 0 20px rgba(0, 255, 161, 0.2)',
        'glow-success': '0 0 10px rgba(57, 255, 20, 0.3), 0 0 20px rgba(57, 255, 20, 0.2)',
        'elevation-1': '0 4px 20px rgba(0, 212, 255, 0.15)',
        'elevation-2': '0 8px 40px rgba(0, 0, 0, 0.3)',
        'elevation-combined': '0 4px 20px rgba(0, 212, 255, 0.15), 0 8px 40px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'skeleton-loading': 'skeleton-loading 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'pulse-glow': {
          'from': {
            boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)',
          },
          'to': {
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.4), 0 0 30px rgba(0, 212, 255, 0.2)',
          },
        },
        'skeleton-loading': {
          '0%': {
            backgroundPosition: '200% 0',
          },
          '100%': {
            backgroundPosition: '-200% 0',
          },
        },
        'fadeIn': {
          'from': {
            opacity: '0',
          },
          'to': {
            opacity: '1',
          },
        },
        'slideIn': {
          'from': {
            transform: 'translateY(-10px)',
            opacity: '0',
          },
          'to': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '800': '800ms',
      },
      zIndex: {
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
        '2000': '2000',
        '3000': '3000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}