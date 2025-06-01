import { useState } from 'react'
import { Copy, Check, RotateCcw, Code2 } from 'lucide-react'
import type { ProjectFormData } from '../types/project'

interface Props {
  projectData: ProjectFormData
  onReset: () => void
}

export default function CodeOutput({ projectData, onReset }: Props) {
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null)
  
  const generateProjectsPageCode = () => {
    // Handle icon formatting - Lucide icons should be unquoted, emojis and other strings should be quoted
    const getIconValue = (icon: string | undefined) => {
      if (!icon) return '""'
      
      // If it's an emoji (contains non-ASCII characters) or starts with lowercase, quote it
      if (/[^\x00-\x7F]/.test(icon) || /^[a-z]/.test(icon)) {
        return `"${icon}"`
      }
      
      // If it starts with uppercase and contains only letters/numbers, treat as Lucide icon (unquoted)
      if (/^[A-Z][a-zA-Z0-9]*$/.test(icon)) {
        return icon
      }
      
      // Everything else gets quoted
      return `"${icon}"`
    }
    
    const iconValue = getIconValue(projectData.icon)

    // Escape quotes and handle multiline strings properly
    const escapeString = (str: string) => str.replace(/"/g, '\\"').replace(/\n/g, '\\n')

    const lines: string[] = []
    lines.push(`{`)
    lines.push(`  id: "${escapeString(projectData.id)}",`)
    lines.push(`  title: "${escapeString(projectData.title)}",`)
    lines.push(`  description: "${escapeString(projectData.description)}",`)
    lines.push(`  icon: ${iconValue},`)
    lines.push(`  tech: [${projectData.tech?.map(tech => `"${escapeString(tech)}"`).join(', ') || ''}],`)
    lines.push(`  color: "${projectData.color}",`)
    lines.push(`  status: "${projectData.status}",`)
    lines.push(`  featured: ${projectData.featured},`)
    
    if (projectData.url) {
      lines.push(`  url: "${escapeString(projectData.url)}",`)
    }
    
    if (projectData.github) {
      lines.push(`  github: "${escapeString(projectData.github)}",`)
      lines.push(`  isOpenSource: ${projectData.isOpenSource},`)
    }
    
    lines.push(`}`)
    
    return lines.join('\n')
  }

  const generateProjectDetailCode = () => {
    // Escape quotes and handle multiline strings properly
    const escapeString = (str: string) => str.replace(/"/g, '\\"').replace(/\n/g, '\\n')
    
    const lines: string[] = []
    
    lines.push(`"${escapeString(projectData.id)}": {`)
    lines.push(`  title: "${escapeString(projectData.title)}",`)
    lines.push(`  description: "${escapeString(projectData.description)}",`)
    
    if (projectData.longDescription) {
      lines.push(`  longDescription: "${escapeString(projectData.longDescription)}",`)
    }
    
    if (projectData.url) {
      lines.push(`  url: "${escapeString(projectData.url)}",`)
    }
      if (projectData.github) {
      lines.push(`  github: "${escapeString(projectData.github)}",`)
      lines.push(`  isOpenSource: ${projectData.isOpenSource},`)
    }
    
    if (projectData.icon) {
      // Handle icon formatting - Lucide icons should be unquoted, emojis and other strings should be quoted
      const getIconValue = (icon: string | undefined) => {
        if (!icon) return '""'
        
        // If it's an emoji (contains non-ASCII characters) or starts with lowercase, quote it
        if (/[^\x00-\x7F]/.test(icon) || /^[a-z]/.test(icon)) {
          return `"${icon}"`
        }
        
        // If it starts with uppercase and contains only letters/numbers, treat as Lucide icon (unquoted)
        if (/^[A-Z][a-zA-Z0-9]*$/.test(icon)) {
          return icon
        }
        
        // Everything else gets quoted
        return `"${icon}"`
      }
      
      const iconValue = getIconValue(projectData.icon)
      lines.push(`  icon: ${iconValue},`)
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
    
    if (projectData.tech && projectData.tech.length > 0) {
      lines.push(`  tech: [${projectData.tech.map(tech => `"${escapeString(tech)}"`).join(', ')}],`)
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
    
    lines.push(`  status: "${projectData.status}",`)
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

  const copyToClipboard = async (text: string, blockName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedBlock(blockName)
      setTimeout(() => setCopiedBlock(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const projectsPageCode = generateProjectsPageCode()
  const projectDetailCode = generateProjectDetailCode()

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

      {/* ProjectsPage.tsx Code Block */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-400">
            ProjectsPage.tsx - Projects Array Entry
          </h3>
          <button
            onClick={() => copyToClipboard(projectsPageCode, 'projects')}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            {copiedBlock === 'projects' ? (
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
            <code className="block whitespace-pre">{projectsPageCode}</code>
          </pre>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Add this object to the projects array in ProjectsPage.tsx
        </p>
      </div>

      {/* ProjectDetailPage.tsx Code Block */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-400">
            ProjectDetailPage.tsx - ProjectData Entry
          </h3>
          <button
            onClick={() => copyToClipboard(projectDetailCode, 'detail')}
            className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            {copiedBlock === 'detail' ? (
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
            <code className="block whitespace-pre">{projectDetailCode}</code>
          </pre>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Add this entry to the projectData object in ProjectDetailPage.tsx
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-400 mb-3">Next Steps</h3>
        <ol className="space-y-2 text-sm text-gray-300">
          {(() => {
            const steps = []
            let stepNumber = 1
            
            // Step 1: Always shown - ProjectsPage.tsx
            steps.push(
              <li key="projects-page" className="flex items-start gap-2">
                <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{stepNumber++}</span>
                <span>Copy the first code block and add it to the projects array in <code className="bg-gray-700 px-1 rounded">ProjectsPage.tsx</code></span>
              </li>
            )
            
            // Step 2: Always shown - ProjectDetailPage.tsx
            steps.push(
              <li key="project-detail" className="flex items-start gap-2">
                <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{stepNumber++}</span>
                <span>Copy the second code block and add it to the projectData object in <code className="bg-gray-700 px-1 rounded">ProjectDetailPage.tsx</code></span>
              </li>
            )
            
            // Step 3: Only if screenshots exist
            if (projectData.screenshots && projectData.screenshots.length > 0) {
              // Analyze screenshot paths to give better guidance
              const screenshotPaths = projectData.screenshots
              const uniqueDirectories = [...new Set(screenshotPaths.map(path => {
                const dir = path.substring(0, path.lastIndexOf('/'))
                return dir || '/'
              }))]
              
              let screenshotInstruction = ''
              if (uniqueDirectories.length === 1) {
                const dir = uniqueDirectories[0]
                if (dir === '/') {
                  screenshotInstruction = `Add your screenshot files to the <code className="bg-gray-700 px-1 rounded">public/</code> directory`
                } else {
                  screenshotInstruction = `Add your screenshot files to <code className="bg-gray-700 px-1 rounded">public${dir}/</code>`
                }
              } else {
                screenshotInstruction = `Add your screenshot files to their respective directories in <code className="bg-gray-700 px-1 rounded">public/</code>`
              }
              
              steps.push(
                <li key="screenshots" className="flex items-start gap-2">
                  <span className="bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{stepNumber++}</span>
                  <span dangerouslySetInnerHTML={{ __html: screenshotInstruction }} />
                </li>
              )
            }
            
            // Step 4: Only if gallery folder exists
            if (projectData.galleryFolder) {
              steps.push(
                <li key="gallery" className="flex items-start gap-2">
                  <span className="bg-orange-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{stepNumber++}</span>
                  <span>Create the <code className="bg-gray-700 px-1 rounded">public/img/{projectData.galleryFolder}/</code> folder and add your gallery images</span>
                </li>
              )
            }
            
            return steps
          })()}
        </ol>
      </div>
    </div>
  )
}
