import React, { useState } from 'react';
import { Brain, TrendingUp, Users, Target, Lightbulb, BarChart3, Zap, Clock, Award, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function AIInsights() {
  const [activeInsight, setActiveInsight] = useState('overview');

  const insightsData = {
    overview: {
      title: "AI Overview",
      description: "Comprehensive analysis of your recruitment pipeline and AI performance",
      metrics: [
        { label: "AI Accuracy Rate", value: "94%", trend: "+2.1%", icon: Target, color: "text-green-600" },
        { label: "Time Saved", value: "127h", trend: "+15h", icon: Clock, color: "text-blue-600" },
        { label: "Quality Hires", value: "23", trend: "+4", icon: Award, color: "text-purple-600" },
        { label: "Bias Reduction", value: "87%", trend: "+12%", icon: CheckCircle, color: "text-orange-600" }
      ]
    },
    predictions: {
      title: "Predictive Analytics",
      description: "AI-powered forecasts for your hiring outcomes",
      metrics: [
        { label: "30-Day Hire Prediction", value: "18", icon: Users, color: "text-blue-600" },
        { label: "Retention Risk", value: "Low", icon: AlertTriangle, color: "text-green-600" },
        { label: "Market Competition", value: "High", icon: TrendingUp, color: "text-orange-600" },
        { label: "Salary Benchmarks", value: "Optimal", icon: BarChart3, color: "text-purple-600" }
      ]
    },
    recommendations: {
      title: "AI Recommendations",
      description: "Actionable insights to improve your hiring process",
      items: [
        {
          title: "Diversity Boost",
          description: "Consider candidates from non-traditional backgrounds for Frontend roles",
          impact: "High",
          effort: "Low",
          icon: Users
        },
        {
          title: "Skill Gap Analysis",
          description: "Invest in React training for 3 internal developers vs. external hiring",
          impact: "Medium",
          effort: "Medium",
          icon: Lightbulb
        },
        {
          title: "Interview Optimization",
          description: "Reduce technical interview stages from 3 to 2 based on success patterns",
          impact: "High",
          effort: "Low",
          icon: Zap
        }
      ]
    }
  };

  const candidatePredictions = [
    { name: "Sarah Chen", role: "Frontend Dev", successProbability: 92, retentionScore: 88, rampUpTime: "2 weeks" },
    { name: "Marcus Johnson", role: "Full Stack", successProbability: 85, retentionScore: 79, rampUpTime: "3 weeks" },
    { name: "Priya Patel", role: "ML Engineer", successProbability: 96, retentionScore: 91, rampUpTime: "1 week" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Insights Dashboard</h1>
              <p className="text-purple-100 mt-2">Intelligent analytics and predictions for smarter hiring decisions</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl p-2 shadow-sm mb-8">
          <div className="flex gap-1">
            {['overview', 'predictions', 'recommendations'].map(insight => (
              <button
                key={insight}
                onClick={() => setActiveInsight(insight)}
                className={`px-6 py-3 font-medium capitalize rounded-lg transition-all ${
                  activeInsight === insight
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {insight}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Insights Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Insight */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-2">{insightsData[activeInsight].title}</h2>
              <p className="text-gray-600 mb-6">{insightsData[activeInsight].description}</p>

              {activeInsight === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insightsData.overview.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <span className="font-medium">{metric.label}</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">{metric.value}</span>
                        <span className="text-sm text-green-600">{metric.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeInsight === 'predictions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insightsData.predictions.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <span className="font-medium">{metric.label}</span>
                      </div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeInsight === 'recommendations' && (
                <div className="space-y-4">
                  {insightsData.recommendations.items.map((item, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <item.icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-gray-600 mb-3">{item.description}</p>
                          <div className="flex gap-4 text-sm">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Impact: {item.impact}</span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Effort: {item.effort}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Candidate Success Predictions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Candidate Success Predictions</h3>
              <div className="space-y-3">
                {candidatePredictions.map((candidate, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-gray-600">{candidate.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-green-600">{candidate.successProbability}%</p>
                        <p className="text-gray-500">Success</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-blue-600">{candidate.retentionScore}%</p>
                        <p className="text-gray-500">Retention</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-purple-600">{candidate.rampUpTime}</p>
                        <p className="text-gray-500">Ramp Up</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Performance */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">AI Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Candidate Matching</span>
                    <span className="text-sm font-bold text-green-600">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Bias Detection</span>
                    <span className="text-sm font-bold text-blue-600">89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Success Prediction</span>
                    <span className="text-sm font-bold text-purple-600">91%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">AI Tools</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:shadow-md transition-all border border-purple-100">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Generate Job Description</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:shadow-md transition-all border border-blue-100">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Interview Questions</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-orange-50 rounded-lg hover:shadow-md transition-all border border-green-100">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Market Analysis</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}