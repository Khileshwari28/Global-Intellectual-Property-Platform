import React from 'react';
import BrandingColumn from './Components/BrandingColumn';
import SignupCard from './Components/SignupCard';
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './SignupStyles.css';
import Home from "./pages/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import Pricing from './Components/Pricing';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pricing */}
        <Route path="/pricing" element={<Pricing />} />

        {/* Signup */}
        <Route
          path="/"
          element={
            <div className="page-background">
              <div className="base-document-container">
                <div className="content-split">
                  <BrandingColumn />
                  <SignupCard />
                </div>
              </div>
            </div>
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard (PRO + ENTERPRISE only) */}
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute allowedRoles={["PRO", "ENTERPRISE"]}>
              <Home />
            // </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
