import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* Razorpay TEST Key */
const RAZORPAY_KEY = "rzp_test_S0yogPh9RsxaZ5";

const plans = [
  {
    name: "BASIC",
    role: "BASIC",
    price: 0,
    displayPrice: "₹0",
    credits: "100 Credits",
    //track: "Standard Search",
    updates: "Manual",
    support: "Email Only",
  },
  {
    name: "PROFESSIONAL",
    role: "PROFESSIONAL",
    price: 499,
    displayPrice: "₹499",
    credits: "5,000 Credits",
    //track: "Legal Status Access",
    updates: "Real-time",
    support: "24/7 Priority",
    popular: true,
  },
  {
    name: "ENTERPRISE",
    role: "ENTERPRISE",
    price: 1999,
    displayPrice: "₹1999",
    credits: "Unlimited",
    //track: "Legal Status Access",
    updates: "Instant Push",
    support: "Dedicated Mgr",
  },
];

const FEATURE_LABELS = {
  canLegalStatus: "Legal Status Access",
  canTrack: "Filing Tracker",
  canSeeMaps: "IP Distribution Maps",
  canSeeCharts: "Analytics Charts",
  canNotify: "Real-time Notifications",
};

/* Feature name mapping (must match backend keys) */
const TrackDropdown = ({ planRole, permissions }) => {
  const [open, setOpen] = useState(false);

  const planPerms = permissions[planRole] || {};

  const enabledFeatures = Object.keys(planPerms)
    .filter((key) => planPerms[key] === true)
    .map((key) => FEATURE_LABELS[key])
    .filter(Boolean);

  return (
    <div style={{ position: "relative" }}>
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => setOpen(!open)}
      >
        View
      </button>
      
      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            minWidth: 220,
            padding: 8,
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            zIndex: 1000,
          }}
        >
          {enabledFeatures.length === 0 ? (
            <div className="text-muted small">🚫 No premium features</div>
          ) : (
            enabledFeatures.map((f, i) => (
              <div key={i} style={{ fontSize: 13, padding: "4px 0" }}>
                ✅ {f}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default function Pricing() {
  const navigate = useNavigate();

  const [currentPlan, setCurrentPlan] = useState("BASIC");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [upgradeSuccess, setUpgradeSuccess] = useState(null);

  // 🔥 Permissions from DB
  const [permissions, setPermissions] = useState({});

  /* Load current user plan */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.plan) setCurrentPlan(user.plan);
  }, []);

  /* Load permissions from backend */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/permissions")
      .then((res) => {
        /*
          Backend format:
          [
            { planName: "BASIC", featureKey: "canTrack", enabled: true },
            ...
          ]
        */

        const formatted = {};
        res.data.forEach((p) => {
          if (!formatted[p.planName]) formatted[p.planName] = {};
          formatted[p.planName][p.featureKey] = p.enabled;
        });

        setPermissions(formatted);
      })
      .catch(console.error);
  }, []);

  const currentPlanData = plans.find((p) => p.role === currentPlan);
  const currentPlanPrice = currentPlanData?.price ?? 0;

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const confirmUpgrade = () => {
    setShowModal(false);
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.id) {
      alert("Please login to proceed.");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: selectedPlan.price * 100,
      currency: "INR",
      name: "Global IP Platform",
      description: `Upgrade to ${selectedPlan.name}`,
      handler: async function (paymentResponse) {
        console.log("Payment Success:", paymentResponse.razorpay_payment_id);

        const res = await fetch(
          `http://localhost:8080/api/subscription/upgrade?userId=${user.id}&plan=${selectedPlan.role}`,
          { method: "POST" },
        ).catch(() => null);

        let newPlanRole = selectedPlan.role;

        if (res && res.ok) {
          const data = await res.json();
          newPlanRole = data.planName || selectedPlan.role;
        }

        const updatedUser = { ...user, plan: newPlanRole };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setCurrentPlan(newPlanRole);
        setUpgradeSuccess(selectedPlan.name);

        setTimeout(() => {
          setUpgradeSuccess(null);
          navigate("/dashboard");
        }, 3000);
      },
      prefill: {
        name: user.username || "",
        email: user.email || "",
      },
      theme: { color: "#2563eb" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Choose the plan that's right for you</h1>

      {upgradeSuccess && (
        <div style={styles.successWrapper}>
          <div style={styles.successBanner}>
            🎉 <strong>Success!</strong> Upgraded to{" "}
            <strong>{upgradeSuccess}</strong>. Redirecting...
          </div>
        </div>
      )}

      <div style={styles.grid}>
        {plans.map((plan) => {
          const isCurrent = plan.role === currentPlan;
          const isDowngrade = plan.price < currentPlanPrice;
          const isHovered = hoveredPlan === plan.role;

          return (
            <div
              key={plan.role}
              onMouseEnter={() => setHoveredPlan(plan.role)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{
                ...styles.card,
                ...(isCurrent ? styles.current : {}),
                ...(isHovered && !isCurrent ? styles.hovered : {}),
                ...(isDowngrade ? styles.disabledCard : {}),
              }}
            >
              {plan.popular && <div style={styles.popular}>Most Popular</div>}

              <h2 style={{ marginTop: 10 }}>{plan.name}</h2>

              <div style={styles.body}>
                <Item label="Monthly price" value={plan.displayPrice} />
                <Item label="API Credits" value={plan.credits} />

                {/* Track Dropdown */}
                <div style={styles.item}>
                  <span style={styles.label}>Track</span>
                  <TrackDropdown
                    planRole={plan.role}
                    permissions={permissions}
                  />
                </div>

                <Item label="Data Updates" value={plan.updates} />
                <Item label="Support" value={plan.support} />
              </div>

              <button
                disabled={isCurrent || isDowngrade}
                style={{
                  ...styles.button,
                  ...(isCurrent ? styles.currentBtn : {}),
                  ...(isDowngrade ? styles.disabledBtn : {}),
                }}
                onClick={() => handleSelect(plan)}
              >
                {isCurrent
                  ? "Current Plan"
                  : isDowngrade
                    ? "Downgraded"
                    : `Select ${plan.name}`}
              </button>
              
            </div>
          );
        })}
      </div>

      {showModal && (
        <ConfirmModal
          plan={selectedPlan}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmUpgrade}
        />
      )}
    </div>
  );
}

