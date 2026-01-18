import React from "react";
import AdminStats from "./AdminStats";

const AdminDashboard = () => {
  return (
    <div>
      <h4 className="mb-3">System Overview</h4>

      {/* KPI Cards */}
      <AdminStats />

      {/* Placeholder Panels */}
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6>Recent User Registrations</h6>
              <p className="text-muted small">
                This section will show latest users.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6>Pending Filing Approvals</h6>
              <p className="text-muted small">
                This section will show filings awaiting admin action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
