import type { ProjectFormData } from '../types/project'

interface NextStepsDisplayProps {
  projectData: ProjectFormData;
  // onClose is no longer needed for inline display
}

export default function NextStepsDisplay({ projectData }: NextStepsDisplayProps) {
  return (
    // Removed p-6, bg-gray-800, rounded-lg, shadow-xl, max-w-2xl
    // Added w-full to ensure it takes the width of the tab content area if needed
    <div className="w-full mb-6"> 
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-yellow-400">Next Steps</h3>
        {/* Removed close (X) button */}
      </div>
      <ol className="space-y-3 text-sm text-gray-300">
        {(() => {
          const steps = []
          let stepNumber = 1

          // Step 1: Add project data to projectsData.ts
          steps.push(
            <li key="projects-data" className="flex items-start gap-3 p-3 bg-gray-700 rounded-md">
              <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{stepNumber++}</span>
              <span>Copy the generated code block and add it to the projectsData array in <code className="bg-gray-600 px-1.5 py-0.5 rounded text-purple-300">src/data/projectsData.ts</code></span>
            </li>
          )

          // Step 2: Only if screenshots exist
          if (projectData.screenshots && projectData.screenshots.length > 0) {
            const screenshotPaths = projectData.screenshots
            const uniqueDirectories = [...new Set(screenshotPaths.map(path => {
              const dir = path.substring(0, path.lastIndexOf('/'))
              return dir || '/'
            }))]
            
            let screenshotInstruction = ''
            if (uniqueDirectories.length === 1) {
              const dir = uniqueDirectories[0]
              if (dir === '/') {
                screenshotInstruction = `Add your screenshot files to the <code class="bg-gray-600 px-1.5 py-0.5 rounded text-purple-300">public/</code> directory`
              } else {
                screenshotInstruction = `Add your screenshot files to <code class="bg-gray-600 px-1.5 py-0.5 rounded text-purple-300">public${dir}/</code>`
              }
            } else {
              screenshotInstruction = `Add your screenshot files to their respective directories in <code class="bg-gray-600 px-1.5 py-0.5 rounded text-purple-300">public/</code>`
            }
            
            steps.push(
              <li key="screenshots" className="flex items-start gap-3 p-3 bg-gray-700 rounded-md">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{stepNumber++}</span>
                <span dangerouslySetInnerHTML={{ __html: screenshotInstruction }} />
              </li>
            )
          }

          // Step 3: Only if gallery folder exists
          if (projectData.galleryFolder) {
            steps.push(
              <li key="gallery" className="flex items-start gap-3 p-3 bg-gray-700 rounded-md">
                <span className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{stepNumber++}</span>
                <span>Create the <code className="bg-gray-600 px-1.5 py-0.5 rounded text-orange-300">public/img/{projectData.galleryFolder}/</code> folder and add your gallery images</span>
              </li>
            )
          }
          
          return steps
        })()}
      </ol>
      {/* Removed "Got it!" button */}
    </div>
  )
} 