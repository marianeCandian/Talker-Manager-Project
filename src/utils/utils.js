const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const readFileTalker = async () => {
  const talkerPath = path.resolve(__dirname, '..', 'talker.json');
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

const insert = async (email, password) => {
  const talkerPath = path.resolve(__dirname, '..', 'talker.json');
  try {
    await fs.writeFile(talkerPath, JSON.stringify(email, password));
  } catch (error) {
    return null;
  }
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

module.exports = { findAll, findById, insert, generateToken };