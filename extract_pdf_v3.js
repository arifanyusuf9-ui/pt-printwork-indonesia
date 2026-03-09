const { PDFParse } = require('pdf-parse');
const fs = require('fs');

async function extract() {
    const pdfPath = 'D:/Downloads/pt-printwork-indonesia/PRICELIST REPACK.pdf';
    try {
        const buffer = fs.readFileSync(pdfPath);
        const parser = new PDFParse({ data: buffer });
        const result = await parser.getText();
        fs.writeFileSync('pricelist_content_v3.txt', result.text);
        console.log('Extracted', result.text.length, 'characters to pricelist_content_v3.txt');
        await parser.destroy();
    } catch (e) {
        console.error('ERROR:', e);
    }
}

extract();
