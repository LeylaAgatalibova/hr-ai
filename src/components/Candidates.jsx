import React, { useMemo, useState } from 'react';
import { SlidersHorizontal, AlertTriangle, X, CalendarDays } from 'lucide-react';
import CandidateCard from './CandidateCard';
import SearchAndFilter from './SearchAndFilter';

export default function Candidates({ onRunAIAnalysis }) {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      experience: '5 years',
      experienceYears: 5,
      appliedDays: 3,
      skills: ['React', 'TypeScript', 'Node.js', 'UI/UX'],
      aiScore: 94,
      status: 'screening',
      avatar: '👩‍💻',
      location: 'San Francisco, CA',
      salary: '$120k-$150k',
      availability: '2 weeks notice',
      lastInteraction: 'Hiring manager review • 3h ago',
      aiInsight: 'Strong technical background with leadership potential. Communication skills excellent.',
      matchReasons: ['Expert in React ecosystem', 'Previous experience at tech unicorns', 'Open source contributor']
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Full Stack Engineer',
      experience: '7 years',
      experienceYears: 7,
      appliedDays: 6,
      skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
      aiScore: 88,
      status: 'interview',
      avatar: '👨‍💼',
      location: 'Austin, TX',
      salary: '$130k-$160k',
      availability: 'Immediate',
      lastInteraction: 'Panel interview scheduled • 1d ago',
      aiInsight: 'Versatile engineer with strong problem-solving abilities. Team player with proven track record.',
      matchReasons: ['Extensive backend expertise', 'DevOps experience', 'Startup background']
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'ML Engineer',
      experience: '4 years',
      experienceYears: 4,
      appliedDays: 2,
      skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP'],
      aiScore: 91,
      status: 'screening',
      avatar: '👩‍🔬',
      location: 'Seattle, WA',
      salary: '$140k-$170k',
      availability: 'After current project',
      lastInteraction: 'Challenge sent • 5h ago',
      aiInsight: 'PhD in AI with practical industry experience. Published researcher in top-tier conferences.',
      matchReasons: ['AI/ML specialist', 'Research + industry balance', 'Strong mathematical foundation']
    },
    {
      id: 4,
      name: 'Alex Rivera',
      role: 'Product Designer',
      experience: '6 years',
      experienceYears: 6,
      appliedDays: 10,
      skills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems'],
      aiScore: 86,
      status: 'offer',
      avatar: '🎨',
      location: 'New York, NY',
      salary: '$110k-$140k',
      availability: 'Offers on hold',
      lastInteraction: 'Offer review • 12h ago',
      aiInsight: 'User-centric designer with excellent portfolio. Strong collaboration skills with engineering teams.',
      matchReasons: ['Award-winning portfolio', 'B2B SaaS experience', 'Design system expertise']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSkills, setFilterSkills] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('score-desc');
  const [previewCandidate, setPreviewCandidate] = useState(null);

  const allSkills = ['React', 'TypeScript', 'Python', 'Node.js', 'AWS', 'Django', 'PostgreSQL', 'TensorFlow', 'Figma', 'UI/UX'];

  const statusChips = useMemo(() => {
    const counts = candidates.reduce(
      (acc, c) => {
        acc[c.status] = (acc[c.status] || 0) + 1;
        return acc;
      },
      { all: candidates.length }
    );

    return [
      { id: 'all', label: 'All', count: counts.all },
      { id: 'screening', label: 'Screening', count: counts.screening || 0 },
      { id: 'interview', label: 'Interviews', count: counts.interview || 0 },
      { id: 'offer', label: 'Offers', count: counts.offer || 0 }
    ];
  }, [candidates]);

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkills = filterSkills.length === 0 || filterSkills.some((skill) => c.skills.includes(skill));
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesSkills && matchesStatus;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    switch (sortOption) {
      case 'score-desc':
        return b.aiScore - a.aiScore;
      case 'score-asc':
        return a.aiScore - b.aiScore;
      case 'experience-desc':
        return b.experienceYears - a.experienceYears;
      case 'recent':
        return a.appliedDays - b.appliedDays;
      default:
        return 0;
    }
  });

  const toggleSkillFilter = (skill) => {
    setFilterSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  const updateCandidateStatus = (id, newStatus) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
  };

  return (
    <div className="space-y-6">
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterSkills={filterSkills}
        onToggleSkillFilter={toggleSkillFilter}
        allSkills={allSkills}
      />

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {statusChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => setStatusFilter(chip.id)}
                className={`px-4 py-2 rounded-full text-sm border ${
                  statusFilter === chip.id
                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-600 hover:border-purple-200'
                }`}
              >
                {chip.label}
                <span className="ml-2 text-xs text-gray-500">{chip.count}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <SlidersHorizontal className="w-4 h-4 text-purple-600" />
            <span>Sort by</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="score-desc">AI score (high → low)</option>
              <option value="score-asc">AI score (low → high)</option>
              <option value="experience-desc">Experience (most)</option>
              <option value="recent">Most recent applicants</option>
            </select>
          </div>
        </div>
        {filterSkills.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>Active skill filters:</span>
            {filterSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkillFilter(skill)}
                className="px-2 py-1 rounded-full bg-purple-50 text-purple-700 flex items-center gap-1"
              >
                {skill}
                <X className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sortedCandidates.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-200">
            <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <p className="font-semibold text-gray-700">No candidates match the current filters.</p>
            <p className="text-sm text-gray-500 mt-1">Try clearing some filters or expanding your search.</p>
          </div>
        )}

        {sortedCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onRunAIAnalysis={onRunAIAnalysis}
            onUpdateStatus={updateCandidateStatus}
            onViewProfile={setPreviewCandidate}
          />
        ))}
      </div>

      {previewCandidate && (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-purple-500" />
                Applied {previewCandidate.appliedDays} days ago
              </p>
              <h3 className="text-2xl font-bold mt-2">{previewCandidate.name}</h3>
              <p className="text-gray-600">{previewCandidate.role} • {previewCandidate.location}</p>
            </div>
            <button
              onClick={() => setPreviewCandidate(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-purple-50 rounded-xl">
              <p className="text-xs text-purple-600 uppercase">Salary Expectation</p>
              <p className="font-semibold text-purple-900 mt-1">{previewCandidate.salary}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-xs text-blue-600 uppercase">Availability</p>
              <p className="font-semibold text-blue-900 mt-1">{previewCandidate.availability}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-xs text-green-600 uppercase">AI Score</p>
              <p className="font-semibold text-green-900 mt-1">{previewCandidate.aiScore}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Key Skills</p>
            <div className="flex flex-wrap gap-2">
              {previewCandidate.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}