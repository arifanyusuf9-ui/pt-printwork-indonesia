const { PDFParse } = require('pdf-parse');
const fs = require('fs');
const buffer = fs.readFileSync('pricelist.pdf');
const res = PDFParse(buffer);
console.log('Result:', res);
if (res && typeof res.then === 'function') {
    console.log('Is a promise');
} else {
    console.log('Is NOT a promise');
}
