import { FileCode2, Lightbulb, RotateCcw, User, Layers, Settings, Code, Link, Palette } from 'lucide-react'
import FormSection from './FormSection'
import ArrayInput from './ArrayInput'
import type { ProjectFormData, ContentSection } from '../types/project'
import { STATUS_OPTIONS, GRADIENT_OPTIONS, CONTENT_TYPES } from '../types/project'

interface Props {
  formData: ProjectFormData;
  onFormDataChange: (data: Partial<ProjectFormData>) => void;
  isIdManuallyEdited: boolean;
  onSetIsIdManuallyEdited: (edited: boolean) => void;
  isCodeStale: boolean;
  hasCodeBeenGenerated: boolean;
  onSubmit: () => void;
  onSwitchToWizard?: () => void;
  onLoadExample: () => void;
  onClearAll: () => void;
}

export default function ProjectFormImproved({
  formData,
  onFormDataChange,
  isIdManuallyEdited,
  onSetIsIdManuallyEdited,
  isCodeStale,
  hasCodeBeenGenerated,
  onSubmit,
  onSwitchToWizard,
  onLoadExample,
  onClearAll,
}: Props) {

  const handleInputChange = (field: keyof ProjectFormData, value: string | boolean | string[]) => {
    onFormDataChange({ [field]: value })
  }

  const addContentSection = () => {
    const newSection: ContentSection = {
      title: '',
      text: '',
      type: 'paragraph'
    }
    onFormDataChange({
      content: [...(formData.content || []), newSection]
    })
  }

  const updateContentSection = (index: number, field: keyof ContentSection, value: string | string[]) => {
    const updatedContent = formData.content?.map((section, i) => 
      i === index ? { ...section, [field]: value } : section
    ) || []
    onFormDataChange({ content: updatedContent })
  }

  const removeContentSection = (index: number) => {
    const updatedContent = formData.content?.filter((_, i) => i !== index) || []
    onFormDataChange({ content: updatedContent })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate that featured projects have a long description
    if (formData.featured && !formData.longDescription?.trim()) {
      // Find the detailed description element and scroll to it
      const detailedDescriptionField = document.querySelector('[placeholder*="Required for featured projects"]');
      if (detailedDescriptionField) {
        detailedDescriptionField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (detailedDescriptionField as HTMLElement).focus();
      }
      
      return; // Prevent form submission
    }
    
    onSubmit()
  }

  const getProjectDetailsCount = () => {
    const details = [
      formData.id,
      formData.longDescription,
      formData.url,
      formData.github,
      formData.icon,
      formData.galleryFolder
    ].filter(Boolean)
    return details.length > 0 ? details.length : undefined
  }

  const getContentCount = () => {
    const content = [
      ...(formData.tech || []),
      ...(formData.features || []),
      ...(formData.challenges || []),
      ...(formData.screenshots || []),
      ...(formData.content || [])
    ]
    return content.length > 0 ? content.length : undefined
  }

  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FileCode2 className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Project Generator</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClearAll}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Clear All
            </button>
            <button
              type="button"
              onClick={onLoadExample}
              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Lightbulb className="w-4 h-4" />
              Load Example
            </button>
            {onSwitchToWizard && (
              <button
                type="button"
                onClick={onSwitchToWizard}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Try Guided Setup
              </button>
            )}
          </div>
        </div>

        {/* Essential Fields - Always Visible */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
                placeholder="My Project Title"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
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
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Short Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
              rows={3}
              placeholder="A brief description of what this project does..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Last Updated <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.lastUpdated}
                onChange={(e) => handleInputChange('lastUpdated', e.target.value)}
                placeholder="DD-MM-YYYY or descriptive text"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
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
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => handleInputChange('featured', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm">Featured Project</label>
          </div>
          {formData.featured && (
            <p className="text-xs text-yellow-400 ml-6 mb-2">
              Featured projects require a semi-detailed description to be displayed on project cards.
            </p>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.special || false}
              onChange={(e) => handleInputChange('special', e.target.checked)}
              className="w-4 h-4 text-yellow-600 bg-gray-800 border-gray-700 rounded focus:ring-yellow-500"
            />
            <label className="ml-2 text-sm">'Special' Project</label>
          </div>
          <p className="text-xs text-gray-400 ml-6">
            Marks the project with a distinct visual treatment (e.g., `✨New` badge, shimmer effect) on the portfolio.
          </p>
        </form>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-4">
        {/* Project Details */}
        <FormSection
          title="Project Details"
          icon={<User className="w-5 h-5" />}
          defaultExpanded={true}
          badge={getProjectDetailsCount()}
          colorClass="text-green-400"
          description="Additional information and links"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Project ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => {
                handleInputChange('id', e.target.value)
                onSetIsIdManuallyEdited(true)
              }}
              placeholder="Auto-generated from title"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              {isIdManuallyEdited ? (
                <>
                  Manually set. 
                  <button
                    type="button"
                    onClick={() => {
                      onSetIsIdManuallyEdited(false)
                    }}
                    className="text-blue-400 hover:text-blue-300 underline ml-1"
                  >
                    Reset to auto-generate
                  </button>
                </>
              ) : (
                'Auto-generated from title'
              )}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Detailed Description {formData.featured && <span className="text-red-400">*</span>}
            </label>
            <textarea
              value={formData.longDescription || ''}
              onChange={(e) => handleInputChange('longDescription', e.target.value)}
              rows={4}
              placeholder={formData.featured ? "Required for featured projects. A more comprehensive description..." : "A more comprehensive description for the project overview..."}
              className={`w-full bg-gray-800 border ${formData.featured && !formData.longDescription ? 'border-red-400' : 'border-gray-700'} rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required={formData.featured}
            />
            {formData.featured && !formData.longDescription && (
              <p className="text-xs text-red-400 mt-1">
                A semi-detailed description is required for featured projects as it will be displayed on the project card.
                <br />
                Tip: Don't make it too long, just enough to give a good overview.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <Link className="w-4 h-4 inline mr-1" />
                Live URL
              </label>
              <input
                type="url"
                value={formData.url || ''}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://some-tool.jezz.wtf"
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
                placeholder="JezzWTF/repository"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Contextual GitHub Options */}
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
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <Palette className="w-4 h-4 inline mr-1" />
                Icon
              </label>
                              <input
                  type="text"
                  value={formData.icon || ''}
                  onChange={(e) => handleInputChange('icon', e.target.value)}
                  placeholder="🚀 or FileSpreadsheet"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Emoji or Lucide icon name (e.g., FileSpreadsheet, Database, Code2)</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Gallery Folder</label>
              <input
                type="text"
                value={formData.galleryFolder || ''}
                onChange={(e) => handleInputChange('galleryFolder', e.target.value)}
                placeholder="project-gallery"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </FormSection>

        {/* Content & Features */}
        <FormSection
          title="Content & Features"
          icon={<Layers className="w-5 h-5" />}
          defaultExpanded={false}
          badge={getContentCount()}
          colorClass="text-purple-400"
          description="Technologies, features, challenges, and custom content"
        >
          <div className="space-y-6">
            <ArrayInput
              label="Technologies"
              value={formData.tech || []}
              onChange={(value) => handleInputChange('tech', value)}
              placeholder="React, TypeScript, Python, etc."
            />

            <ArrayInput
              label="Key Features"
              value={formData.features || []}
              onChange={(value) => handleInputChange('features', value)}
              placeholder="Real-time updates, responsive design, etc."
            />

            <ArrayInput
              label="Technical Challenges"
              value={formData.challenges || []}
              onChange={(value) => handleInputChange('challenges', value)}
              placeholder="Performance optimization, AI mess-ups, etc."
            />

            <ArrayInput
              label="Screenshots"
              value={formData.screenshots || []}
              onChange={(value) => handleInputChange('screenshots', value)}
              placeholder="/img/screens/project-screenshot.png"
            />

            {/* Custom Content Sections */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium">Custom Content Sections</label>
                <button
                  type="button"
                  onClick={addContentSection}
                  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm transition-colors"
                >
                  Add Section
                </button>
              </div>
              
              {formData.content?.map((section, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg mb-3 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateContentSection(index, 'title', e.target.value)}
                      placeholder="Section title"
                      className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeContentSection(index)}
                      className="ml-2 text-red-400 hover:text-red-300 px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <select
                    value={section.type || 'paragraph'}
                    onChange={(e) => updateContentSection(index, 'type', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {CONTENT_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  
                  <textarea
                    value={Array.isArray(section.text) ? section.text.join('\n') : section.text}
                    onChange={(e) => updateContentSection(index, 'text', e.target.value)}
                    placeholder={section.type === 'list' ? 'One item per line' : section.type === 'paragraphs' ? 'One paragraph per line' : 'Section content'}
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        </FormSection>

        {/* Advanced Options */}
        <FormSection
          title="Advanced Options"
          icon={<Settings className="w-5 h-5" />}
          defaultExpanded={false}
          colorClass="text-red-400"
          description="Configuration flags and advanced settings"
        >
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.hideVisualSection || false}
                onChange={(e) => handleInputChange('hideVisualSection', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm">Hide Visual Section</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.hideProjectInfo || false}
                onChange={(e) => handleInputChange('hideProjectInfo', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm">Hide Project Info</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.hideTechStack || false}
                onChange={(e) => handleInputChange('hideTechStack', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm">Hide Tech Stack</label>
            </div>
                            <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hideOverview || false}
                    onChange={(e) => handleInputChange('hideOverview', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm">Hide Overview Section</label>
                  <p className='text-xs text-gray-500 ml-2'>(long description on project page)</p>
                </div>
          </div>
        </FormSection>
      </div>

      {/* Submit Button */}
      <div className="bg-gray-900 rounded-lg p-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
        >
          {hasCodeBeenGenerated && isCodeStale ? 'Re-generate Code Blocks' : 'Generate Code Blocks'}
        </button>
        {hasCodeBeenGenerated && isCodeStale && (
          <p className="text-center text-yellow-400 text-xs mt-2">
            Form data has changed. Re-generate to see updated code blocks.
          </p>
        )}
      </div>
    </div>
  )
}