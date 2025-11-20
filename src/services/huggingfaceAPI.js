// const analyzeCVWithHuggingFace = async (cvText, criteria) => {
//   console.log('🎯 REAL CV ANALİZ BAŞLAYIR...');
//   console.log('📊 Kriteriyalar sayı:', criteria.length);
//   console.log('📝 CV simvol sayı:', cvText.length);
  
//   const analysis = analyzeWithSmartKeywords(cvText, criteria);
  
//   console.log('✅ REAL ANALİZ NƏTİCƏSİ:');
//   console.log('   Score:', analysis.score);
//   console.log('   Uyğun:', analysis.matchedCriteria.length);
//   console.log('   Çatışmayan:', analysis.missingCriteria.length);
  
//   return analysis;
// };

// const analyzeWithSmartKeywords = (cvText, criteria) => {
//   const cvTextLower = cvText.toLowerCase();
//   const cvWords = cvTextLower.split(/\s+/);
  
//   console.log('🔍 AĞILLI KEYWORD AXTARIŞI...');
//   console.log('   CV söz sayı:', cvWords.length);
  
//   let totalScore = 0;
//   const matched = [];
//   const missing = [];
  
//   criteria.forEach(criterion => {
//     const keywordPatterns = checkSmartKeywordPatterns(criterion.name);
//     let found = false;
    
//     for (let pattern of keywordPatterns) {
//       if (pattern.test(cvTextLower)) {
//         console.log(`✅ TAPILDI: ${criterion.name} -> ${pattern}`);
//         found = true;
//         break;
//       }
//     }
    
//     if (found) {
//       matched.push(criterion.name);
//       totalScore += criterion.weight === 'High' ? 25 : 15;
//     } else {
//       missing.push(criterion.name);
//       console.log(`❌ TAPILMADI: ${criterion.name}`);
//     }
//   });

//   let qualityBonus = calculateQualityBonus(cvTextLower, cvWords.length);
//   const finalScore = Math.min(98, Math.max(5, totalScore + qualityBonus));

//   console.log('🎯 ÜMUMİ SCORE HESABI:');
//   console.log('   Əsas Score:', totalScore);
//   console.log('   Keyfiyyət Bonusu:', qualityBonus);
//   console.log('   Final Score:', finalScore);

//   return {
//     score: finalScore,
//     matchedCriteria: matched,
//     missingCriteria: missing,
//     analysis: checkAnalysis(finalScore)
//   };
// };

// const checkSmartKeywordPatterns = (criterionName) => {
//   const patternsMap = {
//     'React.js Experience': [/\breact\b/, /\breact\.js\b/, /\breactjs\b/, /\breact\s+developer\b/],
//     'JavaScript/TypeScript': [/\bjavascript\b/, /\btypescript\b/, /\bjs\b/, /\bts\b/, /\bes6\b/],
//     'HTML/CSS Mastery': [/\bhtml\b/, /\bcss\b/, /\bhtml5\b/, /\bcss3\b/, /\bweb\s+design\b/],
//     'Responsive Design': [/\bresponsive\b/, /\bmobile\s+design\b/, /\bcross-?browser\b/, /\badaptive\b/],
//     'Version Control (Git)': [/\bgit\b/, /\bgithub\b/, /\bgitlab\b/, /\bversion\s+control\b/],
//     'UI/UX Understanding': [/\bui\b/, /\bux\b/, /\buser\s+interface\b/, /\buser\s+experience\b/, /\busability\b/],
//     'Problem Solving': [/\bproblem\s+solving\b/, /\banalytical\b/, /\btroubleshooting\b/, /\bdebugging\b/],
//     'Team Collaboration': [/\bteam\b/, /\bcollaboration\b/, /\bteamwork\b/, /\bagile\b/, /\bscrum\b/],
//     'Node.js/Python/Java': [/\bnode\.js\b/, /\bnodejs\b/, /\bpython\b/, /\bjava\b/, /\bbackend\b/],
//     'Database (SQL/NoSQL)': [/\bsql\b/, /\bnosql\b/, /\bdatabase\b/, /\bmysql\b/, /\bmongodb\b/, /\bpostgresql\b/],
//     'API Design (REST/GraphQL)': [/\bapi\b/, /\brest\b/, /\bgraphql\b/, /\bweb\s+services\b/],
//     'Figma/Sketch/Adobe XD': [/\bfigma\b/, /\bsketch\b/, /\badobe\s+xd\b/, /\bdesign\s+tools?\b/],
//     'User Research': [/\buser\s+research\b/, /\buser\s+testing\b/, /\busability\s+testing\b/],
//     'Machine Learning': [/\bmachine\s+learning\b/, /\bml\b/, /\bai\b/, /\bartificial\s+intelligence\b/],
//     'Statistics & Mathematics': [/\bstatistics\b/, /\bmathematics\b/, /\bmath\b/, /\bprobability\b/],
//     'CI/CD Pipelines': [/\bci\/cd\b/, /\bcontinuous\s+integration\b/, /\bcontinuous\s+deployment\b/],
//     'Docker/Kubernetes': [/\bdocker\b/, /\bkubernetes\b/, /\bcontainer\b/, /\bk8s\b/]
//   };

