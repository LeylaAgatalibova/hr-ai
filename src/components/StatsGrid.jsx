import React from 'react';

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const trendColor =
          stat.trend === 'up'
            ? 'text-green-600'
            : stat.trend === 'down'
            ? 'text-red-600'
            : 'text-gray-500';

        return (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-transparent hover:border-purple-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                {stat.change && (
                  <p className={`text-sm font-medium mt-2 flex items-center gap-1 ${trendColor}`}>
                    {stat.trend === 'up' ? '▲' : stat.trend === 'down' ? '▼' : '•'} {stat.change}
                  </p>
                )}
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            {stat.caption && (
              <p className="text-xs text-gray-500 mt-3">{stat.caption}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}