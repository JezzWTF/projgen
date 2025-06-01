import { useState, useEffect } from 'react'
import ProjectFormImproved from './components/ProjectFormImproved'
import ProjectWizard from './components/ProjectWizard' // Import ProjectWizard
import CodeOutput from './components/CodeOutput'
import NextStepsDisplay from './components/NextStepsDisplay' // Import NextStepsDisplay
import Tabs from './components/Tabs'; // Import the new Tabs component
// import UIComparisonDemo from './components/UIComparisonDemo'
import type { ProjectFormData } from './types/project'
import { INITIAL_PROJECT_FORM_DATA, EXAMPLE_PROJECT_FORM_DATA } from './types/projectDefaults.js'; // Try with .js extension (common for TS/ESM)
import Header from './components/Header'; // Import the new Header component

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

  const handleFormSubmit = () => {
    setGeneratedProjectData(formData);
    setIsCodeStale(false);
    setHasCodeBeenGenerated(true);
  };

  const handleReset = () => {
    setGeneratedProjectData(null);
    setFormData(INITIAL_PROJECT_FORM_DATA);
    setIsIdManuallyEdited(false);
    setIsCodeStale(false);
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
    setIsCodeStale(true);
    setHasCodeBeenGenerated(false);
  };

  const switchToWizard = () => setViewMode('wizard');
  const switchToForm = () => setViewMode('form');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-indigo-950 text-white">
      <Header /> {/* Use the new Header component here */}
      <div className="container mx-auto px-4 py-8">
        {/* Remove the old header JSX */}

        {/* <UIComparisonDemo /> */}

        <div className="grid lg:grid-cols-2 gap-8 lg:items-start">
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
          
          <div className="space-y-6 bg-gray-900 rounded-lg p-0">
            {generatedProjectData ? (
              <Tabs
                tabs={[
                  {
                    key: 'code',
                    label: 'Generated Code',
                    content: <CodeOutput projectData={generatedProjectData} onReset={handleReset} />
                  },
                  {
                    key: 'next-steps',
                    label: 'Next Steps',
                    content: <NextStepsDisplay projectData={generatedProjectData} />
                  }
                ]}
                defaultTabKey="code"
              />
            ) : (
              <div className="bg-gray-900 rounded-lg p-6 text-center text-gray-500 h-full flex flex-col justify-center items-center">
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
