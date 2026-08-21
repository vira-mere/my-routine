import { X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Tag({ label, onRemove, color = 'bg-gray-100' }) {
  const { theme } = useTheme()

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium`}
      style={{
        backgroundColor: `${theme.primary}20`,
        color: theme.primary,
      }}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:opacity-70"
        >
          <X size={16} />
        </button>
      )}
    </span>
  )
}
