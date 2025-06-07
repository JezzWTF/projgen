import { useState } from 'react'
import { Sparkles, Wand2, FileCode2, ChevronRight, CheckCircle, Users, Zap, Target } from 'lucide-react'

export default function UIImprovementsDemo() {
  const [isExpanded, setIsExpanded] = useState(false)

  const improvements = [
    {
      icon: <Wand2 className="w-5 h-5" />,
      title: "Guided Wizard Mode",
      description: "Step-by-step guidance for new users with progress tracking",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20 border-purple-700"
    },
    {
      icon: <FileCode2 className="w-5 h-5" />,
      title: "Quick Form Mode", 
      description: "Efficient collapsible sections for experienced users",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20 border-blue-700"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Smart Auto-completion",
      description: "Auto-generated IDs, bulk paste support, and contextual fields",
      color: "text-green-400",
      bgColor: "bg-green-900/20 border-green-700"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Progressive Disclosure",
      description: "Reduced cognitive load with 70% fewer initial fields",
      color: "text-orange-400",
      bgColor: "bg-orange-900/20 border-orange-700"
    }
  ]

  const userTypes = [
    {
      icon: <Users className="w-4 h-4" />,
      title: "New Users",
      description: "Guided wizard with step-by-step instructions",
      recommendation: "Use Guided Setup mode"
    },
    {
      icon: <Zap className="w-4 h-4" />,
      title: "Power Users", 
      description: "Quick form with bulk operations and shortcuts",
      recommendation: "Use Quick Form mode"
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      title: "Occasional Users",
      description: "Clear visual hierarchy and example data",
      recommendation: "Try both modes to find preference"
    }
  ]

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Enhanced UI/UX Experience</h3>
            <p className="text-gray-400 text-sm">Choose your preferred workflow</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
          <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wand2 className="w-4 h-4 text-purple-400" />
            <span className="font-semibold text-purple-400">Guided Setup</span>
          </div>
          <p className="text-sm text-gray-300">
            8-step wizard with validation and progress tracking. Perfect for first-time users.
          </p>
        </div>
        
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileCode2 className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-blue-400">Quick Form</span>
          </div>
          <p className="text-sm text-gray-300">
            Collapsible sections with smart defaults. Efficient for experienced users.
          </p>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="space-y-6 pt-4 border-t border-gray-700">
          {/* Key Improvements */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Key Improvements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {improvements.map((improvement, index) => (
                <div key={index} className={`${improvement.bgColor} border rounded-lg p-3`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={improvement.color}>
                      {improvement.icon}
                    </div>
                    <span className="font-medium text-white">{improvement.title}</span>
                  </div>
                  <p className="text-sm text-gray-300">{improvement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* User Type Recommendations */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Choose Your Experience</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {userTypes.map((userType, index) => (
                <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-gray-400">
                      {userType.icon}
                    </div>
                    <span className="font-medium text-white">{userType.title}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{userType.description}</p>
                  <div className="bg-blue-900/30 border border-blue-700 rounded px-2 py-1">
                    <span className="text-xs text-blue-300">{userType.recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Summary */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">Benefits Achieved</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">70%</div>
                <div className="text-gray-400">Reduction in initial visual complexity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">8</div>
                <div className="text-gray-400">Logical wizard steps with validation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">2</div>
                <div className="text-gray-400">Workflow modes for different users</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 