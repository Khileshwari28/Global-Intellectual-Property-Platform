// import React, { useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import AdminDashboard from "./AdminDashboard";
// import AdminFilingManager from "./AdminFilingManager";
// import AdminUserManagement from "./AdminUserManagement";



// const AdminLayout = () => {
//   const [active, setActive] = useState("Dashboard");

//   const renderMiddleContent = () => {
//     if (active === "Dashboard") return <AdminDashboard />;
//     if (active === "Filings") return <AdminFilingManager />;
//     if (active === "Users") return <AdminUserManagement />;
//   };

//   return (
//     <div className="d-flex">
//       {/* LEFT SIDEBAR (unchanged) */}
//       <AdminSidebar active={active} setActive={setActive} />

//       {/* MIDDLE CONTENT (this is where pages switch) */}
//       <div
//         className="flex-grow-1 p-4"
//         style={{ background: "#f5f7fa", minHeight: "100vh" }}
//       >
//         {renderMiddleContent()}
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  return (
    <div style={layoutStyles.container}>
      {/* Sidebar remains fixed on the left */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div style={layoutStyles.mainContent}>
        <div style={layoutStyles.pageWrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const layoutStyles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    height: '100vh',
    overflowY: 'auto',
    position: 'relative',
  },
  pageWrapper: {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  }
};

export default AdminLayout;