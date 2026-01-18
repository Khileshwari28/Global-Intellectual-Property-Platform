import React from "react";

const stats = [
  { label: "Total Users", value: 124 },
  { label: "Total Filings", value: 542 },
  { label: "Pending Approvals", value: 18 },
  { label: "Paid Plans", value: 64 },
];

const AdminStats = () => {
  return (
    <div className="row g-3 mb-4">
      {stats.map((item, index) => (
        <div key={index} className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <p className="text-muted small mb-1">{item.label}</p>
              <h3 className="fw-bold">{item.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
