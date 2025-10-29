import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Candidates from './components/Candidates';
import AIMatch from './components/AIMatch';
import Analytics from './components/Analytics';
import AIInsights from './components/AIInsights';
import Generate from './components/Generate';
import AIAnalysisModal from './components/AIAnalysisModal';

export default function SmartHireAI() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const renderActiveTab = () => {
    if (showAIInsights) {
      return <AIInsights />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'candidates':
        return <Candidates 
          onRunAIAnalysis={runAIAnalysis}
        />;
      case 'ai-match':
        return <AIMatch />;
      case 'generate':
        return <Generate />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  const runAIAnalysis = (candidate) => {
    setAiAnalyzing(true);
    setSelectedCandidate(candidate);
    setTimeout(() => setAiAnalyzing(false), 2000);
  };
  

  const handleAIInsights = () => {
    setShowAIInsights(true);
  };

  const handleTabChange = (tab) => {
    setShowAIInsights(false);
    setActiveTab(tab);
  };

  // ✅ YENİ: Logo click funksiyası
  const handleLogoClick = () => {
    setShowAIInsights(false);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header 
        onAIInsightsClick={handleAIInsights}
        onLogoClick={handleLogoClick} 
      />
      {!showAIInsights && (
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderActiveTab()}
      </main>

      <AIAnalysisModal 
        isOpen={aiAnalyzing} 
        candidate={selectedCandidate} 
      />
    </div>
  );
}