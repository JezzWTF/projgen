import { useState } from 'react'
import { Plus, Minus, GripVertical } from 'lucide-react'

interface ArrayInputProps {
  label: string
  value: string[]
  onChange: (value: string[]) => void
  placeholder: string
  itemClassName?: string
  showGrip?: boolean
}

export default function ArrayInput({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  itemClassName = "bg-gray-800",
  showGrip = false 
}: ArrayInputProps) {
  const [inputValue, setInputValue] = useState('')

  const addItem = () => {
    if (inputValue.trim()) {
      onChange([...value, inputValue.trim()])
      setInputValue('')
    }
  }

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addItem()
    }
  }

  const handleBulkAdd = (text: string) => {
    const items = text.split('\n').map(item => item.trim()).filter(Boolean)
    if (items.length > 0) {
      onChange([...value, ...items])
      setInputValue('')
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text')
    if (pastedText.includes('\n')) {
      e.preventDefault()
      handleBulkAdd(pastedText)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
          placeholder={placeholder}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <button
          type="button"
          onClick={addItem}
          disabled={!inputValue.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((item, index) => (
            <div 
              key={index} 
              className={`${itemClassName} px-3 py-2 rounded-lg flex items-center justify-between group hover:bg-gray-700 transition-colors`}
            >
              <div className="flex items-center gap-2 flex-1">
                {showGrip && (
                  <GripVertical className="w-4 h-4 text-gray-500 cursor-grab" />
                )}
                <span className="text-sm">{item}</span>
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <div className="text-gray-500 text-sm italic py-2">
          No {label.toLowerCase()} added yet. Tip: You can paste multiple items separated by new lines.
        </div>
      )}
    </div>
  )
} 