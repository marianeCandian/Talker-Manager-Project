const express = require('express');
const { 
  validateLogin,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate } = require('./utils/middleware');
const { findAll, findById, generateToken, insert, readFileTalker } = require('./utils/utils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = await findById(id);
  if (!result) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(result);
});

app.get('/talker', async (_req, res) => {
  const talkers = await findAll();
  res.status(HTTP_OK_STATUS).json(talkers);
});

app.post('/login', validateLogin, async (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate, async (req, res) => {
    const content = req.body;
    const db = await readFileTalker();
    const newTalker = {
      ...content,
      id: db.length + 1,
    };
    db.push(newTalker);
    await insert(db);
    res.status(201).json(newTalker);
  });

app.listen(PORT, () => {
  console.log('Online');
});
