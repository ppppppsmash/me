/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

const colors = require('tailwindcss/colors')
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'panton': ['panton']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'slide-in': 'slideIn 0.35s ease-in-out 0.5s forwards',
        'slide-in-title': 'slideInTitle 0.35s ease-in-out 0.5s forwards',
        'slide-in-sec': 'slideInSec 0.35s ease-in-out 0.5s forwards',
        'scale-up-center': 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000)  both',
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        spotlight: {
          '0%': {
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
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
    require('tailwindcss-animation-delay'),
    addVariablesForColors
  ],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )
 
  addBase({
    ':root': newVars,
  })
}
