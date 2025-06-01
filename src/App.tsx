import { useState } from 'react'
import ProjectFormImproved from './components/ProjectFormImproved'
import ProjectWizard from './components/ProjectWizard' // Import ProjectWizard
import CodeOutput from './components/CodeOutput'
// import UIComparisonDemo from './components/UIComparisonDemo'
import type { ProjectFormData } from './types/project'

type ViewMode = 'form' | 'wizard' // Define view modes

function App() {
  const [projectData, setProjectData] = useState<ProjectFormData | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('form') // Default to form view

  const handleFormSubmit = (data: ProjectFormData) => {
    setProjectData(data)
    // Optionally, switch back to form view or a success view after submission
  }

  const handleReset = () => {
    setProjectData(null)
    // Optionally, reset viewMode to 'form' if desired
  }

  const switchToWizard = () => setViewMode('wizard')
  const switchToForm = () => setViewMode('form')

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-2">
            ProjGen
          </h1>
          <p className="text-gray-400">
            Generate code blocks for the portfolio projects page
          </p>
        </header>

        {/* <UIComparisonDemo /> */}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {viewMode === 'form' ? (
              <ProjectFormImproved onSubmit={handleFormSubmit} onSwitchToWizard={switchToWizard} />
            ) : (
              <ProjectWizard onSubmit={handleFormSubmit} onSwitchToForm={switchToForm} />
            )}
          </div>
          
          <div className="space-y-6">
            {projectData ? (
              <CodeOutput projectData={projectData} onReset={handleReset} />
            ) : (
              <div className="bg-gray-900 rounded-lg p-6 text-center text-gray-500">
                <p>Fill out the form to generate code blocks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
