import React, { useState } from "react";

/* Layout */
import AdminNavbar from "../Components/admin/AdminNavbar";
import AdminSidebar from "../Components/admin/AdminSidebar";

/* Admin Pages */
import AdminDashboard from "../Components/admin/AdminDashboard";
import AdminFilingManager from "../Components/admin/AdminFilingManager";
import AdminUserManagement from "../Components/admin/AdminUserManagement";
import AdminApiHealth from "../Components/admin/AdminApiHealth"; // ✅ FIXED CASE

const AdminHome = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <>
      {/* TOP NAVBAR */}
      <AdminNavbar />

      <div className="d-flex min-vh-100">
        {/* SIDEBAR */}
        <AdminSidebar active={active} setActive={setActive} />

        {/* MAIN CONTENT */}
        <div className="flex-grow-1 bg-light p-4 content-wrapper">

          {/* DASHBOARD */}
          {active === "Dashboard" && (
            <div className="space-y-4">
              <AdminDashboard />
              <AdminApiHealth /> {/* 🩺 API HEALTH */}
            </div>
          )}

          {/* USER MANAGEMENT */}
          {active === "Users" && <AdminUserManagement />}

          {/* FILING MANAGEMENT */}
          {active === "Filings" && <AdminFilingManager />}

        </div>
      </div>
    </>
  );
};

export default AdminHome;
