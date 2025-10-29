// import React, { useState } from 'react';
// import { Upload, Sparkles, FileText, Plus, X, CheckCircle, Brain, TrendingUp, Target, Zap, ChevronDown, ChevronUp } from 'lucide-react';

// const Generate = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [customCriteria, setCustomCriteria] = useState([]);
//   const [newCriterion, setNewCriterion] = useState('');
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [results, setResults] = useState([]);
//   const [showTemplates, setShowTemplates] = useState(true);

//   // Pre-defined job templates
//   const jobTemplates = [
//     {
//       id: 'frontend',
//       title: 'Frontend Developer',
//       icon: '💻',
//       color: 'from-blue-500 to-cyan-500',
//       criteria: [
//         { name: 'React/Vue/Angular', weight: 'High', category: 'Technical' },
//         { name: 'JavaScript/TypeScript', weight: 'High', category: 'Technical' },
//         { name: 'HTML/CSS', weight: 'High', category: 'Technical' },
//         { name: 'Responsive Design', weight: 'Medium', category: 'Technical' },
//         { name: 'Version Control (Git)', weight: 'Medium', category: 'Technical' },
//         { name: 'UI/UX Understanding', weight: 'Medium', category: 'Soft Skills' },
//         { name: 'Problem Solving', weight: 'High', category: 'Soft Skills' },
//         { name: 'Team Collaboration', weight: 'Medium', category: 'Soft Skills' }
//       ]
//     },
//     {
//       id: 'backend',
//       title: 'Backend Developer',
//       icon: '⚙️',
//       color: 'from-green-500 to-emerald-500',
//       criteria: [
//         { name: 'Python/Java/Node.js', weight: 'High', category: 'Technical' },
//         { name: 'Database (SQL/NoSQL)', weight: 'High', category: 'Technical' },
//         { name: 'API Design (REST/GraphQL)', weight: 'High', category: 'Technical' },
//         { name: 'Microservices Architecture', weight: 'Medium', category: 'Technical' },
//         { name: 'Cloud Services (AWS/Azure)', weight: 'Medium', category: 'Technical' },
//         { name: 'Security Best Practices', weight: 'High', category: 'Technical' },
//         { name: 'System Design', weight: 'High', category: 'Soft Skills' },
//         { name: 'Documentation Skills', weight: 'Medium', category: 'Soft Skills' }
//       ]
//     },
//     {
//       id: 'designer',
//       title: 'UI/UX Designer',
//       icon: '🎨',
//       color: 'from-purple-500 to-pink-500',
//       criteria: [
//         { name: 'Figma/Sketch/Adobe XD', weight: 'High', category: 'Technical' },
//         { name: 'User Research', weight: 'High', category: 'Technical' },
//         { name: 'Wireframing & Prototyping', weight: 'High', category: 'Technical' },
//         { name: 'Design Systems', weight: 'Medium', category: 'Technical' },
//         { name: 'Interaction Design', weight: 'High', category: 'Technical' },
//         { name: 'Visual Design', weight: 'High', category: 'Technical' },
//         { name: 'Creativity', weight: 'High', category: 'Soft Skills' },
//         { name: 'Communication', weight: 'High', category: 'Soft Skills' }
//       ]
//     },
//     {
//       id: 'data-scientist',
//       title: 'Data Scientist',
//       icon: '📊',
//       color: 'from-orange-500 to-red-500',
//       criteria: [
//         { name: 'Python/R', weight: 'High', category: 'Technical' },
//         { name: 'Machine Learning', weight: 'High', category: 'Technical' },
//         { name: 'Statistics & Mathematics', weight: 'High', category: 'Technical' },
//         { name: 'Data Visualization', weight: 'Medium', category: 'Technical' },
//         { name: 'SQL & Big Data', weight: 'High', category: 'Technical' },
//         { name: 'TensorFlow/PyTorch', weight: 'Medium', category: 'Technical' },
//         { name: 'Analytical Thinking', weight: 'High', category: 'Soft Skills' },
//         { name: 'Business Acumen', weight: 'Medium', category: 'Soft Skills' }
//       ]
//     },
//     {
//       id: 'product-manager',
//       title: 'Product Manager',
//       icon: '🚀',
//       color: 'from-indigo-500 to-purple-500',
//       criteria: [
//         { name: 'Product Strategy', weight: 'High', category: 'Technical' },
//         { name: 'Market Research', weight: 'High', category: 'Technical' },
//         { name: 'Agile/Scrum', weight: 'High', category: 'Technical' },
//         { name: 'Data Analysis', weight: 'Medium', category: 'Technical' },
//         { name: 'Roadmap Planning', weight: 'High', category: 'Technical' },
//         { name: 'Leadership', weight: 'High', category: 'Soft Skills' },
//         { name: 'Communication', weight: 'High', category: 'Soft Skills' },
//         { name: 'Stakeholder Management', weight: 'High', category: 'Soft Skills' }
//       ]
//     },
//     {
//       id: 'devops',
//       title: 'DevOps Engineer',
//       icon: '🔧',
//       color: 'from-teal-500 to-green-500',
//       criteria: [
//         { name: 'CI/CD Pipelines', weight: 'High', category: 'Technical' },
//         { name: 'Docker/Kubernetes', weight: 'High', category: 'Technical' },
//         { name: 'Cloud Platforms', weight: 'High', category: 'Technical' },
//         { name: 'Infrastructure as Code', weight: 'High', category: 'Technical' },
//         { name: 'Monitoring & Logging', weight: 'Medium', category: 'Technical' },
//         { name: 'Linux/Unix', weight: 'High', category: 'Technical' },
//         { name: 'Automation Mindset', weight: 'High', category: 'Soft Skills' },
//         { name: 'Troubleshooting', weight: 'High', category: 'Soft Skills' }
//       ]
//     }
//   ];

//   const handleTemplateSelect = (template) => {
//     setSelectedTemplate(template);
//     setCustomCriteria([]);
//   };

//   const addCustomCriterion = () => {
//     if (newCriterion.trim()) {
//       setCustomCriteria([
//         ...customCriteria,
//         { name: newCriterion, weight: 'Medium', category: 'Custom' }
//       ]);
//       setNewCriterion('');
//     }
//   };

//   const removeCustomCriterion = (index) => {
//     setCustomCriteria(customCriteria.filter((_, i) => i !== index));
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newFiles = files.map(file => ({
//       id: Math.random().toString(36).substr(2, 9),
//       name: file.name,
//       size: (file.size / 1024).toFixed(2) + ' KB',
//       file: file
//     }));
//     setUploadedFiles([...uploadedFiles, ...newFiles]);
//   };

//   const removeFile = (id) => {
//     setUploadedFiles(uploadedFiles.filter(f => f.id !== id));
//   };

//   const analyzeCVs = () => {
//     if (uploadedFiles.length === 0) {
//       alert('Please upload at least one CV');
//       return;
//     }

//     if (!selectedTemplate && customCriteria.length === 0) {
//       alert('Please select a template or add custom criteria');
//       return;
//     }

//     setAnalyzing(true);
    
//     // Simulate AI analysis
//     setTimeout(() => {
//       const mockResults = uploadedFiles.map((file, idx) => {
//         const score = Math.floor(Math.random() * 30) + 65; // 65-95
//         const criteria = selectedTemplate ? selectedTemplate.criteria : customCriteria;
        
//         const matchedCriteria = criteria
//           .filter(() => Math.random() > 0.3)
//           .map(c => c.name);
        
//         const missingCriteria = criteria
//           .filter(c => !matchedCriteria.includes(c.name))
//           .map(c => c.name);

//         return {
//           id: file.id,
//           fileName: file.name,
//           score: score,
//           status: score >= 80 ? 'excellent' : score >= 70 ? 'good' : 'average',
//           matchedCriteria: matchedCriteria,
//           missingCriteria: missingCriteria,
//           summary: generateSummary(score),
//           strengths: generateStrengths(matchedCriteria),
//           weaknesses: generateWeaknesses(missingCriteria)
//         };
//       });

//       setResults(mockResults.sort((a, b) => b.score - a.score));
//       setAnalyzing(false);
//     }, 2500);
//   };

//   const generateSummary = (score) => {
//     if (score >= 85) return 'Exceptional candidate with strong alignment to job requirements';
//     if (score >= 75) return 'Strong candidate with good skill match and potential';
//     if (score >= 65) return 'Qualified candidate with room for development';
//     return 'Candidate may need additional training or experience';
//   };

//   const generateStrengths = (matched) => {
//     return matched.slice(0, 3);
//   };

//   const generateWeaknesses = (missing) => {
//     return missing.slice(0, 2);
//   };

//   const getScoreColor = (score) => {
//     if (score >= 85) return 'from-green-500 to-emerald-500';
//     if (score >= 75) return 'from-blue-500 to-cyan-500';
//     if (score >= 65) return 'from-yellow-500 to-orange-500';
//     return 'from-red-500 to-pink-500';
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       excellent: { color: 'bg-green-100 text-green-700', label: 'Excellent Match' },
//       good: { color: 'bg-blue-100 text-blue-700', label: 'Good Match' },
//       average: { color: 'bg-yellow-100 text-yellow-700', label: 'Average Match' }
//     };
//     return badges[status] || badges.average;
//   };

//   const allCriteria = selectedTemplate 
//     ? selectedTemplate.criteria 
//     : customCriteria;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
//               <Sparkles className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//               AI CV Analysis Generator
//             </h1>
//           </div>
//           <p className="text-gray-600 ml-14">
//             Select criteria templates or create custom requirements, upload CVs, and get AI-powered matching analysis
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Sidebar - Criteria Selection */}
//           <div className="lg:col-span-1 space-y-6">
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <div 
//                 className="flex items-center justify-between mb-4 cursor-pointer"
//                 onClick={() => setShowTemplates(!showTemplates)}
//               >
//                 <h2 className="text-lg font-bold flex items-center gap-2">
//                   <Target className="w-5 h-5 text-purple-600" />
//                   Job Templates
//                 </h2>
//                 {showTemplates ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//               </div>
              
//               {showTemplates && (
//                 <div className="space-y-3">
//                   {jobTemplates.map(template => (
//                     <button
//                       key={template.id}
//                       onClick={() => handleTemplateSelect(template)}
//                       className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
//                         selectedTemplate?.id === template.id
//                           ? 'border-purple-500 bg-purple-50'
//                           : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className="text-2xl">{template.icon}</span>
//                         <div className="flex-1">
//                           <p className="font-semibold">{template.title}</p>
//                           <p className="text-xs text-gray-600">
//                             {template.criteria.length} criteria
//                           </p>
//                         </div>
//                         {selectedTemplate?.id === template.id && (
//                           <CheckCircle className="w-5 h-5 text-purple-600" />
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Custom Criteria */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <Plus className="w-5 h-5 text-blue-600" />
//                 Custom Criteria
//               </h2>
//               <div className="flex gap-2 mb-4">
//                 <input
//                   type="text"
//                   value={newCriterion}
//                   onChange={(e) => setNewCriterion(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && addCustomCriterion()}
//                   placeholder="Add custom requirement..."
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 />
//                 <button
//                   onClick={addCustomCriterion}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>
//               {customCriteria.length > 0 && (
//                 <div className="space-y-2">
//                   {customCriteria.map((criterion, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-center justify-between p-2 bg-blue-50 rounded-lg"
//                     >
//                       <span className="text-sm text-blue-900">{criterion.name}</span>
//                       <button
//                         onClick={() => removeCustomCriterion(idx)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Selected Criteria Display */}
//             {allCriteria.length > 0 && (
//               <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm p-6 border-2 border-purple-200">
//                 <h3 className="font-bold mb-3 text-purple-900">
//                   Current Criteria ({allCriteria.length})
//                 </h3>
//                 <div className="space-y-2 max-h-64 overflow-y-auto">
//                   {allCriteria.map((criterion, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-center justify-between p-2 bg-white rounded-lg text-sm"
//                     >
//                       <span className="font-medium">{criterion.name}</span>
//                       <span className={`px-2 py-1 rounded text-xs ${
//                         criterion.weight === 'High' 
//                           ? 'bg-red-100 text-red-700'
//                           : criterion.weight === 'Medium'
//                           ? 'bg-yellow-100 text-yellow-700'
//                           : 'bg-green-100 text-green-700'
//                       }`}>
//                         {criterion.weight}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Content - Upload and Results */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Upload Section */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <Upload className="w-5 h-5 text-green-600" />
//                 Upload CVs
//               </h2>
              
//               <label className="block">
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer">
//                   <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
//                   <p className="text-gray-700 font-medium mb-1">
//                     Click to upload or drag and drop
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     PDF, DOC, DOCX (max 5MB each)
//                   </p>
//                 </div>
//                 <input
//                   type="file"
//                   multiple
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleFileUpload}
//                   className="hidden"
//                 />
//               </label>

//               {uploadedFiles.length > 0 && (
//                 <div className="mt-4 space-y-2">
//                   <p className="text-sm font-medium text-gray-700">
//                     Uploaded Files ({uploadedFiles.length})
//                   </p>
//                   {uploadedFiles.map(file => (
//                     <div
//                       key={file.id}
//                       className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//                     >
//                       <div className="flex items-center gap-3">
//                         <FileText className="w-5 h-5 text-blue-600" />
//                         <div>
//                           <p className="font-medium text-sm">{file.name}</p>
//                           <p className="text-xs text-gray-500">{file.size}</p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => removeFile(file.id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <button
//                 onClick={analyzeCVs}
//                 disabled={analyzing || uploadedFiles.length === 0}
//                 className={`w-full mt-6 px-6 py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
//                   analyzing || uploadedFiles.length === 0
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg'
//                 }`}
//               >
//                 {analyzing ? (
//                   <>
//                     <Brain className="w-5 h-5 animate-pulse" />
//                     Analyzing CVs...
//                   </>
//                 ) : (
//                   <>
//                     <Zap className="w-5 h-5" />
//                     Generate Analysis
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Results Section */}
//             {results.length > 0 && (
//               <div className="space-y-4">
//                 <div className="bg-white rounded-xl shadow-sm p-6">
//                   <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
//                     <TrendingUp className="w-5 h-5 text-green-600" />
//                     Analysis Results
//                   </h2>
//                   <p className="text-sm text-gray-600 mb-4">
//                     Ranked by match percentage (highest to lowest)
//                   </p>
//                 </div>

