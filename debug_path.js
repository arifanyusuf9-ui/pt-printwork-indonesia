const path = require('path');
const fs = require('fs');
const pdfPath = path.resolve(__dirname, 'pricelist.pdf');
console.log('__dirname:', __dirname);
console.log('pdfPath:', pdfPath);
console.log('Exists:', fs.existsSync(pdfPath));
