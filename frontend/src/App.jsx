
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BrandingColumn from './Components/BrandingColumn';
import SignupCard from './Components/SignupCard';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Pricing from './Components/Pricing';

import './SignupStyles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>

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

        {/* Pricing (public page, optional) */}
        <Route path="/pricing" element={<Pricing />} />

        {/* Dashboard (AFTER login) */}
        {/* <Route path="/dashboard" element={<Home />} /> */}
      
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
