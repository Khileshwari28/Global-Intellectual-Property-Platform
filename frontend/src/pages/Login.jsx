import { useState } from "react";
import { Link } from "react-router-dom";
import photo from "../frontend_img/photo.png";

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.status === 200) {
                const user = await response.json();

                // ❌ USER trying to login as ADMIN
                if (loginRole === "ADMIN" && user.role !== "ADMIN") {
                    setError("You are not admin");
                    return;
                }

                // ✅ ADMIN or USER → dashboard
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "/dashboard";
            }

            else if (response.status === 401) {
                setError("Invalid email or password");
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
                        style={{ backgroundImage: `url(${photo})` }}
                    ></div>

                    {/* RIGHT */}
                    <div className="signup-form-card">
                        <h2 className="form-title">Login</h2>

                        {/* 🔁 ROLE TOGGLE */}
                        <div style={{ marginBottom: "20px" }}>
                            <div style={{ display: "flex", gap: "12px" }}>
                                <button
                                    type="button"
                                    onClick={() => setLoginRole("USER")}
                                    className={`btn ${loginRole === "USER"
                                            ? "btn-primary"
                                            : "btn-outline-primary"
                                        }`}
                                    style={{ flex: 1 }}
                                >
                                    User
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setLoginRole("ADMIN")}
                                    className={`btn ${loginRole === "ADMIN"
                                            ? "btn-danger"
                                            : "btn-outline-danger"
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
                            {error && (
                                <p style={{ color: "red", marginBottom: "10px" }}>
                                    {error}
                                </p>
                            )}

                            <button className="submit-button">
                                Login
                            </button>
                        </form>

                        <p className="login-footer">
                            Don’t have an account? <Link to="/">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