//   return patternsMap[criterionName] || [new RegExp(`\\b${criterionName.toLowerCase()}\\b`)];
// };

// const calculateQualityBonus = (cvTextLower, wordCount) => {
//   let bonus = 0;
  
//   if (cvTextLower.includes('senior') || cvTextLower.includes('lead')) bonus += 20;
//   else if (cvTextLower.includes('middle') || cvTextLower.includes('mid-level')) bonus += 10;
//   else if (cvTextLower.includes('junior')) bonus += 5;
  
//   if (wordCount > 500) bonus += 15;
//   else if (wordCount > 200) bonus += 8;
//   else if (wordCount > 50) bonus += 3;
  
//   const professionalKeywords = ['experience', 'skills', 'education', 'projects', 'technologies'];
//   professionalKeywords.forEach(keyword => {
//     if (cvTextLower.includes(keyword)) bonus += 2;
//   });
  
//   console.log('   Keyfiyyət Bonusu:', bonus);
//   return bonus;
// };

// const checkAnalysis = (score) => {
//   if (score >= 85) return 'Əla uyğunluq - namizəd tələblərin əksəriyyətini qarşılayır';
//   if (score >= 70) return 'Yaxşı uyğunluq - əsas tələblər qarşılanıb';
//   if (score >= 50) return 'Orta uyğunluq - bəzi tələblər çatışmır';
//   return 'Zəif uyğunluq - əksər tələblər çatışmır';
// };

// export { analyzeCVWithHuggingFace };














// services/huggingfaceAPI.js - TAMAMEN YENİ VERSİYA
const DEFAULT_KEYWORDS = {
  'React.js Experience': ['react', 'react.js', 'reactjs', 'react developer'],
  'JavaScript/TypeScript': ['javascript', 'typescript', 'es6', 'js', 'ts'],
  'HTML/CSS Mastery': ['html', 'css', 'html5', 'css3', 'semantic html'],
  'Responsive Design': ['responsive', 'mobile first', 'cross browser'],
  'Version Control (Git)': ['git', 'github', 'gitlab', 'version control'],
  'UI/UX Understanding': ['ui', 'ux', 'user experience', 'user interface', 'design system'],
  'Problem Solving': ['problem solving', 'analytical', 'debugging', 'troubleshooting'],
  'Team Collaboration': ['team work', 'collaboration', 'agile', 'scrum'],
  'Node.js/Python/Java': ['node', 'node.js', 'python', 'java', 'backend'],
  'Database (SQL/NoSQL)': ['sql', 'nosql', 'database', 'mysql', 'postgresql', 'mongodb'],
  'API Design (REST/GraphQL)': ['api', 'rest', 'graphql', 'web services'],
  'Figma/Sketch/Adobe XD': ['figma', 'sketch', 'adobe xd', 'design tools'],
  'User Research': ['user research', 'user testing', 'usability testing'],
  'Machine Learning': ['machine learning', 'ml', 'ai', 'artificial intelligence'],
  'Statistics & Mathematics': ['statistics', 'mathematics', 'probability', 'math'],
  'CI/CD Pipelines': ['ci/cd', 'continuous integration', 'continuous deployment', 'pipelines'],
  'Docker/Kubernetes': ['docker', 'kubernetes', 'container', 'k8s'],
  'Cloud Services (AWS/Azure)': ['aws', 'azure', 'gcp', 'cloud'],
  'System Design': ['system design', 'architecture', 'scalability'],
  'Automation Mindset': ['automation', 'scripting', 'infrastructure as code']
};

const normalizeText = (text = '') => text.replace(/\s+/g, ' ').trim().toLowerCase();