//                 {results.map((result, idx) => (
//                   <div
//                     key={result.id}
//                     className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className="flex-shrink-0">
//                         <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${getScoreColor(result.score)} flex items-center justify-center text-white`}>
//                           <div className="text-center">
//                             <div className="text-2xl font-bold">{result.score}</div>
//                             <div className="text-xs opacity-90">Match</div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex-1">
//                         <div className="flex items-start justify-between mb-2">
//                           <div>
//                             <h3 className="font-bold text-lg">{result.fileName}</h3>
//                             <p className="text-sm text-gray-600 mt-1">{result.summary}</p>
//                           </div>
//                           <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(result.status).color}`}>
//                             {getStatusBadge(result.status).label}
//                           </span>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                           {/* Matched Criteria */}
//                           <div className="bg-green-50 rounded-lg p-4">
//                             <div className="flex items-center gap-2 mb-2">
//                               <CheckCircle className="w-4 h-4 text-green-600" />
//                               <h4 className="font-semibold text-green-900 text-sm">
//                                 Strengths ({result.matchedCriteria.length})
//                               </h4>
//                             </div>
//                             <ul className="space-y-1">
//                               {result.strengths.map((strength, i) => (
//                                 <li key={i} className="text-sm text-green-700 flex items-center gap-2">
//                                   <span className="w-1 h-1 bg-green-600 rounded-full"></span>
//                                   {strength}
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>

