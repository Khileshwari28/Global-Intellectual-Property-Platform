import React, { useState } from "react";

/* Layout */
import Navbar from "../Components/layout/Navbar";
import Sidebar from "../Components/layout/Sidebar";

/* Pages / Components */
import Dashboard from "../Components/dashboard/Dashboard";
import SearchResult from "./SearchResult";
import Pricing from "../Components/Pricing";
import UserProfile from "../Components/UserProfile";

/* Pages */
import FillingTracker from "./FillingTracker";
import LegalStatus from "./LegalStatus";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ SAFE USER READ (prevents white screen)
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard setActiveComponent={setActiveComponent} />;

      case "Search Result":
        return <SearchResult />;

      case "Filling Tracker":
        return (
          <FillingTracker
            setActiveComponent={setActiveComponent}
          />);

      case "Legal Status":
        return (
          <LegalStatus
            userRole={user?.role}
            userPlan={user?.plan}
            setActiveComponent={setActiveComponent}
          />
        );

      case "Profile":
        return <UserProfile />;

      case "Upgrade Plan":
        return <Pricing />;

      default:
        return <Dashboard setActiveComponent={setActiveComponent} />;
    }
  };

  return (
    <>
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setActiveComponent={setActiveComponent}
      />

      <div className="d-flex min-vh-100">
        {/* Sidebar */}
        <div className={`sidebar-fixed ${sidebarOpen ? "open" : ""}`}>
          <Sidebar
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
            userPlan={user?.plan}
          />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay open"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-grow-1 bg-light p-4 content-wrapper">
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default Home;