const tokenize = (text) => (text ? text.toLowerCase().split(/\s+/).filter(Boolean) : []);

const getKeywordsForCriterion = (criterion) => {
  if (!criterion?.name) return [];
  const predefined = DEFAULT_KEYWORDS[criterion.name];
  if (predefined) return predefined;

  return criterion.name
    .toLowerCase()
    .split(/[,/]/)
    .map((token) => token.trim())
    .filter(Boolean);
};

const scoreForCriterion = (criterion) => {
  switch (criterion?.weight) {
    case 'High':
      return 14;
    case 'Medium':
      return 10;
    default:
      return 6;
  }
};

const calculateRichnessBonus = (wordCount) => {
  if (wordCount > 800) return 18;
  if (wordCount > 500) return 14;
  if (wordCount > 250) return 10;
  if (wordCount > 100) return 6;
  return 2;
};

const calculateSeniorityBonus = (text) => {
  if (text.includes('principal') || text.includes('staff')) return 18;
  if (text.includes('senior') || text.includes('lead')) return 12;
  if (text.includes('mid-level') || text.includes('mid level') || text.includes('middle')) return 6;
  if (text.includes('junior') || text.includes('intern')) return 2;
  return 0;
};

const buildSummary = (score, coverage, matchedCount, missingCount) => {
  if (score >= 85 && coverage >= 0.7) {
    return 'Əla uyğunluq - kriteriyaların əksəriyyəti təmin edilib və təcrübə səviyyəsi yüksəkdir.';
  }
  if (score >= 70 && coverage >= 0.5) {
    return 'Yaxşı uyğunluq - əsas kriteriyalar qarşılanır, lakin bəzi inkişaf sahələri mövcuddur.';
  }
  if (score >= 55 && coverage >= 0.35) {
    return 'Orta uyğunluq - uyğunluq qeyri-bərabərdir, əlavə təlim və ya təcrübə tələb oluna bilər.';
  }
  if (matchedCount === 0) {
    return 'Uyğun kriteriya tapılmadı - CV tələblərlə uyğun gəlmir və ya fayl məzmunu oxuna bilmədi.';
  }
  if (missingCount === 0) {
    return 'Bütün kriteriyalar ödənilib - namizəd tələblərlə tam uyğun gəlir.';
  }
  return 'Zəif uyğunluq - əsas kriteriyalar çatışmır, yenilənmə və ya əlavə təcrübə lazımdır.';
};

const analyzeCVWithHuggingFace = async (cvText = '', criteria = []) => {
  const normalizedText = normalizeText(cvText);
  const tokens = tokenize(cvText);

  let totalScore = 0;
  let matchedHigh = 0;
  let totalHigh = 0;
  const matchedCriteria = [];
  const missingCriteria = [];

  criteria.forEach((criterion) => {
    const keywords = getKeywordsForCriterion(criterion);
    if (criterion.weight === 'High') {
      totalHigh += 1;
    }
    const isMatched = keywords.some((keyword) => normalizedText.includes(keyword));

    if (isMatched) {
      matchedCriteria.push(criterion.name);
      totalScore += scoreForCriterion(criterion);
      if (criterion.weight === 'High') {
        matchedHigh += 1;
      }
    } else {
      missingCriteria.push(criterion.name);
    }
  });

  const maxScore = criteria.reduce((acc, criterion) => acc + scoreForCriterion(criterion), 0);
  const coverage = maxScore ? (totalScore / maxScore) : 0;

  const richnessBonus = calculateRichnessBonus(tokens.length) / 4;
  const seniorityBonus = calculateSeniorityBonus(normalizedText) / 4;
  const diversityBonus = Math.min(8, new Set(matchedCriteria.map((item) => item.split(' ')[0])).size * 1.5);
  const highCoverage = totalHigh ? matchedHigh / totalHigh : 1;
  const alignmentPenalty = totalHigh && highCoverage < 0.4 ? (0.4 - highCoverage) * 60 : 0;

  const baseScore = coverage * 80;
  const rawScore = baseScore + richnessBonus + seniorityBonus + diversityBonus - alignmentPenalty;
  const finalScore = Math.max(5, Math.min(98, Math.round(rawScore)));

  return {
    score: finalScore,
    matchedCriteria,
    missingCriteria,
    analysis: buildSummary(finalScore, coverage, matchedCriteria.length, missingCriteria.length),
    coverage: Number((coverage * 100).toFixed(1))
  };
};

export { analyzeCVWithHuggingFace };