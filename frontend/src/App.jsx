
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import BrandingColumn from './Components/BrandingColumn';
// import SignupCard from './Components/SignupCard';
// import UserProfile from "./Components/UserProfile";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Pricing from './Components/Pricing';
// import ProtectedRoute from './Components/ProtectedRoute';
// import './SignupStyles.css';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Signup */}
//         <Route
//           path="/"
//           element={
//             <div className="page-background">
//               <div className="base-document-container">
//                 <div className="content-split">
//                   <BrandingColumn />
//                   <SignupCard />
//                 </div>
//               </div>
//             </div>
//           }
//         />

//         {/* Login */}
//         <Route path="/login" element={<Login />} />
        

//         {/* Pricing (public page, optional) */}
//         {/* <Route path="/pricing" element={<Pricing />} /> */}
        
//         {/* Dashboard (AFTER login) */}
//         <Route path="/dashboard" element={<Home />} />
        
//         <Route path="/profile" element={<UserProfile />} />
        
      
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["PRO", "ENTERPRISE"]}>
//               <Home />
//               </ProtectedRoute> 
//            }
//       />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import UserProfile from "./Components/UserProfile";
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
        

        <Route path="/dashboard" element={<Home />} />

        {/* Dashboard (AFTER login) */}
        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN", "PRO", "ENTERPRISE"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* User Profile */}
        <Route path="/profile" element={<UserProfile />} />
        
       
        {/* Pricing (optional) */}
        {/* <Route path="/pricing" element={<Pricing />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

