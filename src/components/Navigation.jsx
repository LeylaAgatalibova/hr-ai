// import React from 'react';

// export default function Navigation({ activeTab, onTabChange }) {
//   const tabs = [
//     { id: 'dashboard', label: 'Dashboard' },
//     { id: 'candidates', label: 'Candidates' },
//     { id: 'cv-analyzer', label: 'CV Analyzer' },
//     { id: 'analytics', label: 'Analytics' }
//   ];

//   return (
//     <nav className="bg-white border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex gap-1">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => onTabChange(tab.id)}
//               className={`px-6 py-3 font-medium capitalize transition-all ${
//                 activeTab === tab.id
//                   ? 'text-purple-600 border-b-2 border-purple-600'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// }


import React from 'react';

export default function Navigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'candidates', label: 'Candidates' },
    { id: 'cv-analyzer', label: 'CV Analyzer' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 sm:px-6 py-3 font-medium capitalize transition-all whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}