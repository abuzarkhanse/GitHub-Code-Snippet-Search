import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios';

function App() {
  const [snippets, setSnippets] = useState([]);

  const handleSearch = async (query, language) => {
    try {
      const res = await axios.get('http://localhost:5000/api/search', {
        params: { query, language },
      });
      setSnippets(res.data);
    } catch (error) {
      console.error('Error fetching snippets:', error);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Code Snippet Search</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="results">
        {snippets.map((item, index) => (
          <div key={index} className="card">
            <h3>{item.name}</h3>
            <p><strong>Repo:</strong> {item.repository.full_name}</p>
            <a href={item.html_url} target="_blank" rel="noreferrer">View Snippet</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
