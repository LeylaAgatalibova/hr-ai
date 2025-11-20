import React, { useMemo, useState } from 'react';
import {
  Users,
  Brain,
  TrendingUp,
  Award,
  Zap,
  MessageSquare,
  FileText,
  CheckCircle,
  Clock,
  Award as AwardIcon,
  CalendarRange,
  Target,
  Activity,
  ShieldCheck,
  BellRing
} from 'lucide-react';
import StatsGrid from './StatsGrid';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';

const timeframeOptions = [
  { id: 'week', label: '7 Days' },
  { id: 'month', label: '30 Days' },
  { id: 'quarter', label: 'Quarter' }
];

const statsByTimeframe = {
  week: [
    { label: 'New Candidates', value: '62', change: '+14% vs wk', trend: 'up', icon: Users, color: 'bg-blue-500', caption: '18 sourced • 44 inbound' },
    { label: 'AI Matches', value: '19', change: '+4 this week', trend: 'up', icon: Brain, color: 'bg-purple-500', caption: 'Avg match score 82%' },
    { label: 'Interviews', value: '11', change: '-2 vs target', trend: 'down', icon: TrendingUp, color: 'bg-green-500', caption: 'Need 3 more for balance' },
    { label: 'Offers Out', value: '3', change: '+1 accepted', trend: 'up', icon: Award, color: 'bg-yellow-500', caption: 'Offer accept rate 86%' }
  ],
  month: [
    { label: 'New Candidates', value: '247', change: '+8% vs last', trend: 'up', icon: Users, color: 'bg-blue-500', caption: 'Top source: referrals' },
    { label: 'AI Matches', value: '72', change: '+12 accuracy', trend: 'up', icon: Brain, color: 'bg-purple-500', caption: 'Top template: Frontend' },
    { label: 'Pipeline Active', value: '48', change: 'Stable trend', trend: 'neutral', icon: TrendingUp, color: 'bg-green-500', caption: 'Avg stage SLA 3.2d' },
    { label: 'Offers Out', value: '12', change: '4 pending', trend: 'neutral', icon: Award, color: 'bg-yellow-500', caption: 'Goal: 15 / month' }
  ],
  quarter: [
    { label: 'New Candidates', value: '732', change: '+5% QoQ', trend: 'up', icon: Users, color: 'bg-blue-500', caption: 'Sourced 41% via AI' },
    { label: 'AI Matches', value: '214', change: '+18 quality', trend: 'up', icon: Brain, color: 'bg-purple-500', caption: 'Avg accuracy 91%' },
    { label: 'Pipeline Active', value: '133', change: '-6 backlog', trend: 'up', icon: TrendingUp, color: 'bg-green-500', caption: 'SLA recovering' },
    { label: 'Offers Out', value: '31', change: '+9 accepted', trend: 'up', icon: Award, color: 'bg-yellow-500', caption: 'Time-to-sign 6.5d' }
  ]
};

const quickActions = [
  {
    id: 'screen',
    icon: Zap,
    label: 'AI Quick Screen',
    description: 'Scan today’s inbound resumes and highlight must-review profiles.',
    sla: '<1 min',
    impact: '+38% faster triage',
    color: 'purple'
  },
  {
    id: 'followup',
    icon: MessageSquare,
    label: 'Send Interview Reminders',
    description: 'Nudge hiring managers about upcoming interviews and prep material.',
    sla: '2 min',
    impact: 'Keeps SLAs on track',
    color: 'blue'
  },
  {
    id: 'export',
    icon: FileText,
    label: 'Export Offer Report',
    description: 'Share current offer pipeline & risk with finance/leadership.',
    sla: '30 sec',
    impact: 'Weekly leadership digest',
    color: 'green'
  }
];

const pipelineHealth = [
  { label: 'Screening SLA', status: 'On track', change: '+12%', detail: 'Avg response 6h', icon: ShieldCheck },
  { label: 'Interview Balance', status: 'Needs attention', change: '-4%', detail: 'Design loop overloaded', icon: BellRing },
  { label: 'Offer Velocity', status: 'Healthy', change: '+9%', detail: 'Time-to-offer 4.5d', icon: Activity }
];

