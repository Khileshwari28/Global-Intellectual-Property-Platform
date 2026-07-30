import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hasAccess } from "../../common/utils/permissions";
import { getNotifications, clearNotifications } from "../../api/notificationApi";

const Navbar = ({ sidebarOpen, setSidebarOpen, setActiveComponent }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userUniqueId = user?.id;
  const plan = user?.plan;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  const [notifError, setNotifError] = useState(null);

  const canNotify = hasAccess(plan, "canNotify");

  useEffect(() => {
  if (!userUniqueId || !canNotify) return;

  setLoadingNotifs(true);
  getNotifications(userUniqueId)
    .then((res) => {
      setNotifications(res.data);
      setNotifError(null);
    })
    .catch((err) => {
      console.error("Notification error:", err);
      setNotifError("Failed to load notifications");
    })
    .finally(() => setLoadingNotifs(false));
}, [userUniqueId, canNotify]);

  const getNotifIcon = (type) => {
    switch (type) {
      case "success": return "✓";
      case "warning": return "⚠️";
      case "danger": return "⛔";
      case "info": return "ℹ️";
      default: return "🔔";
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleClearAll = () => {
  clearNotifications(userUniqueId)
    .then(() => setNotifications([]))
    .catch((err) => console.error("Clear notifications failed:", err));
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
                {canNotify && notifications.length > 0 && (
                  <span className="notification-badge">
                    {notifications.length}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h5>Notifications</h5>
                    {canNotify && notifications.length > 0 && (
                      <button className="btn-clear-all" onClick={handleClearAll}>
                        Clear All
                      </button>
                    )}
                  </div>

                  {!canNotify ? (
                    <div
                      className="d-flex justify-content-center align-items-center text-center"
                      style={{ padding: "24px 16px" }}
                    >
                      <div>
                        <h6 className="mb-1">🔒 Notifications Locked</h6>
                        <small className="text-muted">
                          Upgrade your plan to access notifications.
                        </small>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="notifications-list">
                        {loadingNotifs && (
                          <p className="text-muted text-center p-3 mb-0">
                            Loading...
                          </p>
                        )}

                        {!loadingNotifs && notifError && (
                          <p className="text-danger text-center p-3 mb-0">
                            {notifError}
                          </p>
                        )}

                        {!loadingNotifs && !notifError && notifications.length === 0 && (
                          <p className="text-muted text-center p-3 mb-0">
                            No notifications
                          </p>
                        )}

                        {!loadingNotifs &&
                          !notifError &&
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              className={`notification-item type-${notif.type}`}
                            >
                              <div className="notif-content">
                                <p className="notif-message">{notif.message}</p>
                                <span className="notif-time">
                                  {new Date(notif.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <span className="notif-icon">
                                {getNotifIcon(notif.type)}
                              </span>
                            </div>
                          ))}
                      </div>

                      {notifications.length > 0 && (
                        <div className="notifications-footer">
                          <button
                            className="btn-view-all"
                            onClick={() => {
                              setActiveComponent("Notifications");
                              setIsNotificationsOpen(false);
                            }}
                          >
                            View All Notifications →
                          </button>
                        </div>
                      )}
                    </>
                  )}
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
                        setActiveComponent("Profile");
                        setIsProfileOpen(false);
                      }}
                    >
                      📋 My Profile
                    </button>
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