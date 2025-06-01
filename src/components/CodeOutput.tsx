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
    const iconValue = projectData.icon?.includes('(') || !projectData.icon?.match(/^[A-Z]/) 
      ? `"${projectData.icon}"` 
      : projectData.icon

    const githubLine = projectData.github ? `  github: "${projectData.github}",` : ''
    const urlLine = projectData.url ? `  url: "${projectData.url}",` : ''
    const isOpenSourceLine = projectData.github && !projectData.isOpenSource 
      ? `  isOpenSource: false,` 
      : ''

    return `{
  id: "${projectData.id}",
  title: "${projectData.title}",
  description: "${projectData.description}",
  icon: ${iconValue},
  tech: [${projectData.tech?.map(tech => `"${tech}"`).join(', ') || ''}],
  color: "${projectData.color}",
  status: "${projectData.status}",
  featured: ${projectData.featured},${urlLine}${githubLine}${isOpenSourceLine}
}`
  }

  const generateProjectDetailCode = () => {
    const lines: string[] = []
    
    lines.push(`"${projectData.id}": {`)
    lines.push(`  title: "${projectData.title}",`)
    lines.push(`  description: "${projectData.description}",`)
    
    if (projectData.longDescription) {
      lines.push(`  longDescription: "${projectData.longDescription}",`)
    }
    
    if (projectData.url) {
      lines.push(`  url: "${projectData.url}",`)
    }
    
    if (projectData.github) {
      lines.push(`  github: "${projectData.github}",`)
      if (!projectData.isOpenSource) {
        lines.push(`  isOpenSource: false,`)
      }
    }
    
    if (projectData.icon) {
      const iconValue = projectData.icon.includes('(') || !projectData.icon.match(/^[A-Z]/) 
        ? `"${projectData.icon}"` 
        : projectData.icon
      lines.push(`  icon: ${iconValue},`)
    }
    
    if (projectData.screenshots && projectData.screenshots.length > 0) {
      if (projectData.screenshots.length === 1) {
        lines.push(`  screenshotUrl: "${projectData.screenshots[0]}",`)
      } else {
        lines.push(`  screenshots: [`)
        projectData.screenshots.forEach((screenshot, index) => {
          const comma = index < projectData.screenshots!.length - 1 ? ',' : ''
          lines.push(`    "${screenshot}"${comma}`)
        })
        lines.push(`  ],`)
      }
    }
    
    if (projectData.tech && projectData.tech.length > 0) {
      lines.push(`  tech: [${projectData.tech.map(tech => `"${tech}"`).join(', ')}],`)
    }
    
    if (projectData.features && projectData.features.length > 0) {
      lines.push(`  features: [`)
      projectData.features.forEach((feature, index) => {
        const comma = index < projectData.features!.length - 1 ? ',' : ''
        lines.push(`    "${feature}"${comma}`)
      })
      lines.push(`  ],`)
    }
    
    if (projectData.challenges && projectData.challenges.length > 0) {
      lines.push(`  challenges: [`)
      projectData.challenges.forEach((challenge, index) => {
        const comma = index < projectData.challenges!.length - 1 ? ',' : ''
        lines.push(`    "${challenge}"${comma}`)
      })
      lines.push(`  ],`)
    }
    
    if (projectData.content && projectData.content.length > 0) {
      lines.push(`  content: [`)
      projectData.content.forEach((section, index) => {
        lines.push(`    {`)
        lines.push(`      title: "${section.title}",`)
        
        if (Array.isArray(section.text)) {
          lines.push(`      text: [`)
          section.text.forEach((text, textIndex) => {
            const comma = textIndex < section.text.length - 1 ? ',' : ''
            lines.push(`        "${text}"${comma}`)
          })
          lines.push(`      ],`)
        } else {
          lines.push(`      text: "${section.text}",`)
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
      lines.push(`  galleryFolder: "${projectData.galleryFolder}",`)
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
          <pre className="text-sm text-gray-300">
            <code>{projectsPageCode}</code>
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
          <pre className="text-sm text-gray-300">
            <code>{projectDetailCode}</code>
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
          <li className="flex items-start gap-2">
            <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
            <span>Copy the first code block and add it to the projects array in <code className="bg-gray-700 px-1 rounded">ProjectsPage.tsx</code></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
            <span>Copy the second code block and add it to the projectData object in <code className="bg-gray-700 px-1 rounded">ProjectDetailPage.tsx</code></span>
          </li>
          {(projectData.screenshots && projectData.screenshots.length > 0) && (
            <li className="flex items-start gap-2">
              <span className="bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
              <span>Add your screenshot files to <code className="bg-gray-700 px-1 rounded">public/img/screens/</code></span>
            </li>
          )}
          {projectData.galleryFolder && (
            <li className="flex items-start gap-2">
              <span className="bg-orange-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</span>
              <span>Create the <code className="bg-gray-700 px-1 rounded">public/img/{projectData.galleryFolder}/</code> folder and add your gallery images</span>
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}
