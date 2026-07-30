import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./common/landing/Landing.jsx";
import Login from "./common/auth/Login.jsx";
import Register from "./common/auth/Register.jsx";
import Home from "./user/pages/Home.jsx";
import AdminHome from "./admin/AdminHome.jsx";
import ProtectedRoute from "./common/components/ProtectedRoute.jsx";

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


