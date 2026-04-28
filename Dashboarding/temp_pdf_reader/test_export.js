const pp = require('pdf-parse');
console.log('Main export keys:', Object.keys(pp));
if (pp.PDFParse) {
    const parser = new pp.PDFParse({});
    console.log('Parser instance methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(parser)));
}
