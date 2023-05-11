const fs = require('fs').promises;
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');

async function mergeStyles() {
    try {
        await fs.access(distDir);
    } catch (err) {
        await fs.mkdir(distDir);
    }

    const cssFiles = await fs.readdir(stylesDir);
    const cssContent = await Promise.all(cssFiles.filter((file) => path.extname(file) === '.css').map(async (file) => {
        const filePath = path.join(stylesDir, file);
        return await fs.readFile(filePath, 'utf8');
    }));
    const bundlePath = path.join(distDir, 'bundle.css');
    await fs.writeFile(bundlePath, cssContent.join(''));
}

mergeStyles().then(() => {
    console.log('Styles merged successfully!');
}).catch((err) => {
    console.error(err);
});