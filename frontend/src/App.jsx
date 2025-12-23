import React from 'react';
import BrandingColumn from './Components/BrandingColumn';
import SignupCard from './Components/SignupCard';
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './SignupStyles.css';
import Home from "./pages/Home";
import ProtectedRoute from "./Components/ProtectedRoute";


function App() {
  return (

    <BrowserRouter>
      <Routes>

        {/* Signup page */}
        <Route
          path="/signup"
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

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Default route → signup */}
        <Route path="/" element={<SignupCard />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />


      </Routes>
    </BrowserRouter>

  );
}

export default App;
