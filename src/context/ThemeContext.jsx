import { createContext, useContext, useState, useEffect } from 'react'
import { useStorage } from '../hooks/useStorage'

const ThemeContext = createContext()

const themes = {
  'soft-pink': {
    name: 'Soft Pink',
    primary: '#ef8070',
    secondary: '#f29c8e',
    background: 'from-rose-50 to-pink-50',
    accent: 'bg-rose-100',
    text: 'text-rose-900',
  },
  'lavender': {
    name: 'Lavender',
    primary: '#a064ce',
    secondary: '#b485d8',
    background: 'from-purple-50 to-violet-50',
    accent: 'bg-purple-100',
    text: 'text-purple-900',
  },
  'baby-blue': {
    name: 'Baby Blue',
    primary: '#6ab3d7',
    secondary: '#89c3df',
    background: 'from-blue-50 to-cyan-50',
    accent: 'bg-blue-100',
    text: 'text-blue-900',
  },
  'sage-green': {
    name: 'Sage Green',
    primary: '#8cbaa7',
    secondary: '#a3c8bd',
    background: 'from-green-50 to-emerald-50',
    accent: 'bg-green-100',
    text: 'text-green-900',
  },
  'cream': {
    name: 'Cream',
    primary: '#d4a574',
    secondary: '#e6c89f',
    background: 'from-amber-50 to-yellow-50',
    accent: 'bg-amber-100',
    text: 'text-amber-900',
  },
  'dark-academia': {
    name: 'Dark Academia',
    primary: '#2c3e50',
    secondary: '#34495e',
    background: 'from-slate-900 to-slate-800',
    accent: 'bg-slate-700',
    text: 'text-slate-100',
  },
  'minimal-dark': {
    name: 'Minimal Dark',
    primary: '#1a1a1a',
    secondary: '#333333',
    background: 'from-gray-900 to-gray-800',
    accent: 'bg-gray-700',
    text: 'text-gray-100',
  },
}

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
