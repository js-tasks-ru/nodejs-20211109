// const fs = require('fs');
// const http = require('http');

// const server = new http.Server();

// server.on('request', (req, res) => {
//     const filepath = '/index.js';

//     // tasks queue: []

//     if (req.method === 'GET') {
//         fs.createReadStream(filepath)
//             .on('error', (err) => ...)
//             .pipe(res);
//     } else if (req.method === 'DELETE') {
//         fs.unlink(filepath, () => {res.end('ok')});
//     }


// });

// server.listen(3000);