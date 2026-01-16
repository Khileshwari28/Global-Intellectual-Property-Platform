import React, { useState } from "react";
import IPSearch from "../Components/IPSearch";
import IPDetailModal from "../Components/ui/IPDetailModal";

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [selectedIPId, setSelectedIPId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  // ✅ keep track of tracked IPs (UI state)
  const [trackedIds, setTrackedIds] = useState(new Set());

  // 🔍 SEARCH API
  const handleSearch = async (filters) => {
    const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.id) {
    console.error("User not logged in");
    return;
  }

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        ...filters,
        userId: user.id   // ✅ THIS WAS MISSING
      })
      });

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
      } else {
        setNoData(true);
      }
    } catch (error) {
      console.error(error);
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };

  // 📄 DETAILS
  const handleViewDetails = (id) => {
    setSelectedIPId(id);
    setShowModal(true);
  };

  // 📌 TRACK
  const handleTrack = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/ip/track/${id}`, {
        method: "POST"
      });

      // ✅ mark as tracked in UI
      setTrackedIds(prev => new Set(prev).add(id));
    } catch (error) {
      console.error("Track failed", error);
    }
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
        </div>
      )}

      {/* 📋 Results */}
      {!loading && results.length > 0 ? (
        results.map((item) => {
          const isTracked = trackedIds.has(item.id);

          return (
            <div key={item.id} className="card border-0 shadow-sm mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{item.title}</h5>
                  <small className="text-muted">
                    {item.owner} • {item.country}
                  </small>
                </div>

                {/* ✅ BUTTON GROUP WITH SPACING */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewDetails(item.id)}
                  >
                    View Details
                  </button>

                  <button
                    className={`btn btn-sm ${
                      isTracked ? "btn-primary" : "btn-outline-success"
                    }`}
                    disabled={isTracked}
                    onClick={() => handleTrack(item.id)}
                  >
                    {isTracked ? "Tracked" : "Track"}
                  </button>
                </div>
              </div>
            </div>
          );
        })
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
