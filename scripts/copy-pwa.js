const fs = require('fs');
const path = require('path');

// Platforms
const isWindows = process.platform === 'win32';
const copyCommand = isWindows ? 'copy' : 'cp';

// Source and destination directories
const pwaDir = path.resolve(__dirname, '../pwa');
const srcDir = path.resolve(__dirname, '../src');
const publicDir = path.resolve(__dirname, '../public');

// Function to copy files
function copyFiles(sourceDir, destDir) {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory does not exist: ${sourceDir}`);
    return;
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${sourcePath} to ${destPath}`);
    }
  });
}

// Copy files from pwa to src and public
copyFiles(pwaDir, srcDir);
copyFiles(pwaDir, publicDir);

console.log('PWA files copied successfully');
