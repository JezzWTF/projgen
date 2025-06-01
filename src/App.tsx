import { useState } from 'react'
import ProjectForm from './components/ProjectForm'
import CodeOutput from './components/CodeOutput'
import type { ProjectFormData } from './types/project'

function App() {
  const [projectData, setProjectData] = useState<ProjectFormData | null>(null)

  const handleFormSubmit = (data: ProjectFormData) => {
    setProjectData(data)
  }

  const handleReset = () => {
    setProjectData(null)
  }

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

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ProjectForm onSubmit={handleFormSubmit} />
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
