import { useState } from 'react'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import { useData } from '../context/DataContext'
import { useTheme } from '../context/ThemeContext'
import { BarChart3, TrendingUp, Flame, Award } from 'lucide-react'

export default function Progress() {
  const { habits, routines } = useData()
  const { theme } = useTheme()
  const [timeframe, setTimeframe] = useState('week')

  const getCompletionStats = () => {
    let completed = 0
    let total = 0
    routines.forEach(routine => {
      routine.tasks.forEach(task => {
        total++
        if (task.completed) completed++
      })
    })
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 }
  }

  const stats = getCompletionStats()

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Progress & Analytics</h1>

      {/* Timeframe Selector */}
      <div className="flex gap-2 mb-8">
        {['day', 'week', 'month'].map(tf => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-lg font-medium smooth-transition capitalize ${
              timeframe === tf
                ? 'text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: timeframe === tf ? theme.primary : '#f3f4f6'
            }}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Today's Progress</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{Math.round(stats.percentage)}%</p>
            </div>
            <BarChart3 size={32} style={{ color: theme.primary, opacity: 0.2 }} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Tasks Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completed}/{stats.total}</p>
            </div>
            <Award size={32} style={{ color: theme.primary, opacity: 0.2 }} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Routines</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{routines.length}</p>
            </div>
            <TrendingUp size={32} style={{ color: theme.primary, opacity: 0.2 }} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Best Streak</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {Math.max(...habits.map(h => h.streak || 0), 0)}
              </p>
            </div>
            <Flame size={32} style={{ color: theme.primary, opacity: 0.2 }} />
          </div>
        </Card>
      </div>

      {/* Detailed Progress */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Routines Progress */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Routine Completion</h2>
          <div className="space-y-6">
            {routines.slice(0, 4).map(routine => {
              const completed = routine.tasks.filter(t => t.completed).length
              const percentage = routine.tasks.length > 0 ? (completed / routine.tasks.length) * 100 : 0
              return (
                <div key={routine.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{routine.name}</span>
                    <span className="text-sm text-gray-600">{completed}/{routine.tasks.length}</span>
                  </div>
                  <ProgressBar percentage={percentage} />
                </div>
              )
            })}
          </div>
        </Card>

        {/* Habit Streaks */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Habit Streaks</h2>
          <div className="space-y-4">
            {habits.map(habit => (
              <div key={habit.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 smooth-transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{habit.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{habit.name}</p>
                    <p className="text-xs text-gray-600">Target: {habit.target}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold" style={{ color: theme.primary }}>
                    {habit.streak || 0}
                  </p>
                  <p className="text-xs text-gray-600">days</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly Chart */}
      <Card className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Overview</h2>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center">
              <p className="text-xs font-medium text-gray-600 mb-2">{day}</p>
              <div className="relative w-8 h-16 bg-gray-100 rounded-lg mx-auto flex flex-col-reverse">
                <div
                  className="rounded-lg smooth-transition"
                  style={{
                    height: `${Math.random() * 100}%`,
                    backgroundColor: theme.primary,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
