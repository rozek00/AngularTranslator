require('dotenv').config();
const { User } = require('./router/database/user')
const { createUserEntity } = require('./router/db')
const { addUser, getUsers, loginUser } = require('./controller/userController');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body;

  try {
    const response = await axios.post(
      'https://api-free.deepl.com/v2/translate',
      new URLSearchParams({
        auth_key: process.env.DEEPL_KEY,
        text: text,
        target_lang: targetLang
      })
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/users', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/register', async (req, res) => {
    try {
        const user = await addUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token  = await loginUser(email, password);
        res.status(200).json({ message: 'Zalogowano pomyślnie!', token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log(`Serwer działa na porcie 3000`);

    createUserEntity();
});