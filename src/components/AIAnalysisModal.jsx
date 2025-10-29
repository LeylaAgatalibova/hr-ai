import React from 'react';
import { Brain } from 'lucide-react';

export default function AIAnalysisModal({ isOpen, candidate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">AI Deep Analysis</h3>
          <p className="text-gray-600 mb-6">Analyzing {candidate?.name}'s profile...</p>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}