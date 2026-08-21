import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import { useTheme } from '../context/ThemeContext'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'

export default function Calendar() {
  const { theme } = useTheme()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

  const startingDayOfWeek = monthStart.getDay()
  const emptyDays = Array(startingDayOfWeek).fill(null)

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Calendar</h1>
        <Button>
          <Plus size={20} className="mr-2 inline" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex gap-2">
              <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg smooth-transition">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg smooth-transition">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-bold text-gray-600 text-sm py-2">
                {day}
              </div>
            ))}
            {emptyDays.map((_, idx) => (
              <div key={`empty-${idx}`} className="p-2"></div>
            ))}
            {daysInMonth.map(day => (
              <button
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={`p-3 text-center rounded-lg font-medium smooth-transition ${
                  isSameDay(day, selectedDate)
                    ? 'text-white'
                    : isSameMonth(day, currentDate)
                    ? 'text-gray-900 hover:bg-gray-100'
                    : 'text-gray-400'
                }`}
                style={{
                  backgroundColor: isSameDay(day, selectedDate) ? theme.primary : 'transparent'
                }}
              >
                {format(day, 'd')}
              </button>
            ))}
          </div>
        </Card>

        {/* Selected Date Details */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {format(selectedDate, 'EEEE, MMMM d')}
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg text-center text-gray-500">
              <p className="text-sm mb-2">📅 No events scheduled</p>
              <Button className="w-full">
                <Plus size={16} className="mr-2 inline" />
                Add Event
              </Button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-medium text-gray-700 mb-3">Tasks Today</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="text-center py-4">No tasks scheduled</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
