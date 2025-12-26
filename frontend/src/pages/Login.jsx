import { useState } from "react";
import { Link } from "react-router-dom";  
import photo from "../frontend_img/photo.png";

export default function LoginForm() {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // clear error while typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (response.status === 200) {
                const user = await response.json();
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "/dashboard"; // redirect
            }
            else if (response.status === 401) {
                const err = await response.json();
                setError(err.error);
            }

        } catch (error) {
            console.error("Login Error:", error);
            setError("Wrong email or password");
        }
    };

    return (
        <div className="page-background">
            <div className="base-document-container">
                <div className="content-split">

                    {/* LEFT SIDE WITH PHOTO BACKGROUND */}
                    <div
                        className="branding-column"
                        style={{ backgroundImage: `url(${photo})` }}
                    ></div>

                    {/* RIGHT SIDE LOGIN FORM */}
                    <div className="signup-form-card">
                        <h2 className="form-title">Login</h2>

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
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
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* ✅ ERROR SHOWN HERE */}
                            {error && (
                                <p style={{ color: "red", marginBottom: "10px" }}>
                                    {error}
                                </p>
                            )}

                            <button className="submit-button">Login</button>
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
