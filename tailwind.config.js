/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'slide-in': 'slideIn 0.35s ease-in-out 0.5s forwards',
        'slide-in-title': 'slideInTitle 0.35s ease-in-out 0.5s forwards',
        'slide-in-sec': 'slideInSec 0.35s ease-in-out 0.5s forwards',
        'scale-up-center': 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000)  both'
      },
      keyframes: {
        slideIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        slideInTitle: {
          '0%': {
            opacity: 0,
            transform: 'translateY(calc(-50% + 20px))'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        slideInSec: {
          '0%': {
            opacity: 0,
            transform: 'translate(-50%, calc(-50% - 20px))'
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%, -50%)'
          }
        },
        dashedLine: {
          '0%': {
            opacirty: 1
          },
          '100%': {
            opacity: 0
          }
        },
        'scale-up-center': {
          '0%': {
            transform: 'scale(.5)'
          },
          to: {
            transform: 'scale(1)'
          }
        }
      },
    },
  },
  plugins: [
    require('tailwindcss-animation-delay')
  ],
}
