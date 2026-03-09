const pdf = require('pdf-parse');
console.log('PDFParse type:', typeof pdf.PDFParse);
if (typeof pdf.PDFParse === 'function') {
    console.log('PDFParse is a function');
} else {
    console.log('PDFParse is NOT a function');
}
