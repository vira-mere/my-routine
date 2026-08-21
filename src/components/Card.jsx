import { useTheme } from '../context/ThemeContext'

export default function Card({ children, className = '' }) {
  return (
    <div className={`card p-4 md:p-6 ${className}`}>
      {children}
    </div>
  )
}
