import React from 'react';
import { Sparkles, CheckCircle, Brain, Star, CalendarClock, ExternalLink } from 'lucide-react';

export default function CandidateCard({ candidate, onRunAIAnalysis, onUpdateStatus, onViewProfile }) {
  const getStatusColor = (status) => {
    const colors = {
      screening: 'bg-blue-100 text-blue-700',
      interview: 'bg-purple-100 text-purple-700',
      offer: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{candidate.avatar}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold">{candidate.name}</h3>
              <p className="text-gray-600">{candidate.role}</p>
              <p className="text-sm text-gray-500 mt-1">{candidate.location} • {candidate.experience}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-lg font-bold ${getScoreColor(candidate.aiScore)}`}>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {candidate.aiScore}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
                {candidate.status}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {candidate.skills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-start gap-2">
              <Brain className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-900">AI Insight</p>
                <p className="text-sm text-purple-700 mt-1">{candidate.aiInsight}</p>
                <div className="mt-2">
                  <p className="text-xs font-medium text-purple-900 mb-1">Match Reasons:</p>
                  <ul className="space-y-1">
                    {candidate.matchReasons.map((reason, idx) => (
                      <li key={idx} className="text-xs text-purple-700 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-purple-500" />
              <span>Last touch: {candidate.lastInteraction}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-blue-500" />
              <span>Availability: {candidate.availability}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-5 flex-wrap">
            <button
              onClick={() => onRunAIAnalysis(candidate)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Deep Analysis
            </button>
            <button
              onClick={() => onUpdateStatus(candidate.id, 'interview')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Move to Interview
            </button>
            <button
              onClick={() => onViewProfile?.(candidate)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}