require('dotenv').config();
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

app.listen(3000, () => console.log('API działa na http://localhost:3000'));
