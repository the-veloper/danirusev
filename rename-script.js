const fs = require('fs');
const oldPath = 'C:/Users/badja/Documents/Projects Developement/Websites/danirusev/app/(frontend)/experiences/page.tsx';
const newPath = 'C:/Users/badja/Documents/Projects Developement/Websites/danirusev/app/(frontend)/experiences/client-page.tsx';

try {
  fs.renameSync(oldPath, newPath);
  console.log('File renamed successfully!');
} catch (err) {
  console.error('Error renaming file:', err);
}