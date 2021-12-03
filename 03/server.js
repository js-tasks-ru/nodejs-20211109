const http = require('http');
const zlib = require('zlib');

const server = new http.Server();

server.on('request', (req, res) => {
    const header = req.headers['accept-encoding'];
    const needGzip = header === 'gzip';

    if (req.url === '/') {
        needGzip
            ? zlib.gzip('hello world', (err, buf) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('internal server error');
                } else {
                    res.end(buf);
                }
            })
            : res.end('hello world');
    } else {
        needGzip 
            ? req.pipe(zlib.createGzip()).pipe(res)
            : req.pipe(res);
    }
});

module.exports = server;

// jest, jasmine, mocha, tape, ...
// sinon, chai, assert

// mocha, assert