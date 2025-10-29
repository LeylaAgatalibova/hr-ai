// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Users, Brain, Sparkles, TrendingUp, Star, FileText, MessageSquare, Zap, CheckCircle, XCircle, Clock, Award } from 'lucide-react';

// export default function SmartHireAI() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [candidates, setCandidates] = useState([
//     {
//       id: 1,
//       name: 'Sarah Chen',
//       role: 'Senior Frontend Developer',
//       experience: '5 years',
//       skills: ['React', 'TypeScript', 'Node.js', 'UI/UX'],
//       aiScore: 94,
//       status: 'screening',
//       avatar: '👩‍💻',
//       location: 'San Francisco, CA',
//       salary: '$120k-$150k',
//       aiInsight: 'Strong technical background with leadership potential. Communication skills excellent.',
//       matchReasons: ['Expert in React ecosystem', 'Previous experience at tech unicorns', 'Open source contributor']
//     },
//     {
//       id: 2,
//       name: 'Marcus Johnson',
//       role: 'Full Stack Engineer',
//       experience: '7 years',
//       skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
//       aiScore: 88,
//       status: 'interview',
//       avatar: '👨‍💼',
//       location: 'Austin, TX',
//       salary: '$130k-$160k',
//       aiInsight: 'Versatile engineer with strong problem-solving abilities. Team player with proven track record.',
//       matchReasons: ['Extensive backend expertise', 'DevOps experience', 'Startup background']
//     },
//     {
//       id: 3,
//       name: 'Priya Patel',
//       role: 'ML Engineer',
//       experience: '4 years',
//       skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP'],
//       aiScore: 91,
//       status: 'screening',
//       avatar: '👩‍🔬',
//       location: 'Seattle, WA',
//       salary: '$140k-$170k',
//       aiInsight: 'PhD in AI with practical industry experience. Published researcher in top-tier conferences.',
//       matchReasons: ['AI/ML specialist', 'Research + industry balance', 'Strong mathematical foundation']
//     },
//     {
//       id: 4,
//       name: 'Alex Rivera',
//       role: 'Product Designer',
//       experience: '6 years',
//       skills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems'],
//       aiScore: 86,
//       status: 'offer',
//       avatar: '🎨',
//       location: 'New York, NY',
//       salary: '$110k-$140k',
//       aiInsight: 'User-centric designer with excellent portfolio. Strong collaboration skills with engineering teams.',
//       matchReasons: ['Award-winning portfolio', 'B2B SaaS experience', 'Design system expertise']
//     }
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterSkills, setFilterSkills] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [aiAnalyzing, setAiAnalyzing] = useState(false);

//   const allSkills = ['React', 'TypeScript', 'Python', 'Node.js', 'AWS', 'Django', 'PostgreSQL', 'TensorFlow', 'Figma', 'UI/UX'];

//   const stats = [
//     { label: 'Total Candidates', value: '247', icon: Users, color: 'bg-blue-500' },
//     { label: 'AI Matches', value: '34', icon: Brain, color: 'bg-purple-500' },
//     { label: 'In Pipeline', value: '18', icon: TrendingUp, color: 'bg-green-500' },
//     { label: 'Offers Made', value: '5', icon: Award, color: 'bg-yellow-500' }
//   ];

//   const filteredCandidates = candidates.filter(c => {
//     const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          c.role.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesSkills = filterSkills.length === 0 || 
//                          filterSkills.some(skill => c.skills.includes(skill));
//     return matchesSearch && matchesSkills;
//   });

//   const toggleSkillFilter = (skill) => {
//     setFilterSkills(prev => 
//       prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
//     );
//   };

//   const runAIAnalysis = (candidate) => {
//     setAiAnalyzing(true);
//     setSelectedCandidate(candidate);
//     setTimeout(() => setAiAnalyzing(false), 2000);
//   };

//   const updateCandidateStatus = (id, newStatus) => {
//     setCandidates(prev => prev.map(c => 
//       c.id === id ? { ...c, status: newStatus } : c
//     ));
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       screening: 'bg-blue-100 text-blue-700',
//       interview: 'bg-purple-100 text-purple-700',
//       offer: 'bg-green-100 text-green-700',
//       rejected: 'bg-red-100 text-red-700'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-700';
//   };

