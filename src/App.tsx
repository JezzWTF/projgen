import { useState, useEffect } from 'react'
import ProjectFormImproved from './components/ProjectFormImproved'
import ProjectWizard from './components/ProjectWizard' // Import ProjectWizard
import CodeOutput from './components/CodeOutput'
// import UIComparisonDemo from './components/UIComparisonDemo'
import type { ProjectFormData } from './types/project'
import { INITIAL_PROJECT_FORM_DATA, EXAMPLE_PROJECT_FORM_DATA } from './types/projectDefaults.js'; // Try with .js extension (common for TS/ESM)

type ViewMode = 'form' | 'wizard' // Define view modes

function App() {
  const [generatedProjectData, setGeneratedProjectData] = useState<ProjectFormData | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('form') // Default to form view

  // Lifted State
  const [formData, setFormData] = useState<ProjectFormData>(INITIAL_PROJECT_FORM_DATA);
  const [isIdManuallyEdited, setIsIdManuallyEdited] = useState(false);
  const [isCodeStale, setIsCodeStale] = useState(false);
  const [hasCodeBeenGenerated, setHasCodeBeenGenerated] = useState(false);

  // Auto-generate project ID from title - needs to be in App.tsx if formData is here
  useEffect(() => {
    if (!isIdManuallyEdited) {
      const generatedId = formData.title
        ? formData.title.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
        : ''
      // Only update if it's different to avoid potential loops if a child component also tries to set it
      if (generatedId !== formData.id) {
        setFormData(prev => ({ ...prev, id: generatedId }));
        // We might consider not setting stale here if it's purely an auto-generated side effect
        // However, if the ID changing means the code output *would* change, then it should be stale.
        // For now, let's assume ID changes can make code stale.
        // setIsCodeStale(true); 
      }
    }
  }, [formData.title, isIdManuallyEdited, formData.id]);


  const handleFormDataChange = (newData: Partial<ProjectFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
    setIsCodeStale(true);
  };
  
  const handleSetIsIdManuallyEdited = (edited: boolean) => {
    setIsIdManuallyEdited(edited);
  };

  const handleFormSubmit = () => { // No data argument needed, it's already in App's state
    setGeneratedProjectData(formData);
    setIsCodeStale(false);
    setHasCodeBeenGenerated(true);
    // Optionally, switch back to form view or a success view after submission
  };

  const handleReset = () => {
    setGeneratedProjectData(null);
    setFormData(INITIAL_PROJECT_FORM_DATA);
    setIsIdManuallyEdited(false);
    setIsCodeStale(false); // Fresh state, so not stale
    setHasCodeBeenGenerated(false);
  };

  const handleLoadExample = () => {
    setFormData(EXAMPLE_PROJECT_FORM_DATA);
    setIsIdManuallyEdited(true); // Example data has a pre-set ID
    setIsCodeStale(true);
    // setHasCodeBeenGenerated(false); // Or true if example implies generation
  };

  const handleClearAll = () => {
    setFormData(INITIAL_PROJECT_FORM_DATA);
    setIsIdManuallyEdited(false);
    setIsCodeStale(true); // Data changed, so it's stale relative to any previous generation
    setHasCodeBeenGenerated(false);
  };


  const switchToWizard = () => setViewMode('wizard');
  const switchToForm = () => setViewMode('form');

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
              <ProjectFormImproved
                formData={formData}
                onFormDataChange={handleFormDataChange}
                isIdManuallyEdited={isIdManuallyEdited}
                onSetIsIdManuallyEdited={handleSetIsIdManuallyEdited}
                isCodeStale={isCodeStale}
                hasCodeBeenGenerated={hasCodeBeenGenerated}
                onSubmit={handleFormSubmit}
                onSwitchToWizard={switchToWizard}
                onLoadExample={handleLoadExample}
                onClearAll={handleClearAll}
              />
            ) : (
              <ProjectWizard
                formData={formData}
                onFormDataChange={handleFormDataChange}
                isIdManuallyEdited={isIdManuallyEdited}
                onSetIsIdManuallyEdited={handleSetIsIdManuallyEdited}
                isCodeStale={isCodeStale}
                hasCodeBeenGenerated={hasCodeBeenGenerated}
                onSubmit={handleFormSubmit}
                onSwitchToForm={switchToForm}
                onLoadExample={handleLoadExample}
                onClearAll={handleClearAll}
              />
            )}
          </div>
          
          <div className="space-y-6">
            {generatedProjectData ? (
              <CodeOutput projectData={generatedProjectData} onReset={handleReset} />
            ) : (
              <div className="bg-gray-900 rounded-lg p-6 text-center text-gray-500">
                <p>Fill out the form or use the guided setup to generate code blocks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
