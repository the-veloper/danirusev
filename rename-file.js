const fs = require('fs');
const path = require('path');

const oldPath = path.join(__dirname, 'app', '(frontend)', 'experiences', 'page.tsx');
const newPath = path.join(__dirname, 'app', '(frontend)', 'experiences', 'client-page.tsx');

try {
  fs.renameSync(oldPath, newPath);
  console.log('File renamed successfully!');
} catch (err) {
  console.error('Error renaming file:', err);
}