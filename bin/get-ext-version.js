const fs = require('fs');
const path = require('path');

const jsonFilePath = path.resolve(__dirname, '../src/manifest.json');
const jsonObject = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
const { version } = jsonObject;

console.log(version);
