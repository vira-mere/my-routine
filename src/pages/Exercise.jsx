import { useState } from 'react'
import { Plus, Edit2, Trash2, ChevronDown } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { useData } from '../context/DataContext'
import { useTheme } from '../context/ThemeContext'

const categories = ['Arms', 'Abs/Core', 'Legs', 'Full Body', 'Stretching', 'Beginner workouts']

export default function Exercise() {
  const { exercises, addExercise, updateExercise, deleteExercise } = useData()
  const { theme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('Arms')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExercise, setEditingExercise] = useState(null)
  const [expandedExercise, setExpandedExercise] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Arms',
    description: '',
    targetMuscle: '',
    sets: '',
    reps: '',
    difficulty: 'Beginner',
    restTime: '',
  })

  const filteredExercises = exercises.filter(e => e.category === selectedCategory)

  const handleOpenModal = (exercise = null) => {
    if (exercise) {
      setEditingExercise(exercise)
      setFormData(exercise)
    } else {
      setFormData({
        name: '',
        category: selectedCategory,
        description: '',
        targetMuscle: '',
        sets: '',
        reps: '',
        difficulty: 'Beginner',
        restTime: '',
      })
      setEditingExercise(null)
    }
    setIsModalOpen(true)
  }

  const handleSaveExercise = () => {
    if (!formData.name.trim()) return
    if (editingExercise) {
      updateExercise(editingExercise.id, formData)
    } else {
      addExercise(formData)
    }
    setIsModalOpen(false)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-50'
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-50'
      case 'Advanced':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Exercise Library</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={20} className="mr-2 inline" />
          Add Exercise
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex gap-2 md:flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-medium smooth-transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: selectedCategory === cat ? theme.primary : '#f3f4f6'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="grid gap-4 md:gap-6">
        {filteredExercises.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">No exercises in this category</p>
              <p className="text-gray-400 text-sm mb-4">Add an exercise to get started</p>
              <Button onClick={() => handleOpenModal()}>Add Exercise</Button>
            </div>
          </Card>
        ) : (
          filteredExercises.map(exercise => (
            <Card key={exercise.id} className="overflow-hidden">
              <button
                onClick={() => setExpandedExercise(expandedExercise === exercise.id ? null : exercise.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 smooth-transition"
              >
                <div className="text-left flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{exercise.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs px-2 py-1 rounded-full" 
                      style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
                      {exercise.targetMuscle}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenModal(exercise)
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 smooth-transition"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteExercise(exercise.id)
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 smooth-transition"
                  >
                    <Trash2 size={18} />
                  </button>
                  <ChevronDown size={20} className={`smooth-transition ${
                    expandedExercise === exercise.id ? 'rotate-180' : ''
                  }`} />
                </div>
              </button>

              {expandedExercise === exercise.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-600 uppercase">Sets</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{exercise.sets}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 uppercase">Reps</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{exercise.reps}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 uppercase">Rest</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{exercise.restTime}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 uppercase">Target</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{exercise.targetMuscle}</p>
                    </div>
                  </div>
                  <button className="w-full py-2 rounded-lg text-white font-medium hover:opacity-90 smooth-transition"
                    style={{ backgroundColor: theme.primary }}>
                    ✓ Mark as Done
                  </button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Exercise Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingExercise ? 'Edit Exercise' : 'New Exercise'}>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <input
            type="text"
            placeholder="Exercise name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 resize-none"
            rows="2"
          />
          <input
            type="text"
            placeholder="Target muscle"
            value={formData.targetMuscle}
            onChange={(e) => setFormData({ ...formData, targetMuscle: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
          />
          <input
            type="text"
            placeholder="Sets (e.g., 3)"
            value={formData.sets}
            onChange={(e) => setFormData({ ...formData, sets: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
          />
          <input
            type="text"
            placeholder="Reps (e.g., 10-15)"
            value={formData.reps}
            onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
          />
          <input
            type="text"
            placeholder="Rest time"
            value={formData.restTime}
            onChange={(e) => setFormData({ ...formData, restTime: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
          />
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSaveExercise} className="flex-1">
            Save
          </Button>
        </div>
      </Modal>
    </div>
  )
}