/* --- Sub-Components --- */

function ConfirmModal({ plan, onCancel, onConfirm }) {
  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modal}>
        <h3 style={{ marginTop: 0 }}>Confirm Upgrade</h3>
        <p>
          Upgrade to <strong>{plan.name}</strong> for {plan.displayPrice}?
        </p>
        <div style={styles.modalActions}>
          <button onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={onConfirm} style={styles.confirmBtn}>
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}

const Item = ({ label, value }) => (
  <div style={styles.item}>
    <span style={styles.label}>{label}</span>
    <span style={styles.value}>{value}</span>
  </div>
);

/* --- RESTORED PREMIUM STYLES --- */

const styles = {
  wrapper: {
    padding: "20px", // Reduced padding from 60px
    fontFamily: "'Inter', sans-serif",
    maxWidth: "100%", // Let it fill the dashboard space
    margin: "0 auto",
  },
  heading: {
    fontSize: 24, // Smaller heading
    marginBottom: 24,
    textAlign: "center",
    fontWeight: 700,
    color: "#0f172a",
  },
  grid: {
    display: "grid",
    /* Changed minmax from 300px to 220px to prevent early wrapping */
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16, // Tighter gap
    alignItems: "stretch",
  },
  card: {
    border: "1px solid #e2e8f0",
    borderRadius: 16, // Slightly smaller radius
    padding: "20px", // Reduced internal padding from 32px
    background: "#fff",
    position: "relative",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    fontSize: "13px", // Slightly smaller base font
  },
  body: {
    margin: "16px 0", // Tighter margins
    flexGrow: 1,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0", // Thinner rows
    borderBottom: "1px solid #f1f5f9",
  },
  button: {
    padding: "12px", // Smaller button
    borderRadius: 10,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14, // Smaller font
  },
  currentBtn: { background: "#10b981", cursor: "default" },
  disabledBtn: { background: "#94a3b8", cursor: "not-allowed" },
  successWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 32,
  },
  successBanner: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    color: "#15803d",
    padding: "16px 24px",
    borderRadius: 16,
    fontWeight: 500,
  },
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.7)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: { background: "#fff", padding: 32, borderRadius: 20, width: 360 },
  modalActions: { display: "flex", gap: 12, marginTop: 24 },
  cancelBtn: {
    flex: 1,
    background: "#f1f5f9",
    border: "none",
    padding: "12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  confirmBtn: {
    flex: 1,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
};

// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // /* Razorpay TEST Key */
// // const RAZORPAY_KEY = "rzp_test_S0yogPh9RsxaZ5";

// // const plans = [
// //   {
// //     name: "BASIC",
// //     role: "BASIC",
// //     price: 0,
// //     displayPrice: "₹0",
// //     credits: "100 Credits",
// //     track: "Standard Search",
// //     updates: "Manual",
// //     support: "Email Only",
// //   },
// //   {
// //     name: "PROFESSIONAL",
// //     role: "PRO",
// //     price: 499,
// //     displayPrice: "₹499",
// //     credits: "5,000 Credits",
// //     track: "Legal Status Access",
// //     updates: "Real-time",
// //     support: "24/7 Priority",
// //     popular: true,
// //   },
// //   {
// //     name: "ENTERPRISE",
// //     role: "ENTERPRISE",
// //     price: 1999,
// //     displayPrice: "₹1999",
// //     credits: "Unlimited",
// //     track: "Legal Status Access",
// //     updates: "Instant Push",
// //     support: "Dedicated Mgr",
// //   },
// // ];

// // export default function Pricing() {
// //   const navigate = useNavigate();

// //   const [currentPlan, setCurrentPlan] = useState("BASIC");
// //   const [selectedPlan, setSelectedPlan] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [hoveredPlan, setHoveredPlan] = useState(null);
// //   const [upgradeSuccess, setUpgradeSuccess] = useState(null);

// //   /* Load current plan */
// //   useEffect(() => {
// //     const user = JSON.parse(localStorage.getItem("user"));
// //     setCurrentPlan(user?.plan || "BASIC");
// //   }, []);

// //   const currentPlanPrice =
// //     plans.find((p) => p.name === currentPlan)?.price ?? 0;

// //   const handleSelect = (plan) => {
// //     setSelectedPlan(plan);
// //     setShowModal(true);
// //   };

// //   const confirmUpgrade = () => {
// //     setShowModal(false);

// //     const user = JSON.parse(localStorage.getItem("user"));
// //     if (!user?.id) return;

// //     if (selectedPlan.price === 0) return;

// //     if (!window.Razorpay) {
// //       alert("Razorpay SDK not loaded");
// //       return;
// //     }

// //     const rzp = new window.Razorpay({
// //       key: RAZORPAY_KEY,
// //       amount: selectedPlan.price * 100,
// //       currency: "INR",
// //       name: "Global IP Platform",
// //       description: selectedPlan.name,

// //       //updated handler func.
// //       handler: async function () {
// //         try {
// //           const res = await fetch(
// //             `http://localhost:8080/api/subscription/upgrade?userId=${user.id}&plan=${selectedPlan.name}`,
// //             { method: "POST" }
// //           );

// //           if (!res.ok) throw new Error("Upgrade failed");

// //           const subscription = await res.json();

// //           // updated localStorage
// //           localStorage.setItem(
// //             "user",
// //             JSON.stringify({
// //               ...user,
// //               plan: subscription.planName,
// //             })
// //           );

