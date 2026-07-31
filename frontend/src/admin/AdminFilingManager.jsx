import React, { useEffect, useState } from "react";
import { getAdminFilings, updateFilingStatus } from "../api/userFilingApi";

const AdminFilingManager = () => {

  const [filings, setFilings] = useState([]);

  useEffect(() => {
    getAdminFilings()
      .then(res => setFilings(res.data))
      .catch(err => console.error(err));
  }, []);

  const updateStatus = (id, status) => {
    updateFilingStatus(id, status)
      .then(() => {
        setFilings(prev =>
          prev.map(f =>
            f.id === id ? { ...f, status } : f
          )
        );
      })
      .catch(err => console.error(err));
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "PENDING": return "bg-warning text-dark";
      case "APPROVED": return "bg-success";
      case "GRANTED": return "bg-info";
      case "REJECTED": return "bg-danger";
      case "REVOKED": return "bg-dark";
      case "COMPLETED": return "bg-primary";
      default: return "bg-secondary";
    }
  };

  return (
    <div>

      <div className="mb-4">
        <h1 className="h2 mb-2">Admin Filing Management</h1>
        <p className="text-muted">
          Review, approve, grant or reject all user filings
        </p>
      </div>

      <div className="space-y-4">
        {filings.map((filing) => (
          <div key={filing.id} className="card border-0 shadow-sm">
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5>{filing.keyword}</h5>
                  <p className="text-muted small mb-1">
                    {filing.description}
                  </p>
                  <span className="badge bg-primary me-2">
                    {filing.assetType}
                  </span>
                  <span className="badge bg-secondary">
                    {filing.frequency}
                  </span>
                </div>

                <span className={`badge ${getBadgeClass(filing.status)} px-3 py-2`}
                  style={{ fontSize: "12px", height: "fit-content" }}>
                  {filing.status}
                </span>
              </div>

              <div className="row small text-muted mb-3">
                <div className="col-md-3">
                  <strong>User:</strong> {filing.userName}
                </div>
                <div className="col-md-3">
                  <strong>User ID:</strong> {filing.userId}
                </div>
                <div className="col-md-3">
                  <strong>Jurisdiction:</strong> {filing.jurisdiction}
                </div>
                <div className="col-md-3">
                  <strong>Created At:</strong> {filing.createdAt}
                </div>
              </div>


              {/* ADMIN ACTION BUTTONS */}
              <div className="d-flex flex-wrap gap-2">

                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => updateStatus(filing.id, "APPROVED")}
                >
                  Approve
                </button>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => updateStatus(filing.id, "REJECTED")}
                >
                  Reject
                </button>

                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => updateStatus(filing.id, "GRANTED")}
                >
                  Grant
                </button>

                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => updateStatus(filing.id, "REVOKED")}
                >
                  Revoke
                </button>

                <button
                  className="btn btn-outline-info btn-sm"
                  onClick={() => updateStatus(filing.id, "COMPLETED")}
                >
                  Mark Completed
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminFilingManager;
