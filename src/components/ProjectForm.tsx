import { useState } from 'react'
import { Plus, Minus, FileCode2, Lightbulb, RotateCcw } from 'lucide-react'
import type { ProjectFormData, ContentSection } from '../types/project'
import { STATUS_OPTIONS, GRADIENT_OPTIONS, CONTENT_TYPES } from '../types/project'

interface Props {
  onSubmit: (data: ProjectFormData) => void
}

export default function ProjectForm({ onSubmit }: Props) {
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
    isOpenSource: true
  })

  const [techInput, setTechInput] = useState('')
  const [featureInput, setFeatureInput] = useState('')
  const [challengeInput, setChallengeInput] = useState('')
  const [screenshotInput, setScreenshotInput] = useState('')
  const handleInputChange = (field: keyof ProjectFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addToArray = (field: 'tech' | 'features' | 'challenges' | 'screenshots', value: string, setValue: (val: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()]
      }))
      setValue('')
    }
  }

  const removeFromArray = (field: 'tech' | 'features' | 'challenges' | 'screenshots', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || []
    }))
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate project ID if not provided
    const projectId = formData.id || formData.title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
    
    onSubmit({ ...formData, id: projectId })
  }

  const loadExampleData = () => {
    setFormData({
      id: "example-project",
      title: "Example Project",
      description: "A comprehensive web application showcasing modern development practices",
      longDescription: "This project demonstrates full-stack development capabilities with React, TypeScript, and modern deployment practices. It serves as a portfolio piece highlighting technical skills and problem-solving abilities.",
      status: "Live",
      lastUpdated: "01-06-2025",
      color: "from-blue-400 to-cyan-500",
      featured: true,
      url: "https://example.com",
      github: "username/example-project",
      isOpenSource: true,
      icon: "🚀",
      tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      features: [
        "Modern responsive design",
        "Real-time data updates",
        "User authentication",
        "Performance optimized"
      ],
      challenges: [
        "Implementing complex state management",
        "Optimizing for mobile performance",
        "Creating reusable component architecture"
      ],
      screenshots: [
        "/img/screens/example-main.png",
        "/img/screens/example-dashboard.png"
      ],      content: [
        {
          title: "Development Approach",
          text: "This project follows modern development practices with a focus on maintainability and scalability.",
          type: "paragraph"
        },
        {
          title: "Key Learnings",
          text: "Advanced React patterns and hooks\nTypeScript best practices\nModern CSS techniques",
          type: "list"
        }
      ],
      galleryFolder: "example-gallery",
      hideVisualSection: false,
      hideProjectInfo: false,
      hideTechStack: false
    })  }

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
      isOpenSource: true
    })
    // Clear all input fields
    setTechInput('')
    setFeatureInput('')
    setChallengeInput('')
    setScreenshotInput('')
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileCode2 className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold">Project Details</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clearAllData}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Clear All
          </button>
          <button
            type="button"
            onClick={loadExampleData}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <Lightbulb className="w-4 h-4" />
            Load Example
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Required Fields */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-400">Required Fields</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project ID</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                placeholder="Auto-generated from title if empty"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
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
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Short Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Last Updated</label>
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
              <label className="block text-sm font-medium mb-2">Gradient Color</label>
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
        </div>

        {/* Optional Fields */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-400">Optional Fields</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Long Description</label>
            <textarea
              value={formData.longDescription || ''}
              onChange={(e) => handleInputChange('longDescription', e.target.value)}
              rows={4}
              placeholder="Detailed description for overview section"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Live URL</label>
              <input
                type="url"
                value={formData.url || ''}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://your-project.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">GitHub Repository</label>
              <input
                type="text"
                value={formData.github || ''}
                onChange={(e) => handleInputChange('github', e.target.value)}
                placeholder="username/repository"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {formData.github && (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isOpenSource}
                onChange={(e) => handleInputChange('isOpenSource', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm">Open Source Repository</label>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Icon (emoji or Lucide icon name)</label>
              <input
                type="text"
                value={formData.icon || ''}
                onChange={(e) => handleInputChange('icon', e.target.value)}
                placeholder="🚀 or Gamepad2"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Gallery Folder</label>
              <input
                type="text"
                value={formData.galleryFolder || ''}
                onChange={(e) => handleInputChange('galleryFolder', e.target.value)}
                placeholder="folder-name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Arrays */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-purple-400">Lists & Arrays</h3>
          
          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium mb-2">Technologies</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('tech', techInput, setTechInput))}
              />
              <button
                type="button"
                onClick={() => addToArray('tech', techInput, setTechInput)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tech?.map((tech, index) => (
                <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeFromArray('tech', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium mb-2">Features</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add feature"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('features', featureInput, setFeatureInput))}
              />
              <button
                type="button"
                onClick={() => addToArray('features', featureInput, setFeatureInput)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {formData.features?.map((feature, index) => (
                <div key={index} className="bg-gray-800 px-3 py-2 rounded flex items-center justify-between">
                  <span className="text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('features', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div>
            <label className="block text-sm font-medium mb-2">Technical Challenges</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={challengeInput}
                onChange={(e) => setChallengeInput(e.target.value)}
                placeholder="Add challenge"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('challenges', challengeInput, setChallengeInput))}
              />
              <button
                type="button"
                onClick={() => addToArray('challenges', challengeInput, setChallengeInput)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {formData.challenges?.map((challenge, index) => (
                <div key={index} className="bg-gray-800 px-3 py-2 rounded flex items-center justify-between">
                  <span className="text-sm">{challenge}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('challenges', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div>
            <label className="block text-sm font-medium mb-2">Screenshots</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={screenshotInput}
                onChange={(e) => setScreenshotInput(e.target.value)}
                placeholder="/img/screens/project-screenshot.png"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('screenshots', screenshotInput, setScreenshotInput))}
              />
              <button
                type="button"
                onClick={() => addToArray('screenshots', screenshotInput, setScreenshotInput)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {formData.screenshots?.map((screenshot, index) => (
                <div key={index} className="bg-gray-800 px-3 py-2 rounded flex items-center justify-between">
                  <span className="text-sm">{screenshot}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('screenshots', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-orange-400">Custom Content Sections</h3>
            <button
              type="button"
              onClick={addContentSection}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>
          
          {formData.content?.map((section, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
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
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
              
              <select
                value={section.type || 'paragraph'}
                onChange={(e) => updateContentSection(index, 'type', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {CONTENT_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
                <textarea
                value={Array.isArray(section.text) ? section.text.join('\n') : section.text}
                onChange={(e) => {
                  const value = e.target.value
                  // For list and paragraphs, store as string during editing, convert to array when generating code
                  updateContentSection(index, 'text', value)
                }}
                placeholder={section.type === 'list' ? 'One item per line' : section.type === 'paragraphs' ? 'One paragraph per line' : 'Section content'}
                rows={4}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>

        {/* Configuration Flags */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-400">Configuration Flags</h3>
          <div className="space-y-2">
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
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
        >
          Generate Code Blocks
        </button>
      </form>
    </div>
  )
}
