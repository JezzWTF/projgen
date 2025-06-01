import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

interface WizardNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  canProceed: boolean
  isLastStep: boolean
  isFirstStep: boolean
}

export default function WizardNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  canProceed,
  isLastStep,
  isFirstStep
}: WizardNavigationProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-700">
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isFirstStep
            ? 'text-gray-500 cursor-not-allowed'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      {/* Progress Dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNum = index + 1
          const isCompleted = stepNum < currentStep
          const isCurrent = stepNum === currentStep
          
          return (
            <div
              key={stepNum}
              className={`w-3 h-3 rounded-full transition-colors ${
                isCompleted
                  ? 'bg-green-500'
                  : isCurrent
                  ? 'bg-blue-500'
                  : 'bg-gray-600'
              }`}
            />
          )
        })}
      </div>

      {/* Next/Submit Button */}
      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
            canProceed
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Check className="w-4 h-4" />
          Generate Code
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            canProceed
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
} 