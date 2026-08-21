import { Trash2, Edit2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function TaskItem({ task, onComplete, onEdit, onDelete }) {
  const { theme } = useTheme()

  return (
    <div className={`card p-4 flex items-start gap-4 group hover:shadow-md smooth-transition`}>
      <input
        type="checkbox"
        checked={task.completed || false}
        onChange={onComplete}
        className="mt-1 w-5 h-5 rounded cursor-pointer smooth-transition"
        style={{
          accentColor: theme.primary,
        }}
      />
      <div className="flex-1">
        <p className={`font-medium ${
          task.completed ? 'line-through text-gray-400' : 'text-gray-900'
        }`}>
          {task.title}
        </p>
        {task.time && <p className="text-sm text-gray-500 mt-1">{task.time}</p>}
        {task.notes && <p className="text-sm text-gray-600 mt-1">{task.notes}</p>}
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 smooth-transition">
        <button
          onClick={onEdit}
          className="p-2 text-gray-400 hover:text-gray-600 smooth-transition"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-600 smooth-transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
