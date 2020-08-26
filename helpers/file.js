const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname + '/../data/');
const fileExt = '.json';

module.exports = {
    writeToFile,
    readFile,
    deleteFile,
};


function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        const filePath = dataDir + fileName + fileExt;
        fs.writeFile(filePath, JSON.stringify(data), 'utf8', (err) => {
            if (err) {
                reject(err)
            }
            resolve(data);
        });
    });
}

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        const filePath = dataDir + fileName + fileExt;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
}

function deleteFile(fileName) {
    return new Promise((resolve, reject) => {
        const filePath = dataDir + fileName + fileExt;
        fs.unlink(filePath, (err) => {
            reject(err);
        });
        resolve('success');
    });
}