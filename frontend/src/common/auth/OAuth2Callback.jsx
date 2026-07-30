import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuth2Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        const token = searchParams.get("token");
        
        if (!token) {
            setError("No token received from OAuth2");
            setTimeout(() => navigate("/login"), 3000);
            return;
        }

        // Fetch user details using the token
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/users/oauth2/user?token=${token}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    }
                );

                if (response.ok) {
                    const user = await response.json();
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate("/dashboard");
                } else {
                    const errorMsg = await response.text();
                    setError(errorMsg || "Failed to retrieve user information");
                    setTimeout(() => navigate("/login"), 3000);
                }
            } catch (error) {
                console.error("OAuth2 Callback Error:", error);
                setError("Error processing OAuth2 login");
                setTimeout(() => navigate("/login"), 3000);
            }
        };

        fetchUser();
    }, [searchParams, navigate]);

    return (
        <div className="page-background" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <div style={{ textAlign: "center" }}>
                {error ? (
                    <>
                        <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
                        <p>Redirecting to login...</p>
                    </>
                ) : (
                    <p>Processing Google login...</p>
                )}
            </div>
        </div>
    );
}

