import React, { useState } from 'react';
import { Search, Filter, CheckCircle, Sparkles, Brain, Star } from 'lucide-react';
import CandidateCard from './CandidateCard';
import SearchAndFilter from './SearchAndFilter';

export default function Candidates({ onRunAIAnalysis }) {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js', 'UI/UX'],
      aiScore: 94,
      status: 'screening',
      avatar: '👩‍💻',
      location: 'San Francisco, CA',
      salary: '$120k-$150k',
      aiInsight: 'Strong technical background with leadership potential. Communication skills excellent.',
      matchReasons: ['Expert in React ecosystem', 'Previous experience at tech unicorns', 'Open source contributor']
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Full Stack Engineer',
      experience: '7 years',
      skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
      aiScore: 88,
      status: 'interview',
      avatar: '👨‍💼',
      location: 'Austin, TX',
      salary: '$130k-$160k',
      aiInsight: 'Versatile engineer with strong problem-solving abilities. Team player with proven track record.',
      matchReasons: ['Extensive backend expertise', 'DevOps experience', 'Startup background']
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'ML Engineer',
      experience: '4 years',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP'],
      aiScore: 91,
      status: 'screening',
      avatar: '👩‍🔬',
      location: 'Seattle, WA',
      salary: '$140k-$170k',
      aiInsight: 'PhD in AI with practical industry experience. Published researcher in top-tier conferences.',
      matchReasons: ['AI/ML specialist', 'Research + industry balance', 'Strong mathematical foundation']
    },
    {
      id: 4,
      name: 'Alex Rivera',
      role: 'Product Designer',
      experience: '6 years',
      skills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems'],
      aiScore: 86,
      status: 'offer',
      avatar: '🎨',
      location: 'New York, NY',
      salary: '$110k-$140k',
      aiInsight: 'User-centric designer with excellent portfolio. Strong collaboration skills with engineering teams.',
      matchReasons: ['Award-winning portfolio', 'B2B SaaS experience', 'Design system expertise']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSkills, setFilterSkills] = useState([]);

  const allSkills = ['React', 'TypeScript', 'Python', 'Node.js', 'AWS', 'Django', 'PostgreSQL', 'TensorFlow', 'Figma', 'UI/UX'];

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkills = filterSkills.length === 0 || 
                         filterSkills.some(skill => c.skills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  const toggleSkillFilter = (skill) => {
    setFilterSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const updateCandidateStatus = (id, newStatus) => {
    setCandidates(prev => prev.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
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

      <div className="grid grid-cols-1 gap-4">
        {filteredCandidates.map(candidate => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onRunAIAnalysis={onRunAIAnalysis}
            onUpdateStatus={updateCandidateStatus}
          />
        ))}
      </div>
    </div>
  );
}