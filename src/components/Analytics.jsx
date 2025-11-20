import React, { useMemo, useState } from 'react';
import { Activity, ArrowDownRight, ArrowUpRight, Download, Sparkles, Target } from 'lucide-react';

const ranges = [
  { id: 'week', label: 'Last 7 days' },
  { id: 'month', label: 'Last 30 days' },
  { id: 'quarter', label: 'Quarter to date' }
];

const metricsByRange = {
  week: [
    { label: 'Avg. Days to Hire', value: '12.5', change: '-1.2d', trend: 'up', color: 'from-blue-50 to-blue-100' },
    { label: 'Offer Accept Rate', value: '85%', change: '+6%', trend: 'up', color: 'from-green-50 to-green-100' },
    { label: 'AI Match Accuracy', value: '92%', change: '+3%', trend: 'up', color: 'from-purple-50 to-purple-100' }
  ],
  month: [
    { label: 'Avg. Days to Hire', value: '14.2', change: '-0.8d', trend: 'up', color: 'from-blue-50 to-blue-100' },
    { label: 'Offer Accept Rate', value: '82%', change: '+2%', trend: 'up', color: 'from-green-50 to-green-100' },
    { label: 'AI Match Accuracy', value: '90%', change: '+5%', trend: 'up', color: 'from-purple-50 to-purple-100' }
  ],
  quarter: [
    { label: 'Avg. Days to Hire', value: '15.1', change: '+0.6d', trend: 'down', color: 'from-blue-50 to-blue-100' },
    { label: 'Offer Accept Rate', value: '79%', change: '-3%', trend: 'down', color: 'from-green-50 to-green-100' },
    { label: 'AI Match Accuracy', value: '91%', change: '+2%', trend: 'up', color: 'from-purple-50 to-purple-100' }
  ]
};

const pipelineStages = [
  {
    stage: 'Applied',
    count: 247,
    color: 'bg-gray-400',
    target: 200,
    trend: '+18%',
    bottleneck: 'Needs better filtering',
    tips: ['Enable AI dedupe', 'Auto-tag senior candidates']
  },
  {
    stage: 'Screening',
    count: 82,
    color: 'bg-blue-500',
    target: 70,
    trend: '+6%',
    bottleneck: 'SLA healthy',
    tips: ['Maintain 24h response', 'Share best answers with interviewers']
  },
  {
    stage: 'Interview',
    count: 34,
    color: 'bg-purple-500',
    target: 30,
    trend: '-4%',
    bottleneck: 'Design panel overloaded',
    tips: ['Add backup interviewer', 'Automate panel reminders']
  },
  {
    stage: 'Offer',
    count: 12,
    color: 'bg-green-500',
    target: 15,
    trend: '+2%',
    bottleneck: 'Need more late-stage candidates',
    tips: ['Pre-close earlier', 'Share comp bands sooner']
  },
  {
    stage: 'Hired',
    count: 5,
    color: 'bg-yellow-500',
    target: 6,
    trend: '+1 hire',
    bottleneck: 'Time-to-start is high',
    tips: ['Start onboarding prep earlier']
  }
];

const conversionByRange = {
  week: [
    { label: 'Screen → Interview', value: '42%', delta: '+5%' },
    { label: 'Interview → Offer', value: '34%', delta: '+3%' },
    { label: 'Offer → Hire', value: '63%', delta: '-2%' }
  ],
  month: [
    { label: 'Screen → Interview', value: '38%', delta: '+2%' },
    { label: 'Interview → Offer', value: '31%', delta: '+1%' },
    { label: 'Offer → Hire', value: '59%', delta: '-4%' }
  ],
  quarter: [
    { label: 'Screen → Interview', value: '41%', delta: '+1%' },
    { label: 'Interview → Offer', value: '29%', delta: '-3%' },
    { label: 'Offer → Hire', value: '57%', delta: '-6%' }
  ]
};

const insightsByRange = {
  week: [
    'Frontend roles convert 18% faster than last week.',
    'DevOps funnel slowed at interview stage – add senior panelist.',
    'Offer accept rate highest when comp bands shared before panel 2.'
  ],
  month: [
    'Referrals deliver 2.1x better AI match accuracy.',
    'Screening backlog cleared – maintain 24h SLA.',
    'Candidate drop-off highest after take-home stage.'
  ],
  quarter: [
    'AI suggestions cut sourcing time by 34%.',
    'Need more late-stage candidates for Design hiring goal.',
    'Offers with customized growth plans close 26% faster.'
  ]
};

export default function Analytics() {
  const [range, setRange] = useState('month');
  const [selectedStage, setSelectedStage] = useState(pipelineStages[1]);

  const metricCards = useMemo(() => metricsByRange[range], [range]);
  const conversion = useMemo(() => conversionByRange[range], [range]);
  const insights = useMemo(() => insightsByRange[range], [range]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-500" />
              Compare hiring speed & quality by range
            </p>
          </div>
          <div className="flex gap-2 bg-gray-50 rounded-full p-1">
            {ranges.map((option) => (
              <button
                key={option.id}
                onClick={() => setRange(option.id)}
                className={`px-4 py-1.5 text-sm rounded-full ${
                  range === option.id ? 'bg-purple-600 text-white' : 'text-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metricCards.map((metric, idx) => (
            <div key={idx} className={`text-center p-6 rounded-xl bg-gradient-to-br ${metric.color}`}>
              <p className="text-4xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-gray-600 mt-2">{metric.label}</p>
              <p
                className={`text-sm font-semibold mt-2 flex items-center justify-center gap-1 ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {metric.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Pipeline Status</h3>
            <button className="text-sm text-purple-600 hover:text-purple-700">Download CSV</button>
          </div>
          <div className="space-y-4">
            {pipelineStages.map((stage, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedStage(stage)}
                className={`w-full text-left p-3 rounded-lg transition border ${
                  selectedStage.stage === stage.stage ? 'border-purple-200 bg-purple-50' : 'border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{stage.stage}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      Target {stage.target}
                    </span>
                  </div>
                  <span className="text-gray-600">{stage.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className={`${stage.color} h-2 rounded-full`} style={{ width: `${(stage.count / 247) * 100}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{stage.trend} this period</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Stage Insight
            </h3>
            <span className="text-xs text-gray-500">{selectedStage.stage}</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{selectedStage.bottleneck}</p>
          <div className="space-y-2">
            {selectedStage.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-purple-600 mt-0.5">•</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-purple-50 border border-purple-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">AI Recommendation</p>
            <p className="text-sm text-purple-900 mt-1">
              Align panel availability and auto-share prep packs 24h before interviews to lift throughput.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              Conversion Snapshot
            </h3>
            <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export chart
            </button>
          </div>
          <div className="space-y-4">
            {conversion.map((step, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium text-gray-700">{step.label}</p>
                  <p className={`font-semibold ${step.delta.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {step.delta}
                  </p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: step.value }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Conversion {step.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Key Insights</h3>
            <span className="text-xs text-gray-500">{range === 'week' ? 'Updated hourly' : 'Updated daily'}</span>
          </div>
          <ul className="space-y-3">
            {insights.map((insight, idx) => (
              <li key={idx} className="p-3 border border-gray-100 rounded-lg text-sm text-gray-700">
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}