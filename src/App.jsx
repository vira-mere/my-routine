import { useState, useEffect } from 'react'
import { useMediaQuery } from './hooks/useMediaQuery'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Routines from './pages/Routines'
import Exercise from './pages/Exercise'
import Calendar from './pages/Calendar'
import Progress from './pages/Progress'
import Settings from './pages/Settings'
import { ThemeProvider } from './context/ThemeContext'
import { DataProvider } from './context/DataContext'

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const isMobile = useMediaQuery('(max-width: 768px)')

  const renderPage = () => {
    switch (activePage) {
      case 'home':
    return <Home setActivePage={setActivePage} />
      case 'routines':
        return <Routines />
      case 'exercise':
        return <Exercise />
      case 'calendar':
        return <Calendar />
      case 'progress':
        return <Progress />
      case 'settings':
        return <Settings />
      default:
        return <Home />
    }
  }

  return (
    <ThemeProvider>
      <DataProvider>
        <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          {!isMobile && <Sidebar activePage={activePage} setActivePage={setActivePage} />}
          <main className="flex-1 overflow-auto pb-20 md:pb-0">
            {renderPage()}
          </main>
          {isMobile && <BottomNav activePage={activePage} setActivePage={setActivePage} />}
        </div>
      </DataProvider>
    </ThemeProvider>
  )
}
