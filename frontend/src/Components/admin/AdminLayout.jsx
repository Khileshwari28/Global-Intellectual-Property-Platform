import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import AdminFilingManager from "./AdminFilingManager";

const AdminLayout = () => {
  const [active, setActive] = useState("Dashboard");

  const renderMiddleContent = () => {
    if (active === "Dashboard") return <AdminDashboard />;
    if (active === "Filings") return <AdminFilingManager />;
    if (active === "Users")
      return (
        <div>
          <h4 className="mb-3">User Management</h4>
          <p className="text-muted">User management page coming soon</p>
        </div>
      );
    return <AdminDashboard />;
  };

  return (
    <div className="d-flex">
      {/* LEFT SIDEBAR (unchanged) */}
      <AdminSidebar active={active} setActive={setActive} />

      {/* MIDDLE CONTENT (this is where pages switch) */}
      <div
        className="flex-grow-1 p-4"
        style={{ background: "#f5f7fa", minHeight: "100vh" }}
      >
        {renderMiddleContent()}
      </div>
    </div>
  );
};

export default AdminLayout;
