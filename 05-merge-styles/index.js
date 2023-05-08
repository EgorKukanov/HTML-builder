const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

const cssFiles = fs.readdirSync(stylesDir).filter((file) => path.extname(file) === '.css');

let cssContent = '';

cssFiles.forEach((file) => {
    const filePath = path.join(stylesDir, file);
    cssContent += fs.readFileSync(filePath, 'utf8');
});

const bundlePath = path.join(distDir, 'bundle.css');
fs.writeFileSync(bundlePath, cssContent);

console.log('Styles merged successfully!');