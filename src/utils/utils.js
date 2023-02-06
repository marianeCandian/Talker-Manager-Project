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

const insert = async (content) => {
  try {
    return await fs.writeFile(talkerPath, JSON.stringify(content));
  } catch (error) {
    console.error('Error ao salvar arquivo', error.message);
    return null;
  }
};

const editTalker = async (post, id) => {
  try {
    const talkers = await readFileTalker();
    let changeTalker;

    for (let i = 0; i < talkers.length; i += 1) {
      if (talkers[i].id === Number(id)) {
        talkers[i].name = post.name;
        talkers[i].age = post.age;
        talkers[i].talk.watchedAt = post.talk.watchedAt;
        talkers[i].talk.rate = post.talk.rate;
        changeTalker = talkers[i];
      }
    }
    await fs.writeFile(talkerPath, JSON.stringify(talkers));
    return changeTalker;
  } catch (error) {
    return null;
  }
};

const deleteTalker = async (id) => {
  const talkers = await readFileTalker();
  const deleted = talkers.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(talkerPath, JSON.stringify(deleted));
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

module.exports = { findAll,
  findById,
  insert,
  generateToken,
  readFileTalker,
  editTalker,
  deleteTalker };