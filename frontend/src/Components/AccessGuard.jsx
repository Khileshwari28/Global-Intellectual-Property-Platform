// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { hasAccess } from '../utils/permissions';

// const AccessGuard = ({ feature, children, userPlan }) => {
//   const navigate = useNavigate();
//   const allowed = hasAccess(userPlan, feature);

//   if (!allowed) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.overlay}>
//           <p style={{ fontWeight: 'bold' }}>🔒 Feature Locked</p>
//           <button style={styles.btn} onClick={() => navigate('/pricing')}>
//             Upgrade Plan
//           </button>
//         </div>
//         <div style={styles.blurred}>{children}</div>
//       </div>
//     );
//   }
  
//   return <>{children}</>;
// };

// const styles = {
//   container: { position: 'relative', width: '100%' },
//   overlay: {
//     position: 'absolute', inset: 0, zIndex: 10,
//     display: 'flex', flexDirection: 'column', alignItems: 'center',
//     justifyContent: 'center', background: 'rgba(255,255,255,0.6)',
//     borderRadius: '12px'
//   },
//   blurred: { filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none' },
//   btn: { padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }
// };

// export default AccessGuard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccessGuard = ({ feature, children, userPlan }) => {
  const navigate = useNavigate();

  // 1. Initialize state from LocalStorage
  const [permissions, setPermissions] = useState(() => {
    const saved = localStorage.getItem("app_permissions");
    return saved ? JSON.parse(saved) : null;
  });

  // 2. Real-time sync: Watch for changes made in the Admin Panel
  useEffect(() => {
    const handleStorageChange = () => {
      const updated = localStorage.getItem("app_permissions");
      setPermissions(updated ? JSON.parse(updated) : null);
    };

    // Listen for storage changes (works across tabs)
    window.addEventListener('storage', handleStorageChange);
    
    // Custom check for changes in the same tab
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // 3. Logic: Check if the plan has this specific feature ID
  const isAllowed = permissions?.[userPlan]?.includes(feature);

  // 4. Locked UI
  if (!isAllowed) {
    return (
      <div style={containerStyle}>
        <div style={lockedOverlayStyle}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#1e293b' }}>
            🔒 {feature.replace('can', '')} Locked
          </p>
          <small style={{ color: '#64748b', marginBottom: '8px' }}>
            Available in higher plans
          </small>
          <button 
            onClick={() => navigate('/pricing')}
            style={btnStyle}
          >
            Upgrade Now
          </button>
        </div>
        {/* The "Blurred" background content */}
        <div style={{ filter: 'blur(10px)', pointerEvents: 'none', userSelect: 'none' }}>
          {children}
        </div>
      </div>
    );
  }

  // 5. Unlocked UI
  return <>{children}</>;
};

/* --- STYLES --- */

const containerStyle = {
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  width: '100%',
  border: '1px solid #f1f5f9'
};

const lockedOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
  backdropFilter: 'blur(2px)', // Extra glass effect
};

const btnStyle = {
  marginTop: '4px',
  padding: '8px 16px',
  background: '#2563eb', // Blue
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
};

export default AccessGuard;