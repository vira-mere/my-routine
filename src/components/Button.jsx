import { useTheme } from '../context/ThemeContext'

export default function Button({ children, onClick, variant = 'primary', disabled = false, className = '' }) {
  const { theme } = useTheme()

  if (variant === 'primary') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`btn-primary text-white font-medium px-6 py-2 rounded-xl smooth-transition ${className}`}
        style={{
          backgroundColor: theme.primary,
        }}
      >
        {children}
      </button>
    )
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`btn-secondary border-2 font-medium px-6 py-2 rounded-xl smooth-transition ${className}`}
        style={{
          borderColor: theme.primary,
          color: theme.primary,
        }}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 smooth-transition font-medium ${className}`}
    >
      {children}
    </button>
  )
}
