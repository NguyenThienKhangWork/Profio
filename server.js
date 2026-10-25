const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '' || urlPath === '/') {
    urlPath = '/index.html';
  }

  let filePath = path.join(ROOT, urlPath);

  // If directory requested without trailing slash, redirect to trailing slash
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory() && !urlPath.endsWith('/')) {
    res.writeHead(301, { 'Location': urlPath + '/' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '') });
    res.end();
    return;
  }

  if (urlPath.endsWith('/')) {
    filePath = path.join(filePath, 'index.html');
  } else if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '/index.html')) {
      filePath = filePath + '/index.html';
    } else if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  // NO-CACHE headers for all responses — disable bfcache
  const headers = {
    'Content-Type': contentType,
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, headers);
      res.end('404 Not Found: ' + urlPath);
      return;
    }
    res.writeHead(200, headers);
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
  console.log('All responses served with no-cache headers');
  console.log('Root:', ROOT);
});
