const fs = require('fs');
const path = require('path');

const parentDir = path.join(__dirname, '..');
const filePath = path.join(parentDir, './.env');
const content = 'swMainJsFileLocation=./src/src-sw.js\nNODE_ENV=production';

fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    // File does not exist, create it and write content
    fs.writeFile(filePath, content, (writeErr) => {
      if (writeErr) {
        console.error('Error creating and writing to .env file:', writeErr);
      } else {
        console.log('.env file created and content written successfully.');
      }
    });
  } else {
    // File exists, append content
    fs.appendFile(filePath, `\n${content}`, (appendErr) => {
      if (appendErr) {
        console.error('Error appending to .env file:', appendErr);
      } else {
        console.log('Content appended to .env file successfully.');
      }
    });
  }
});
