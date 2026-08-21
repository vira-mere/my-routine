import { useState } from 'react'
import { Plus, Edit2, Trash2, ChevronDown } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { useData } from '../context/DataContext'
import { useTheme } from '../context/ThemeContext'

export default function Routines() {
  const { routines, updateRoutine, deleteRoutine, addRoutine } = useData()
  const { theme } = useTheme()
  const [expandedRoutine, setExpandedRoutine] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoutine, setEditingRoutine] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    icon: '📝',
    color: 'bg-gray-100',
    description: '',
    days: [],
    tasks: [],
  })

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const handleOpenModal = (routine = null) => {
    if (routine) {
      setEditingRoutine(routine)
      setFormData(routine)
    } else {
      setFormData({
        name: '',
        icon: '📝',
        color: 'bg-gray-100',
        description: '',
        days: [],
        tasks: [],
      })
      setEditingRoutine(null)
    }
    setIsModalOpen(true)
  }

  const handleSaveRoutine = () => {
    if (!formData.name.trim()) return
    if (editingRoutine) {
      updateRoutine(editingRoutine.id, formData)
    } else {
      addRoutine(formData)
    }
    setIsModalOpen(false)
  }

  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }))
  }

  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, { id: Date.now(), title: '', time: '', notes: '', completed: false }]
    }))
  }

  const updateTask = (taskId, field, value) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === taskId ? { ...t, [field]: value } : t)
    }))
  }

  const removeTask = (taskId) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId)
    }))
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Routines</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={20} className="mr-2 inline" />
          Add Routine
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6">
        {routines.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">No routines yet</p>
              <p className="text-gray-400 text-sm mb-4">Create your first routine to get organized</p>
              <Button onClick={() => handleOpenModal()}>Create Routine</Button>
            </div>
          </Card>
        ) : (
          routines.map(routine => (
            <Card key={routine.id} className="overflow-hidden">
              <button
                onClick={() => setExpandedRoutine(expandedRoutine === routine.id ? null : routine.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 smooth-transition"
              >
                <div className="flex items-center gap-4 text-left flex-1">
                  <span className="text-3xl">{routine.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{routine.name}</h3>
                    <p className="text-sm text-gray-600">{routine.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {routine.days.map(day => (
                        <span key={day} className="text-xs px-2 py-1 rounded-full" 
                          style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
                          {day.slice(0, 3)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenModal(routine)
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 smooth-transition"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteRoutine(routine.id)
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 smooth-transition"
                  >
                    <Trash2 size={18} />
                  </button>
                  <ChevronDown size={20} className={`smooth-transition ${
                    expandedRoutine === routine.id ? 'rotate-180' : ''
                  }`} />
                </div>
              </button>

              {expandedRoutine === routine.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
                  {routine.tasks.map(task => (
                    <div key={task.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                      <input type="checkbox" className="mt-1 w-4 h-4 rounded" 
                        style={{ accentColor: theme.primary }}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{task.time} {task.notes && `• ${task.notes}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Routine Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingRoutine ? 'Edit Routine' : 'New Routine'}>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <input
            type="text"
            placeholder="Routine name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: `${theme.primary}40` }}
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: `${theme.primary}40` }}
          />

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Days</p>
            <div className="grid grid-cols-4 gap-2">
              {days.map(day => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-2 py-2 text-xs rounded-lg font-medium smooth-transition ${
                    formData.days.includes(day)
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  style={{
                    backgroundColor: formData.days.includes(day) ? theme.primary : '#f3f4f6'
                  }}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Tasks</p>
              <button
                onClick={addTask}
                className="text-sm px-2 py-1 rounded-lg"
                style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
              >
                + Add Task
              </button>
            </div>
            <div className="space-y-2">
              {formData.tasks.map(task => (
                <div key={task.id} className="space-y-1">
                  <input
                    type="text"
                    placeholder="Task name"
                    value={task.title}
                    onChange={(e) => updateTask(task.id, 'title', e.target.value)}
                    className="w-full px-3 py-1 text-sm border border-gray-200 rounded-lg"
                  />
                  <input
                    type="time"
                    value={task.time}
                    onChange={(e) => updateTask(task.id, 'time', e.target.value)}
                    className="w-full px-3 py-1 text-sm border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Notes"
                    value={task.notes}
                    onChange={(e) => updateTask(task.id, 'notes', e.target.value)}
                    className="w-full px-3 py-1 text-sm border border-gray-200 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSaveRoutine} className="flex-1">
            Save
          </Button>
        </div>
      </Modal>
    </div>
  )
}
