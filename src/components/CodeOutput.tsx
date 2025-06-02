import { useState } from 'react'
import { Copy, Check, RotateCcw, Code2 } from 'lucide-react'
import type { ProjectFormData } from '../types/project'

interface Props {
  projectData: ProjectFormData
  onReset: () => void
}

export default function CodeOutput({ projectData, onReset }: Props) {
  const [copied, setCopied] = useState(false)
  
  const generateProjectDataCode = () => {
    // Handle icon formatting - Lucide icons should be unquoted, emojis and other strings should be quoted
    const getIconValue = (icon: string | undefined) => {
      if (!icon) return '""'
      
      // If it's an emoji (contains non-ASCII characters) or starts with lowercase, quote it
      if (/[^\u0020-\u007F]/.test(icon) || /^[a-z]/.test(icon)) {
        return `"${icon}"`
      }
      
      // If it starts with uppercase and contains only letters/numbers, treat as Lucide icon (unquoted)
      if (/^[A-Z][a-zA-Z0-9]*$/.test(icon)) {
        return icon
      }
      
      // Everything else gets quoted
      return `"${icon}"`
    }

    // Escape quotes and handle multiline strings properly
    const escapeString = (str: string) => str.replace(/"/g, '\\"').replace(/\n/g, '\\n')

    const lines: string[] = []
    lines.push(`{`)
    lines.push(`  id: "${escapeString(projectData.id)}",`)
    lines.push(`  title: "${escapeString(projectData.title)}",`)
    lines.push(`  description: "${escapeString(projectData.description)}",`)
    
    if (projectData.longDescription) {
      lines.push(`  longDescription: "${escapeString(projectData.longDescription)}",`)
    }
    
    if (projectData.icon) {
      const iconValue = getIconValue(projectData.icon)
      lines.push(`  icon: ${iconValue},`)
    }
    
    if (projectData.tech && projectData.tech.length > 0) {
      lines.push(`  tech: [${projectData.tech.map(tech => `"${escapeString(tech)}"`).join(', ')}],`)
    }
    
    lines.push(`  color: "${projectData.color}",`)
    lines.push(`  status: "${projectData.status}",`)
    
    if (projectData.featured) {
      lines.push(`  featured: ${projectData.featured},`)
    }
    
    if (projectData.special) {
      lines.push(`  special: ${projectData.special},`)
    }
    
    if (projectData.url) {
      lines.push(`  url: "${escapeString(projectData.url)}",`)
    }
    
    if (projectData.github) {
      lines.push(`  github: "${escapeString(projectData.github)}",`)
      lines.push(`  isOpenSource: ${projectData.isOpenSource},`)
    }
    
    if (projectData.screenshots && projectData.screenshots.length > 0) {
      if (projectData.screenshots.length === 1) {
        lines.push(`  screenshotUrl: "${escapeString(projectData.screenshots[0])}",`)
      } else {
        lines.push(`  screenshots: [`)
        projectData.screenshots.forEach((screenshot, index) => {
          const comma = index < projectData.screenshots!.length - 1 ? ',' : ''
          lines.push(`    "${escapeString(screenshot)}"${comma}`)
        })
        lines.push(`  ],`)
      }
    }
    
    if (projectData.features && projectData.features.length > 0) {
      lines.push(`  features: [`)
      projectData.features.forEach((feature, index) => {
        const comma = index < projectData.features!.length - 1 ? ',' : ''
        lines.push(`    "${escapeString(feature)}"${comma}`)
      })
      lines.push(`  ],`)
    }
    
    if (projectData.challenges && projectData.challenges.length > 0) {
      lines.push(`  challenges: [`)
      projectData.challenges.forEach((challenge, index) => {
        const comma = index < projectData.challenges!.length - 1 ? ',' : ''
        lines.push(`    "${escapeString(challenge)}"${comma}`)
      })
      lines.push(`  ],`)
    }
    
    if (projectData.content && projectData.content.length > 0) {
      lines.push(`  content: [`)
      projectData.content.forEach((section, index) => {
        lines.push(`    {`)
        lines.push(`      title: "${escapeString(section.title)}",`)
        
        // Convert string to array for list and paragraphs types during code generation
        let textContent = section.text
        if (typeof textContent === 'string' && (section.type === 'list' || section.type === 'paragraphs')) {
          textContent = textContent.split('\n').filter(line => line.trim())
        }
        
        if (Array.isArray(textContent)) {
          lines.push(`      text: [`)
          textContent.forEach((text, textIndex) => {
            const comma = textIndex < textContent.length - 1 ? ',' : ''
            lines.push(`        "${escapeString(text)}"${comma}`)
          })
          lines.push(`      ],`)
        } else {
          lines.push(`      text: "${escapeString(textContent)}",`)
        }
        
        if (section.type && section.type !== 'paragraph') {
          lines.push(`      type: "${section.type}"`)
        }
        
        const comma = index < projectData.content!.length - 1 ? ',' : ''
        lines.push(`    }${comma}`)
      })
      lines.push(`  ],`)
    }
    
    lines.push(`  lastUpdated: "${projectData.lastUpdated}",`)
    
    if (projectData.galleryFolder) {
      lines.push(`  galleryFolder: "${escapeString(projectData.galleryFolder)}",`)
    }
    
    // Configuration flags - only include if true
    if (projectData.hideVisualSection) {
      lines.push(`  hideVisualSection: true,`)
    }
    if (projectData.hideProjectInfo) {
      lines.push(`  hideProjectInfo: true,`)
    }
    if (projectData.hideTechStack) {
      lines.push(`  hideTechStack: true,`)
    }
    
    lines.push(`}`)
    
    return lines.join('\n')
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const projectDataCode = generateProjectDataCode()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code2 className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-bold">Generated Code</h2>
        </div>
        <button
          onClick={onReset}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* projectsData.ts Code Block */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-purple-400">
            Project Data for projectsData.ts
          </h3>
          <button
            onClick={() => copyToClipboard(projectDataCode)}
            className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-300 whitespace-pre overflow-x-auto">
            <code className="block whitespace-pre">{projectDataCode}</code>
          </pre>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Add this object to the projectsData array in src/data/projectsData.ts
        </p>
      </div>
    </div>
  )
}
