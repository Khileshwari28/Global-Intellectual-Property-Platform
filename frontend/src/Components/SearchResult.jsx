import React, { useState } from 'react';
import IPSearch from './IPSearch';
import IPDetailModal from "./IPDetailModal";

/*
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
*/

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [selectedIP, setSelectedIP] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ ADDED: loading state for search spinner
  const [loading, setLoading] = useState(false);

  // ✅ ADDED: state to show "Data does not exist"
  const [noData, setNoData] = useState(false);

  // ✅ UPDATED: API-based search
  const handleSearch = async (filters) => {
    console.log("Search triggered with filters:", filters);

    if (!filters) {
      setResults([]);
      return;
    }

    // ✅ ADDED: reset UI state on every search
    setLoading(true);
    setNoData(false);
    setResults([]);

    try {
      const response = await fetch("http://localhost:8080/api/ip/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(filters)
      });

      const data = await response.json();

      // ✅ ADDED: handle empty response
      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
      } else {
        setNoData(true);
      }

    } catch (error) {
      console.error("Search API error:", error);
      setNoData(true);
    } finally {
      // ✅ ADDED: stop spinner after API completes
      setLoading(false);
    }

    /*
    // OLD MOCK FILTER LOGIC (kept for reference)
    const filtered = MOCK_DATA.filter(item => {
      return (
        item.type === filters.type &&
        item.title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
        (filters.country ? item.country === filters.country : true)
      );
    });
    setResults(filtered);
    */
  };

  // ✅ NEW: fetch details from backend
  const handleViewDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/ip/${id}`);
      const data = await response.json();
      setSelectedIP(data);
      setShowModal(true);
    } catch (error) {
      console.error("Details API error:", error);
    }
  };

  return (
    <div>
      <h1 className="h2 mb-2">Search IP</h1>
      <p className="text-muted mb-4">
        Search patents and trademarks using advanced filters
      </p>

      <IPSearch onSearch={handleSearch} />

      {/* ✅ ADDED: Loading spinner while searching */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Searching patents & trademarks...</p>
        </div>
      )}

      {/* Existing results rendering (unchanged) */}
      {!loading && results.length > 0 ? (
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
                onClick={() => handleViewDetails(item.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        // ✅ UPDATED: show message only when not loading
        !loading && noData && (
          <div className="alert alert-warning text-center">
            Data does not exist.
          </div>
        )
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
