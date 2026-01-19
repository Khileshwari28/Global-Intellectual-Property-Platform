import React, { useState } from "react";
import AdminNavbar from "../Components/admin/AdminNavbar";
import AdminSidebar from "../Components/admin/AdminSidebar";
import AdminDashboard from "../Components/admin/AdminDashboard";
import AdminFilingManager from "../Components/admin/AdminFilingManager";
import AdminUserManagement from "../Components/admin/AdminUserManagement";
import SubscriptionManagement from "../Components/admin/AdminSubscriptionManagement";

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

          {active === "Users" && <AdminUserManagement />}

          {active === "Subscriptions" && <SubscriptionManagement />}
          
          {active === "Filings" && <AdminFilingManager />}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
