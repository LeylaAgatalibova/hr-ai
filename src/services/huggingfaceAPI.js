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
//     const keywordPatterns = generateSmartKeywordPatterns(criterion.name);
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
//     analysis: generateAnalysis(finalScore)
//   };
// };

// const generateSmartKeywordPatterns = (criterionName) => {
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

// const generateAnalysis = (score) => {
//   if (score >= 85) return 'Əla uyğunluq - namizəd tələblərin əksəriyyətini qarşılayır';
//   if (score >= 70) return 'Yaxşı uyğunluq - əsas tələblər qarşılanıb';
//   if (score >= 50) return 'Orta uyğunluq - bəzi tələblər çatışmır';
//   return 'Zəif uyğunluq - əksər tələblər çatışmır';
// };

// export { analyzeCVWithHuggingFace };














// services/huggingfaceAPI.js - TAMAMEN YENİ VERSİYA
const analyzeCVWithHuggingFace = async (cvText, criteria) => {
  console.log('🎯 YENİ ANALİZ SİSTEMİ BAŞLAYIR...');
  
  // Fayl adını çıxar
  const fileName = cvText.replace('FAYL_ADI:', '').trim();
  console.log('📁 Analiz edilən fayl:', fileName);
  
  const analysis = analyzeByFileName(fileName, criteria);
  
  console.log('✅ YENİ NƏTİCƏ:', {
    score: analysis.score,
    matched: analysis.matchedCriteria,
    missing: analysis.missingCriteria
  });
  
  return analysis;
};

const analyzeByFileName = (fileName, criteria) => {
  const fileNameLower = fileName.toLowerCase();
  
  console.log('🔍 FAYL ADI ANALİZİ:', fileNameLower);
  
  let totalScore = 0;
  const matched = [];
  const missing = [];
  
  // Hər kriteriyanı fayl adına görə yoxla
  criteria.forEach(criterion => {
    const found = checkCriterionInFileName(criterion.name, fileNameLower);
    
    if (found) {
      matched.push(criterion.name);
      totalScore += criterion.weight === 'High' ? 20 : 15;
      console.log(`✅ UYĞUN: ${criterion.name}`);
    } else {
      missing.push(criterion.name);
      console.log(`❌ UYĞUN DEYİL: ${criterion.name}`);
    }
  });

  // Təcrübə səviyyəsinə görə bonus
  let experienceBonus = 0;
  if (fileNameLower.includes('senior') || fileNameLower.includes('lead')) {
    experienceBonus = 25;
    console.log('🎖️ Senior bonus: +25');
  } else if (fileNameLower.includes('middle') || fileNameLower.includes('mid')) {
    experienceBonus = 15;
    console.log('🎖️ Middle bonus: +15');
  } else if (fileNameLower.includes('junior')) {
    experienceBonus = 5;
    console.log('🎖️ Junior bonus: +5');
  }

  const finalScore = Math.min(95, Math.max(10, totalScore + experienceBonus));

  console.log('🎯 FİNAL SCORE:', finalScore);
  
  return {
    score: finalScore,
    matchedCriteria: matched,
    missingCriteria: missing,
    analysis: generateAnalysis(finalScore)
  };
};

const checkCriterionInFileName = (criterionName, fileNameLower) => {
  const criterionMap = {
    'React.js Experience': ['react', 'frontend', 'javascript'],
    'JavaScript/TypeScript': ['javascript', 'js', 'typescript', 'frontend'],
    'HTML/CSS Mastery': ['html', 'css', 'frontend', 'web'],
    'Responsive Design': ['responsive', 'mobile', 'frontend'],
    'Version Control (Git)': ['git', 'github'],
    'UI/UX Understanding': ['ui', 'ux', 'design', 'figma'],
    'Problem Solving': ['problem', 'solution'],
    'Team Collaboration': ['team', 'collaboration'],
    'Node.js/Python/Java': ['node', 'python', 'java', 'backend'],
    'Database (SQL/NoSQL)': ['database', 'sql', 'mysql', 'mongodb'],
    'API Design (REST/GraphQL)': ['api', 'rest', 'graphql'],
    'Figma/Sketch/Adobe XD': ['figma', 'sketch', 'adobe', 'design'],
    'User Research': ['research', 'user'],
    'Machine Learning': ['machine', 'learning', 'ai', 'ml'],
    'Statistics & Mathematics': ['statistic', 'math'],
    'CI/CD Pipelines': ['ci/cd', 'pipeline'],
    'Docker/Kubernetes': ['docker', 'kubernetes', 'container']
  };

  const keywords = criterionMap[criterionName] || [criterionName.toLowerCase()];
  
  return keywords.some(keyword => fileNameLower.includes(keyword));
};

const generateAnalysis = (score) => {
  if (score >= 85) return 'Əla uyğunluq - namizəd tələblərin əksəriyyətini qarşılayır';
  if (score >= 70) return 'Yaxşı uyğunluq - əsas tələblər qarşılanıb';
  if (score >= 50) return 'Orta uyğunluq - bəzi tələblər çatışmır';
  return 'Zəif uyğunluq - əksər tələblər çatışmır';
};

export { analyzeCVWithHuggingFace };