// //           setCurrentPlan(subscription.planName);
// //           setUpgradeSuccess(subscription.planName);

// //           // auto-hide banner
// //           setTimeout(() => setUpgradeSuccess(null), 8000);

// //           // optional redirect
// //           // setTimeout(() => navigate("/dashboard"), 2000);

// //         } catch (err) {
// //           console.error(err);
// //           alert("Subscription upgrade failed");
// //         }
// //       }

// //     });

// //     rzp.open();
// //   };

// //   return (
// //     <div style={styles.wrapper}>
// //       <h1 style={styles.heading}>Choose the plan that's right for you</h1>
// //       {upgradeSuccess && (
// //         <div style={styles.successWrapper}>
// //           <div style={styles.successBanner}>
// //             🎉 <strong>Hurray!</strong> You have been upgraded to{" "}
// //             <strong>{upgradeSuccess}</strong> plan
// //           </div>
// //         </div>
// //       )}

// //       <div style={styles.grid}>
// //         {plans.map((plan) => {
// //           const isCurrent = plan.name === currentPlan;
// //           const isDowngrade = plan.price < currentPlanPrice;
// //           const isHovered = hoveredPlan === plan.name;

// //           return (
// //             <div
// //               key={plan.name}
// //               onMouseEnter={() => setHoveredPlan(plan.name)}
// //               onMouseLeave={() => setHoveredPlan(null)}
// //               style={{
// //                 ...styles.card,
// //                 ...(isCurrent ? styles.current : {}),
// //                 ...(isHovered && !isCurrent ? styles.hovered : {}),
// //                 ...(isDowngrade ? styles.disabledCard : {}),
// //               }}
// //             >
// //               {plan.popular && <div style={styles.popular}>Most Popular</div>}

// //               <h2>{plan.name}</h2>

// //               <div style={styles.body}>
// //                 <Item label="Monthly price" value={plan.displayPrice} />
// //                 <Item label="API Credits" value={plan.credits} />
// //                 <Item label="Track" value={plan.track} />
// //                 <Item label="Data Updates" value={plan.updates} />
// //                 <Item label="Support" value={plan.support} />
// //               </div>

// //               <button
// //                 disabled={isCurrent || isDowngrade}
// //                 style={{
// //                   ...styles.button,
// //                   ...(isCurrent ? styles.currentBtn : {}),
// //                   ...(isDowngrade ? styles.disabledBtn : {}),
// //                 }}
// //                 onClick={() => handleSelect(plan)}
// //               >
// //                 {isCurrent
// //                   ? "Current Plan"
// //                   : isDowngrade
// //                     ? "Downgrade Disabled"
// //                     : "Select Plan"}
// //               </button>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {showModal && (
// //         <ConfirmModal
// //           plan={selectedPlan}
// //           onCancel={() => setShowModal(false)}
// //           onConfirm={confirmUpgrade}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // /* ----------------- modal ----------------- */

// // function ConfirmModal({ plan, onCancel, onConfirm }) {
// //   return (
// //     <div style={styles.modalBackdrop}>
// //       <div style={styles.modal}>
// //         <h3>Confirm Upgrade</h3>
// //         <p>
// //           Upgrade to <strong>{plan.name}</strong> for {plan.displayPrice}/month?
// //         </p>

// //         <div style={styles.modalActions}>
// //           <button onClick={onCancel} style={styles.cancelBtn}>
// //             Cancel
// //           </button>
// //           <button onClick={onConfirm} style={styles.confirmBtn}>
// //             Confirm
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // const Item = ({ label, value }) => (
// //   <div style={styles.item}>
// //     <span style={styles.label}>{label}</span>
// //     <span style={styles.value}>{value}</span>
// //   </div>
// // );

// // /* ----------------- STYLES ----------------- */

// // const styles = {
// //   wrapper: { padding: 40, fontFamily: "Inter, Arial" },
// //   heading: { fontSize: 28, marginBottom: 32 },

