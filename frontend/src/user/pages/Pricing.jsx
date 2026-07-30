import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllPermissions } from "../../api/subscriptionPermissionApi";
import { upgradeSubscription } from "../../api/subscriptionApi";

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
    getAllPermissions()
      .then((res) => {
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

        try {
          const res = await upgradeSubscription(user.id, selectedPlan.role);
          const newPlanRole = res.data?.planName || selectedPlan.role;

          const updatedUser = { ...user, plan: newPlanRole };
          localStorage.setItem("user", JSON.stringify(updatedUser));

          setCurrentPlan(newPlanRole);
          setUpgradeSuccess(selectedPlan.name);

          setTimeout(() => {
            setUpgradeSuccess(null);
            navigate("/dashboard");
          }, 3000);
        } catch (err) {
          console.error("Upgrade failed:", err);
          alert("Payment succeeded but plan update failed. Please contact support.");
        }
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
