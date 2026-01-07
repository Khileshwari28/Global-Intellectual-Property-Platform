import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const stored = localStorage.getItem("user");

  let user = null;

  try {
    user = stored ? JSON.parse(stored) : null;
  } catch {
    user = null;
  }

  // 🔒 Not logged in
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Role-based protection (optional)
  if (
    allowedRoles &&
    (!user.role || !allowedRoles.includes(user.role))
  ) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
}
