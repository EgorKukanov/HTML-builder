const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
        const fileSizeInBytes = stats.size;
        const fileSizeInKilobytes = fileSizeInBytes / 1024;
        const fileExtension = path.extname(file);
        const fileNameWithoutExtension = path.basename(file, fileExtension);

        console.log(`${fileNameWithoutExtension} - ${fileExtension} - ${fileSizeInKilobytes.toFixed(3)}kb`);
    }
});