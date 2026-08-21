import { Home, BookOpen, Dumbbell, Calendar, BarChart3 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function BottomNav({ activePage, setActivePage }) {
  const { theme } = useTheme()

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'routines', label: 'Routines', icon: BookOpen },
    { id: 'exercise', label: 'Exercise', icon: Dumbbell },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-20 shadow-lg z-50">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activePage === item.id
        return (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex flex-col items-center gap-1 flex-1 py-2 smooth-transition ${
              isActive ? 'text-gray-900' : 'text-gray-400'
            }`}
            style={isActive ? { color: theme.primary } : {}}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
