// import React from 'react';

// export default function Navigation({ activeTab, onTabChange }) {
//   const tabs = ['dashboard', 'candidates', 'ai-match', 'generate', 'analytics'];

//   return (
//     <nav className="bg-white border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex gap-1">
//           {tabs.map(tab => (
//             <button
//               key={tab}
//               onClick={() => onTabChange(tab)}
//               className={`px-6 py-3 font-medium capitalize transition-all ${
//                 activeTab === tab
//                   ? 'text-purple-600 border-b-2 border-purple-600'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               {tab.replace('-', ' ')}
//             </button>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// }



import React from 'react';

export default function Navigation({ activeTab, onTabChange }) {
  const tabs = ['dashboard', 'candidates', 'ai-match', 'generate', 'analytics'];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-6 py-3 font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}