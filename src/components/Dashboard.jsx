import React from 'react';
import { Users, Brain, TrendingUp, Award, Zap, MessageSquare, FileText, CheckCircle, Clock, Award as AwardIcon } from 'lucide-react';
import StatsGrid from './StatsGrid';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';

export default function Dashboard() {
  const stats = [
    { label: 'Total Candidates', value: '247', icon: Users, color: 'bg-blue-500' },
    { label: 'AI Matches', value: '34', icon: Brain, color: 'bg-purple-500' },
    { label: 'In Pipeline', value: '18', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Offers Made', value: '5', icon: Award, color: 'bg-yellow-500' }
  ];

  const quickActions = [
    { icon: Zap, label: 'AI Quick Screen', color: 'purple' },
    { icon: MessageSquare, label: 'Generate Email', color: 'blue' },
    { icon: FileText, label: 'Export Report', color: 'green' }
  ];

  const activities = [
    { action: 'New candidate matched', candidate: 'Sarah Chen', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
    { action: 'Interview scheduled', candidate: 'Marcus Johnson', time: '5 hours ago', icon: Clock, color: 'text-blue-600' },
    { action: 'Offer extended', candidate: 'Alex Rivera', time: '1 day ago', icon: AwardIcon, color: 'text-yellow-600' }
  ];

  return (
    <div className="space-y-6">
      <StatsGrid stats={stats} />
      <QuickActions actions={quickActions} />
      <RecentActivity activities={activities} />
    </div>
  );
}