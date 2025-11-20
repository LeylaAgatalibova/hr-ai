import React from 'react';

export default function QuickActions({ actions, onActionSelect }) {
  const getColorClasses = (color) => {
    const colors = {
      purple: { border: 'border-purple-400', bg: 'bg-purple-50', text: 'text-purple-600' },
      blue: { border: 'border-blue-400', bg: 'bg-blue-50', text: 'text-blue-600' },
      green: { border: 'border-green-400', bg: 'bg-green-50', text: 'text-green-600' },
      orange: { border: 'border-orange-400', bg: 'bg-orange-50', text: 'text-orange-600' }
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Quick Actions</h2>
          <p className="text-sm text-gray-500">Trigger automations and reminders with one tap.</p>
        </div>
        <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
          AI Assisted
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, idx) => {
          const colorClasses = getColorClasses(action.color);
          return (
            <button
              key={idx}
              onClick={() => onActionSelect?.(action)}
              className={`text-left border border-gray-200 rounded-xl p-4 hover:-translate-y-0.5 transition-all hover:shadow-md focus:ring-2 focus:ring-purple-400`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorClasses.bg}`}>
                <action.icon className={`w-5 h-5 ${colorClasses.text}`} />
              </div>
              <p className="font-semibold text-gray-900">{action.label}</p>
              {action.description && (
                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              )}
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className={`font-semibold ${colorClasses.text}`}>{action.sla}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{action.impact}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}