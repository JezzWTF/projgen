import type { ReactNode } from 'react'

interface WizardStepProps {
  title: string
  description?: string
  children: ReactNode
  stepNumber: number
  totalSteps: number
}

export default function WizardStep({ 
  title, 
  description, 
  children, 
  stepNumber, 
  totalSteps 
}: WizardStepProps) {
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
            {stepNumber}
          </div>
          <div className="flex-1 h-px bg-gray-700 mx-4"></div>
          <span className="text-gray-400 text-sm">
            {stepNumber} of {totalSteps}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        {description && (
          <p className="text-gray-400 max-w-md mx-auto">{description}</p>
        )}
      </div>

      {/* Step Content */}
      <div className="bg-gray-900 rounded-lg p-6">
        {children}
      </div>
    </div>
  )
} 