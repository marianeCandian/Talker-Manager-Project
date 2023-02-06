const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const talkerPath = path.resolve(__dirname, '..', 'talker.json');
const readFileTalker = async () => {
  try {
    const content = await fs.readFile(talkerPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

const findAll = async () => {
  const talkers = await readFileTalker();
  return talkers;
};

const findById = async (id) => {
    const content = await readFileTalker();
    return content.find((talker) => talker.id === Number(id));
};

// const lastId = async () => {
//   const talkers = await readFileTalker();
//   return talkers[3].id;
// };

const insert = async (content) => {
  try {
    return await fs.writeFile(talkerPath, JSON.stringify(content));
  } catch (error) {
    console.error('Error ao salvar arquivo', error.message);
    return null;
  }
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

module.exports = { findAll, findById, insert, generateToken, readFileTalker };