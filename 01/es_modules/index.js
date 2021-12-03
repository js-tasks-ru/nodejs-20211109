import http from 'http';
import handler from './handler.js?rnd=0.asd.asd.asd';

const server = new http.Server();

server.on('request', handler);

server.listen(3000);
