import { useState } from 'react'
import { LogOut, Download, Upload } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { useTheme } from '../context/ThemeContext'
import { useData } from '../context/DataContext'

export default function Settings() {
  const { theme, themes, currentTheme, changeTheme } = useTheme()
  const { userProfile, updateProfile, exportData, importData, resetDaily } = useData()
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [name, setName] = useState(userProfile.name)
  const [importData_value, setImportData_value] = useState('')

  const handleSaveProfile = () => {
    updateProfile({ name })
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-routine-backup.json'
    a.click()
    setIsExportModalOpen(false)
  }

  const handleImport = () => {
    if (importData(importData_value)) {
      alert('Data imported successfully!')
      setIsImportModalOpen(false)
      setImportData_value('')
    } else {
      alert('Failed to import data. Please check the format.')
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Settings</h1>

      {/* Profile Section */}
      <Card className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
            />
          </div>
          <Button onClick={handleSaveProfile}>Save Profile</Button>
        </div>
      </Card>

      {/* Theme Selection */}
      <Card className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Theme</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(themes).map(([key, themeData]) => (
            <button
              key={key}
              onClick={() => changeTheme(key)}
              className={`p-4 rounded-xl border-2 smooth-transition ${
                currentTheme === key
                  ? 'border-gray-900'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full mb-2 mx-auto shadow-sm"
                style={{ backgroundColor: themeData.primary }}
              />
              <p className="text-sm font-medium text-gray-900 text-center">{themeData.name}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Data Management */}
      <Card className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Data Management</h2>
        <div className="space-y-3">
          <Button
            onClick={() => setIsExportModalOpen(true)}
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Export Data
          </Button>
          <Button
            onClick={() => setIsImportModalOpen(true)}
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
          >
            <Upload size={18} />
            Import Data
          </Button>
          <Button
            onClick={resetDaily}
            variant="secondary"
            className="w-full"
          >
            Reset Daily Progress
          </Button>
        </div>
      </Card>

      {/* About Section */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
        <div className="space-y-2 text-gray-600 text-sm">
          <p>✨ <strong>My Routine</strong> v1.0.0</p>
          <p>A beautiful personal routine organizer web app.</p>
          <p className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
            Made with ❤️ using React + Vite + Tailwind CSS
          </p>
        </div>
      </Card>

      {/* Export Modal */}
      <Modal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} title="Export Data">
        <div className="space-y-4">
          <p className="text-gray-600">Your data will be downloaded as a JSON file that you can back up or transfer to another device.</p>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsExportModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleExport} className="flex-1">
              Export
            </Button>
          </div>
        </div>
      </Modal>

      {/* Import Modal */}
      <Modal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} title="Import Data">
        <div className="space-y-4">
          <p className="text-gray-600">Paste your exported JSON data below to restore your routines, exercises, and habits.</p>
          <textarea
            value={importData_value}
            onChange={(e) => setImportData_value(e.target.value)}
            placeholder="Paste JSON data here..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 resize-none font-mono text-sm"
            rows="6"
          />
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsImportModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleImport} className="flex-1">
              Import
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
