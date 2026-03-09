const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const fs = require('fs');

async function extractText() {
    try {
        const data = fs.readFileSync('D:/Downloads/pt-printwork-indonesia/PRICELIST REPACK.pdf');
        const loadingTask = pdfjsLib.getDocument({ data });
        const pdf = await loadingTask.promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(" ") + "\n";
        }
        fs.writeFileSync('pricelist_content.txt', text);
        console.log('SUCCESS: Extracted', text.length, 'chars');
    } catch (e) {
        console.error('ERROR:', e.message);
    }
}

extractText();
