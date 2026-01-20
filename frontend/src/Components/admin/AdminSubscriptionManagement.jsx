import React, { useState, useEffect } from "react";
import axios from "axios";

const FEATURES = [
  { id: "canLegalStatus", label: "Legal Status Access", icon: "⚖️" },
  { id: "canTrack", label: "Filing Tracker", icon: "📋" },
  { id: "canSeeMaps", label: "IP Distribution Maps", icon: "🗺️" },
  { id: "canSeeCharts", label: "Analytics Charts", icon: "📊" },
  { id: "canNotify", label: "Real-time Notifications", icon: "🔔" },
];

// IMPORTANT → must match DB exactly
const PLANS = ["BASIC", "PROFESSIONAL", "ENTERPRISE"];

export default function SubscriptionManagement() {

  const [permissions, setPermissions] = useState({
    BASIC: [],
    PROFESSIONAL: [],
    ENTERPRISE: []
  });

  // 🔹 Load permissions from backend (instead of localStorage)
  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    const res = await axios.get("http://localhost:8080/api/permissions");

    // Normalize DB data → frontend structure
    const formatted = {
      BASIC: [],
      PROFESSIONAL: [],
      ENTERPRISE: []
    };

    res.data.forEach(p => {
      if (p.enabled) {
        formatted[p.planName].push(p.featureKey);
      }
    });

    setPermissions(formatted);
  };

  // 🔹 Toggle = backend update
  const togglePermission = async (plan, featureId) => {
    const isEnabled = permissions[plan].includes(featureId);

    await axios.post("http://localhost:8080/api/permissions/update", {
      plan: plan,
      feature: featureId,
      enabled: !isEnabled
    });

    loadPermissions();   // refresh UI from DB
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="h3">System Access Control</h2>
        <p className="text-muted">Map platform features to subscription tiers.</p>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="ps-4 py-3">Feature Module</th>
                {PLANS.map(plan => (
                  <th key={plan} className="text-center py-3">{plan}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((feature) => (
                <tr key={feature.id}>
                  <td className="ps-4 py-3">
                    <span className="me-2">{feature.icon}</span>
                    <span className="fw-medium">{feature.label}</span>
                  </td>

                  {PLANS.map((plan) => (
                    <td key={plan} className="text-center">
                      <div className="form-check form-switch d-flex justify-content-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          style={{ cursor: 'pointer', width: '2.5em', height: '1.25em' }}
                          checked={permissions[plan]?.includes(feature.id) || false}
                          onChange={() => togglePermission(plan, feature.id)}
                        />
                      </div>
                    </td>
                  ))}

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 p-3 bg-light rounded border">
        <small className="text-muted">
          <strong>Pro-Tip:</strong> Changes made here are saved in database and will immediately
          affect all users based on their subscription plan.
        </small>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";

// export default function SubscriptionManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 1. Fetch all users from your backend
//   useEffect(() => {
//     fetch("http://localhost:8080/api/admin/users") // Adjust your API endpoint
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data);
//         setLoading(false);
//       });
//   }, []);

//   // 2. Function to manually override a user's plan (Admin power)
//   const updatePlanManually = async (userId, newPlan) => {
//     const res = await fetch(`http://localhost:8080/api/subscription/upgrade?userId=${userId}&plan=${newPlan}`, {
//       method: "POST",
//     });
//     if (res.ok) {
//       setUsers(users.map(u => u.id === userId ? { ...u, plan: newPlan } : u));
//       alert("Plan updated successfully!");
//     }
//   };
  
//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>System Subscription Management</h2>
//       <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//         <thead>
//           <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
//             <th style={tdStyle}>User Name</th>
//             <th style={tdStyle}>Email</th>
//             <th style={tdStyle}>Current Plan</th>
//             <th style={tdStyle}>Change Plan</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
//               <td style={tdStyle}>{user.name}</td>
//               <td style={tdStyle}>{user.email}</td>
//               <td style={tdStyle}>
//                 <span style={getPlanBadgeStyle(user.plan)}>{user.plan}</span>
//               </td>
//               <td style={tdStyle}>
//                 <select 
//                   value={user.plan} 
//                   onChange={(e) => updatePlanManually(user.id, e.target.value)}
//                 >
//                   <option value="BASIC">BASIC</option>
//                   <option value="PRO">PRO</option>
//                   <option value="ENTERPRISE">ENTERPRISE</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const tdStyle = { padding: '12px', border: '1px solid #eee' };

// const getPlanBadgeStyle = (plan) => ({
//   padding: '4px 8px',
//   borderRadius: '4px',
//   fontSize: '12px',
//   fontWeight: 'bold',
//   background: plan === 'ENTERPRISE' ? '#ede9fe' : plan === 'PRO' ? '#dbeafe' : '#f3f4f6',
//   color: plan === 'ENTERPRISE' ? '#6d28d9' : plan === 'PRO' ? '#1e40af' : '#374151',
// });


// import React, { useState, useEffect } from "react";


// const FEATURES = [
//   { id: "canLegalStatus", label: "Legal Status Access", icon: "⚖️" },
//   { id: "canTrack", label: "Filing Tracker", icon: "📋" },
//   { id: "canSeeMaps", label: "IP Distribution Maps", icon: "🗺️" },
//   { id: "canSeeCharts", label: "Analytics Charts", icon: "📊" },
//   { id: "canNotify", label: "Real-time Notifications", icon: "🔔" },
// ];

// const PLANS = ["BASIC", "PRO", "ENTERPRISE"];

// export default function SubscriptionManagement() {
//   // Load permissions from localStorage or use defaults
//   const [permissions, setPermissions] = useState(() => {
//     const saved = localStorage.getItem("app_permissions");
//     return saved ? JSON.parse(saved) : {
//       BASIC: ["canSearch"],
//       PRO: ["canSearch", "canTrack", "canSeeCharts"],
//       ENTERPRISE: ["canSearch", "canTrack", "canSeeMaps", "canSeeCharts", "canNotify", "canLegalStatus"],
//     };
//   });

//   const togglePermission = (plan, featureId) => {
//     const updated = { ...permissions };
//     if (updated[plan].includes(featureId)) {
//       updated[plan] = updated[plan].filter((id) => id !== featureId);
//     } else {
//       updated[plan] = [...updated[plan], featureId];
//     }
//     setPermissions(updated);
//     localStorage.setItem("app_permissions", JSON.stringify(updated));
//   };

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <h2 className="h3">System Access Control</h2>
//         <p className="text-muted">Map platform features to subscription tiers.</p>
//       </div>

//       <div className="card border-0 shadow-sm overflow-hidden">
//         <div className="table-responsive">
//           <table className="table mb-0 align-middle">
//             <thead className="bg-light">
//               <tr>
//                 <th className="ps-4 py-3">Feature Module</th>
//                 {PLANS.map(plan => (
//                   <th key={plan} className="text-center py-3">{plan}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {FEATURES.map((feature) => (
//                 <tr key={feature.id}>
//                   <td className="ps-4 py-3">
//                     <span className="me-2">{feature.icon}</span>
//                     <span className="fw-medium">{feature.label}</span>
//                   </td>
//                   {PLANS.map((plan) => (
//                     <td key={plan} className="text-center">
//                       <div className="form-check form-switch d-flex justify-content-center">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           role="switch"
//                           style={{ cursor: 'pointer', width: '2.5em', height: '1.25em' }}
//                           checked={permissions[plan].includes(feature.id)}
//                           onChange={() => togglePermission(plan, feature.id)}
//                         />
//                       </div>
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="mt-4 p-3 bg-light rounded border">
//         <small className="text-muted">
//           <strong>Pro-Tip:</strong> Changes made here are saved to the system state and will immediately 
//           affect what users see on their dashboards based on their assigned plan.
//         </small>
//       </div>
//     </div>
//   );
// }
