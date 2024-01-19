const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const writableStream = fs.createWriteStream(filePath, 'utf-8');

process.stdout.write('Welcome!Type your input or (type "exit" to stop): \n');
process.stdin.on('data', (input) => {
  const userInput = input.toString().trim();
  if (userInput.toLowerCase() === 'exit') {
    process.stdout.write('Farewell!\n');
    writableStream.end();
    process.exit();
  } else {
    writableStream.write(userInput + '\n');
  }
});

process.on('SIGINT', () => {
  process.stdout.write('Exit usin ctrl+C \n');
  writableStream.end();
  process.exit();
});
