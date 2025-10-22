import http from 'http';
import fs from 'fs';

const server = http.createServer( ( req, res ) => {
    console.log( req.url );

    // res.writeHead( 200, { 'Content-Type': 'text/html' } );
    // res.write( '<h1>Hola Mundo</h1>' );
    // res.end();

    if ( req.url === '/' ) {
        const htmlFile = fs.readFileSync( './public/index.html', 'utf-8' );
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }

})

server.listen( 3000 );
console.log( 'Server running on port 3000' );