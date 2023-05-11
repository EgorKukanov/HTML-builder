const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function readFolder() {
    try {
        const files = await fs.readdir(folderPath);
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stats = await fs.stat(filePath);

            if (stats.isFile()) {
                const fileSizeInBytes = stats.size;
                const fileSizeInKilobytes = fileSizeInBytes / 1024;
                const fileExtension = path.extname(file);
                const fileNameWithoutExtension = path.basename(file, fileExtension);

                console.log(`${fileNameWithoutExtension} - ${fileExtension} - ${fileSizeInKilobytes.toFixed(3)}kb`);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

readFolder();