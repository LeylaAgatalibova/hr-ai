import React from 'react';

export default function Navigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    // { id: 'candidates', label: 'Candidates' },
    { id: 'email-cvs', label: 'Email CVs' },
    { id: 'cv-analyzer', label: 'CV Analyzer' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 px-4 sm:px-6 min-w-max sm:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 sm:px-6 py-3 font-medium capitalize transition-all whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

