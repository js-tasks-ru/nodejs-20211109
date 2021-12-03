const http = require('http');

const server = new http.Server();

// libuv

// tasks queue: []
server.on('request', (req, res) => {
    // const now = Date.now();
    // while (Date.now() - now < 3000) {
    // }

    // res.end('hello world');

    setTimeout(() => {
        res.end('hello world');
    }, 3000);
});

server.listen(3000);