//   const getScoreColor = (score) => {
//     if (score >= 90) return 'text-green-600 bg-green-50';
//     if (score >= 80) return 'text-blue-600 bg-blue-50';
//     return 'text-yellow-600 bg-yellow-50';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-xl">
//                 <Brain className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                   SmartHire AI
//                 </h1>
//                 <p className="text-xs text-gray-500">Intelligent Recruitment Platform</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
//                 <Sparkles className="w-4 h-4" />
//                 AI Insights
//               </button>
//               <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
//                 HR
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Navigation */}
//       <nav className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex gap-1">
//             {['dashboard', 'candidates', 'ai-match', 'analytics'].map(tab => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-6 py-3 font-medium capitalize transition-all ${
//                   activeTab === tab
//                     ? 'text-purple-600 border-b-2 border-purple-600'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 {tab.replace('-', ' ')}
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {activeTab === 'dashboard' && (
//           <div className="space-y-6">
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               {stats.map((stat, idx) => (
//                 <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-gray-600 text-sm">{stat.label}</p>
//                       <p className="text-3xl font-bold mt-2">{stat.value}</p>
//                     </div>
//                     <div className={`${stat.color} p-3 rounded-lg`}>
//                       <stat.icon className="w-6 h-6 text-white" />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all">
//                   <Zap className="w-5 h-5 text-purple-600" />
//                   <span className="font-medium">AI Quick Screen</span>
//                 </button>
//                 <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
//                   <MessageSquare className="w-5 h-5 text-blue-600" />
//                   <span className="font-medium">Generate Email</span>
//                 </button>
//                 <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all">
//                   <FileText className="w-5 h-5 text-green-600" />
//                   <span className="font-medium">Export Report</span>
//                 </button>
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
//               <div className="space-y-3">
//                 {[
//                   { action: 'New candidate matched', candidate: 'Sarah Chen', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
//                   { action: 'Interview scheduled', candidate: 'Marcus Johnson', time: '5 hours ago', icon: Clock, color: 'text-blue-600' },
//                   { action: 'Offer extended', candidate: 'Alex Rivera', time: '1 day ago', icon: Award, color: 'text-yellow-600' }
//                 ].map((activity, idx) => (
//                   <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
//                     <activity.icon className={`w-5 h-5 ${activity.color}`} />
//                     <div className="flex-1">
//                       <p className="font-medium">{activity.action}</p>
//                       <p className="text-sm text-gray-600">{activity.candidate}</p>
//                     </div>
//                     <span className="text-xs text-gray-500">{activity.time}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'candidates' && (
//           <div className="space-y-6">
//             {/* Search and Filter */}
//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search candidates..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>
//                 <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors">
//                   <Filter className="w-4 h-4" />
//                   Filters
//                 </button>
//               </div>

//               {/* Skill Filters */}
//               <div className="mt-4">
//                 <p className="text-sm font-medium text-gray-700 mb-2">Filter by Skills:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {allSkills.map(skill => (
//                     <button
//                       key={skill}
//                       onClick={() => toggleSkillFilter(skill)}
//                       className={`px-3 py-1 rounded-full text-sm transition-all ${
//                         filterSkills.includes(skill)
//                           ? 'bg-purple-600 text-white'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       {skill}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Candidates List */}
//             <div className="grid grid-cols-1 gap-4">
//               {filteredCandidates.map(candidate => (
//                 <div key={candidate.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
//                   <div className="flex items-start gap-4">
//                     <div className="text-4xl">{candidate.avatar}</div>
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="text-xl font-bold">{candidate.name}</h3>
//                           <p className="text-gray-600">{candidate.role}</p>
//                           <p className="text-sm text-gray-500 mt-1">{candidate.location} • {candidate.experience}</p>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <div className={`px-4 py-2 rounded-lg font-bold ${getScoreColor(candidate.aiScore)}`}>
//                             <div className="flex items-center gap-1">
//                               <Star className="w-4 h-4" />
//                               {candidate.aiScore}
//                             </div>
//                           </div>
//                           <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
//                             {candidate.status}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-2 mt-3">
//                         {candidate.skills.map(skill => (
//                           <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
//                             {skill}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
//                         <div className="flex items-start gap-2">
//                           <Brain className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
//                           <div className="flex-1">
//                             <p className="text-sm font-medium text-purple-900">AI Insight</p>
//                             <p className="text-sm text-purple-700 mt-1">{candidate.aiInsight}</p>
//                             <div className="mt-2">
//                               <p className="text-xs font-medium text-purple-900 mb-1">Match Reasons:</p>
//                               <ul className="space-y-1">
//                                 {candidate.matchReasons.map((reason, idx) => (
//                                   <li key={idx} className="text-xs text-purple-700 flex items-center gap-1">
//                                     <CheckCircle className="w-3 h-3" />
//                                     {reason}
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex gap-3 mt-4">
//                         <button
//                           onClick={() => runAIAnalysis(candidate)}
//                           className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
//                         >
//                           <Sparkles className="w-4 h-4" />
//                           Deep Analysis
//                         </button>
//                         <button
//                           onClick={() => updateCandidateStatus(candidate.id, 'interview')}
//                           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//                         >
//                           <CheckCircle className="w-4 h-4" />
//                           Move to Interview
//                         </button>
//                         <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                           View Profile
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'ai-match' && (
//           <div className="space-y-6">
//             <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 text-white shadow-lg">
//               <div className="flex items-center gap-3 mb-4">
//                 <Brain className="w-8 h-8" />
//                 <h2 className="text-2xl font-bold">AI-Powered Matching</h2>
//               </div>
//               <p className="text-purple-100 mb-6">
//                 Our advanced AI analyzes candidate profiles, skills, experience, and cultural fit to provide intelligent matching recommendations.
//               </p>
//               <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:shadow-xl transition-all">
//                 Run New Match Analysis
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-white rounded-xl p-6 shadow-sm">
//                 <h3 className="text-lg font-bold mb-4">Top AI Matches This Week</h3>
//                 <div className="space-y-3">
//                   {filteredCandidates.slice(0, 3).map(candidate => (
//                     <div key={candidate.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                       <span className="text-2xl">{candidate.avatar}</span>
//                       <div className="flex-1">
//                         <p className="font-medium">{candidate.name}</p>
//                         <p className="text-sm text-gray-600">{candidate.role}</p>
//                       </div>
//                       <div className={`px-3 py-1 rounded-lg font-bold ${getScoreColor(candidate.aiScore)}`}>
//                         {candidate.aiScore}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl p-6 shadow-sm">
//                 <h3 className="text-lg font-bold mb-4">AI Features</h3>
//                 <div className="space-y-3">
//                   {[
//                     { title: 'Resume Parsing', desc: 'Automatically extract skills and experience', icon: FileText },
//                     { title: 'Skill Matching', desc: 'Match candidates to job requirements', icon: Zap },
//                     { title: 'Predictive Analytics', desc: 'Forecast candidate success rates', icon: TrendingUp },
//                     { title: 'Bias Detection', desc: 'Ensure fair and unbiased screening', icon: CheckCircle }
//                   ].map((feature, idx) => (
//                     <div key={idx} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
//                       <feature.icon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="font-medium">{feature.title}</p>
//                         <p className="text-sm text-gray-600">{feature.desc}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'analytics' && (
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <h2 className="text-xl font-bold mb-4">Recruitment Analytics</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
//                   <p className="text-4xl font-bold text-blue-600">12.5</p>
//                   <p className="text-gray-700 mt-2">Avg. Days to Hire</p>
//                 </div>
//                 <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
//                   <p className="text-4xl font-bold text-green-600">85%</p>
//                   <p className="text-gray-700 mt-2">Offer Accept Rate</p>
//                 </div>
//                 <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
//                   <p className="text-4xl font-bold text-purple-600">92%</p>
//                   <p className="text-gray-700 mt-2">AI Match Accuracy</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <h3 className="text-lg font-bold mb-4">Pipeline Status</h3>
//               <div className="space-y-4">
//                 {[
//                   { stage: 'Applied', count: 247, color: 'bg-gray-400' },
//                   { stage: 'Screening', count: 82, color: 'bg-blue-500' },
//                   { stage: 'Interview', count: 34, color: 'bg-purple-500' },
//                   { stage: 'Offer', count: 12, color: 'bg-green-500' },
//                   { stage: 'Hired', count: 5, color: 'bg-yellow-500' }
//                 ].map((stage, idx) => (
//                   <div key={idx}>
//                     <div className="flex items-center justify-between mb-1">
//                       <span className="font-medium">{stage.stage}</span>
//                       <span className="text-gray-600">{stage.count}</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className={`${stage.color} h-2 rounded-full transition-all`}
//                         style={{ width: `${(stage.count / 247) * 100}%` }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* AI Analysis Modal */}
//       {aiAnalyzing && selectedCandidate && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-4 animate-pulse">
//                 <Brain className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold mb-2">AI Deep Analysis</h3>
//               <p className="text-gray-600 mb-6">Analyzing {selectedCandidate.name}'s profile...</p>
//               <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//                 <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }