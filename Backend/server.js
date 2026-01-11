require('dotenv').config();
const { User } = require('./router/database/user')
const { createUserEntity } = require('./router/db')
const { addUser, getUsers, loginUser } = require('./controller/userController');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Połączono z MongoDB'))
  .catch(err => console.error('Błąd MongoDB:', err));

const translationHistorySchema = new mongoose.Schema({
  userId: { type: Number},
  originalText: { type: String, required: true },
  translatedText: { type: String, required: true },
  targetLang: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const TranslationHistory = mongoose.model('TranslationHistory', translationHistorySchema);

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
    res.status(400).json({ error: err.message });
  }
});

app.get('/history/:userId', async (req, res) => {
  try {
    const sortParam = req.query.sort;
    const sortOrder = sortParam === '0' ? 1 : -1; 

    const history = await TranslationHistory.find({ userId: req.params.userId })
      .sort({ createdAt: sortOrder  })
      .limit(100);
    res.json(history);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/history', async (req, res) => {
  const { userId, originalText, translatedText, targetLang } = req.body;
  try {
    const entry = new TranslationHistory({
        userId,
        originalText,
        translatedText,
        targetLang
    });
    await entry.save();

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/history/:id', async (req, res) => {
  try {
    await TranslationHistory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usunięto' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/history/user/:userId', async (req, res) => {
  try {
    await TranslationHistory.deleteMany({ userId: req.params.userId });
    res.json({ message: 'Wyczyszczono' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/history/:id', async (req, res) => {
  const { originalText, translatedText, targetLang } = req.body;
  try {
    const updated = await TranslationHistory.findByIdAndUpdate(
      req.params.id,
      { originalText, translatedText, targetLang },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        await addUser(email, password);
        res.status(201).json({ message: "zarejestrowano" });
    } catch (err) {
        if (err.statusCode == 409) {
            return res.status(409).json({
                message: 'Użytkownik z takim emailem już istnieje'
            });
        }
        res.status(400).json({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token  = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log(`Serwer działa na porcie 3000`);

    createUserEntity();
});
