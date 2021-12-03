/**
 * 
 * 1. launch server
 * 2. make request
 * 3. wait for reponse
 * 4. check response
 * 5. terminate server
 * 
 */

const server = require('../server');
const axios = require('axios');
const assert = require('assert');
const zlib = require('zlib');
const http = require('http');

describe('server', () => {
    before((done) => {
        server.listen(3000, done);
    });

    after((done) => {
        server.close(done);
    });

    it('get request', async () => {
        const response = await axios.get('http://localhost:3000');
        assert.strictEqual(response.data, 'hello world');
    });

    it('post request', async () => {
        const response = await axios.post('http://localhost:3000/upload', {
            message: 'hello world',
        });

        assert.deepEqual(response.data, {
            message: 'hello world',
        });
    });

    it('get gziped request', (done) => {
        const req = http.request('http://localhost:3000', {
            headers: {
                'accept-encoding': 'gzip',
            }
        }, (res) => {
            const body = [];

            res.on('data', chunk => body.push(chunk));

            res.on('end', () => {
                const buf = Buffer.concat(body);

                assert.strictEqual(
                    Buffer.compare(buf, zlib.gzipSync('hello world')), 
                    0
                );

                done();
            });
        });

        req.end();
    });

    it('post gziped request', (done) => {
        const req = http.request('http://localhost:3000/upload', {
            headers: {
                'accept-encoding': 'gzip',
            },
            method: 'post'
        }, (res) => {
            const body = [];

            res.on('data', chunk => body.push(chunk));

            res.on('end', () => {
                const buf = Buffer.concat(body);

                assert.strictEqual(
                    Buffer.compare(buf, zlib.gzipSync('hello post request')), 
                    0
                );

                done();
            });
        });

        req.end('hello post request');
    });
});
