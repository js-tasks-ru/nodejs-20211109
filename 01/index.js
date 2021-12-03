const http = require('http'); // os, fs, stream, ...
const handler = require('handler');

// ES Modules
// require -> import
// module.exports -> export

const server = new http.Server();

server.on('request', handler);

server.listen(3000);

/**
 * require('something');
 * 
 * 1. core module
 * 2. ./node_modules
 *    ../node_modules
 *    ../../node_modules
 *    /node_modules
 * 
 * lodash, mongoose
 * require('lodash')
 * npm install lodash -> ./node_modules
 * 
 * 3. NODE_PATH=/projects/myproject/... node index.js
 * 
 */