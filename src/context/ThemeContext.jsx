import { createContext, useContext, useState, useEffect } from 'react'
import { useStorage } from '../hooks/useStorage'

const ThemeContext = createContext()

const themes = {
  'sakura-pink': {
    name: '🌸 Sakura Pink',
    primary: '#E8A0BF',
    secondary: '#F3B6CF',
    background: 'from-pink-50 to-rose-50',
    accent: 'bg-pink-100',
    text: 'text-pink-900',
    wallpaper: 'linear-gradient(135deg, #fff1f7, #ffe4ef, #fce7f3)',
  },

  'lavender-dream': {
    name: '🪻 Lavender Dream',
    primary: '#B8A4E8',
    secondary: '#CDBEF2',
    background: 'from-purple-50 to-violet-50',
    accent: 'bg-purple-100',
    text: 'text-purple-900',
    wallpaper: 'linear-gradient(135deg, #f5f0ff, #eee5ff, #e9d5ff)',
  },

  'baby-blue': {
    name: '🩵 Baby Blue',
    primary: '#91C8E4',
    secondary: '#B7DFF2',
    background: 'from-blue-50 to-cyan-50',
    accent: 'bg-blue-100',
    text: 'text-blue-900',
    wallpaper: 'linear-gradient(135deg, #eff9ff, #dff3ff, #e0f7fa)',
  },

  'mint': {
    name: '🍃 Mint',
    primary: '#9FD8C0',
    secondary: '#BDE8D3',
    background: 'from-emerald-50 to-green-50',
    accent: 'bg-emerald-100',
    text: 'text-emerald-900',
    wallpaper: 'linear-gradient(135deg, #effcf6, #dcfce7, #d1fae5)',
  },

  'sage': {
    name: '🌿 Sage Green',
    primary: '#A8C3A0',
    secondary: '#C5D9BE',
    background: 'from-green-50 to-lime-50',
    accent: 'bg-green-100',
    text: 'text-green-900',
    wallpaper: 'linear-gradient(135deg, #f2f8ed, #e7f2df, #ecfccb)',
  },

  'peach': {
    name: '🍑 Peach',
    primary: '#F4B6A6',
    secondary: '#F7C9BC',
    background: 'from-orange-50 to-rose-50',
    accent: 'bg-orange-100',
    text: 'text-orange-900',
    wallpaper: 'linear-gradient(135deg, #fff5ed, #ffeadf, #ffe4e6)',
  },

  'butter': {
    name: '🧈 Butter Yellow',
    primary: '#E8D58B',
    secondary: '#F2E5AD',
    background: 'from-yellow-50 to-amber-50',
    accent: 'bg-yellow-100',
    text: 'text-yellow-900',
    wallpaper: 'linear-gradient(135deg, #fffdf0, #fff8d6, #fef3c7)',
  },

  'strawberry-milk': {
    name: '🍓 Strawberry Milk',
    primary: '#F2A7B8',
    secondary: '#F7C2CF',
    background: 'from-rose-50 to-pink-50',
    accent: 'bg-rose-100',
    text: 'text-rose-900',
    wallpaper: 'linear-gradient(135deg, #fff1f2, #ffe4e6, #fce7f3)',
  },

  'cotton-candy': {
    name: '🍭 Cotton Candy',
    primary: '#D9A7E0',
    secondary: '#A9D8F0',
    background: 'from-pink-50 to-blue-50',
    accent: 'bg-pink-100',
    text: 'text-pink-900',
    wallpaper: 'linear-gradient(135deg, #fff1f9, #f3e8ff, #e0f2fe)',
  },

  'soft-lilac': {
    name: '💜 Soft Lilac',
    primary: '#C3B1E1',
    secondary: '#D8C9EE',
    background: 'from-violet-50 to-purple-50',
    accent: 'bg-violet-100',
    text: 'text-violet-900',
    wallpaper: 'linear-gradient(135deg, #faf5ff, #f3e8ff, #ede9fe)',
  },

  'powder-blue': {
    name: '☁️ Powder Blue',
    primary: '#A8C7E8',
    secondary: '#C4DCF2',
    background: 'from-sky-50 to-blue-50',
    accent: 'bg-sky-100',
    text: 'text-sky-900',
    wallpaper: 'linear-gradient(135deg, #f0f9ff, #e0f2fe, #dbeafe)',
  },

  'pistachio': {
    name: '🍵 Pistachio',
    primary: '#B7CF9B',
    secondary: '#D0E2B8',
    background: 'from-lime-50 to-green-50',
    accent: 'bg-lime-100',
    text: 'text-lime-900',
    wallpaper: 'linear-gradient(135deg, #f7fee7, #ecfccb, #dcfce7)',
  },

  'blush': {
    name: '🌷 Blush',
    primary: '#E7A6B2',
    secondary: '#F0C1C9',
    background: 'from-rose-50 to-pink-50',
    accent: 'bg-rose-100',
    text: 'text-rose-900',
    wallpaper: 'linear-gradient(135deg, #fff5f7, #ffe4e6, #fce7f3)',
  },

  'pastel-purple': {
    name: '🦄 Pastel Purple',
    primary: '#C5A9E8',
    secondary: '#D9C5F0',
    background: 'from-purple-50 to-fuchsia-50',
    accent: 'bg-purple-100',
    text: 'text-purple-900',
    wallpaper: 'linear-gradient(135deg, #faf5ff, #f5d0fe, #ede9fe)',
  },

  'pastel-aqua': {
    name: '🫧 Pastel Aqua',
    primary: '#91D5D2',
    secondary: '#B8E7E4',
    background: 'from-cyan-50 to-teal-50',
    accent: 'bg-cyan-100',
    text: 'text-cyan-900',
    wallpaper: 'linear-gradient(135deg, #ecfeff, #cffafe, #ccfbf1)',
  },

  'pastel-coral': {
    name: '🪸 Pastel Coral',
    primary: '#F1AFA0',
    secondary: '#F5C5BA',
    background: 'from-orange-50 to-red-50',
    accent: 'bg-orange-100',
    text: 'text-orange-900',
    wallpaper: 'linear-gradient(135deg, #fff7ed, #ffedd5, #fee2e2)',
  },

  'pastel-mauve': {
    name: '🌺 Pastel Mauve',
    primary: '#C9A7B8',
    secondary: '#DFC5D1',
    background: 'from-fuchsia-50 to-rose-50',
    accent: 'bg-fuchsia-100',
    text: 'text-fuchsia-900',
    wallpaper: 'linear-gradient(135deg, #fdf4ff, #fae8ff, #ffe4e6)',
  },

  'pastel-sky': {
    name: '🦋 Pastel Sky',
    primary: '#9FC9E8',
    secondary: '#BEDCF1',
    background: 'from-sky-50 to-indigo-50',
    accent: 'bg-sky-100',
    text: 'text-sky-900',
    wallpaper: 'linear-gradient(135deg, #f0f9ff, #e0f2fe, #eef2ff)',
  },

  'pastel-cream': {
    name: '🧁 Pastel Cream',
    primary: '#D9C79E',
    secondary: '#E9DDBE',
    background: 'from-amber-50 to-yellow-50',
    accent: 'bg-amber-100',
    text: 'text-amber-900',
    wallpaper: 'linear-gradient(135deg, #fffbeb, #fef3c7, #fef9c3)',
  },

  'pastel-rainbow': {
    name: '🌈 Pastel Rainbow',
    primary: '#C7A7E8',
    secondary: '#A8D8EA',
    background: 'from-pink-50 via-purple-50 to-blue-50',
    accent: 'bg-purple-100',
    text: 'text-purple-900',
    wallpaper:
      'linear-gradient(120deg, #ffe4ef, #ede9fe, #dbeafe, #dcfce7, #fef3c7)',
  },

  'dreamy-pastel': {
    name: '✨ Dreamy Pastel',
    primary: '#C8B6E8',
    secondary: '#F2B5D4',
    background: 'from-purple-50 via-pink-50 to-blue-50',
    accent: 'bg-purple-100',
    text: 'text-purple-900',
    wallpaper:
      'linear-gradient(135deg, #ede9fe, #fce7f3, #dbeafe, #e0f2fe)',
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useStorage('theme', 'soft-pink')

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
    }
  }

  const theme = themes[currentTheme] || themes['soft-pink']

  return (
    <ThemeContext.Provider value={{ currentTheme, theme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
