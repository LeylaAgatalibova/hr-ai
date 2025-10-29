import React from 'react';

export default function Analytics() {
  const pipelineStages = [
    { stage: 'Applied', count: 247, color: 'bg-gray-400' },
    { stage: 'Screening', count: 82, color: 'bg-blue-500' },
    { stage: 'Interview', count: 34, color: 'bg-purple-500' },
    { stage: 'Offer', count: 12, color: 'bg-green-500' },
    { stage: 'Hired', count: 5, color: 'bg-yellow-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Recruitment Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <p className="text-4xl font-bold text-blue-600">12.5</p>
            <p className="text-gray-700 mt-2">Avg. Days to Hire</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <p className="text-4xl font-bold text-green-600">85%</p>
            <p className="text-gray-700 mt-2">Offer Accept Rate</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <p className="text-4xl font-bold text-purple-600">92%</p>
            <p className="text-gray-700 mt-2">AI Match Accuracy</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Pipeline Status</h3>
        <div className="space-y-4">
          {pipelineStages.map((stage, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{stage.stage}</span>
                <span className="text-gray-600">{stage.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${stage.color} h-2 rounded-full transition-all`}
                  style={{ width: `${(stage.count / 247) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}