const path = require('path');
const fs = require('fs');
const { stdin, exit } = process;
const filePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath);

console.log('Введите текст:');
stdin.on('data', data => {
    if (data.toString().slice(0, 4) === 'exit') {
        exit();
    }
    output.write(data);
    console.log('Текст записан в файл text.txt')
    console.log('Введите текст:');
});

process.on('SIGINT', () => exit());
process.on('exit', () => console.log('Завершение программы'));