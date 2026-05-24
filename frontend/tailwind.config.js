/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070a13', // Pitch dark blue-gray
          900: '#0f172a', // Deep navy dark
          800: '#1e293b', // Muted container dark
          700: '#334155', // Border colors
          600: '#475569'
        },
        brand: {
          glow: '#00f2fe',
          cyan: '#06b6d4',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          crimson: '#ff3e3e'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'stadium-light': 'radial-gradient(circle at 50% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        'glass-glow': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'glass-hover': '0 8px 32px 0 rgba(6, 182, 212, 0.2)',
        'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.4)',
        'neon-emerald': '0 0 15px rgba(16, 189, 129, 0.4)',
      }
    },
  },
  plugins: [],
}
