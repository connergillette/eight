import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['DM Sans'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config