// //   grid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
// //     gap: 24,
// //   },

// //   card: {
// //     border: "1px solid #e5e7eb",
// //     borderRadius: 14,
// //     padding: 24,
// //     background: "#fff",
// //     position: "relative",
// //     transition: "all 0.25s ease",
// //   },

// //   hovered: {
// //     border: "2px solid #2563eb",
// //     boxShadow: "0 12px 28px rgba(37,99,235,0.25)",
// //     transform: "translateY(-4px)",
// //   },

// //   // current: { boxShadow: "0 0 0 2px #2563eb" },

// //   current: {
// //     background: "#f3f4f6",
// //     border: "2px solid #9ca3af",
// //     boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
// //   },

// //   disabledCard: { opacity: 0.6 },

// //   popular: {
// //     position: "absolute",
// //     top: -12,
// //     left: "50%",
// //     transform: "translateX(-50%)",
// //     background: "#111827",
// //     color: "#fff",
// //     padding: "6px 14px",
// //     borderRadius: 20,
// //     fontSize: 12,
// //   },

// //   body: { margin: "20px 0" },

// //   item: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     padding: "10px 0",
// //     borderBottom: "1px solid #e5e7eb",
// //   },

// //   label: { color: "#6b7280" },
// //   value: { fontWeight: 500 },

// //   button: {
// //     padding: 12,
// //     borderRadius: 8,
// //     border: "none",
// //     background: "#2563eb",
// //     color: "#fff",
// //     cursor: "pointer",
// //   },

// //   successWrapper: {
// //     marginBottom: 28,
// //   },

// //   successBanner: {
// //     background: "#ecfdf5",
// //     border: "1px solid #10b981",
// //     color: "#065f46",
// //     padding: "16px 20px",
// //     borderRadius: 12,
// //     fontSize: 15,
// //     fontWeight: 500,
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 8,
// //     boxShadow: "0 6px 18px rgba(16,185,129,0.15)",
// //   },

// //   currentBtn: {
// //     background: "#e5e7eb",
// //     color: "#374151",
// //     cursor: "not-allowed",
// //   },

// //   disabledBtn: {
// //     background: "#9ca3af",
// //     cursor: "not-allowed",
// //   },

// //   modalBackdrop: {
// //     position: "fixed",
// //     inset: 0,
// //     background: "rgba(0,0,0,0.4)",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },

// //   modal: {
// //     background: "#fff",
// //     padding: 24,
// //     borderRadius: 12,
// //     width: 320,
// //   },

// //   modalActions: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     marginTop: 20,
// //   },

// //   cancelBtn: {
// //     background: "#e5e7eb",
// //     border: "none",
// //     padding: "10px 16px",
// //   },

// //   confirmBtn: {
// //     background: "#2563eb",
// //     color: "#fff",
// //     border: "none",
// //     padding: "10px 16px",
// //   },
// // };

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// /* Razorpay TEST Key */
// const RAZORPAY_KEY = "rzp_test_S0yogPh9RsxaZ5";

// const plans = [
//   {
//     name: "Basic",
//     role: "BASIC",
//     price: 0,
//     displayPrice: "₹0",
//     credits: "100 Credits",
//     track: "Standard Search",
//     updates: "Manual",
//     support: "Email Only",
//   },
//   {
//     name: "Professional",
//     role: "PRO",
//     price: 499,
//     displayPrice: "₹499",
//     credits: "5,000 Credits",
//     track: "Legal Status Access",
//     updates: "Real-time",
//     support: "24/7 Priority",
//     popular: true,
//   },
//   {
//     name: "Enterprise",
//     role: "ENTERPRISE",
//     price: 1999,
//     displayPrice: "₹1999",
//     credits: "Unlimited",
//     track: "Legal Status Access",
//     updates: "Instant Push",
//     support: "Dedicated Mgr",
//   },
// ];

