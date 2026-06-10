/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#F4830F',
          light: '#F5A335',
          dark: '#D96C0A',
          subtle: '#FFF8F0',
        },
        forest: {
          DEFAULT: '#2C5F2D',
          light: '#3A7D3F',
          dark: '#1D3F1E',
          subtle: '#E8F5E9',
        },
        cream: {
          DEFAULT: '#FFF8F0',
          dark: '#F5E6D3',
        },
        navy: {
          DEFAULT: '#1E3A8A',
          dark: '#172554',
        },
        charcoal: {
          DEFAULT: '#1F1F1F',
          light: '#4A4A4A',
        },
        muted: {
          DEFAULT: '#9CA3AF',
          light: '#D1D5DB',
        },
      },
      fontFamily: {
        display: ['DM Serif Display', 'serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        hindi: ['Mukta', 'sans-serif'],
        telugu: ['Noto Sans Telugu', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'sans-serif'],
      },
      borderRadius: {
        'full': '999px',
        '2xl': '1rem',
      },
      spacing: {
        '4px': '4px',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bounceSubtle: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-8px)',
          },
        },
      },
    },
  },
  plugins: [],
}
