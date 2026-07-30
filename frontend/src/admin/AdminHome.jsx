import React, { useState } from "react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

import AdminDashboard from "./AdminDashboard";
import AdminUserManagement from "./AdminUserManagement";
import SubscriptionManagement from "./AdminSubscriptionManagement";
import AdminFilingManager from "./AdminFilingManager";
import AdminProfile from "./AdminProfile";
import AdminApiHealth from "./AdminApiHealth";
import AdminSupport from "./AdminSupport";

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


          {/* SUPPORT */}
          {active === "AdminSupport" && <AdminSupport />}

        </div>
      </div>
    </>
  );
};

export default AdminHome;