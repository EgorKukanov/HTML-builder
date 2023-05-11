const fs = require('fs').promises;
const path = require('path');
const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

async function copyDir(srcDir, destDir) {
    try {
        await fs.mkdir(destDir);
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }

    const files = await fs.readdir(srcDir);

    for (const file of files) {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);

        if ((await fs.stat(srcPath)).isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

copyDir(srcDir, destDir)
    .then(() => console.log('Файлы успешно скопированы!'))
    .catch((err) => console.error(err));