
const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');


copyDir = (srcDir, destDir) => {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir);
    }

    const files = fs.readdirSync(srcDir);

    files.forEach((file) => {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);

        if (fs.statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

copyDir(srcDir, destDir);

console.log('Файлы успешно скопированы!');