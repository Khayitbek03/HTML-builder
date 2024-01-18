const path = require('path');
const fs = require('fs');

const fileName = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(fileName, 'utf8');

let res = '';
readStream.on('data', (chunk) => {
  res += chunk;
});
readStream.on('end', () => {
  console.log(res);
});
