#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
console.log('Copying file...')
// Define source and destination paths
const src = path.resolve(__dirname, '..', 'editor', 'blocks', 'scratch_msgs.js');
const destDir = path.resolve(__dirname, '..', '..', 'scratch-blocks', 'msg');
const dest = path.join(destDir, 'scratch_msgs.js');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`Created directory: ${destDir}`);
}

// Copy the file
try {
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} → ${dest}`);
} catch (err) {
  console.error(`Failed to copy file: ${err.message}`);
  process.exit(1);
}