import React, { useState } from "react";

const AdminNavbar = ({ setActiveComponent }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="navbar-top">
        <div className="navbar-container d-flex align-items-center justify-content-between">

          {/* LEFT */}
          <div className="navbar-left d-flex align-items-center gap-2">
            <h3 className="m-0 fw-bold">Admin Panel</h3>
          </div>

          {/* RIGHT */}
          <div className="navbar-right d-flex align-items-center gap-3">

            <span className="badge bg-danger px-3 py-2">
              ADMIN
            </span>

            {/* Profile */}
            <div className="navbar-item">
              <button
                className="profile-icon-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
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
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        if (typeof setActiveComponent === "function") {
                          setActiveComponent("AdminProfile");
                        }
                        setIsProfileOpen(false);
                      }}
                    >
                      👤 My Profile
                    </button>

                  </div>

                  <div className="profile-dropdown-divider"></div>

                  <div className="profile-dropdown-footer">
                    <button
                      className="btn-logout w-100"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {isProfileOpen && (
        <div
          className="profile-overlay"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminNavbar;