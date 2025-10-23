import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer((req, res) => {
  console.log(req.url);

  // Definimos la ruta base del archivo
  const filePath = path.join(
    process.cwd(),
    'public',
    req.url === '/' ? 'index.html' : req.url!
  );

  // Determinamos el tipo de contenido
  let contentType = 'text/plain';
  if (req.url === '/' || req.url?.endsWith('.html')) {
    contentType = 'text/html';
  } else if (req.url?.endsWith('.js')) {
    contentType = 'text/javascript';
  } else if (req.url?.endsWith('.css')) {
    contentType = 'text/css';
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err: any) {
    // Si el archivo no existe, devolvemos 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000);
console.log('Server running on port 3000');
