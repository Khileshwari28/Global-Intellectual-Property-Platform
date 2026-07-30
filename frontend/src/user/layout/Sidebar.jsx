import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../common/components/ProfileCard";

const Sidebar = ({ activeComponent, setActiveComponent, userPlan }) => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfile = () => setProfileOpen(!isProfileOpen);

  /* ✅ LOGOUT HANDLER */
  const handleLogout = () => {
    // clear user session
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // redirect to login
    navigate("/login");
  };

const menuItems = [
  { name: "Dashboard", icon: "📊" },
  { name: "Search Result", icon: "🔍" },
  { name: "Filling Tracker", icon: "📋" , requiresPro: true},
  { name: "Legal Status", icon: "⚖️", requiresPro: true },
  { name: "Profile", icon: "👤" },
  { name: "Upgrade Plan", icon: "🚀" },
];

  return (
    <div
      className="bg-gradient p-3 d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span style={{ fontSize: "32px" }}>🌍</span>
          <h2
            className="mb-0 text-white"
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Global IPI
          </h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mb-4">
        <ul className="list-unstyled">
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <button
                className={`btn w-100 text-start d-flex align-items-center gap-2 ${
                  activeComponent === item.name
                    ? "btn-light text-dark"
                    : "btn-link text-white"
                }`}
                onClick={() => setActiveComponent(item.name)}
                style={{
                  padding: "12px 15px",
                  fontWeight: "500",
                  fontSize: "14px",
                  borderRadius: "6px",
                  backgroundColor:
                    activeComponent === item.name
                      ? "rgba(255, 255, 255, 0.15)"
                      : "transparent",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <span>{item.name}</span>

                {item.requiresPro && userPlan === "BASIC" && (
                  <span style={{ marginLeft: "auto" }}>🔒</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-3 border-top border-white border-opacity-25">
        <button
          onClick={toggleProfile}
          className="btn btn-outline-light w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
          style={{ fontSize: "13px", fontWeight: "600" }}
        >
          ⚙️ Settings
        </button>

        {isProfileOpen && <ProfileCard />}

        {/* ✅ LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
          style={{ fontSize: "13px", fontWeight: "600" }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
