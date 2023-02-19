const fs = require('fs');
const path = require('path');

function findFilesWithNonAsciiChars(dir) {
  const files = fs.readdirSync(dir);
  let result = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      result = result.concat(findFilesWithNonAsciiChars(filePath));
    } else {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const nonAsciiChars = [...fileContent].filter(char => char.charCodeAt(0) > 127);

      if (nonAsciiChars.length > 0) {
        result.push(filePath);
      }
    }
  }

  return result;
}

const dirPath = process.argv[2];

if (!dirPath) {
  console.error('Usage: node count-non-ascii.js <directory>');
  process.exit(1);
}

const filesWithNonAsciiChars = findFilesWithNonAsciiChars(path.resolve(dirPath));

if (filesWithNonAsciiChars.length > 0) {
  console.log('The following files contain non-ASCII characters:');
  console.log(filesWithNonAsciiChars.join('\n'));
} else {
  console.log('No files with non-ASCII characters were found in the directory.');
}
