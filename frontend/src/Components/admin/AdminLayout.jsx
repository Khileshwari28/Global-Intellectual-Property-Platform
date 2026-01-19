import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import AdminFilingManager from "./AdminFilingManager";
import AdminUserManagement from "./AdminUserManagement";

const AdminLayout = () => {
  const [active, setActive] = useState("Dashboard");

  const renderMiddleContent = () => {
    if (active === "Dashboard") return <AdminDashboard />;
    if (active === "Filings") return <AdminFilingManager />;
    if (active === "Users") return <AdminUserManagement />;
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
