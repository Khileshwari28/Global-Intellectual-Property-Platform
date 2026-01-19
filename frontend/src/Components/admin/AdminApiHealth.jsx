import React, { useEffect, useState } from "react";
import axios from "axios";

const getStatusBadge = (status) => {
  switch (status) {
    case "HEALTHY":
      return "bg-success";
    case "DEGRADED":
      return "bg-warning text-dark";
    case "DOWN":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};

const AdminApiHealth = () => {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchHealth = () => {
    setLoading(true);

    axios
      .get("/data/adminApiHealth.json")
      .then((res) => {
        setHealthData(res.data.services || []);
        setLastUpdated(res.data.lastUpdated || "Just now");
      })
      .catch((err) => {
        console.error("API Health fetch error:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="card admin-card">
      <div className="card-body">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-0">🩺 System API Health</h5>
            <small className="text-muted">
              Last updated: {lastUpdated}
            </small>
          </div>

          <button
            className="btn btn-outline-primary btn-sm"
            onClick={fetchHealth}
            disabled={loading}
          >
            {loading ? "Checking..." : "Refresh"}
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-sm align-middle mb-0">
            <thead>
              <tr className="text-muted small">
                <th>Service</th>
                <th>Status</th>
                <th>Response Time</th>
                <th>Last Checked</th>
              </tr>
            </thead>
            <tbody>
              {healthData.map((api, index) => (
                <tr key={index}>
                  <td className="fw-semibold">{api.name}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(api.status)}`}>
                      {api.status}
                    </span>
                  </td>
                  <td>{api.responseTime}</td>
                  <td className="text-muted small">{api.lastChecked}</td>
                </tr>
              ))}

              {healthData.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">
                    No API health data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminApiHealth;
