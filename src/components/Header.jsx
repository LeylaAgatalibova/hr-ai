// Bu faylı tamamilə əvəz et
import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export default function Header({ onAIInsightsClick, onLogoClick }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onLogoClick}
          >
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SmartHire AI
              </h1>
              <p className="text-xs text-gray-500">Intelligent Recruitment Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onAIInsightsClick}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              AI Insights
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
              HR
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}