const fs = require('fs');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

async function extractFiles() {
  const dir = 'C:\\Users\\mahmed\\Downloads\\internship\\Internship_Resources\\';
  
  // Read PDF
  const pdfBuffer = fs.readFileSync(dir + 'CPAP Therapy Dashboard Presentation.pdf');
  const pdfData = await pdf(pdfBuffer);
  fs.writeFileSync('C:\\Users\\mahmed\\Downloads\\SleepCare-Dashboard\\pdf_text.txt', pdfData.text);
  console.log('PDF done');

  // Read DOCX 1
  const docx1 = await mammoth.extractRawText({path: dir + 'Frontend Architecture_ Role-Based UI & Metric Mapping.docx'});
  fs.writeFileSync('C:\\Users\\mahmed\\Downloads\\SleepCare-Dashboard\\docx1.txt', docx1.value);
  console.log('DOCX 1 done');

  // Read DOCX 2
  const docx2 = await mammoth.extractRawText({path: dir + 'MOEEZ- weekly task.docx'});
  fs.writeFileSync('C:\\Users\\mahmed\\Downloads\\SleepCare-Dashboard\\docx2.txt', docx2.value);
  console.log('DOCX 2 done');
}

extractFiles().catch(console.error);
