import stream from 'stream';
import fs from 'fs';

class ReplaceStream extends stream.Transform {
    constructor(from, to) {
        super();

        this.from = from;
        this.to = to;

        this.regexp = new RegExp(from, 'g');
    }

    _transform(chunk, encoding, callback) {
        let str = chunk.toString('utf-8');
        
        if (this.from === 'banana') {
            return callback(new Error('no banana please'));
        }

        str = str.replace(this.regexp, this.to);

        callback(null, str);
        // callback(new Error('something went wrong'));
    }
}

export default ReplaceStream;

// stream.pipeline(
//     fs.createReadStream('fruits.txt'),
//     new ReplaceStream('apple', 'peach'),
//     fs.createWriteStream('frites.txt.out'),
//     (err) => {
//         console.log('done', err);
//     }
// );
