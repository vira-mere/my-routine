import { createContext, useContext } from 'react'
import { useStorage } from '../hooks/useStorage'
import { sampleRoutines, sampleExercises, sampleHabits } from '../data/sampleData'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [routines, setRoutines] = useStorage('routines', sampleRoutines)
  const [exercises, setExercises] = useStorage('exercises', sampleExercises)
  const [habits, setHabits] = useStorage('habits', sampleHabits)
  const [dailyProgress, setDailyProgress] = useStorage('dailyProgress', {})
  const [userProfile, setUserProfile] = useStorage('userProfile', { name: 'Welcome!' })

  const addRoutine = (routine) => {
    setRoutines([...routines, { ...routine, id: Date.now() }])
  }

  const updateRoutine = (id, updated) => {
    setRoutines(routines.map(r => r.id === id ? { ...r, ...updated } : r))
  }

  const deleteRoutine = (id) => {
    setRoutines(routines.filter(r => r.id !== id))
  }
const toggleTaskComplete = (routineId, taskId) => {
  setRoutines(
    routines.map(routine =>
      routine.id === routineId
        ? {
            ...routine,
            tasks: routine.tasks.map(task =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            )
          }
        : routine
    )
  )
}

  const addExercise = (exercise) => {
    setExercises([...exercises, { ...exercise, id: Date.now() }])
  }

  const updateExercise = (id, updated) => {
    setExercises(exercises.map(e => e.id === id ? { ...e, ...updated } : e))
  }

  const deleteExercise = (id) => {
    setExercises(exercises.filter(e => e.id !== id))
  }

  const addHabit = (habit) => {
    setHabits([...habits, { ...habit, id: Date.now(), streak: 0, completed: [] }])
  }

  const updateHabit = (id, updated) => {
    setHabits(habits.map(h => h.id === id ? { ...h, ...updated } : h))
  }

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id))
  }

  const markHabitComplete = (id) => {
    const today = new Date().toISOString().split('T')[0]
    setHabits(habits.map(h => {
      if (h.id === id) {
        const completed = h.completed || []
        if (!completed.includes(today)) {
          return { ...h, completed: [...completed, today], streak: (h.streak || 0) + 1 }
        }
      }
      return h
    }))
  }

  const updateProfile = (profile) => {
    setUserProfile(profile)
  }

  const exportData = () => {
    const data = { routines, exercises, habits, userProfile }
    return JSON.stringify(data, null, 2)
  }

  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData)
      if (data.routines) setRoutines(data.routines)
      if (data.exercises) setExercises(data.exercises)
      if (data.habits) setHabits(data.habits)
      if (data.userProfile) setUserProfile(data.userProfile)
      return true
    } catch (error) {
      console.error('Import failed:', error)
      return false
    }
  }

  const resetDaily = () => {
    // Reset daily completions but keep routines
    setDailyProgress({})
  }

  return (
    <DataContext.Provider value={{
      routines,
      addRoutine,
      updateRoutine,
      deleteRoutine,
      toggleTaskComplete,
      exercises,
      addExercise,
      updateExercise,
      deleteExercise,
      habits,
      addHabit,
      updateHabit,
      deleteHabit,
      markHabitComplete,
      userProfile,
      updateProfile,
      exportData,
      importData,
      resetDaily,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}
