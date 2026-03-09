const fs = require('fs');
const { PDFParse, VerbosityLevel } = require('pdf-parse');

async function start() {
    try {
        const buffer = fs.readFileSync('../PRICELIST REPACK.pdf');
        const parser = new PDFParse({ data: buffer });
        const result = await parser.getScreenshot({ scale: 2 });
        await parser.destroy();

        const path = require('path');
        const outputDir = 'media/pdf_pages';
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

        for (let i = 0; i < result.pages.length; i++) {
            const page = result.pages[i];
            const outputPath = path.join(outputDir, `page_${i + 1}.png`);
            fs.writeFileSync(outputPath, page.data);
            console.log(`Saved ${outputPath}`);
        }
    } catch (e) {
        console.log('FINAL ERROR:', e.message);
        console.log('STACK:', e.stack);
    }
}
start();
