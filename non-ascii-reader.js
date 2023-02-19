const fs = require('fs');
const path = require('path');

const filename = process.argv[2];

if (!filename) {
  console.error('Usage: node count-non-ascii.js <filename>');
  process.exit(1);
}

const fileContent = fs.readFileSync(path.resolve(filename), 'utf-8');
const nonAsciiChars = [...fileContent].filter(char => char.charCodeAt(0) > 127);
const nonAsciiCount = nonAsciiChars.length;

console.log(`The file "${filename}" contains ${nonAsciiCount} non-ASCII characters.`);
