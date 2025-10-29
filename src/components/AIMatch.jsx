import React from 'react';
import { Brain, FileText, Zap, TrendingUp, CheckCircle, Star } from 'lucide-react';

export default function AIMatch() {
  const candidates = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      aiScore: 94,
      avatar: '👩‍💻'
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'ML Engineer',
      aiScore: 91,
      avatar: '👩‍🔬'
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      role: 'Full Stack Engineer',
      aiScore: 88,
      avatar: '👨‍💼'
    }
  ];

  const features = [
    { title: 'Resume Parsing', desc: 'Automatically extract skills and experience', icon: FileText },
    { title: 'Skill Matching', desc: 'Match candidates to job requirements', icon: Zap },
    { title: 'Predictive Analytics', desc: 'Forecast candidate success rates', icon: TrendingUp },
    { title: 'Bias Detection', desc: 'Ensure fair and unbiased screening', icon: CheckCircle }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8" />
          <h2 className="text-2xl font-bold">AI-Powered Matching</h2>
        </div>
        <p className="text-purple-100 mb-6">
          Our advanced AI analyzes candidate profiles, skills, experience, and cultural fit to provide intelligent matching recommendations.
        </p>
        <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:shadow-xl transition-all">
          Run New Match Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Top AI Matches This Week</h3>
          <div className="space-y-3">
            {candidates.map(candidate => (
              <div key={candidate.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">{candidate.avatar}</span>
                <div className="flex-1">
                  <p className="font-medium">{candidate.name}</p>
                  <p className="text-sm text-gray-600">{candidate.role}</p>
                </div>
                <div className={`px-3 py-1 rounded-lg font-bold ${getScoreColor(candidate.aiScore)}`}>
                  {candidate.aiScore}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">AI Features</h3>
          <div className="space-y-3">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <feature.icon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}