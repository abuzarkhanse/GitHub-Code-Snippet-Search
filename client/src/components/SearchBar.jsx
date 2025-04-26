import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSearch(query, language).finally(() => {
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search GitHub snippets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input"
      />
      <select value={language} onChange={(e) => setLanguage(e.target.value)} className="dropdown">
        <option value="">All Languages</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="c++">C++</option>
        <option value="php">PHP</option>
        <option value="typescript">TypeScript</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="java">Java</option>
        <option value="react">React</option>
      </select>
      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>
      {loading && <div className="loader"></div>}
    </form>
  );
};

export default SearchBar;
