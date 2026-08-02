import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

export default function OAuth2Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        const token = searchParams.get("token");
        const API_URL = import.meta.env.VITE_API_URL;
        
        if (!token) {
            setError("No token received from OAuth2");
            setTimeout(() => navigate("/login"), 3000);
            return;
        }

        // Fetch user details using the token
        const fetchUser = async () => {
            try {
                const response = await axiosClient.get(
                    `/users/oauth2/user?token=${token}`
                );

                const user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/dashboard");
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

