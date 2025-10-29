import React from 'react';

export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <activity.icon className={`w-5 h-5 ${activity.color}`} />
            <div className="flex-1">
              <p className="font-medium">{activity.action}</p>
              <p className="text-sm text-gray-600">{activity.candidate}</p>
            </div>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}