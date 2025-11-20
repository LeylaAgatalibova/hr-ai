import React, { useMemo, useState } from 'react';
import {
  Brain,
  TrendingUp,
  Users,
  Target,
  Lightbulb,
  BarChart3,
  Zap,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const jobDescriptionTemplates = [
  {
    id: 'frontend',
    title: 'Senior Frontend Engineer',
    industry: 'SaaS / Product',
    summary: 'Lead the next generation of customer-facing workflows with performant, inclusive interfaces.',
    responsibilities: [
      'Own the delivery of cross-team UI projects in React / TypeScript.',
      'Shape the design system with accessible, performant components.',
      'Partner with PM + Design to validate hypotheses and ship weekly.'
    ],
    requirements: [
      '5+ years building web applications at scale',
      'Deep knowledge of React 18, hooks, and state management',
      'Experience mentoring engineers and reviewing architecture'
    ]
  },
  {
    id: 'product',
    title: 'Product Manager, Growth',
    industry: 'Marketplace / Growth',
    summary: 'Unlock sustainable activation and monetization loops for a global talent platform.',
    responsibilities: [
      'Map funnel friction with qualitative + quant research.',
      'Define success metrics, experiment backlog, and ship rapidly.',
      'Collaborate with Marketing, Sales, and Finance on GTM plans.'
    ],
    requirements: [
      '4+ years in SaaS/Growth PM roles',
      'Strong experimentation and SQL storytelling',
      'Comfortable leading go-to-market readiness reviews'
    ]
  },
  {
    id: 'design',
    title: 'Product Designer, Systems',
    industry: 'Enterprise / Design Ops',
    summary: 'Elevate consistency through a living design system that empowers 12+ product teams.',
    responsibilities: [
      'Audit existing UI inventory and prioritize component roadmap.',
      'Create documentation, tokens, and adoption playbooks.',
      'Coach designers/engineers on best practices and accessibility.'
    ],
    requirements: [
      'Portfolio showcasing systems work in complex products',
      'Figma wizardry plus understanding of front-end constraints',
      'Excellent facilitation and storytelling skills'
    ]
  }
];

const interviewQuestionTemplates = [
  {
    id: 'engineering',
    title: 'Engineering Leadership',
    context: 'Ideal for staff+ engineers or tech leads',
    questions: [
      {
        title: 'Architecture Narrative',
        prompt: 'Walk me through a system you scaled from thousands to millions of requests. Where did it bend?'
      },
      {
        title: 'Team Decision',
        prompt: 'Share a time you pushed back on product scope. How did you balance timeline vs. reliability?'
      }
    ]
  },
  {
    id: 'designOps',
    title: 'Design Operations',
    context: 'Great for system designers or design managers',
    questions: [
      {
        title: 'System Adoption',
        prompt: 'How do you measure the health of a design system and drive adoption across squads?'
      },
      {
        title: 'Inclusive Research',
        prompt: 'Describe a time inclusive research changed product roadmap. How did you advocate the change?'
      }
    ]
  },
  {
    id: 'sales',
    title: 'Enterprise Sales',
    context: 'Focused on strategic sellers',
    questions: [
      {
        title: 'Playbook Creation',
        prompt: 'Explain how you codified a repeatable sales motion for a new vertical.'
      },
      {
        title: 'Deal Rescue',
        prompt: 'Tell me about a late-stage deal at risk. What signals helped you turn it around?'
      }
    ]
  }
];

const marketReports = {
  na: {
    label: 'North America',
    salary: '$145k median',
    availability: 'High senior talent',
    competition: 'Very high',
    insight: 'Remote-first orgs increase comp by ~12%',
    skills: ['React', 'GraphQL', 'AWS', 'Systems Thinking']
  },
  eu: {
    label: 'Europe',
    salary: '€92k median',
    availability: 'Balanced',
    competition: 'Moderate',
    insight: 'Hybrid setups outrank fully remote for retention',
    skills: ['TypeScript', 'Design Systems', 'Microservices']
  },
  asia: {
    label: 'APAC',
    salary: '$78k median',
    availability: 'Rising mid-level talent',
    competition: 'High for AI/ML roles',
    insight: 'Upskilling programs reduce ramp by 24%',
    skills: ['AI Ops', 'MLOps', 'Security', 'Kubernetes']
  }
};

export default function AIInsights() {
  const [activeInsight, setActiveInsight] = useState('overview');
  const [activeTool, setActiveTool] = useState('jobDescription');
  const [selectedJDTemplate, setSelectedJDTemplate] = useState(jobDescriptionTemplates[0].id);
  const [customJDSections, setCustomJDSections] = useState([]);
  const [jdForm, setJdForm] = useState({ title: '', description: '' });
  const [selectedInterviewTemplate, setSelectedInterviewTemplate] = useState(interviewQuestionTemplates[0].id);
  const [customInterviewQuestions, setCustomInterviewQuestions] = useState([]);
  const [questionForm, setQuestionForm] = useState({ title: '', prompt: '' });
  const [selectedMarket, setSelectedMarket] = useState('na');
  const [copyFeedback, setCopyFeedback] = useState('');

  const activeJDTemplate = useMemo(
    () => jobDescriptionTemplates.find((template) => template.id === selectedJDTemplate),
    [selectedJDTemplate]
  );
  const jobDescriptionPreview = useMemo(() => {
    if (!activeJDTemplate) {
      return '';
    }
    const sections = [
      `Role: ${activeJDTemplate.title}`,
      `Industry: ${activeJDTemplate.industry}`,
      `Summary:\n- ${activeJDTemplate.summary}`
    ];
    sections.push(
      `Key Responsibilities:\n${activeJDTemplate.responsibilities.map((item) => `• ${item}`).join('\n')}`
    );
    sections.push(`Core Requirements:\n${activeJDTemplate.requirements.map((item) => `• ${item}`).join('\n')}`);
    if (customJDSections.length > 0) {
      sections.push(
        `Custom Sections:\n${customJDSections.map((item) => `• ${item.title}: ${item.description}`).join('\n')}`
      );
    }
    return sections.join('\n\n');
  }, [activeJDTemplate, customJDSections]);

  const activeInterviewTemplate = useMemo(
    () => interviewQuestionTemplates.find((template) => template.id === selectedInterviewTemplate),
    [selectedInterviewTemplate]
  );
  const interviewQuestionList = useMemo(() => {
    const base = activeInterviewTemplate ? activeInterviewTemplate.questions : [];
    return [...base, ...customInterviewQuestions];
  }, [activeInterviewTemplate, customInterviewQuestions]);

  const marketSnapshot = useMemo(() => marketReports[selectedMarket], [selectedMarket]);

  const addJDSection = () => {
    if (!jdForm.title.trim() || !jdForm.description.trim()) return;
    setCustomJDSections((prev) => [...prev, { title: jdForm.title.trim(), description: jdForm.description.trim() }]);
    setJdForm({ title: '', description: '' });
  };

  const removeJDSection = (index) => {
    setCustomJDSections((prev) => prev.filter((_, idx) => idx !== index));
  };

  const addCustomQuestion = () => {
    if (!questionForm.title.trim() || !questionForm.prompt.trim()) return;
    setCustomInterviewQuestions((prev) => [
      ...prev,
      { title: questionForm.title.trim(), prompt: questionForm.prompt.trim() }
    ]);
    setQuestionForm({ title: '', prompt: '' });
  };

  const removeCustomQuestion = (index) => {
    setCustomInterviewQuestions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const copyToClipboard = async (text) => {
    if (!text) return;
    try {
      await navigator?.clipboard?.writeText(text);
      setCopyFeedback('Copied to clipboard');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (error) {
      setCopyFeedback('Copy not supported');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  const aiToolTabs = [
    { id: 'jobDescription', label: 'Check Job Description', icon: Zap },
    { id: 'interviewQuestions', label: 'Interview Questions', icon: Lightbulb },
    { id: 'marketAnalysis', label: 'Market Analysis', icon: BarChart3 }
  ];

  const insightsData = {
    overview: {
      title: "AI Overview",
      description: "Comprehensive analysis of your recruitment pipeline and AI performance",
      metrics: [
        { label: "AI Accuracy Rate", value: "94%", trend: "+2.1%", icon: Target, color: "text-green-600" },
        { label: "Time Saved", value: "127h", trend: "+15h", icon: Clock, color: "text-blue-600" },
        { label: "Quality Hires", value: "23", trend: "+4", icon: Award, color: "text-purple-600" },
        { label: "Bias Reduction", value: "87%", trend: "+12%", icon: CheckCircle, color: "text-orange-600" }
      ]
    },
    predictions: {
      title: "Predictive Analytics",
      description: "AI-powered forecasts for your hiring outcomes",
      metrics: [
        { label: "30-Day Hire Prediction", value: "18", icon: Users, color: "text-blue-600" },
        { label: "Retention Risk", value: "Low", icon: AlertTriangle, color: "text-green-600" },
        { label: "Market Competition", value: "High", icon: TrendingUp, color: "text-orange-600" },
        { label: "Salary Benchmarks", value: "Optimal", icon: BarChart3, color: "text-purple-600" }
      ]
    },
    recommendations: {
      title: "AI Recommendations",
      description: "Actionable insights to improve your hiring process",
      items: [
        {
          title: "Diversity Boost",
          description: "Consider candidates from non-traditional backgrounds for Frontend roles",
          impact: "High",
          effort: "Low",
          icon: Users
        },
        {
          title: "Skill Gap Analysis",
          description: "Invest in React training for 3 internal developers vs. external hiring",
          impact: "Medium",
          effort: "Medium",
          icon: Lightbulb
        },
        {
          title: "Interview Optimization",
          description: "Reduce technical interview stages from 3 to 2 based on success patterns",
          impact: "High",
          effort: "Low",
          icon: Zap
        }
      ]
    }
  };

  const candidatePredictions = [
    { name: "Sarah Chen", role: "Frontend Dev", successProbability: 92, retentionScore: 88, rampUpTime: "2 weeks" },
    { name: "Marcus Johnson", role: "Full Stack", successProbability: 85, retentionScore: 79, rampUpTime: "3 weeks" },
    { name: "Priya Patel", role: "ML Engineer", successProbability: 96, retentionScore: 91, rampUpTime: "1 week" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Insights Dashboard</h1>
              <p className="text-purple-100 mt-2">Intelligent analytics and predictions for smarter hiring decisions</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl p-2 shadow-sm mb-8">
          <div className="flex gap-1">
            {['overview', 'predictions', 'recommendations'].map(insight => (
              <button
                key={insight}
                onClick={() => setActiveInsight(insight)}
                className={`px-6 py-3 font-medium capitalize rounded-lg transition-all ${
                  activeInsight === insight
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {insight}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Insights Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Insight */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-2">{insightsData[activeInsight].title}</h2>
              <p className="text-gray-600 mb-6">{insightsData[activeInsight].description}</p>

              {activeInsight === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insightsData.overview.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <span className="font-medium">{metric.label}</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">{metric.value}</span>
                        <span className="text-sm text-green-600">{metric.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeInsight === 'predictions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insightsData.predictions.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <span className="font-medium">{metric.label}</span>
                      </div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeInsight === 'recommendations' && (
                <div className="space-y-4">
                  {insightsData.recommendations.items.map((item, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <item.icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-gray-600 mb-3">{item.description}</p>
                          <div className="flex gap-4 text-sm">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Impact: {item.impact}</span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Effort: {item.effort}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Candidate Success Predictions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Candidate Success Predictions</h3>
              <div className="space-y-3">
                {candidatePredictions.map((candidate, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-gray-600">{candidate.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-green-600">{candidate.successProbability}%</p>
                        <p className="text-gray-500">Success</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-blue-600">{candidate.retentionScore}%</p>
                        <p className="text-gray-500">Retention</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-purple-600">{candidate.rampUpTime}</p>
                        <p className="text-gray-500">Ramp Up</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Performance */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">AI Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Candidate Matching</span>
                    <span className="text-sm font-bold text-green-600">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Bias Detection</span>
                    <span className="text-sm font-bold text-blue-600">89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Success Prediction</span>
                    <span className="text-sm font-bold text-purple-600">91%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Tools */}
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">AI Tools</h3>
                {copyFeedback && (
                  <span className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                    {copyFeedback}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {aiToolTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTool(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition ${
                      activeTool === tab.id
                        ? 'bg-purple-600 text-white border-purple-600 shadow'
                        : 'border-gray-200 text-gray-600 hover:border-purple-200'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTool === 'jobDescription' && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Ready-made templates</p>
                    <div className="space-y-2">
                      {jobDescriptionTemplates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => setSelectedJDTemplate(template.id)}
                          className={`w-full text-left border rounded-lg p-4 transition ${
                            selectedJDTemplate === template.id ? 'border-purple-400 bg-purple-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{template.title}</p>
                              <p className="text-sm text-gray-500">{template.industry}</p>
                            </div>
                            <span className="text-xs text-gray-400">{
                              template.responsibilities.length
                            } sections</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{template.summary}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-700">Add custom field</p>
                      <input
                        type="text"
                        value={jdForm.title}
                        onChange={(e) => setJdForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Field name e.g. Culture"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <textarea
                        value={jdForm.description}
                        onChange={(e) => setJdForm((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Short description or expectations..."
                        rows={3}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        onClick={addJDSection}
                        className="w-full px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
                      >
                        Add field
                      </button>
                      {customJDSections.length > 0 && (
                        <div className="space-y-2">
                          {customJDSections.map((section, idx) => (
                            <div
                              key={`${section.title}-${idx}`}
                              className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg"
                            >
                              <div>
                                <p className="font-semibold text-gray-800">{section.title}</p>
                                <p className="text-gray-500">{section.description}</p>
                              </div>
                              <button
                                onClick={() => removeJDSection(idx)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-700">Generated job description</p>
                        <button
                          onClick={() => copyToClipboard(jobDescriptionPreview)}
                          className="text-xs text-purple-600 hover:text-purple-700"
                        >
                          Copy
                        </button>
                      </div>
                      <textarea
                        readOnly
                        value={jobDescriptionPreview}
                        rows={12}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTool === 'interviewQuestions' && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Templates by field</p>
                    <div className="space-y-2">
                      {interviewQuestionTemplates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => setSelectedInterviewTemplate(template.id)}
                          className={`w-full text-left border rounded-lg p-4 transition ${
                            selectedInterviewTemplate === template.id
                              ? 'border-blue-400 bg-blue-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{template.title}</p>
                              <p className="text-sm text-gray-500">{template.context}</p>
                            </div>
                            <span className="text-xs text-gray-400">
                              {template.questions.length + customInterviewQuestions.length} q
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-700">Custom question</p>
                      <input
                        type="text"
                        value={questionForm.title}
                        onChange={(e) => setQuestionForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Question title e.g. Scenario Planning"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        value={questionForm.prompt}
                        onChange={(e) => setQuestionForm((prev) => ({ ...prev, prompt: e.target.value }))}
                        placeholder="Describe the full prompt..."
                        rows={3}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={addCustomQuestion}
                        className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                      >
                        Add question
                      </button>
                      {customInterviewQuestions.length > 0 && (
                        <div className="space-y-2">
                          {customInterviewQuestions.map((question, idx) => (
                            <div
                              key={`${question.title}-${idx}`}
                              className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg"
                            >
                              <div>
                                <p className="font-semibold text-gray-800">{question.title}</p>
                                <p className="text-gray-500">{question.prompt}</p>
                              </div>
                              <button
                                onClick={() => removeCustomQuestion(idx)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-700">Question set</p>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              interviewQuestionList.map((q, idx) => `${idx + 1}. ${q.title} – ${q.prompt}`).join('\n')
                            )
                          }
                          className="text-xs text-blue-600 hover:text-blue-700"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="space-y-2">
                        {interviewQuestionList.map((question, idx) => (
                          <div key={`${question.title}-${idx}`} className="border border-gray-100 rounded-lg p-3">
                            <p className="font-semibold text-gray-900">{question.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{question.prompt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTool === 'marketAnalysis' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(marketReports).map(([key, region]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedMarket(key)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                          selectedMarket === key ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200'
                        }`}
                      >
                        {region.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Compensation</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{marketSnapshot.salary}</p>
                      <p className="text-sm text-gray-600 mt-2">{marketSnapshot.insight}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-100 rounded-xl">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Availability</p>
                        <p className="text-lg font-bold text-gray-900 mt-1">{marketSnapshot.availability}</p>
                      </div>
                      <div className="p-4 border border-gray-100 rounded-xl">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Competition</p>
                        <p className="text-lg font-bold text-gray-900 mt-1">{marketSnapshot.competition}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">High-signal skills</p>
                      <div className="flex flex-wrap gap-2">
                        {marketSnapshot.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm border border-green-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}