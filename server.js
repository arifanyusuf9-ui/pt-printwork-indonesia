const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8889;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.pdf': 'application/pdf',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url);
    let filePath;

    // Route for animation logo (stored in parallel directory)
    if (urlPath.startsWith('/animation-logo/')) {
        const relativePath = urlPath.replace('/animation-logo/', '');
        filePath = path.join(__dirname, 'animation logo', relativePath);
    } else {
        filePath = '.' + urlPath;
        if (filePath === './') filePath = './index.html';
        filePath = path.join(__dirname, filePath);
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File Not Found: ' + filePath);
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
