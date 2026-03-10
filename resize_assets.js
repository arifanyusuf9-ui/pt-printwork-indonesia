const sharp = require('sharp');
const path = require('path');
const source = 'd:/Downloads/printwork-web-main/Picsart_26-03-10_09-36-09-294.jpg.jpeg';
const targetDir = 'd:/Downloads/printwork-web-main/printwork-web-main';

async function resize() {
  try {
    // Generate Favicon (Square)
    await sharp(source)
      .resize(48, 48, { fit: 'cover' })
      .toFile(path.join(targetDir, 'favicon.png'));
    console.log('Favicon 48x48 generated');

    // Generate apple-touch-icon (Square)
    await sharp(source)
      .resize(180, 180, { fit: 'cover' })
      .toFile(path.join(targetDir, 'apple-touch-icon.png'));
    console.log('Apple touch icon 180x180 generated');

    // Generate Logo (Maintain Aspect Ratio)
    await sharp(source)
      .resize({ height: 200 }) // Logo is usually small in nav, 200px is plenty high.
      .toFile(path.join(targetDir, 'logo.png'));
    console.log('Logo generated (height: 200px)');

  } catch (err) {
    console.error('Resize error:', err);
    process.exit(1);
  }
}

resize();
