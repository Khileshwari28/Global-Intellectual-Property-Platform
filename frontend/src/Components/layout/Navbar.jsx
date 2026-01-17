import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "Patent filing for US2024/567890 approved",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      message: "Trademark renewal reminder for TM2022/456789",
      time: "1 day ago",
      type: "warning",
    },
    {
      id: 3,
      message: "New copyright protection added",
      time: "3 days ago",
      type: "info",
    },
    {
      id: 4,
      message: "Legal status update: Case resolved",
      time: "1 week ago",
      type: "success",
    },
  ];

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="navbar-top">
        <div className="navbar-container d-flex align-items-center justify-content-between">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Sidebar"
          >
            ☰
          </button>
          <div className="navbar-right d-flex align-items-center gap-3">
            {/* Notifications */}
            <div className="navbar-item">
              <button
                className="navbar-icon-btn notification-btn"
                onClick={toggleNotifications}
                title="Notifications"
              >
                🔔
                <span className="notification-badge">
                  {notifications.length}
                </span>
              </button>

              {isNotificationsOpen && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h5>Notifications</h5>
                    <button className="btn-clear-all">Clear All</button>
                  </div>

                  <div className="notifications-list">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`notification-item type-${notif.type}`}
                      >
                        <div className="notif-content">
                          <p className="notif-message">{notif.message}</p>
                          <span className="notif-time">{notif.time}</span>
                        </div>
                        <span className="notif-icon">
                          {notif.type === "success" && "✓"}
                          {notif.type === "warning" && "⚠️"}
                          {notif.type === "info" && "ℹ️"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="notifications-footer">
                    <button className="btn-view-all">
                      View All Notifications →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="navbar-item">
              <button
                className="profile-icon-btn"
                onClick={toggleProfile}
                title="Open Profile"
              >
                <span className="profile-avatar">👤</span>
              </button>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <div className="profile-avatar-large">👤</div>
                    <div className="profile-info">
                      <h5 className="mb-0">{user?.username}</h5>
                      <p
                        className="mb-0"
                        style={{ fontSize: "11px", opacity: "0.6" }}
                      >
                        {user?.role}
                      </p>
                      <p
                        className="mb-0"
                        style={{ fontSize: "11px", opacity: "0.6" }}
                      >
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="profile-dropdown-divider"></div>

                  <div className="profile-dropdown-menu">
                    <button className="dropdown-item">⚙️ Settings</button>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/profile"); // path to your User Profile page
                        setIsProfileOpen(false); // close the dropdown
                      }}
                    >
                      📋 My Profile
                    </button>

                    <button className="dropdown-item">
                      🔐 Change Password
                    </button>
                    <button className="dropdown-item">📞 Support</button>
                  </div>

                  <div className="profile-dropdown-divider"></div>

                  <div className="profile-dropdown-footer">
                    <button className="btn-logout w-100" onClick={handleLogout}>
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {(isProfileOpen || isNotificationsOpen) && (
        <div
          className="profile-overlay"
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationsOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default Navbar;
