import React, { useState } from "react";

/* Layout */
import AdminNavbar from "../Components/admin/AdminNavbar";
import AdminSidebar from "../Components/admin/AdminSidebar";

/* Admin Pages */
import AdminDashboard from "../Components/admin/AdminDashboard";
import AdminFilingManager from "../Components/admin/AdminFilingManager";
import AdminUserManagement from "../Components/admin/AdminUserManagement";
import SubscriptionManagement from "../Components/admin/AdminSubscriptionManagement";
import AdminApiHealth from "../Components/admin/AdminApiHealth";
import AdminProfile from "../Components/admin/AdminProfile";

const AdminHome = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <>
      {/* TOP NAVBAR */}
      <AdminNavbar setActiveComponent={setActive} />

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

          {active === "Subscriptions" && <SubscriptionManagement />}

          {active === "Filings" && <AdminFilingManager />}

          {/* PROFILE */}
          {active === "AdminProfile" && <AdminProfile />}

        </div>
      </div>
    </>
  );
};

export default AdminHome;