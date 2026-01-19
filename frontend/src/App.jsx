
// // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // import BrandingColumn from './Components/BrandingColumn';
// // import SignupCard from './Components/SignupCard';
// // import UserProfile from "./Components/UserProfile";
// // import Login from "./pages/Login";
// // import Home from "./pages/Home";
// // import Pricing from './Components/Pricing';
// // import ProtectedRoute from './Components/ProtectedRoute';
// // import './SignupStyles.css';

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>

// //         {/* Signup */}
// //         <Route
// //           path="/"
// //           element={
// //             <div className="page-background">
// //               <div className="base-document-container">
// //                 <div className="content-split">
// //                   <BrandingColumn />
// //                   <SignupCard />
// //                 </div>
// //               </div>
// //             </div>
// //           }
// //         />

// //         {/* Login */}
// //         <Route path="/login" element={<Login />} />


// //         {/* Pricing (public page, optional) */}
// //         {/* <Route path="/pricing" element={<Pricing />} /> */}

// //         {/* Dashboard (AFTER login) */}
// //         <Route path="/dashboard" element={<Home />} />

// //         <Route path="/profile" element={<UserProfile />} />


// //         <Route
// //           path="/dashboard"
// //           element={
// //             <ProtectedRoute allowedRoles={["PRO", "ENTERPRISE"]}>
// //               <Home />
// //               </ProtectedRoute> 
// //            }
// //       />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Landing from "./pages/landing/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import AdminHome from "./pages/AdminHome";
// import UserProfile from "./Components/UserProfile";
// import ProtectedRoute from "./Components/ProtectedRoute";
// import AdminLayout from "./Components/admin/AdminLayout";
// import Dashboard from "./Components/dashboard/Dashboard";
// import ProfileCard from "./Components/ui/ProfileCard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
        
//         {/* 🌟 Public Pages */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard/>}/>
//          <Route path="/profile" element={<ProfileCard/>}/>
//         {/* 👤 User Dashboard (Protected) */}
//         {/* <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["USER", "PRO", "ENTERPRISE"]}>
//               <Home />
//             </ProtectedRoute>
//           }
//         /> */}

//         {/* 🛡️ Admin Dashboard (ADMIN ONLY) */}
//         <Route
//           path="/admin"
//           element={
//             //<ProtectedRoute allowedRoles={["ADMIN"]}>
//             <AdminHome />
//             //</ProtectedRoute>
//           }
//         />

//         <Route path="/admin" element={<AdminLayout />} />

//         {/* 👤 Profile (Protected for all logged-in users) */}
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute allowedRoles={["USER", "ADMIN", "PRO", "ENTERPRISE"]}>
//               <UserProfile />
//             </ProtectedRoute>
//           }
//         />
        
        
//       {/* 🛡️ Admin Section - Grouped together */}
// <Route path="/admin" element={<AdminLayout />}>
//   <Route index element={<AdminHome />} /> 
//   <Route path="users" element={<AdminUserManagement />} />
//   <Route path="subscriptions" element={<SubscriptionManagement />} />
// </Route>
      
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/landing/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";

// Components
import UserProfile from "./Components/UserProfile";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminLayout from "./Components/admin/AdminLayout";
import Dashboard from "./Components/dashboard/Dashboard";
import ProfileCard from "./Components/ui/ProfileCard";

// Admin Sub-pages (Make sure these are imported correctly)
import AdminUserManagement from "./Components/admin/AdminUserManagement";
import SubscriptionManagement from "./Components/admin/AdminSubscriptionManagement";
import Pricing from "./Components/Pricing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 🌟 Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* 👤 User Dashboard */}
        
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* 👤 Profile */}
        <Route path="/profile" element={<ProfileCard />} />

        {/* 🛡️ Admin Section - Nested Routes */}
       
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} /> 
          <Route path="users" element={<AdminUserManagement />} />
          <Route path="subscriptions" element={<SubscriptionManagement />} />
        </Route>

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;