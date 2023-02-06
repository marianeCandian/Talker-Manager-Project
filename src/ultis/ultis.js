const fs = require('fs/promises');
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const findAll = async () => {
 const content = await fs.readFile(talkerPath, 'utf-8');
 const talkers = JSON.parse(content);
 return talkers;
};

module.exports = { findAll };