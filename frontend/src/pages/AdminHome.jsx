import React, { useState } from "react";
import AdminNavbar from "../Components/admin/AdminNavbar";
import AdminSidebar from "../Components/admin/AdminSidebar";
import AdminDashboard from "../Components/admin/AdminDashboard";
import AdminFilingManager from "../Components/admin/AdminFilingManager";

const AdminHome = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <>
      <AdminNavbar />

      <div className="d-flex min-vh-100">
        <AdminSidebar active={active} setActive={setActive} />

        {/* MIDDLE CONTENT */}
        <div className="flex-grow-1 bg-light p-4 content-wrapper">
          {active === "Dashboard" && <AdminDashboard />}

          {active === "Users" && (
            <div>
              <h4 className="mb-3">User Management</h4>
              <p className="text-muted">User management page coming soon</p>
            </div>
          )}

          {active === "Filings" && <AdminFilingManager />}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
