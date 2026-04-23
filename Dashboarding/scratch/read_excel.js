const XLSX = require('xlsx');
const fs = require('fs');

const filePath = 'C:/Users/mahmed/Downloads/internship/files/siamakFiles/v1.xlsx';
const workbook = XLSX.readFile(filePath);

let output = '';
workbook.SheetNames.forEach(sheetName => {
    output += `--- Sheet: ${sheetName} ---\n`;
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    output += JSON.stringify(data, null, 2) + '\n';
});

fs.writeFileSync('excel_content.txt', output, 'utf8');
console.log('Saved to excel_content.txt');
