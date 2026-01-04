const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Error reading components directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.js')) {
      const filePath = path.join(componentsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (!content.includes('export default')) {
        console.log(`❌ ${file} is missing default export`);
      } else {
        console.log(`✅ ${file} has default export`);
      }
    }
  });
});