import { useState, type ReactNode } from 'react';

interface Tab {
  label: string;
  content: ReactNode;
  key: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabKey?: string;
}

export default function Tabs({ tabs, defaultTabKey }: TabsProps) {
  const [activeTabKey, setActiveTabKey] = useState(defaultTabKey || (tabs.length > 0 ? tabs[0].key : ''));

  const activeTabContent = tabs.find(tab => tab.key === activeTabKey)?.content;

  return (
    <div className="w-full">
      <div className="px-6 border-b border-gray-700 mb-4">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTabKey(tab.key)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTabKey === tab.key
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                }`}
              aria-current={activeTabKey === tab.key ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">
        {activeTabContent}
      </div>
    </div>
  );
} 