import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import SearchResult from '../components/SearchResult';
import FillingTracker from '../components/FillingTracker';
import LegalStatus from '../components/LegalStatus';

const Home = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Search Result':
        return <SearchResult />;
      case 'Filling Tracker':
        return <FillingTracker />;
      case 'Legal Status':
        return <LegalStatus />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="d-flex min-vh-100">
        <div className={`sidebar-fixed ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        </div>

        {sidebarOpen && (
          <div
            className="sidebar-overlay open"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div className="flex-grow-1 bg-light p-4 content-wrapper">
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default Home;