//                           {/* Missing Criteria */}
//                           {result.missingCriteria.length > 0 && (
//                             <div className="bg-red-50 rounded-lg p-4">
//                               <div className="flex items-center gap-2 mb-2">
//                                 <X className="w-4 h-4 text-red-600" />
//                                 <h4 className="font-semibold text-red-900 text-sm">
//                                   Areas for Development ({result.missingCriteria.length})
//                                 </h4>
//                               </div>
//                               <ul className="space-y-1">
//                                 {result.weaknesses.map((weakness, i) => (
//                                   <li key={i} className="text-sm text-red-700 flex items-center gap-2">
//                                     <span className="w-1 h-1 bg-red-600 rounded-full"></span>
//                                     {weakness}
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           )}
//                         </div>

//                         {/* Progress Bar */}
//                         <div className="mt-4">
//                           <div className="w-full bg-gray-200 rounded-full h-2">
//                             <div
//                               className={`h-2 rounded-full bg-gradient-to-r ${getScoreColor(result.score)} transition-all`}
//                               style={{ width: `${result.score}%` }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Generate;




import React, { useState } from 'react';
import { Upload, Sparkles, FileText, Plus, X, CheckCircle, Brain, TrendingUp, Target, Zap, ChevronDown, ChevronUp, Download, AlertCircle } from 'lucide-react';
import { extractTextFromFile } from '../utils/fileParser';
import { analyzeCVWithHuggingFace } from '../services/huggingfaceAPI';

