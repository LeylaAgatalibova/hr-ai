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










import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf.js';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';
import * as mammoth from 'mammoth/mammoth.browser.js';

GlobalWorkerOptions.workerSrc = pdfWorker;

const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const PDF_MIME = 'application/pdf';

const extractTextFromPdf = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;

  let text = '';

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str || '').join(' ');
    text += `${pageText}\n`;
  }

  return text.trim();
};

const extractTextFromDocx = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return (result.value || '').trim();
};

const fallbackRead = async (file) => {
  try {
    return await file.text();
  } catch (innerError) {
    console.error('Fallback oxu xətası:', innerError);
    return '';
  }
};

export const extractTextFromFile = async (file) => {
  if (!file) {
    return '';
  }

  try {
    if (file.type === PDF_MIME) {
      return await extractTextFromPdf(file);
    }

    if (file.type === DOCX_MIME) {
      return await extractTextFromDocx(file);
    }

    if (file.type === 'text/plain' || file.type === 'application/json') {
      return await file.text();
    }

    return await fallbackRead(file);
  } catch (error) {
    console.error('Fayl oxuma xətası:', error);
    return await fallbackRead(file);
  }
};