const fs = require('fs');

const stream = fs.createReadStream('hello.txt', {
  highWaterMark: 9,
  // encoding: 'utf-8',
});

// stream.setEncoding('utf-8');

// let str = '';
const body = [];
stream.on('data', (chunk) => {
  console.log(chunk);
  // str += chunk;
  body.push(chunk);
});

stream.on('end', () => {
  // console.log(str);
  console.log(Buffer.concat(body).toString('utf-8'));
});
