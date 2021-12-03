const fs = require('fs');

console.log('start');

new Promise((resolve, reject) => {
  console.log('new Promise');
  resolve();
})
.then(_ => console.log('then-1'))
.then(_ => console.log('then-2'));

fs.open(__filename, _ => {
  console.log('fs.open');
  queueMicrotask(_ => {
    console.log('queueMicrotask-1');
  });
});

process.nextTick(_ => {
  console.log('nextTick-1');
  process.nextTick(_ => console.log('nextTick-2'));
});

console.log('end');
