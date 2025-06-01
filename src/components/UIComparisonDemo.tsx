import { useState } from 'react'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function UIComparisonDemo() {
  const [showComparison, setShowComparison] = useState(false)

  if (!showComparison) {
    return (
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-1">UI/UX Improvements</h3>
            <p className="text-sm text-gray-300">
              This form now uses progressive disclosure and better visual hierarchy to reduce cognitive load
            </p>
          </div>
          <button
            onClick={() => setShowComparison(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <Eye className="w-4 h-4" />
            Show Improvements
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-400">UI/UX Improvements Applied</h3>
        <button
          onClick={() => setShowComparison(false)}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
        >
          <EyeOff className="w-4 h-4" />
          Hide
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-red-400">❌ Previous Issues</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• All 20+ fields visible at once</li>
            <li>• Poor visual hierarchy</li>
            <li>• Repetitive array input patterns</li>
            <li>• No progressive disclosure</li>
            <li>• Overwhelming for new users</li>
            <li>• Long scrolling form</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-green-400">✅ New Improvements</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• <strong>Progressive Disclosure:</strong> Collapsible sections</li>
            <li>• <strong>Smart Defaults:</strong> Auto-generated project ID</li>
            <li>• <strong>Contextual Fields:</strong> GitHub options appear when needed</li>
            <li>• <strong>Better UX:</strong> Completion indicators & bulk paste</li>
            <li>• <strong>Visual Hierarchy:</strong> Clear section organization</li>
            <li>• <strong>Reduced Cognitive Load:</strong> Essential fields first</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">Key Strategy:</span>
          <div className="flex items-center gap-2">
            <span className="bg-red-600 px-2 py-1 rounded text-xs">All Fields Visible</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="bg-green-600 px-2 py-1 rounded text-xs">Smart Progressive Disclosure</span>
          </div>
        </div>
      </div>
    </div>
  )
} 