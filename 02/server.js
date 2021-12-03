import http from 'http';
import stream from 'stream';
import fs from 'fs';
import zlib from 'zlib';
import ReplaceStream from './replace.js';

const server = new http.Server();

server.on('request', (req, res) => {
    // req -> res
    const url = new URL(req.url, 'http://example.com');
    
    const fileStream = fs.createReadStream('fruits.txt');
    const gzip = zlib.createGzip();
    const replacer = new ReplaceStream(
        url.searchParams.get('from'),
        url.searchParams.get('to')
    );
 
    res.setHeader('content-encoding', 'gzip');

    function handleError(status, message) {
        return (error) => {
            console.error(error);

            res.statusCode = status;
            res.end(zlib.gzipSync(message));

            fileStream.destroy();
            gzip.destroy();
            replacer.destroy();
        }
    }

    fileStream
        .on('error', handleError(500, 'Internal server error'))
        .pipe(replacer)
        .on('error', handleError(400, 'Something went wrong'))
        .pipe(gzip)
        .on('error', handleError(500, 'Internal server error'))
        .pipe(res);
});

server.listen(3000);
