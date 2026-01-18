import React, { useState } from "react";
import AdminNavbar from "../Components/admin/AdminNavbar";
import AdminSidebar from "../Components/admin/AdminSidebar";

const AdminHome = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <>
      <AdminNavbar />

      <div className="d-flex min-vh-100">
        <AdminSidebar active={active} setActive={setActive} />

        <div className="flex-grow-1 bg-light p-4 content-wrapper">
          {active === "Dashboard" && <h4>System Overview</h4>}
          {active === "Users" && <h4>User Management</h4>}
          {active === "Filings" && <h4>Filing Approvals</h4>}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
