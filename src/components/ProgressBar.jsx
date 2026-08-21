import { useTheme } from '../context/ThemeContext'

export default function ProgressBar({ percentage, label }) {
  const { theme } = useTheme()

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full smooth-transition rounded-full"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: theme.primary,
          }}
        />
      </div>
      <p className="text-xs text-gray-500 text-right">{Math.round(percentage)}%</p>
    </div>
  )
}
