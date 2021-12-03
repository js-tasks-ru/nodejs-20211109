import zlib from 'zlib';
import fs from 'fs';
import stream from 'stream';

// fs.createReadStream('ipsum.txt')
//     .on('error', err => {})
//     .pipe(zlib.createGzip())
//     .on('error', err => {})
//     .pipe(fs.createWriteStream('ipsum.txt.gz'))
//     .on('error', err => {});


stream.pipeline(
    fs.createReadStream('ipsum.txt'),
    zlib.createGzip(),
    fs.createWriteStream('ipsum.txt.gz'),
    (err) => {
        console.log('done', err);
    }
);