const Generate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customCriteria, setCustomCriteria] = useState([]);
  const [newCriterion, setNewCriterion] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState([]);
  const [showTemplates, setShowTemplates] = useState(true);
  const [error, setError] = useState('');

  // Pre-defined job templates
  const jobTemplates = [
    {
      id: 'frontend',
      title: 'Frontend Developer',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500',
      criteria: [
        { id: 'react', name: 'React.js Experience', weight: 'High', category: 'Technical' },
        { id: 'javascript', name: 'JavaScript/TypeScript', weight: 'High', category: 'Technical' },
        { id: 'html', name: 'HTML/CSS Mastery', weight: 'High', category: 'Technical' },
        { id: 'responsive', name: 'Responsive Design', weight: 'Medium', category: 'Technical' },
        { id: 'git', name: 'Version Control (Git)', weight: 'Medium', category: 'Technical' },
        { id: 'uiux', name: 'UI/UX Understanding', weight: 'Medium', category: 'Soft Skills' },
        { id: 'problem', name: 'Problem Solving', weight: 'High', category: 'Soft Skills' },
        { id: 'teamwork', name: 'Team Collaboration', weight: 'Medium', category: 'Soft Skills' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Developer',
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500',
      criteria: [
        { id: 'node', name: 'Node.js/Python/Java', weight: 'High', category: 'Technical' },
        { id: 'database', name: 'Database (SQL/NoSQL)', weight: 'High', category: 'Technical' },
        { id: 'api', name: 'API Design (REST/GraphQL)', weight: 'High', category: 'Technical' },
        { id: 'microservices', name: 'Microservices Architecture', weight: 'Medium', category: 'Technical' },
        { id: 'cloud', name: 'Cloud Services (AWS/Azure)', weight: 'Medium', category: 'Technical' },
        { id: 'security', name: 'Security Best Practices', weight: 'High', category: 'Technical' },
        { id: 'system', name: 'System Design', weight: 'High', category: 'Soft Skills' },
        { id: 'documentation', name: 'Documentation Skills', weight: 'Medium', category: 'Soft Skills' }
      ]
    },
    {
      id: 'designer',
      title: 'UI/UX Designer',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500',
      criteria: [
        { id: 'figma', name: 'Figma/Sketch/Adobe XD', weight: 'High', category: 'Technical' },
        { id: 'research', name: 'User Research', weight: 'High', category: 'Technical' },
        { id: 'wireframing', name: 'Wireframing & Prototyping', weight: 'High', category: 'Technical' },
        { id: 'designsystem', name: 'Design Systems', weight: 'Medium', category: 'Technical' },
        { id: 'interaction', name: 'Interaction Design', weight: 'High', category: 'Technical' },
        { id: 'visual', name: 'Visual Design', weight: 'High', category: 'Technical' },
        { id: 'creativity', name: 'Creativity', weight: 'High', category: 'Soft Skills' },
        { id: 'communication', name: 'Communication', weight: 'High', category: 'Soft Skills' }
      ]
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      icon: '📊',
      color: 'from-orange-500 to-red-500',
      criteria: [
        { id: 'python', name: 'Python/R', weight: 'High', category: 'Technical' },
        { id: 'ml', name: 'Machine Learning', weight: 'High', category: 'Technical' },
        { id: 'stats', name: 'Statistics & Mathematics', weight: 'High', category: 'Technical' },
        { id: 'viz', name: 'Data Visualization', weight: 'Medium', category: 'Technical' },
        { id: 'bigdata', name: 'SQL & Big Data', weight: 'High', category: 'Technical' },
        { id: 'tensorflow', name: 'TensorFlow/PyTorch', weight: 'Medium', category: 'Technical' },
        { id: 'analytical', name: 'Analytical Thinking', weight: 'High', category: 'Soft Skills' },
        { id: 'business', name: 'Business Acumen', weight: 'Medium', category: 'Soft Skills' }
      ]
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      icon: '🚀',
      color: 'from-indigo-500 to-purple-500',
      criteria: [
        { id: 'strategy', name: 'Product Strategy', weight: 'High', category: 'Technical' },
        { id: 'market', name: 'Market Research', weight: 'High', category: 'Technical' },
        { id: 'agile', name: 'Agile/Scrum', weight: 'High', category: 'Technical' },
        { id: 'data', name: 'Data Analysis', weight: 'Medium', category: 'Technical' },
        { id: 'roadmap', name: 'Roadmap Planning', weight: 'High', category: 'Technical' },
        { id: 'leadership', name: 'Leadership', weight: 'High', category: 'Soft Skills' },
        { id: 'comm', name: 'Communication', weight: 'High', category: 'Soft Skills' },
        { id: 'stakeholder', name: 'Stakeholder Management', weight: 'High', category: 'Soft Skills' }
      ]
    },
    {
      id: 'devops',
      title: 'DevOps Engineer',
      icon: '🔧',
      color: 'from-teal-500 to-green-500',
      criteria: [
        { id: 'cicd', name: 'CI/CD Pipelines', weight: 'High', category: 'Technical' },
        { id: 'docker', name: 'Docker/Kubernetes', weight: 'High', category: 'Technical' },
        { id: 'cloud', name: 'Cloud Platforms', weight: 'High', category: 'Technical' },
        { id: 'iac', name: 'Infrastructure as Code', weight: 'High', category: 'Technical' },
        { id: 'monitoring', name: 'Monitoring & Logging', weight: 'Medium', category: 'Technical' },
        { id: 'linux', name: 'Linux/Unix', weight: 'High', category: 'Technical' },
        { id: 'automation', name: 'Automation Mindset', weight: 'High', category: 'Soft Skills' },
        { id: 'troubleshooting', name: 'Troubleshooting', weight: 'High', category: 'Soft Skills' }
      ]
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomCriteria([]);
  };

  const addCustomCriterion = () => {
    if (newCriterion.trim()) {
      setCustomCriteria([
        ...customCriteria,
        { id: Math.random().toString(36), name: newCriterion, weight: 'Medium', category: 'Custom' }
      ]);
      setNewCriterion('');
    }
  };

  const removeCustomCriterion = (index) => {
    setCustomCriteria(customCriteria.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setError('');
    
    const newFiles = await Promise.all(
      files.map(async (file) => {
        try {
          const textContent = await extractTextFromFile(file);
          return {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            file: file,
            textContent: textContent.substring(0, 500) + '...'
          };
        } catch (error) {
          setError(`"${file.name}" oxuna bilmədi: ${error.message}`);
          return null;
        }
      })
    );

    setUploadedFiles([...uploadedFiles, ...newFiles.filter(f => f !== null)]);
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== id));
  };

  const analyzeCVs = async () => {
    if (uploadedFiles.length === 0) {
      setError('Ən azı bir CV faylı yükləyin');
      return;
    }

    if (!selectedTemplate && customCriteria.length === 0) {
      setError('Template seçin və ya özəl kriteriya əlavə edin');
      return;
    }

    setAnalyzing(true);
    setError('');
    setResults([]);
      try {
    const allCriteria = selectedTemplate ? selectedTemplate.criteria : customCriteria;
    
    console.log('=== YENİ ANALİZ SİSTEMİ TEST ===');
    console.log('Seçilmiş template:', selectedTemplate?.title);
    console.log('Kriteriyalar:', allCriteria.map(c => c.name));
    
    const analysisResults = await Promise.all(
      uploadedFiles.map(async (file) => {
        try {
          console.log('--- Yeni fayl analizi ---');
          console.log('Fayl adı:', file.name);
          
          const fullTextContent = await extractTextFromFile(file.file);
          console.log('Fayl məzmunu:', fullTextContent);
          
          const analysis = await analyzeCVWithHuggingFace(fullTextContent, allCriteria);
          
          return {
            id: file.id,
            fileName: file.name,
            score: analysis.score,
            status: analysis.score >= 80 ? 'excellent' : analysis.score >= 70 ? 'good' : 'average',
            matchedCriteria: analysis.matchedCriteria,
            missingCriteria: analysis.missingCriteria,
            summary: analysis.analysis,
            strengths: analysis.matchedCriteria.slice(0, 4),
            weaknesses: analysis.missingCriteria.slice(0, 3)
          };
        } catch (error) {
          console.error(`Xəta: ${file.name}:`, error);
          return {
            id: file.id,
            fileName: file.name,
            score: 0,
            status: 'error',
            matchedCriteria: [],
            missingCriteria: [],
            summary: 'Analiz zamanı xəta baş verdi',
            strengths: [],
            weaknesses: []
          };
        }
      })
    );

    setResults(analysisResults.sort((a, b) => b.score - a.score));
  } catch (error) {
    setError('Analiz zamanı sistem xətası baş verdi: ' + error.message);
  } finally {
    setAnalyzing(false);
  }

    try {
    const allCriteria = selectedTemplate ? selectedTemplate.criteria : customCriteria;
    
    console.log('Seçilmiş kriteriyalar:', allCriteria);
    
    const analysisResults = await Promise.all(
      uploadedFiles.map(async (file) => {
        try {
          console.log('Fayl analizə başlanır:', file.name);
          const fullTextContent = await extractTextFromFile(file.file);
          console.log('CV məzmunu:', fullTextContent.substring(0, 200));
          
          const analysis = await analyzeCVWithHuggingFace(fullTextContent, allCriteria);
          console.log('Analiz nəticəsi:', analysis);
          
          return {
            id: file.id,
            fileName: file.name,
            score: analysis.score,
            status: analysis.score >= 80 ? 'excellent' : analysis.score >= 70 ? 'good' : 'average',
            matchedCriteria: analysis.matchedCriteria,
            missingCriteria: analysis.missingCriteria,
            summary: analysis.analysis,
            strengths: analysis.matchedCriteria.slice(0, 4),
            weaknesses: analysis.missingCriteria.slice(0, 3)
          };
        } catch (error) {
          console.error(`Analysis failed for ${file.name}:`, error);
          return {
            id: file.id,
            fileName: file.name,
            score: 0,
            status: 'error',
            matchedCriteria: [],
            missingCriteria: [],
            summary: 'Analiz zamanı xəta baş verdi',
            strengths: [],
            weaknesses: []
          };
        }
      })
    );

    setResults(analysisResults.sort((a, b) => b.score - a.score));
  } catch (error) {
    setError('Analiz zamanı sistem xətası baş verdi: ' + error.message);
  } finally {
    setAnalyzing(false);
  }


    try {
      const allCriteria = selectedTemplate ? selectedTemplate.criteria : customCriteria;
      
      const analysisResults = await Promise.all(
        uploadedFiles.map(async (file) => {
          try {
            const fullTextContent = await extractTextFromFile(file.file);
            const analysis = await analyzeCVWithHuggingFace(fullTextContent, allCriteria);
            
            return {
              id: file.id,
              fileName: file.name,
              score: analysis.score,
              status: analysis.score >= 80 ? 'excellent' : analysis.score >= 70 ? 'good' : 'average',
              matchedCriteria: analysis.matchedCriteria,
              missingCriteria: analysis.missingCriteria,
              summary: analysis.analysis,
              strengths: analysis.matchedCriteria.slice(0, 4),
              weaknesses: analysis.missingCriteria.slice(0, 3)
            };
          } catch (error) {
            console.error(`Analysis failed for ${file.name}:`, error);
            return {
              id: file.id,
              fileName: file.name,
              score: 0,
              status: 'error',
              matchedCriteria: [],
              missingCriteria: [],
              summary: 'Analiz zamanı xəta baş verdi',
              strengths: [],
              weaknesses: []
            };
          }
        })
      );

      setResults(analysisResults.sort((a, b) => b.score - a.score));
    } catch (error) {
      setError('Analiz zamanı sistem xətası baş verdi: ' + error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'from-green-500 to-emerald-500';
    if (score >= 75) return 'from-blue-500 to-cyan-500';
    if (score >= 65) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getStatusBadge = (status) => {
    const badges = {
      excellent: { color: 'bg-green-100 text-green-700', label: 'Əla Uyğunluq' },
      good: { color: 'bg-blue-100 text-blue-700', label: 'Yaxşı Uyğunluq' },
      average: { color: 'bg-yellow-100 text-yellow-700', label: 'Orta Uyğunluq' },
      error: { color: 'bg-red-100 text-red-700', label: 'Xəta' }
    };
    return badges[status] || badges.average;
  };

  const allCriteria = selectedTemplate 
    ? selectedTemplate.criteria 
    : customCriteria;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Real AI CV Analiz Generatoru
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            Hugging Face AI ilə CV-ləri real-time analiz edin və dəqiq uyğunluq nəticələri alın
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Criteria Selection */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div 
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setShowTemplates(!showTemplates)}
              >
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  İş Template-ləri
                </h2>
                {showTemplates ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              
              {showTemplates && (
                <div className="space-y-3">
                  {jobTemplates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedTemplate?.id === template.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{template.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold">{template.title}</p>
                          <p className="text-xs text-gray-600">
                            {template.criteria.length} kriteriya
                          </p>
                        </div>
                        {selectedTemplate?.id === template.id && (
                          <CheckCircle className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Criteria */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Özəl Kriteriyalar
              </h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newCriterion}
                  onChange={(e) => setNewCriterion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomCriterion()}
                  placeholder="Özəl tələb əlavə edin..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={addCustomCriterion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {customCriteria.length > 0 && (
                <div className="space-y-2">
                  {customCriteria.map((criterion, idx) => (
                    <div
                      key={criterion.id}
                      className="flex items-center justify-between p-2 bg-blue-50 rounded-lg"
                    >
                      <span className="text-sm text-blue-900">{criterion.name}</span>
                      <button
                        onClick={() => removeCustomCriterion(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Criteria Display */}
            {allCriteria.length > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm p-6 border-2 border-purple-200">
                <h3 className="font-bold mb-3 text-purple-900">
                  Seçilmiş Kriteriyalar ({allCriteria.length})
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {allCriteria.map((criterion, idx) => (
                    <div
                      key={criterion.id}
                      className="flex items-center justify-between p-2 bg-white rounded-lg text-sm"
                    >
                      <span className="font-medium">{criterion.name}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        criterion.weight === 'High' 
                          ? 'bg-red-100 text-red-700'
                          : criterion.weight === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {criterion.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Content - Upload and Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-green-600" />
                CV-ləri Yüklə
              </h2>
              
              <label className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-700 font-medium mb-1">
                    Yükləmək üçün klik edin və ya sürüşdürüb buraxın
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, DOC, DOCX (hər biri max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Yüklənmiş Fayllar ({uploadedFiles.length})
                  </p>
                  {uploadedFiles.map(file => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={analyzeCVs}
                disabled={analyzing || uploadedFiles.length === 0}
                className={`w-full mt-6 px-6 py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  analyzing || uploadedFiles.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg'
                }`}
              >
                {analyzing ? (
                  <>
                    <Brain className="w-5 h-5 animate-pulse" />
                    CV-lər Analiz Edilir...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    AI Analiz Et
                  </>
                )}
              </button>
            </div>

            {/* Results Section */}
            {results.length > 0 && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Analiz Nəticələri
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Uyğunluq faizinə görə sıralanıb (yüksəkdən aşağıya)
                  </p>
                </div>

                {results.map((result, idx) => (
                  <div
                    key={result.id}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${getScoreColor(result.score)} flex items-center justify-center text-white`}>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{result.score}%</div>
                            <div className="text-xs opacity-90">Uyğun</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{result.fileName}</h3>
                            <p className="text-sm text-gray-600 mt-1">{result.summary}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(result.status).color}`}>
                            {getStatusBadge(result.status).label}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {/* Matched Criteria */}
                          <div className="bg-green-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <h4 className="font-semibold text-green-900 text-sm">
                                Güclü Tərəflər ({result.matchedCriteria.length})
                              </h4>
                            </div>
                            <ul className="space-y-1">
                              {result.strengths.map((strength, i) => (
                                <li key={i} className="text-sm text-green-700 flex items-center gap-2">
                                  <span className="w-1 h-1 bg-green-600 rounded-full"></span>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Missing Criteria */}
                          {result.missingCriteria.length > 0 && (
                            <div className="bg-red-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <X className="w-4 h-4 text-red-600" />
                                <h4 className="font-semibold text-red-900 text-sm">
                                  İnkişaf Etdirilməli Sahələr ({result.missingCriteria.length})
                                </h4>
                              </div>
                              <ul className="space-y-1">
                                {result.weaknesses.map((weakness, i) => (
                                  <li key={i} className="text-sm text-red-700 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                    {weakness}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${getScoreColor(result.score)} transition-all`}
                              style={{ width: `${result.score}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;