import { useState, useEffect } from 'react'
import { Wand2, Lightbulb, RotateCcw, Link, Code, Image, Eye } from 'lucide-react'
import WizardStep from './WizardStep'
import WizardNavigation from './WizardNavigation'
import ArrayInput from './ArrayInput'
import type { ProjectFormData, ContentSection } from '../types/project'
import { STATUS_OPTIONS, GRADIENT_OPTIONS, CONTENT_TYPES } from '../types/project'

interface Props {
  onSubmit: (data: ProjectFormData) => void
  onSwitchToForm: () => void
}

export default function ProjectWizard({ onSubmit, onSwitchToForm }: Props) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ProjectFormData>({
    id: '',
    title: '',
    description: '',
    status: 'Live',
    lastUpdated: '',
    color: 'from-blue-400 to-cyan-500',
    featured: false,
    tech: [],
    features: [],
    challenges: [],
    screenshots: [],
    content: [],
    isOpenSource: true,
    special: false // Add special to initial state
  })

  const [isIdManuallyEdited, setIsIdManuallyEdited] = useState(false)

  // Auto-generate project ID from title
  useEffect(() => {
    if (formData.title && !isIdManuallyEdited) {
      const generatedId = formData.title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
      setFormData(prev => ({ ...prev, id: generatedId }))
    }
  }, [formData.title, isIdManuallyEdited])

  const handleInputChange = (field: keyof ProjectFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addContentSection = () => {
    const newSection: ContentSection = {
      title: '',
      text: '',
      type: 'paragraph'
    }
    setFormData(prev => ({
      ...prev,
      content: [...(prev.content || []), newSection]
    }))
  }

  const updateContentSection = (index: number, field: keyof ContentSection, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content?.map((section, i) => 
        i === index ? { ...section, [field]: value } : section
      ) || []
    }))
  }

  const removeContentSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content?.filter((_, i) => i !== index) || []
    }))
  }

  const loadExampleData = () => {
    setFormData({
      id: "example-project",
      title: "Example Project",
      description: "A comprehensive web application showcasing modern development practices",
      longDescription: "This project demonstrates full-stack development capabilities with React, TypeScript, and modern deployment practices.",
      status: "Live",
      lastUpdated: "01-06-2025",
      color: "from-blue-400 to-cyan-500",
      featured: true,
      url: "https://tool.jezz.wtf",
      github: "JezzWTF/example-project",
      isOpenSource: true,
      icon: "Rocket",
      tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      features: [
        "Modern responsive design",
        "Real-time data updates",
        "User authentication"
      ],
      challenges: [
        "Implementing complex state management",
        "Optimizing for mobile performance"
      ],
      screenshots: [
        "/img/screens/example-main.png",
        "/img/screens/example-dashboard.png"
      ],
      content: [
        {
          title: "Development Approach",
          text: "This project follows modern development practices with a focus on maintainability and scalability.",
          type: "paragraph"
        }
      ],
      galleryFolder: "example-gallery",
      hideVisualSection: false,
      hideProjectInfo: false,
      hideTechStack: false,
      special: false // Add special to example data
    })
    setIsIdManuallyEdited(true)
  }

  const clearAllData = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      status: 'Live',
      lastUpdated: '',
      color: 'from-blue-400 to-cyan-500',
      featured: false,
      tech: [],
      features: [],
      challenges: [],
      screenshots: [],
      content: [],
      isOpenSource: true,
      special: false // Add special to cleared data
    })
    setIsIdManuallyEdited(false)
    setCurrentStep(1)
  }

  // Validation for each step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Project Basics
        return !!(formData.title && formData.description && formData.lastUpdated)
      case 2: // Project Identity
        return true // All optional
      case 3: // Links & Repository
        return true // All optional
      case 4: // Technical Details
        return true // All optional
      case 5: // Visual Assets
        return true // All optional
      case 6: // Content Sections
        return true // All optional
      case 7: // Advanced Settings
        return true // All optional
      case 8: // Review
        return true
      default:
        return false
    }
  }

  const canProceed = validateStep(currentStep)
  const totalSteps = 8

  const handleNext = () => {
    if (canProceed && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WizardStep
            stepNumber={1}
            totalSteps={totalSteps}
            title="Project Basics"
            description="Let's start with the essential information about your project"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="My Awesome Project"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Short Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="A brief description of what your project does"
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Updated <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastUpdated}
                    onChange={(e) => handleInputChange('lastUpdated', e.target.value)}
                    placeholder="DD-MM-YYYY or descriptive text"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </WizardStep>
        )

      case 2:
        return (
          <WizardStep
            stepNumber={2}
            totalSteps={totalSteps}
            title="Project Identity"
            description="Customize how your project appears and stands out"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project ID</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => {
                    handleInputChange('id', e.target.value)
                    setIsIdManuallyEdited(true)
                  }}
                  placeholder="Auto-generated from title"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Used for internal identification and URL generation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Color Theme</label>
                  <select
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {GRADIENT_OPTIONS.map(gradient => (
                      <option key={gradient} value={gradient}>{gradient}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Icon</label>
                  <input
                    type="text"
                    value={formData.icon || ''}
                    onChange={(e) => handleInputChange('icon', e.target.value)}
                    placeholder="🚀 or FileSpreadsheet"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Emoji or Lucide icon name (e.g., FileSpreadsheet, Database, Code2)</p>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm">Featured Project</label>
                <p className="text-xs text-gray-500 ml-2">(appears prominently in portfolio)</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.special || false}
                  onChange={(e) => handleInputChange('special', e.target.checked)}
                  className="w-4 h-4 text-yellow-600 bg-gray-800 border-gray-700 rounded focus:ring-yellow-500"
                />
                <label className="ml-2 text-sm">Special Project</label>
                <p className="text-xs text-gray-500 ml-2">(marks project with a special tag)</p>
              </div>
            </div>
          </WizardStep>
        )

      case 3:
        return (
          <WizardStep
            stepNumber={3}
            totalSteps={totalSteps}
            title="Links & Repository"
            description="Add links to your live project and source code"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Link className="w-4 h-4 inline mr-1" />
                  Live URL
                </label>
                <input
                  type="url"
                  value={formData.url || ''}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://your-project.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Code className="w-4 h-4 inline mr-1" />
                  GitHub Repository
                </label>
                <input
                  type="text"
                  value={formData.github || ''}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  placeholder="username/repository"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {formData.github && (
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isOpenSource}
                      onChange={(e) => handleInputChange('isOpenSource', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm">Open Source Repository</label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Check this if the repository is publicly accessible
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Long Description</label>
                <textarea
                  value={formData.longDescription || ''}
                  onChange={(e) => handleInputChange('longDescription', e.target.value)}
                  placeholder="A detailed description for the overview section"
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </WizardStep>
        )

      case 4:
        return (
          <WizardStep
            stepNumber={4}
            totalSteps={totalSteps}
            title="Technical Details"
            description="Add information about technologies, features, and challenges"
          >
            <div className="space-y-6">
                             <ArrayInput
                 label="Tech Stack"
                 value={formData.tech || []}
                 onChange={(items: string[]) => handleInputChange('tech', items)}
                 placeholder="React, TypeScript, Node.js..."
               />

               <ArrayInput
                 label="Key Features"
                 value={formData.features || []}
                 onChange={(items: string[]) => handleInputChange('features', items)}
                 placeholder="Real-time updates, User authentication..."
               />

               <ArrayInput
                 label="Challenges & Solutions"
                 value={formData.challenges || []}
                 onChange={(items: string[]) => handleInputChange('challenges', items)}
                 placeholder="Performance optimization, Complex state management..."
               />
            </div>
          </WizardStep>
        )

      case 5:
        return (
          <WizardStep
            stepNumber={5}
            totalSteps={totalSteps}
            title="Visual Assets"
            description="Add screenshots and configure visual elements"
          >
            <div className="space-y-6">
                             <ArrayInput
                 label="Screenshots"
                 value={formData.screenshots || []}
                 onChange={(items: string[]) => handleInputChange('screenshots', items)}
                 placeholder="/img/screens/project-main.png"
               />
               <p className="text-xs text-gray-500 mt-1">
                 Paths relative to your public directory
               </p>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  Gallery Folder
                </label>
                <input
                  type="text"
                  value={formData.galleryFolder || ''}
                  onChange={(e) => handleInputChange('galleryFolder', e.target.value)}
                  placeholder="project-gallery"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Folder name containing additional project images
                </p>
              </div>
            </div>
          </WizardStep>
        )

      case 6:
        return (
          <WizardStep
            stepNumber={6}
            totalSteps={totalSteps}
            title="Content Sections"
            description="Add custom content blocks for detailed project information"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">Custom Content Blocks</h4>
                <button
                  type="button"
                  onClick={addContentSection}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                >
                  Add Section
                </button>
              </div>

              {formData.content?.map((section, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium">Section {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeContentSection(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateContentSection(index, 'title', e.target.value)}
                        placeholder="Section title"
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                                             <select
                         value={section.type}
                         onChange={(e) => updateContentSection(index, 'type', e.target.value)}
                         className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       >
                         {CONTENT_TYPES.map(type => (
                           <option key={type.value} value={type.value}>{type.label}</option>
                         ))}
                       </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Content</label>
                      <textarea
                        value={Array.isArray(section.text) ? section.text.join('\n') : section.text}
                        onChange={(e) => updateContentSection(index, 'text', e.target.value)}
                        placeholder={section.type === 'list' ? 'One item per line' : 'Section content'}
                        rows={4}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {(!formData.content || formData.content.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <p>No content sections added yet.</p>
                  <p className="text-sm">Click "Add Section" to create custom content blocks.</p>
                </div>
              )}
            </div>
          </WizardStep>
        )

      case 7:
        return (
          <WizardStep
            stepNumber={7}
            totalSteps={totalSteps}
            title="Advanced Settings"
            description="Configure display options and advanced features"
          >
            <div className="space-y-4">
              <h4 className="text-lg font-medium mb-4">Display Configuration</h4>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hideVisualSection || false}
                    onChange={(e) => handleInputChange('hideVisualSection', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm">Hide Visual Section</label>
                  <p className="text-xs text-gray-500 ml-2">(screenshots and gallery)</p>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hideProjectInfo || false}
                    onChange={(e) => handleInputChange('hideProjectInfo', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm">Hide Project Info</label>
                  <p className="text-xs text-gray-500 ml-2">(status, dates, links)</p>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hideTechStack || false}
                    onChange={(e) => handleInputChange('hideTechStack', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm">Hide Tech Stack</label>
                  <p className="text-xs text-gray-500 ml-2">(technologies used)</p>
                </div>
              </div>
            </div>
          </WizardStep>
        )

      case 8:
        return (
          <WizardStep
            stepNumber={8}
            totalSteps={totalSteps}
            title="Review & Generate"
            description="Review your project details and generate the code"
          >
            <div className="space-y-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Project Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Title:</span>
                    <span className="ml-2">{formData.title || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <span className="ml-2">{formData.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Technologies:</span>
                    <span className="ml-2">{formData.tech?.length || 0} items</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Features:</span>
                    <span className="ml-2">{formData.features?.length || 0} items</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Screenshots:</span>
                    <span className="ml-2">{formData.screenshots?.length || 0} items</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Content Sections:</span>
                    <span className="ml-2">{formData.content?.length || 0} items</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-blue-400">Ready to Generate</span>
                </div>
                <p className="text-sm text-gray-300">
                  Your project configuration is complete. Click "Generate Code" to create the code blocks for your portfolio.
                </p>
              </div>
            </div>
          </WizardStep>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Mode Switch */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Wand2 className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Guided Setup</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearAllData}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Start Over
            </button>
            <button
              type="button"
              onClick={loadExampleData}
              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Lightbulb className="w-4 h-4" />
              Load Example
            </button>
            <button
              type="button"
              onClick={onSwitchToForm}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Switch to Quick Form
            </button>
          </div>
        </div>

        <div className="text-center text-gray-400">
          <p>Step-by-step guidance to create your project configuration</p>
        </div>
      </div>

      {/* Wizard Content */}
      <div className="bg-gray-900 rounded-lg p-6">
        {renderStep()}
        
        <WizardNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          canProceed={canProceed}
          isLastStep={currentStep === totalSteps}
          isFirstStep={currentStep === 1}
        />
      </div>
    </div>
  )
}