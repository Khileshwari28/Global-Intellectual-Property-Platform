import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loginRole, setLoginRole] = useState("USER"); // USER | ADMIN
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Wrong credentials
    if (!response.ok) {
      const data = await response.json();
      setError(data.message);
      return;
    }

    // Successful login
    const user = await response.json();

    if (loginRole === "ADMIN" && user.role !== "ADMIN") {
      setError("You are not admin");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    if (loginRole === "ADMIN") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/dashboard";
    }
  } catch (err) {
    console.error(err);
    setError("Server error");
  }
  };

  return (
    <div className="page-background">
      <div className="base-document-container">
        <div className="content-split">
          {/* LEFT */}
          <div
            className="branding-column"
            style={{
              backgroundImage: `url(/img/photo.png)`,
              display: "flex",
              alignItems: "center",
              paddingLeft: "60px",
              justifyContent: "center",
              textAlign: "center",
              color: "white",
            }}
          >
            <div style={{ maxWidth: "420px" }}>
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                <span style={{ color: "white" }}>
                  Global IP Platform: <br />
                  Your Digital IP Command Center
                </span>
              </h1>

              <ul
                style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}
              >
                <li style={{ marginBottom: "10px", fontSize: "16px" }}>
                  ✅ Global Patent & Trademark Search
                </li>
                <li style={{ marginBottom: "10px", fontSize: "16px" }}>
                  ✅ Real-time Portfolio Management
                </li>
                <li style={{ marginBottom: "10px", fontSize: "16px" }}>
                  ✅ AI-Driven Legal Insights & Alerts
                </li>
              </ul>

              <p
                style={{ fontStyle: "italic", fontSize: "15px", opacity: 0.9 }}
              >
                “Protecting innovation worldwide, one registration at a time.”
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="signup-form-card" style={{ backgroundColor: "white" }}>
            <h2 className="form-title">Login</h2>

            {/* 🔁 ROLE TOGGLE */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => setLoginRole("USER")}
                  className={`btn ${
                    loginRole === "USER" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  style={{ flex: 1 }}
                >
                  User
                </button>

                <button
                  type="button"
                  onClick={() => setLoginRole("ADMIN")}
                  className={`btn ${
                    loginRole === "ADMIN" ? "btn-danger" : "btn-outline-danger"
                  }`}
                  style={{ flex: 1 }}
                >
                  Admin
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* 🔴 ERROR */}
              {/* 🔴 ERROR */}
              {error && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#b91c1c",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <button className="submit-button">Login</button>
            </form>

            <p className="login-footer">
              Don’t have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
