import React, { useState } from "react";
import IPSearch from "./IPSearch";
import IPDetailModal from "./IPDetailModal";

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [selectedIPId, setSelectedIPId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);


  // 🔍 SEARCH API
  const handleSearch = async (filters) => {
    console.log("Search triggered with filters:", filters);

    if (!filters) {
      setResults([]);
      return;
    }

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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();


      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
      } else {
        setNoData(true);
      }
    } catch (error) {
      console.error("Search API error:", error);
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };

  // 📄 DETAILS API
  const handleViewDetails = (id) => {
  setSelectedIPId(id);
  setShowModal(true);
};


  return (
    <div>
      <h1 className="h2 mb-2">Search IP</h1>
      <p className="text-muted mb-4">
        Search patents and trademarks using advanced filters
      </p>

      <IPSearch onSearch={handleSearch} />

      {/* 🔄 Loading */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Searching patents & trademarks...</p>
        </div>
      )}

      {/* 📋 Results */}
      {!loading && results.length > 0 ? (
        results.map((item) => (
          <div key={item.id} className="card border-0 shadow-sm mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{item.title}</h5>
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
        !loading &&
        noData && (
          <div className="alert alert-warning text-center">
            Data does not exist.
          </div>
        )
      )}

      {/* 📦 Modal */}
      {showModal && (
  <IPDetailModal
    ipId={selectedIPId}
    onClose={() => setShowModal(false)}
  />
)}

    </div>


  );
};

export default SearchResult;
