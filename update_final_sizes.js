const fs = require('fs');
let text = fs.readFileSync('shop.js', 'utf8');

// Dus Ayam Geprek Eco-Kraft & Food Grade
text = text.replace(/125x83x45/g, "A:150x105, B:125x83, T:45");

// Food Tray Eco-Kraft & Food Grade (M-L)
text = text.replace(/M \(150x80x50\)/g, "M (A:190x120, B:150x80, T:50)");
text = text.replace(/L \(160x105x50\)/g, "L (A:195x140, B:160x105, T:50)");

fs.writeFileSync('shop.js', text);
