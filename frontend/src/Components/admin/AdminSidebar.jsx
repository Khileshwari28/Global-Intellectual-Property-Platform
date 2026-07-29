import React from "react";

const menuItems = [
  { name: "Dashboard", icon: "📊" },
  { name: "Users", icon: "👤" },
  { name: "Subscriptions", icon: "🛡️" },
  { name: "Filings", icon: "📁" },
  { name: "AdminProfile", label: "Profile", icon: "🧑‍💼" },
];

const AdminSidebar = ({ active, setActive }) => {
  return (
    <div
      className="bg-gradient p-3 d-flex flex-column sidebar-fixed"
      style={{ minHeight: "100vh" }}
    >
      {/* BRAND */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span style={{ fontSize: "32px" }}>🛡️</span>
          <h2
            className="mb-0 text-white"
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Admin Panel
          </h2>
        </div>
      </div>

      {/* MENU */}
      <nav className="mb-4">
        <ul className="list-unstyled">
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <button
                className={`btn w-100 text-start d-flex align-items-center gap-2 ${
                  active === item.name
                    ? "btn-light text-dark"
                    : "btn-link text-white"
                }`}
                onClick={() => setActive(item.name)}
                style={{
                  padding: "12px 15px",
                  fontWeight: "500",
                  fontSize: "14px",
                  borderRadius: "6px",
                  backgroundColor:
                    active === item.name
                      ? "rgba(255, 255, 255, 0.15)"
                      : "transparent",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <span>{item.label || item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* FOOTER */}
      <div className="mt-auto pt-3 border-top border-white border-opacity-25">
        <button
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
          style={{ fontSize: "13px", fontWeight: "600" }}
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;