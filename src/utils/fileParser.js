// import pdfParse from 'pdf-parse';
// import * as mammoth from 'mammoth';

// export const extractTextFromFile = async (file) => {
//   try {
//     console.log('🔍 Real fayl oxunur:', file.name, 'Tip:', file.type, 'Ölçü:', file.size + ' bytes');
    
//     if (file.type === 'application/pdf') {
//       return await parsePDF(file);
//     } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       return await parseDOCX(file);
//     } else if (file.type === 'text/plain') {
//       return await parseTXT(file);
//     } else {
//       throw new Error('Dəstəklənməyən fayl formatı');
//     }
//   } catch (error) {
//     console.error('❌ Real fayl oxuma xətası:', error);
//     throw new Error(`"${file.name}" oxuna bilmədi: ${error.message}`);
//   }
// };

// const parsePDF = async (file) => {
//   try {
//     console.log('📄 PDF oxunur...');
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = new Uint8Array(arrayBuffer);
//     const data = await pdfParse(buffer);
    
//     const text = data.text;
//     console.log('✅ PDF oxundu. Simvol sayı:', text.length);
//     console.log('📝 PDF məzmunu (ilk 500 simvol):', text.substring(0, 500));
    
//     return text;
//   } catch (error) {
//     console.error('❌ PDF oxuma xətası:', error);
//     throw new Error('PDF faylı oxuna bilmədi');
//   }
// };

// const parseDOCX = async (file) => {
//   try {
//     console.log('📄 DOCX oxunur...');
//     const arrayBuffer = await file.arrayBuffer();
//     const result = await mammoth.extractRawText({ arrayBuffer });
    
//     const text = result.value;
//     console.log('✅ DOCX oxundu. Simvol sayı:', text.length);
//     console.log('📝 DOCX məzmunu (ilk 500 simvol):', text.substring(0, 500));
    
//     return text;
//   } catch (error) {
//     console.error('❌ DOCX oxuma xətası:', error);
//     throw new Error('DOCX faylı oxuna bilmədi');
//   }
// };

// const parseTXT = async (file) => {
//   try {
//     console.log('📄 TXT oxunur...');
//     const text = await file.text();
//     console.log('✅ TXT oxundu. Simvol sayı:', text.length);
//     console.log('📝 TXT məzmunu (ilk 500 simvol):', text.substring(0, 500));
    
//     return text;
//   } catch (error) {
//     console.error('❌ TXT oxuma xətası:', error);
//     throw new Error('TXT faylı oxuna bilmədi');
//   }
// };










// utils/fileParser.js - SADƏ VERSİYA
export const extractTextFromFile = async (file) => {
  try {
    console.log('📁 Fayl:', file.name, 'Ölçü:', file.size + ' bytes');
    
    if (file.type === 'text/plain') {
      return await file.text();
    } else {
      // PDF, DOCX və digərləri üçün sadəcə fayl adını qaytar
      return `FAYL_ADI:${file.name}`;
    }
  } catch (error) {
    console.error('Fayl oxuma xətası:', error);
    return `FAYL_ADI:${file.name}`;
  }
};