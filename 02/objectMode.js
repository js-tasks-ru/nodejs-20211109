import stream from 'stream';

const objects = [
    {
        id: 1,
        name: 'object1',
    },
    {
        id: 2,
        name: 'object2',
    },
    {
        id: 3,
        name: 'object3',
    },
    {
        id: 4,
        name: 'object4',
    },
];

class Logger extends stream.Transform {
    _transform(chunk, encoding, callback) {
        console.log(chunk);
    }
}

function createLoggerStream() {
    return new Logger();
}

stream.Readable.from(objects)
    .pipe(createLoggerStream());