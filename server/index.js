const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://mrabuzar459:***************************************/';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const SearchLog = require('./SearchLog');

const GITHUB_TOKEN = 'github_pat_**********************************************';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/search', async (req, res) => {
  const { query, language } = req.query;

  let searchQuery = `${query} in:file`;
  if (language) {
    searchQuery += ` language:${language}`;
  }

  try {
    await SearchLog.create({ query, language });
    
    const response = await axios.get('https://api.github.com/search/code', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      params: {
        q: searchQuery,
        sort: 'indexed',
        order: 'desc',
        per_page: 10,
      },
    });

    res.json(response.data.items);
  } catch (error) {
    console.error("GitHub API Error:", error.message);
    res.status(500).json({ error: 'GitHub API error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
