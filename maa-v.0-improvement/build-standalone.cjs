const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const distDir = path.join(__dirname, 'dist');
const htmlFile = path.join(distDir, 'index.html');
const outputFile = path.join(require('os').homedir(), 'Desktop', 'MAA_Website_Preview.html');

let html = fs.readFileSync(htmlFile, 'utf8');

// Regex to find all src="/..." or src='./...' for images
const imgRegex = /src=["'](\/?[^"']+\.(png|jpe?g|svg|gif|webp))["']/gi;

html = html.replace(imgRegex, (match, srcPath) => {
  // Ignore external URLs
  if (srcPath.startsWith('http')) return match;

  // Resolve local path
  // If it starts with '/', it's relative to dist/
  const relativePath = srcPath.startsWith('/') ? srcPath.substring(1) : srcPath;
  const filePath = path.join(distDir, relativePath);

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const mimeType = mime.lookup(ext) || 'image/png';
    const base64Data = fs.readFileSync(filePath, 'base64');
    const dataUri = `data:${mimeType};base64,${base64Data}`;
    return `src="${dataUri}"`;
  } else {
    console.warn(`Warning: Could not find ${filePath}`);
    return match; // Leave as is if file not found
  }
});

fs.writeFileSync(outputFile, html);
console.log(`\n✅ Standalone HTML file created successfully at:\n${outputFile}\n`);
console.log('You can now send this single file to anyone, and all images (including the logo) will load perfectly even offline!');
