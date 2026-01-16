
import React, { useState } from 'react';
import Navbar from '../Components/layout/Navbar';
import Sidebar from '../Components/layout/Sidebar';

import Dashboard from '../Components/Dashboard';
import SearchResult from '../Components/SearchResult';
import FillingTracker from '../Components/FillingTracker';
import LegalStatus from '../Components/LegalStatus';
import Pricing from '../Components/Pricing';

const Home = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock: get user plan from localStorage or backend
  const user = JSON.parse(localStorage.getItem("user"));
  // plan can be "Basic", "Pro", "Enterprise"

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard setActiveComponent={setActiveComponent} />;
      case 'Search Result':
        return <SearchResult />;
      case 'Filling Tracker':
        return <FillingTracker />;
      case 'Legal Status':
        return <LegalStatus userRole={user?.role}
          userPlan={user?.plan}
          setActiveComponent={setActiveComponent} />;
      case 'Upgrade Plan':
        return <Pricing />;
      default:
        return <Dashboard setActiveComponent={setActiveComponent} />;
    }
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="d-flex min-vh-100">
        <div className={`sidebar-fixed ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
            userPlan={user.plan} // pass plan to sidebar
          />
        </div>

        {sidebarOpen && (
          <div
            className="sidebar-overlay open"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-grow-1 bg-light p-4 content-wrapper">
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default Home;