import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌟 Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard (after login) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN", "PRO", "ENTERPRISE"]}>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
