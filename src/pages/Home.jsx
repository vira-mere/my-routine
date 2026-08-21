import { useState, useEffect } from 'react'
import { Plus, Clock, CheckCircle2 } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import { useData } from '../context/DataContext'
import { useTheme } from '../context/ThemeContext'
import { format } from 'date-fns'

export default function Home({ setActivePage }) {
  const { routines, habits } = useData()
  const { theme } = useTheme()
  const [todayTasks, setTodayTasks] = useState([])
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    const today = format(new Date(), 'EEEE')
    const tasks = []
    routines.forEach(routine => {
      if (routine.days.includes(today)) {
        routine.tasks.forEach(task => {
          tasks.push({ ...task, routineId: routine.id, routineName: routine.name })
        })
      }
    })
    tasks.sort((a, b) => a.time.localeCompare(b.time))
    setTodayTasks(tasks)
    setCompletedCount(tasks.filter(t => t.completed).length)
  }, [routines])

  const progressPercentage = todayTasks.length > 0 ? (completedCount / todayTasks.length) * 100 : 0

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <p className="text-gray-600 text-sm md:text-base">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Good morning! 🌟</h1>
        <p className="text-gray-500 mt-2">Let's make today productive</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Daily Progress Card */}
        <Card className="lg:col-span-1">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Today's Progress</h2>
            <ProgressBar 
              percentage={progressPercentage} 
              label={`${completedCount} of ${todayTasks.length} tasks`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: theme.primary }}>{
                habits.length
              }</p>
              <p className="text-xs text-gray-600 mt-1">Habits</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: theme.primary }}>{
                routines.length
              }</p>
              <p className="text-xs text-gray-600 mt-1">Routines</p>
            </div>
          </div>
        </Card>

        {/* Quick Add Buttons */}
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Add</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-4 rounded-xl text-center hover:shadow-md smooth-transition" 
              style={{ backgroundColor: `${theme.primary}10` }}>
              <div className="text-2xl mb-2">🌅</div>
              <p className="text-sm font-medium text-gray-700">Routine</p>
            </button>
            <button className="p-4 rounded-xl text-center hover:shadow-md smooth-transition" 
              style={{ backgroundColor: `${theme.primary}10` }}>
              <div className="text-2xl mb-2">💪</div>
              <p className="text-sm font-medium text-gray-700">Exercise</p>
            </button>
            <button className="p-4 rounded-xl text-center hover:shadow-md smooth-transition" 
              style={{ backgroundColor: `${theme.primary}10` }}>
              <div className="text-2xl mb-2">📚</div>
              <p className="text-sm font-medium text-gray-700">Study</p>
            </button>
            <button className="p-4 rounded-xl text-center hover:shadow-md smooth-transition" 
              style={{ backgroundColor: `${theme.primary}10` }}>
              <div className="text-2xl mb-2">🔔</div>
              <p className="text-sm font-medium text-gray-700">Reminder</p>
            </button>
          </div>
        </Card>
      </div>

      {/* Today's Routine */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Today's Tasks</h2>
          <span className="text-sm px-3 py-1 rounded-full" 
            style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
            {todayTasks.length} tasks
          </span>
        </div>

        {todayTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">No tasks scheduled for today</p>
            <p className="text-gray-400 text-sm">Add a routine to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayTasks.map((task, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 smooth-transition border border-gray-100">
                <input
                  type="checkbox"
                  checked={task.completed || false}
                  className="mt-1 w-5 h-5 rounded cursor-pointer"
                  style={{ accentColor: theme.primary }}
                />
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${
                    task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                  }`}>
                    {task.title}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {task.time}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs" 
                      style={{ backgroundColor: `${theme.primary}15` }}>
                      {task.routineName}
                    </span>
                  </div>
                  {task.notes && <p className="text-sm text-gray-500 mt-2">{task.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
