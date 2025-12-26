import React, { useEffect, useState } from "react";

const IPSidePanel = ({ country }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) return;

    const fetchData = async () => {
      try {
        console.log("SidePanel fetching for:", country);
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:8080/api/map/assets?country=${encodeURIComponent(country)}`
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load data");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [country]);

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h5>{country ? `Patents (${country})` : "Select a country"}</h5>

        <div style={{ maxHeight: "260px", overflowY: "auto" }}>
          {loading && <p className="text-muted">Loading...</p>}

          {!loading && error && (
            <p className="text-danger">{error}</p>
          )}

          {!loading && !error && data.length === 0 && (
            <p className="text-muted">No data found</p>
          )}

          {data.map((ip) => (
            <div key={ip.id} className="border rounded p-2 mb-2 small">
              <strong>{ip.title}</strong>
              <div>Type: {ip.type}</div>
              <div>Owner: {ip.owner}</div>
              <div>Status: {ip.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IPSidePanel;
