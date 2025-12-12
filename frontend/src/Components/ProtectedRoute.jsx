import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const stored = localStorage.getItem("user");

  let user = null;

  try {
    user = stored ? JSON.parse(stored) : null;
  } catch {
    user = null;
  }

  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
