import { Home, BookOpen, Dumbbell, Calendar, BarChart3, Settings } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Sidebar({ activePage, setActivePage }) {
  const { theme } = useTheme()

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'routines', label: 'Routines', icon: BookOpen },
    { id: 'exercise', label: 'Exercise', icon: Dumbbell },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold gradient-text" style={{
          backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
        }}>
          My Routine
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl smooth-transition ${
                isActive
                  ? `${theme.accent} text-gray-900`
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={isActive ? { backgroundColor: `${theme.primary}20` } : {}}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 text-center text-sm text-gray-500">
        <p>✨ Stay organized, stay focused</p>
      </div>
    </aside>
  )
}
