import React from "react";

const AdminNavbar = () => {
  return (
    <div className="navbar-top">
      <div className="d-flex align-items-center navbar-container">

        {/* LEFT */}
        <div className="navbar-left d-flex align-items-center gap-2">
          <h3 className="m-0 fw-bold">Admin Panel</h3>
        </div>

        {/* RIGHT */}
        <div className="navbar-right d-flex align-items-center gap-3">
          <span className="badge bg-danger px-3 py-2">ADMIN</span>

          <button className="btn btn-outline-primary btn-sm">
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminNavbar;