// export default function Pricing() {
//   const navigate = useNavigate();

//   const [currentPlan, setCurrentPlan] = useState("BASIC");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [hoveredPlan, setHoveredPlan] = useState(null);
//   const [upgradeSuccess, setUpgradeSuccess] = useState(null);

//   /* 1. Sync current plan from LocalStorage on load */
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user?.plan) {
//       setCurrentPlan(user.plan);
//     }
//   }, []);

//   const currentPlanData = plans.find((p) => p.role === currentPlan);
//   const currentPlanPrice = currentPlanData?.price ?? 0;

//   const handleSelect = (plan) => {
//     setSelectedPlan(plan);
//     setShowModal(true);
//   };

//   /* 2. Razorpay Logic */
//   const confirmUpgrade = () => {
//     setShowModal(false);

//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user?.id) {
//       alert("Please login to proceed with the upgrade.");
//       return;
//     }

//     if (!window.Razorpay) {
//       alert("Razorpay SDK not loaded. Please check your internet or index.html.");
//       return;
//     }

//     const options = {
//       key: RAZORPAY_KEY,
//       amount: selectedPlan.price * 100, // Razorpay works in paise
//       currency: "INR",
//       name: "Global IP Platform",
//       description: `Upgrade to ${selectedPlan.name} Plan`,
//       handler: async function (paymentResponse) {
//         try {
//           console.log("Payment Successful:", paymentResponse.razorpay_payment_id);

//           // 3. Update Backend
//           const res = await fetch(
//             `http://localhost:8080/api/subscription/upgrade?userId=${user.id}&plan=${selectedPlan.role}`,
//             { method: "POST" }
//           );

//           if (!res.ok) throw new Error("Backend update failed");

//           const data = await res.json();
//           // Assuming backend returns { planName: "PRO" } or similar
//           const newPlanRole = data.planName || selectedPlan.role;

//           // 4. Update LocalStorage so Dashboard sees the change
//           const updatedUser = { ...user, plan: newPlanRole };
//           localStorage.setItem("user", JSON.stringify(updatedUser));

//           // 5. Update Local UI State
//           setCurrentPlan(newPlanRole);
//           setUpgradeSuccess(selectedPlan.name);

//           // Redirect to Dashboard after a short delay
//           setTimeout(() => {
//             setUpgradeSuccess(null);
//             navigate("/dashboard");
//           }, 2500);

//         } catch (err) {
//           console.error("Upgrade Error:", err);
//           alert("Payment was successful, but server update failed. Please contact support.");
//         }
//       },
//       prefill: {
//         name: user.username || "User",
//         email: user.email || "",
//       },
//       theme: { color: "#2563eb" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div style={styles.wrapper}>
//       <h1 style={styles.heading}>Choose the plan that's right for you</h1>

//       {upgradeSuccess && (
//         <div style={styles.successWrapper}>
//           <div style={styles.successBanner}>
//             🎉 <strong>Success!</strong> You have been upgraded to <strong>{upgradeSuccess}</strong>. Redirecting...
//           </div>
//         </div>
//       )}

//       <div style={styles.grid}>
//         {plans.map((plan) => {
//           const isCurrent = plan.role === currentPlan;
//           const isDowngrade = plan.price < currentPlanPrice;
//           const isHovered = hoveredPlan === plan.role;

//           return (
//             <div
//               key={plan.role}
//               onMouseEnter={() => setHoveredPlan(plan.role)}
//               onMouseLeave={() => setHoveredPlan(null)}
//               style={{
//                 ...styles.card,
//                 ...(isCurrent ? styles.current : {}),
//                 ...(isHovered && !isCurrent ? styles.hovered : {}),
//                 ...(isDowngrade ? styles.disabledCard : {}),
//               }}
//             >
//               {plan.popular && <div style={styles.popular}>Most Popular</div>}

//               <h2 style={{ marginTop: 10 }}>{plan.name}</h2>

//               <div style={styles.body}>
//                 <Item label="Monthly price" value={plan.displayPrice} />
//                 <Item label="API Credits" value={plan.credits} />
//                 <Item label="Track" value={plan.track} />
//                 <Item label="Data Updates" value={plan.updates} />
//                 <Item label="Support" value={plan.support} />
//               </div>

//               <button
//                 disabled={isCurrent || isDowngrade}
//                 style={{
//                   ...styles.button,
//                   ...(isCurrent ? styles.currentBtn : {}),
//                   ...(isDowngrade ? styles.disabledBtn : {}),
//                 }}
//                 onClick={() => handleSelect(plan)}
//               >
//                 {isCurrent ? "Current Plan" : isDowngrade ? "Downgrade Disabled" : "Select Plan"}
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {showModal && (
//         <ConfirmModal
//           plan={selectedPlan}
//           onCancel={() => setShowModal(false)}
//           onConfirm={confirmUpgrade}
//         />
//       )}
//     </div>
//   );
// }

// /* ----------------- Sub-Components ----------------- */

// function ConfirmModal({ plan, onCancel, onConfirm }) {
//   return (
//     <div style={styles.modalBackdrop}>
//       <div style={styles.modal}>
//         <h3>Confirm Upgrade</h3>
//         <p>Proceed with upgrading to <strong>{plan.name}</strong> for {plan.displayPrice}?</p>
//         <div style={styles.modalActions}>
//           <button onClick={onCancel} style={styles.cancelBtn}>Cancel</button>
//           <button onClick={onConfirm} style={styles.confirmBtn}>Pay & Upgrade</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const Item = ({ label, value }) => (
//   <div style={styles.item}>
//     <span style={styles.label}>{label}</span>
//     <span style={styles.value}>{value}</span>
//   </div>
// );

// /* ----------------- STYLES ----------------- */

// const styles = {
//   wrapper: { padding: 40, fontFamily: "Inter, sans-serif", maxWidth: 1200, margin: "0 auto" },
//   heading: { fontSize: 32, marginBottom: 40, textAlign: "center", fontWeight: 700, color: "#1e293b" },
//   grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 30 },
//   card: { border: "1px solid #e5e7eb", borderRadius: 20, padding: 30, background: "#fff", position: "relative", transition: "all 0.3s ease", display: "flex", flexDirection: "column" },
//   hovered: { border: "2px solid #2563eb", transform: "translateY(-8px)", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
//   current: { background: "#f8fafc", border: "2px solid #2563eb", boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.1)" },
//   disabledCard: { opacity: 0.6 },
//   popular: { position: "absolute", top: -15, left: "50%", transform: "translateX(-50%)", background: "#2563eb", color: "#fff", padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: "uppercase" },
//   body: { margin: "24px 0", flexGrow: 1 },
//   item: { display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f1f5f9" },
//   label: { color: "#64748b" },
//   value: { fontWeight: 600, color: "#1e293b" },
//   button: { padding: "14px", borderRadius: 12, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 16 },
//   currentBtn: { background: "#10b981", cursor: "default" },
//   disabledBtn: { background: "#cbd5e1", cursor: "not-allowed" },
//   successWrapper: { display: "flex", justifyContent: "center", marginBottom: 30 },
//   successBanner: { background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", padding: "16px 24px", borderRadius: 12, fontWeight: 500, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" },
//   modalBackdrop: { position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
//   modal: { background: "#fff", padding: 32, borderRadius: 16, width: 400, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" },
//   modalActions: { display: "flex", gap: 12, marginTop: 24 },
//   cancelBtn: { flex: 1, background: "#f1f5f9", border: "none", padding: "12px", borderRadius: 8, cursor: "pointer", fontWeight: 500 },
//   confirmBtn: { flex: 1, background: "#2563eb", color: "#fff", border: "none", padding: "12px", borderRadius: 8, cursor: "pointer", fontWeight: 500 },
// };
