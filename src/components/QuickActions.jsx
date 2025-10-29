import React from 'react';

export default function QuickActions({ actions }) {
  const getColorClasses = (color) => {
    const colors = {
      purple: { border: 'border-purple-400', bg: 'bg-purple-50', text: 'text-purple-600' },
      blue: { border: 'border-blue-400', bg: 'bg-blue-50', text: 'text-blue-600' },
      green: { border: 'border-green-400', bg: 'bg-green-50', text: 'text-green-600' }
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, idx) => {
          const colorClasses = getColorClasses(action.color);
          return (
            <button
              key={idx}
              className={`flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:${colorClasses.border} hover:${colorClasses.bg} transition-all`}
            >
              <action.icon className={`w-5 h-5 ${colorClasses.text}`} />
              <span className="font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}