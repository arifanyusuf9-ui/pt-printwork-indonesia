const fs = require('fs');
let text = fs.readFileSync('shop.js', 'utf8');

text = text.replace(/'S \(160x100x50\)'/g, "'S (A:150x105, B:125x83, T:45)'");
text = text.replace(/'M \(160x120x50\)'/g, "'M (A:175x110, B:150x85, T:50)'");
text = text.replace(/'L \(180x110x50\)'/g, "'L (A:185x130, B:160x105, T:50)'");

text = text.replace(/'XL \(200x120x50\)'/g, "'XL (A:205x140, B:170x115, T:50)'");
text = text.replace(/'Jumbo \(200x150x50\)'/g, "'Jumbo (A:205x160, B:180x140, T:50)'");

text = text.replace(/'XS \(90x90x45\)'/g, "'XS (A:115x115, B:90x90, T:45)'");
text = text.replace("Ukuran XS untuk snack, taco, dan porsi kecil. Bawah 90x90mm, Atas 115x115mm, Tinggi 45mm.", "Ukuran XS untuk snack, taco, dan porsi kecil. Atas 115x115mm, Bawah 90x90mm, Tinggi 45mm.");
text = text.replace("Ukuran XS Food Grade untuk snack premium. Bawah 90x90mm, Tinggi 45mm.", "Ukuran XS Food Grade untuk snack premium. Atas 115x115mm, Bawah 90x90mm, Tinggi 45mm.");

text = text.replace(/'S \(Bawah 150x100\)'/g, "'S (A:150x105, B:125x83, T:45)'");
text = text.replace(/'M \(Bawah 160x100\)'/g, "'M (A:175x110, B:150x85, T:50)'");
text = text.replace(/'L \(Bawah 180x105\)'/g, "'L (A:185x130, B:160x105, T:50)'");

text = text.replace(/'M \(Bawah 80x65\)'/g, "'M (A:95x84, B:80x65, T:80)'");
text = text.replace(/'L \(Bawah 80x65\)'/g, "'L (A:95x85, B:80x65, T:100)'");

fs.writeFileSync('shop.js', text);
