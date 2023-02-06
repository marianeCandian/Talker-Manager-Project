const express = require('express');
const { findAll, findById } = require('./utils/utils');

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
  res.status(HTTP_OK_STATUS).json({ talkers });
});

app.listen(PORT, () => {
  console.log('Online');
});
