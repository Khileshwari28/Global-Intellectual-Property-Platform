import React, { useState } from 'react';
import IPSearch from './IPSearch';
import IPDetailModal from "./IPDetailModal";

const MOCK_DATA = [
  {
    id: 1,
    title: 'Global Patent Filing - US Patent 10,987,654',
    type: 'Patent',
    status: 'Granted',
    date: '2023-05-15',
    owner: 'Tech Corp Ltd',
    country: 'United States',
    description: 'Patent for advanced AI-based image recognition system'
  },
  {
    id: 2,
    title: 'Trademark - "InnovatePro" Design Mark',
    type: 'Trademark',
    status: 'Registered',
    date: '2023-04-20',
    owner: 'Brand Solutions Inc',
    country: 'India',
    description: 'Trademark registration for brand name and logo'
  }
];

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [selectedIP, setSelectedIP] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (filters) => {
    if (!filters) {
      setResults([]);
      return;
    }

    // 🔁 Replace this block with API later
    const filtered = MOCK_DATA.filter(item => {
      return (
        item.type === filters.type &&
        item.title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
        (filters.country ? item.country === filters.country : true)
      );
    });

    setResults(filtered);
  };

  return (
    <div>
      <h1 className="h2 mb-2">Search IP</h1>
      <p className="text-muted mb-4">
        Search patents and trademarks using advanced filters
      </p>

      <IPSearch onSearch={handleSearch} />

      {results.length > 0 ? (
        results.map(item => (
          <div key={item.id} className="card border-0 shadow-sm mb-3">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h5>{item.title}</h5>
                <small className="text-muted">
                  {item.owner} • {item.country}
                </small>
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSelectedIP(item);
                  setShowModal(true);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info text-center">
          Perform a search to see results
        </div>
      )}

      <IPDetailModal
        show={showModal}
        data={selectedIP}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default SearchResult;
