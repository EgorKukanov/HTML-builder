const fs = require('fs');
const path = require('path');
const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const distDir = path.join(__dirname, 'project-dist');

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

const templatePath = path.join(__dirname, 'template.html');
const templateContent = fs.readFileSync(templatePath, 'utf8');

let indexContent = templateContent;
const componentFiles = fs.readdirSync(componentsDir).filter((file) => path.extname(file) === '.html');

componentFiles.forEach((file) => {
    const componentName = path.basename(file, '.html');
    const componentPath = path.join(componentsDir, file);
    const componentContent = fs.readFileSync(componentPath, 'utf8');

    indexContent = indexContent.replace(new RegExp(`{{${componentName}}}`, 'g'), componentContent);
});


const indexPath = path.join(distDir, 'index.html');
fs.writeFileSync(indexPath, indexContent);

console.log('Файл index.html успешно создан!');


let cssContent = '';

fs.readdirSync(stylesDir).forEach((file) => {
    const filePath = path.join(stylesDir, file);

    if (path.extname(file) === '.css') {
        cssContent += fs.readFileSync(filePath, 'utf8');
    }
});

const cssPath = path.join(distDir, 'style.css');
fs.writeFileSync(cssPath, cssContent);

console.log('Styles успешно объеденены!');


const assetsDestDir = path.join(distDir, 'assets');

if (!fs.existsSync(assetsDestDir)) {
    fs.mkdirSync(assetsDestDir);
}

fs.readdirSync(assetsDir).forEach((file) => {
    const filePath = path.join(assetsDir, file);
    const destPath = path.join(assetsDestDir, file);

    if (fs.statSync(filePath).isDirectory()) {
        copyDir(filePath, destPath);
    } else if (path.extname(file) !== '.html') {
        fs.copyFileSync(filePath, destPath);
    }
});

console.log('Assets успешно скопированы!');

function copyDir(srcDir, destDir) {
    fs.mkdirSync(destDir);

    fs.readdirSync(srcDir).forEach((file) => {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);

        if (fs.statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else if (path.extname(file) !== '.html') {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}