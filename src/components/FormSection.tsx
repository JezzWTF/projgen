import { useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface FormSectionProps {
  title: string
  icon: ReactNode
  children: ReactNode
  defaultExpanded?: boolean
  badge?: string | number
  colorClass?: string
  description?: string
}

export default function FormSection({ 
  title, 
  icon, 
  children, 
  defaultExpanded = false, 
  badge,
  colorClass = "text-blue-400",
  description 
}: FormSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={colorClass}>
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {title}
              {badge && (
                <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {badge}
                </span>
              )}
            </h3>
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
          </div>
        </div>
        <div className="text-gray-400">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </div>
      </button>
      
      <div className={`transition-opacity duration-300 ease-in-out ${
        isExpanded ? 'opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-6 pb-6 space-y-4">
          {children}
        </div>
      </div>
    </div>
  )
} 