require('dotenv').config();
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
  userId: { type: String, default: 'guest' },
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
    res.status(500).json({ error: err.message });
  }
});

app.get('/history/:userId', async (req, res) => {
  try {
    const history = await TranslationHistory.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/history', async (req, res) => {
  const { userId, originalText, translatedText, targetLang } = req.body;
  try {
    const entry = new TranslationHistory({ userId, originalText, translatedText, targetLang });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/history/:id', async (req, res) => {
  try {
    await TranslationHistory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usunięto' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/history/user/:userId', async (req, res) => {
  try {
    await TranslationHistory.deleteMany({ userId: req.params.userId });
    res.json({ message: 'Wyczyszczono' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('API działa na http://localhost:3000'));
