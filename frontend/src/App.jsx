import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/landing/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";

// Components
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Components/dashboard/Dashboard";
import ProfileCard from "./Components/ui/ProfileCard";

// Admin Sub-pages (Make sure these are imported correctly)
import AdminUserManagement from "./Components/admin/AdminUserManagement";
import SubscriptionManagement from "./Components/admin/AdminSubscriptionManagement";
// import Pricing from "./Components/Pricing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 🌟 Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/pricing" element={<Pricing />} /> */}

        {/* 👤 User Dashboard (Protected) */}
        <Route
          path="/dashboard"
          element={
            // <Home />
          <ProtectedRoute allowedRoles={["USER"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 🛡️ Admin Dashboard (ADMIN ONLY) */}
        <Route
          path="/admin"
          element={
            // <AdminHome />
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;