const focusAreas = [
  {
    title: 'Platform Engineering',
    owner: 'Lena Hart',
    progress: 68,
    openRoles: 3,
    due: 'Mar 28'
  },
  {
    title: 'Design Systems Team',
    owner: 'Noah Reed',
    progress: 52,
    openRoles: 2,
    due: 'Apr 05'
  }
];

const activities = [
  { action: 'New candidate matched', candidate: 'Sarah Chen', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
  { action: 'Interview scheduled', candidate: 'Marcus Johnson', time: '5 hours ago', icon: Clock, color: 'text-blue-600' },
  { action: 'Offer extended', candidate: 'Alex Rivera', time: '1 day ago', icon: AwardIcon, color: 'text-yellow-600' }
];

const quickActionMessages = {
  screen: 'AI screening started for 48 new applicants — expect shortlist in 90 seconds.',
  followup: 'Interview reminders queued for all panelists. Slack + email notifications will go out in 2 min.',
  export: 'Offer health report exported and shared to leadership distribution list.'
};

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('month');
  const [actionLog, setActionLog] = useState([
    { id: 'init', label: 'Daily talent digest sent', time: '09:15', status: 'Completed' }
  ]);

  const stats = useMemo(() => statsByTimeframe[timeframe], [timeframe]);
  const qualityScore = useMemo(
    () =>
      ({
        week: { value: 82, change: '+4.2%', message: 'Frontend pipeline quality improving.' },
        month: { value: 87, change: '+6.8%', message: 'Consistent top-of-funnel sourcing.' },
        quarter: { value: 90, change: '+9.1%', message: 'Record accuracy from AI matching.' }
      }[timeframe]),
    [timeframe]
  );

  const handleQuickAction = (action) => {
    const entry = {
      id: `${action.id}-${Date.now()}`,
      label: action.label,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: quickActionMessages[action.id] || 'Automation scheduled.'
    };
    setActionLog((prev) => [entry, ...prev].slice(0, 4));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <CalendarRange className="w-4 h-4 text-purple-500" />
            View recruitment health by range
          </p>
        </div>
        <div className="flex gap-2 bg-white rounded-full p-1 shadow-sm">
          {timeframeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setTimeframe(option.id)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                timeframe === option.id ? 'bg-purple-600 text-white' : 'text-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <StatsGrid stats={stats} />

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-white/80">AI Quality Score</p>
          <p className="text-4xl font-bold mt-2">{qualityScore.value}</p>
          <p className="text-sm mt-2 text-white/80">{qualityScore.message}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-emerald-200">{qualityScore.change} vs previous period</p>
          <button className="mt-3 px-4 py-2 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition">
            Share update
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <QuickActions actions={quickActions} onActionSelect={handleQuickAction} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Hiring Focus
                </h3>
                <span className="text-xs text-gray-500">Auto-prioritized</span>
              </div>
              <div className="space-y-4">
                {focusAreas.map((area, idx) => (
                  <div key={idx} className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{area.title}</p>
                        <p className="text-sm text-gray-500">Owner: {area.owner}</p>
                      </div>
                      <span className="text-sm font-semibold text-purple-600">{area.openRoles} open</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>Due {area.due}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
                          style={{ width: `${area.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  Pipeline Health
                </h3>
                <span className="text-xs text-gray-500">Live SLA view</span>
              </div>
              <div className="space-y-4">
                {pipelineHealth.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-3 rounded-lg border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.detail}</p>
                      <p className="text-xs text-green-600 mt-1">{item.change}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-600 h-fit">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Automation Log</h3>
              <span className="text-xs text-gray-500">Last 4 actions</span>
            </div>
            <div className="space-y-4">
              {actionLog.map((log) => (
                <div key={log.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{log.label}</p>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{log.status}</p>
                </div>
              ))}
              {actionLog.length === 0 && (
                <p className="text-sm text-gray-500">
                  Trigger an automation from the quick actions panel to see updates here.
                </p>
              )}
            </div>
          </div>

          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  );
}