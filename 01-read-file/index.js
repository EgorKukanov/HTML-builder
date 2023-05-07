const fs = require('fs');

const readStream = fs.createReadStream('./01-read-file/text.txt', 'utf8');
let data = '';

readStream.on('data', function (chunk) {
    data += chunk;
});

readStream.on('end', function () {
    console.log(data);
});